type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
};

export default function NumberField({
  label,
  value,
  onChange,
  step = 1,
}: Props) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value || 0))}
      />
    </label>
  );
}
