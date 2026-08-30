import { describe, expect, it } from "vitest";
import {
  annualWork,
  breakEvenSalary,
  calculateJob,
  decisionPattern,
  validateModel,
} from "@/lib/calculator";
import { defaultModel } from "@/lib/defaults";
import type { JobInput, ModelInput } from "@/types/job";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

describe("annualWork", () => {
  it("reduces required workdays when PTO increases", () => {
    const job = clone(defaultModel.current);
    const base = annualWork(job);
    job.pto += 5;
    const morePto = annualWork(job);

    expect(morePto.actualDays).toBe(base.actualDays - 5);
    expect(morePto.annualWorkHours).toBeLessThan(base.annualWorkHours);
  });

  it("supports a four-day workweek", () => {
    const job = clone(defaultModel.current);
    job.workdays = 4;
    job.hours = 40;
    job.pto = 20;
    const r = annualWork(job);

    expect(r.actualDays).toBe(188);
    expect(r.annualWorkHours).toBe(1880);
  });
});

describe("calculateJob", () => {
  it("produces zero commute time and cost for a fully remote job", () => {
    const job = clone(defaultModel.offer);
    job.office = 0;
    const r = calculateJob(job);

    expect(r.officeDays).toBe(0);
    expect(r.commuteHours).toBe(0);
    expect(r.commuteMiles).toBe(0);
    expect(r.directCosts).toBe(job.childcare * 12 + job.other);
  });

  it("keeps signing bonus out of recurring compensation", () => {
    const job = clone(defaultModel.offer);
    const r = calculateJob(job);

    expect(r.year1Value - r.financialValue).toBe(job.signing);
    expect(r.recurringComp).not.toBe(r.recurringComp + job.signing);
  });

  it("adds commute to committed time for office jobs", () => {
    const job = clone(defaultModel.offer);
    const r = calculateJob(job);

    expect(r.committedHours).toBeGreaterThan(r.annualWorkHours);
    expect(r.commuteHours).toBeGreaterThan(0);
  });

  it("subtracts direct costs from recurring compensation", () => {
    const job = clone(defaultModel.offer);
    const r = calculateJob(job);

    expect(r.financialValue).toBeCloseTo(
      r.recurringComp - r.directCosts,
      8
    );
  });
});

describe("breakEvenSalary", () => {
  it("makes the offer effective value/hour match the current job", () => {
    const current = clone(defaultModel.current);
    const offer = clone(defaultModel.offer);
    const salary = breakEvenSalary(current, offer);

    offer.salary = salary;
    const c = calculateJob(current);
    const o = calculateJob(offer);

    expect(o.effective).toBeCloseTo(c.effective, 8);
  });

  it("does not use signing bonus in ongoing break-even salary", () => {
    const current = clone(defaultModel.current);
    const offerA = clone(defaultModel.offer);
    const offerB = clone(defaultModel.offer);
    offerB.signing = offerA.signing + 100000;

    expect(breakEvenSalary(current, offerA)).toBeCloseTo(
      breakEvenSalary(current, offerB),
      8
    );
  });

  it("requires a lower salary when office days are reduced", () => {
    const current = clone(defaultModel.current);
    const offer = clone(defaultModel.offer);

    const full = breakEvenSalary(current, offer);
    offer.office = Math.max(0, offer.office - 1);
    const fewerOfficeDays = breakEvenSalary(current, offer);

    expect(fewerOfficeDays).toBeLessThan(full);
  });

  it("requires a lower salary when PTO increases", () => {
    const current = clone(defaultModel.current);
    const offer = clone(defaultModel.offer);

    const base = breakEvenSalary(current, offer);
    offer.pto += 5;
    const morePto = breakEvenSalary(current, offer);

    expect(morePto).toBeLessThan(base);
  });
});

describe("validateModel", () => {
  it("rejects office days above workdays", () => {
    const model = clone(defaultModel);
    model.offer.office = 6;
    model.offer.workdays = 5;

    const r = validateModel(model);
    expect(r.errors.some((e) => e.includes("office days"))).toBe(true);
  });

  it("warns about unusually high weekly hours", () => {
    const model = clone(defaultModel);
    model.offer.hours = 85;

    const r = validateModel(model);
    expect(r.warnings.some((w) => w.includes("unusually high"))).toBe(true);
  });

  it("warns when benefits are omitted", () => {
    const model = clone(defaultModel);
    model.offer.benefits = 0;

    const r = validateModel(model);
    expect(r.warnings.some((w) => w.includes("Offer benefits"))).toBe(true);
  });
});

describe("decisionPattern", () => {
  it("recognizes a financial upgrade with more time required", () => {
    const model = clone(defaultModel);
    const pattern = decisionPattern(model);

    expect(pattern.title).toBe("Financial upgrade / Time downgrade");
  });

  it("recognizes a strong upgrade when financial value rises and time does not", () => {
    const model = clone(defaultModel);
    model.offer.office = 0;
    model.offer.hours = 35;
    model.offer.salary = 140000;

    const pattern = decisionPattern(model);
    expect(pattern.title).toBe("Strong modeled upgrade");
  });
});
