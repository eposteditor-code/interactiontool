'use client';

import { useMemo, useState } from "react";
import type { ModelInput } from "@/types/job";
import { breakEvenSalary, calculateJob } from "@/lib/calculator";

const money = (v: number) =>
  `${v < 0 ? "-" : ""}$${Math.abs(v).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })}`;

const money2 = (v: number) =>
  `${v < 0 ? "-" : ""}$${Math.abs(v).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;

export default function NegotiationLab({ model }: { model: ModelInput }) {
  const [salary, setSalary] = useState(model.offer.salary);
  const [office, setOffice] = useState(model.offer.office);
  const [pto, setPto] = useState(model.offer.pto);
  const [bonus, setBonus] = useState(model.offer.bonus);
  const [retire, setRetire] = useState(model.offer.retire);

  const scenario = useMemo(
    () => ({
      ...model.offer,
      salary,
      office,
      pto,
      bonus,
      retire,
    }),
    [model.offer, salary, office, pto, bonus, retire]
  );

  const current = calculateJob(model.current);
  const result = calculateJob(scenario);
  const breakEven = breakEvenSalary(model.current, scenario);
  const gap = scenario.salary - breakEven;
  const progress = Math.max(
    0,
    Math.min(100, 100 + (gap / Math.max(breakEven, 1)) * 100)
  );

  const salaryOnly = breakEvenSalary(model.current, {
    ...model.offer,
    office: model.offer.office,
    pto: model.offer.pto,
    bonus: model.offer.bonus,
    retire: model.offer.retire,
  });

  const oneRemote = {
    ...model.offer,
    office: Math.max(0, model.offer.office - 1),
  };
  const twoRemote = {
    ...model.offer,
    office: Math.max(0, model.offer.office - 2),
  };
  const plusPto = {
    ...model.offer,
    pto: model.offer.pto + 5,
  };

  const dealPaths = [
    {
      label: "Salary only",
      salary: salaryOnly,
      detail: "Keep all other terms unchanged.",
    },
    {
      label: "1 fewer office day",
      salary: breakEvenSalary(model.current, oneRemote),
      detail: `${oneRemote.office} office day${
        oneRemote.office === 1 ? "" : "s"
      }/week.`,
    },
    {
      label: "2 fewer office days",
      salary: breakEvenSalary(model.current, twoRemote),
      detail: `${twoRemote.office} office day${
        twoRemote.office === 1 ? "" : "s"
      }/week.`,
    },
    {
      label: "+5 PTO days",
      salary: breakEvenSalary(model.current, plusPto),
      detail: `${plusPto.pto} PTO days/year.`,
    },
  ].sort((a, b) => a.salary - b.salary);

  const reset = () => {
    setSalary(model.offer.salary);
    setOffice(model.offer.office);
    setPto(model.offer.pto);
    setBonus(model.offer.bonus);
    setRetire(model.offer.retire);
  };

  return (
    <div className="section lab">
      <div className="labHeader">
        <div>
          <div className="eyebrow">Negotiation Lab</div>
          <h3>Change the offer. See what closes the gap.</h3>
          <p>
            Every control reruns the calculation engine instantly.
          </p>
        </div>
        <button className="secondary small" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="labGrid">
        <div>
          <Slider
            label="Base salary"
            min={Math.max(0, Math.round(model.offer.salary * 0.7))}
            max={Math.round(model.offer.salary * 1.5)}
            step={500}
            value={salary}
            display={money(salary)}
            onChange={setSalary}
          />
          <Slider
            label="Office days/week"
            min={0}
            max={model.offer.workdays}
            step={1}
            value={office}
            display={`${office}`}
            onChange={setOffice}
          />
          <Slider
            label="PTO days/year"
            min={0}
            max={Math.min(60, model.offer.pto + 30)}
            step={1}
            value={pto}
            display={`${pto}`}
            onChange={setPto}
          />
          <Slider
            label="Expected annual bonus"
            min={0}
            max={Math.max(25000, model.offer.bonus * 3)}
            step={500}
            value={bonus}
            display={money(bonus)}
            onChange={setBonus}
          />
          <Slider
            label="Employer retirement value"
            min={0}
            max={Math.max(20000, model.offer.retire * 3)}
            step={250}
            value={retire}
            display={money(retire)}
            onChange={setRetire}
          />
        </div>

        <div className="labSummary">
          <span className={`pill ${gap >= 0 ? "" : "warn"}`}>
            {gap >= 0 ? "Break-even reached" : "Below break-even"}
          </span>
          <div className="labNumber">{money(breakEven)}</div>
          <div className="muted">modeled break-even base salary</div>

          <div className="progress wide">
            <div style={{ width: `${progress}%` }} />
          </div>

          <div className="minirow">
            <span>Current scenario gap</span>
            <strong>{gap >= 0 ? `+${money(gap)}` : `-${money(-gap)}`}</strong>
          </div>
          <div className="minirow">
            <span>Scenario value/hour</span>
            <strong>{money2(result.effective)}/hr</strong>
          </div>
          <div className="minirow">
            <span>Current-job value/hour</span>
            <strong>{money2(current.effective)}/hr</strong>
          </div>
          <div className="minirow">
            <span>Committed time</span>
            <strong>{Math.round(result.committedHours)} hrs/yr</strong>
          </div>
        </div>
      </div>

      <div className="section subSection">
        <h3>Best modeled deal equivalents</h3>
        <p>
          These are alternative ways to reach roughly the same modeled
          break-even point.
        </p>
        <div className="grid3">
          {dealPaths.slice(0, 3).map((deal, index) => (
            <div className="dealcard" key={deal.label}>
              <span className="eyebrow">Path {index + 1}</span>
              <strong>{deal.label}</strong>
              <div className="dealnum">{money(deal.salary)}</div>
              <div className="muted">{deal.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="sliderline">
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <strong>{display}</strong>
    </div>
  );
}
