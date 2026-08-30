import type { JobInput, JobResult, ModelInput } from "@/types/job";

export function annualWork(job: JobInput) {
  const workdays = Math.max(1, job.workdays);
  const standardDays = 52 * workdays;
  const actualDays = Math.max(1, standardDays - job.pto);
  const hoursPerDay = job.hours / workdays;
  const annualWorkHours = actualDays * hoursPerDay;
  const officeFraction = Math.min(job.office, workdays) / workdays;
  const officeDays = actualDays * officeFraction;
  return { actualDays, annualWorkHours, officeDays };
}

export function calculateJob(job: JobInput): JobResult {
  const t = annualWork(job);
  const commuteHours = t.officeDays * (job.commuteMin * 2) / 60;
  const commuteMiles = t.officeDays * (job.commuteMiles * 2);
  const vehicle = commuteMiles * job.costMile;
  const parking = t.officeDays * job.parking;
  const tolls = t.officeDays * job.tolls;
  const food = t.officeDays * job.food;
  const childcare = job.childcare * 12;

  const directCosts =
    vehicle + parking + tolls + food + childcare + job.other;

  const recurringComp =
    job.salary +
    job.bonus +
    job.equity +
    job.retire +
    job.benefits;

  const financialValue = recurringComp - directCosts;
  const committedHours = t.annualWorkHours + commuteHours;
  const effective =
    committedHours > 0 ? financialValue / committedHours : 0;

  return {
    ...t,
    commuteHours,
    commuteMiles,
    directCosts,
    recurringComp,
    financialValue,
    committedHours,
    effective,
    year1Value: financialValue + job.signing,
  };
}

export function breakEvenSalary(current: JobInput, offer: JobInput) {
  const c = calculateJob(current);
  const o = calculateJob(offer);
  const nonSalaryRecurring =
    offer.bonus + offer.equity + offer.retire + offer.benefits;

  return c.effective * o.committedHours + o.directCosts - nonSalaryRecurring;
}

export function validateModel(model: ModelInput) {
  const errors: string[] = [];
  const warnings: string[] = [];

  const nonNegativeFields = [
    ["salary", "salary"],
    ["bonus", "bonus"],
    ["signing", "signing bonus"],
    ["equity", "annual equity"],
    ["retire", "employer retirement value"],
    ["benefits", "benefits value"],
    ["office", "office days"],
    ["pto", "PTO days"],
    ["commuteMin", "commute minutes"],
    ["commuteMiles", "commute miles"],
    ["costMile", "vehicle cost per mile"],
    ["parking", "parking cost"],
    ["tolls", "tolls"],
    ["food", "additional food cost"],
    ["childcare", "childcare cost"],
    ["other", "other annual costs"],
  ] as const;

  for (const [label, job] of [
    ["Current job", model.current],
    ["New offer", model.offer],
  ] as const) {
    for (const [key, name] of nonNegativeFields) {
      if (job[key] < 0) {
        errors.push(`${label}: ${name} cannot be negative.`);
      }
    }

    if (job.hours < 1 || job.hours > 100) {
      errors.push(`${label}: weekly hours must be between 1 and 100.`);
    }
    if (job.hours > 80) {
      warnings.push(`${label}: weekly hours are unusually high.`);
    }
    if (job.workdays < 1 || job.workdays > 7) {
      errors.push(`${label}: workdays/week must be between 1 and 7.`);
    }
    if (job.office > job.workdays) {
      errors.push(`${label}: office days cannot exceed workdays/week.`);
    }

    const availableDays = 52 * Math.max(1, job.workdays);
    if (job.pto >= availableDays) {
      errors.push(`${label}: PTO must be less than available annual workdays.`);
    }

    if (job.retire > job.salary * 0.30 && job.salary > 0) {
      warnings.push(
        `${label}: employer retirement value is more than 30% of salary. Verify this input.`
      );
    }
  }

  if (model.current.benefits === 0) {
    warnings.push("Current-job benefits are $0. Add them if they are material.");
  }
  if (model.offer.benefits === 0) {
    warnings.push("Offer benefits are $0. Add them if they are material.");
  }
  if (model.timeValue < 0) {
    errors.push("Commute-time value cannot be negative.");
  }

  return { errors, warnings };
}

export function timeAdjustedValue(job: JobInput, timeValuePerHour: number) {
  const result = calculateJob(job);
  return result.financialValue - result.commuteHours * Math.max(0, timeValuePerHour);
}

export function decisionPattern(model: ModelInput) {
  const c = calculateJob(model.current);
  const n = calculateJob(model.offer);
  const fin = n.financialValue - c.financialValue;
  const td = n.committedHours - c.committedHours;

  if (fin > 0 && td > 0)
    return {
      title: "Financial upgrade / Time downgrade",
      explanation:
        "The offer improves annual financial value, but requires more total work and commute time.",
    };
  if (fin > 0 && td <= 0)
    return {
      title: "Strong modeled upgrade",
      explanation:
        "The offer improves modeled financial value without increasing committed time.",
    };
  if (fin <= 0 && td < 0)
    return {
      title: "Time upgrade / Financial downgrade",
      explanation:
        "The offer gives you more time back, but modeled annual financial value is lower.",
    };
  return {
    title: "Weaker under current assumptions",
    explanation:
      "The offer trails your current job on modeled financial value and does not save enough time to offset it.",
  };
}
