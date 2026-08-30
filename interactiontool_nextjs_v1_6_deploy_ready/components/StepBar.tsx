const labels = [
  "Start",
  "Current Job",
  "New Offer",
  "Commute & Costs",
  "Assumptions",
  "Results",
];

export default function StepBar({ step }: { step: number }) {
  return (
    <div className="topbar">
      {labels.map((label, index) => (
        <span
          className={`stepchip ${index === step ? "active" : ""}`}
          key={label}
        >
          {index + 1}. {label}
        </span>
      ))}
    </div>
  );
}
