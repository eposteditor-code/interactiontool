import type { ModelInput } from "@/types/job";
import NegotiationLab from "@/components/NegotiationLab";
import {
  breakEvenSalary,
  calculateJob,
  decisionPattern,
  timeAdjustedValue,
} from "@/lib/calculator";

const money = (v: number) =>
  `${v < 0 ? "-" : ""}$${Math.abs(v).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })}`;

const money2 = (v: number) =>
  `${v < 0 ? "-" : ""}$${Math.abs(v).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;

export default function Results({
  model,
  onEdit,
}: {
  model: ModelInput;
  onEdit: () => void;
}) {
  const c = calculateJob(model.current);
  const n = calculateJob(model.offer);
  const be = breakEvenSalary(model.current, model.offer);
  const gap = model.offer.salary - be;
  const financialDiff = n.financialValue - c.financialValue;
  const timeDiff = n.committedHours - c.committedHours;
  const pattern = decisionPattern(model);
  const currentTimeAdjusted = timeAdjustedValue(model.current, model.timeValue);
  const offerTimeAdjusted = timeAdjustedValue(model.offer, model.timeValue);

  return (
    <section>
      <div className="resultHeader">
        <div>
          <div className="eyebrow">Your Decision Analysis</div>
          <h2>Your offer, decoded.</h2>
          <p>Objective numbers first. Negotiation options second.</p>
        </div>
        <span className="pill">Live model</span>
      </div>

      <div className="heroResult">
        <span className="pill warn">{pattern.title}</span>
        <div className="muted spaceTop">THE NUMBER THAT MATTERS</div>
        <div>Ongoing break-even base salary</div>
        <div className="big">{money(be)}</div>
        <div className="muted">
          {gap >= 0
            ? `${money(gap)} above modeled break-even`
            : `${money(-gap)} below modeled break-even`}
        </div>
      </div>

      <div className="summarybox">
        <div className="summarymain">
          <div className="eyebrow light">Decision pattern</div>
          <strong>{pattern.title}</strong>
          <div className="muted">{pattern.explanation}</div>
        </div>
        <div className="summaryside">
          <div className="minirow">
            <span>Financial difference</span>
            <strong>{money(financialDiff)}</strong>
          </div>
          <div className="minirow">
            <span>Time difference</span>
            <strong>{Math.round(timeDiff)} hrs/yr</strong>
          </div>
          <div className="minirow">
            <span>Value/hour difference</span>
            <strong>{money2(n.effective - c.effective)}/hr</strong>
          </div>
        </div>
      </div>

      <div className="grid3">
        <div className="metric">
          <span className="muted">Current effective value</span>
          <strong>{money2(c.effective)}/hr</strong>
        </div>
        <div className="metric">
          <span className="muted">Offer effective value</span>
          <strong>{money2(n.effective)}/hr</strong>
        </div>
        <div className="metric">
          <span className="muted">Year-1 difference</span>
          <strong>{money(n.year1Value - c.year1Value)}</strong>
        </div>
      </div>

      {model.timeValue > 0 && (
        <div className="section">
          <h3>Optional time-adjusted estimate</h3>
          <p className="muted">
            This applies your selected dollar value only to commute time. It is
            an estimate, not salary or cash compensation.
          </p>
          <div className="grid3">
            <div className="metric">
              <span className="muted">Current job</span>
              <strong>{money(currentTimeAdjusted)}</strong>
            </div>
            <div className="metric">
              <span className="muted">New offer</span>
              <strong>{money(offerTimeAdjusted)}</strong>
            </div>
            <div className="metric">
              <span className="muted">Difference</span>
              <strong>{money(offerTimeAdjusted - currentTimeAdjusted)}</strong>
            </div>
          </div>
        </div>
      )}

      <NegotiationLab model={model} />

      <div className="section">
        <h3>How was this calculated?</h3>
        <div className="formula">
          Financial Value = recurring compensation − direct job costs
        </div>
        <div className="formula">
          Committed Time = annual work hours + commute hours
        </div>
        <div className="formula">
          Effective Value/Hour = Financial Value ÷ Committed Time
        </div>
        <div className="formula">
          Break-Even Salary = salary where offer Effective Value/Hour equals
          current-job Effective Value/Hour
        </div>
      </div>

      <div className="actions">
        <button className="secondary" onClick={onEdit}>
          ← Edit inputs
        </button>
      </div>
    </section>
  );
}
