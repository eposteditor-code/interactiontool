'use client';

import { useEffect, useState } from "react";
import NumberField from "@/components/NumberField";
import Results from "@/components/Results";
import StepBar from "@/components/StepBar";
import { defaultModel } from "@/lib/defaults";
import { validateModel } from "@/lib/calculator";
import type { JobInput, ModelInput } from "@/types/job";
import { STORAGE_KEY, parseComparison, serializeComparison } from "@/lib/storage";


export default function JobOfferWizard() {
  const [step, setStep] = useState(0);
  const [model, setModel] = useState<ModelInput>(defaultModel);
  const [messages, setMessages] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [restored, setRestored] = useState(false);
  const currentValidation = validateModel(model);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseComparison(saved);
        if (parsed) {
          setModel(parsed.model);
          setStep(parsed.step);
          setRestored(true);
        }
      }
    } catch {
      // Ignore malformed or unavailable browser storage.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        serializeComparison({ model, step })
      );
    } catch {
      // Persistence is optional; the tool still works if storage is unavailable.
    }
  }, [model, step, hydrated]);

  const resetSavedComparison = () => {
    setModel(defaultModel);
    setStep(0);
    setMessages([]);
    setRestored(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  };

  const patchJob = (
    key: "current" | "offer",
    field: keyof JobInput,
    value: number
  ) => {
    setModel((m) => ({
      ...m,
      [key]: { ...m[key], [field]: value },
    }));
  };

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const analyze = () => {
    const v = validateModel(model);
    if (v.errors.length) {
      setMessages(v.errors);
      return;
    }
    setMessages(v.warnings);
    setStep(5);
  };

  return (
    <div className="shell">
      <StepBar step={step} />
      <div className="content">
        {restored && (
          <div className="restorebar">
            <span>Your saved comparison was restored on this device.</span>
            <button className="linkButton" onClick={resetSavedComparison}>
              Start over
            </button>
          </div>
        )}

        {step === 0 && (
          <section>
            <div className="eyebrow">Career Decision Tool</div>
            <h1>What would make this job offer worth switching for?</h1>
            <p className="lead">
              Go beyond the headline salary. Compare money, time, commute and
              benefits—then find the offer terms that actually make switching
              worthwhile.
            </p>
            <div className="section">
              <h3>What this tool calculates</h3>
              <p>
                Financial value · committed time · effective value/hour ·
                ongoing break-even salary · negotiation scenarios
              </p>
            </div>
            <div className="actions end">
              <button className="primary" onClick={next}>
                Start Comparing →
              </button>
            </div>
          </section>
        )}

        {step === 1 && (
          <JobForm
            title="Current job"
            job={model.current}
            patch={(field, value) => patchJob("current", field, value)}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 2 && (
          <JobForm
            title="New job offer"
            job={model.offer}
            patch={(field, value) => patchJob("offer", field, value)}
            onBack={back}
            onNext={next}
            includeOfferFields
          />
        )}

        {step === 3 && (
          <section>
            <h2>Commute & direct costs</h2>
            <p>Only include costs caused by the job or commute.</p>
            <div className="grid">
              {[
                ["One-way commute time (minutes)", "commuteMin", 1],
                ["One-way commute distance (miles)", "commuteMiles", 1],
                ["Vehicle cost per mile", "costMile", 0.01],
                ["Parking per office day", "parking", 1],
                ["Tolls per office day", "tolls", 1],
                ["Additional food cost per office day", "food", 1],
                ["Childcare difference / month", "childcare", 1],
                ["Other annual job costs", "other", 1],
              ].map(([label, field, stepValue]) => (
                <NumberField
                  key={String(field)}
                  label={String(label)}
                  value={model.offer[field as keyof JobInput] as number}
                  step={Number(stepValue)}
                  onChange={(v) =>
                    patchJob("offer", field as keyof JobInput, v)
                  }
                />
              ))}
            </div>
            <Nav onBack={back} onNext={next} />
          </section>
        )}

        {step === 4 && (
          <section>
            <h2>Your assumptions</h2>
            <p>
              The objective model stays separate from your optional time-value
              assumption.
            </p>
            <div className="section">
              <NumberField
                label="Optional value of personal commute time ($/hour)"
                value={model.timeValue}
                onChange={(v) => setModel((m) => ({ ...m, timeValue: v }))}
              />
            </div>
            {messages.length > 0 && (
              <div className="notice">{messages.join(" ")}</div>
            )}
            <div className="actions">
              <button className="secondary" onClick={back}>
                ← Back
              </button>
              <button className="primary" onClick={analyze}>
                See My Analysis →
              </button>
            </div>
          </section>
        )}

        {step === 5 && (
          <>
            {(currentValidation.errors.length > 0 ||
              currentValidation.warnings.length > 0) && (
              <div className="validationPanel">
                {currentValidation.errors.map((message) => (
                  <div className="validationError" key={message}>
                    {message}
                  </div>
                ))}
                {currentValidation.warnings.map((message) => (
                  <div className="validationWarning" key={message}>
                    {message}
                  </div>
                ))}
              </div>
            )}
            <Results model={model} onEdit={() => setStep(1)} />
          </>
        )}
      </div>
    </div>
  );
}

function JobForm({
  title,
  job,
  patch,
  onBack,
  onNext,
  includeOfferFields = false,
}: {
  title: string;
  job: JobInput;
  patch: (field: keyof JobInput, value: number) => void;
  onBack: () => void;
  onNext: () => void;
  includeOfferFields?: boolean;
}) {
  const fields: [string, keyof JobInput][] = [
    ["Base salary", "salary"],
    ["Expected annual bonus", "bonus"],
    ["Average hours/week", "hours"],
    ["Workdays/week", "workdays"],
    ["Office days/week", "office"],
    ["PTO days/year", "pto"],
    ["Annual employer retirement value", "retire"],
    ["Annual employer benefits value", "benefits"],
  ];

  if (includeOfferFields) {
    fields.splice(2, 0, ["Signing bonus (Year 1 only)", "signing"]);
    fields.splice(3, 0, ["Annual vested equity / RSUs", "equity"]);
  }

  return (
    <section>
      <h2>{title}</h2>
      <p>Enter the details that materially affect compensation and time.</p>
      <div className="grid">
        {fields.map(([label, field]) => (
          <NumberField
            key={field}
            label={label}
            value={job[field]}
            onChange={(v) => patch(field, v)}
          />
        ))}
      </div>
      <Nav onBack={onBack} onNext={onNext} />
    </section>
  );
}

function Nav({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="actions">
      <button className="secondary" onClick={onBack}>
        ← Back
      </button>
      <button className="primary" onClick={onNext}>
        Continue →
      </button>
    </div>
  );
}
