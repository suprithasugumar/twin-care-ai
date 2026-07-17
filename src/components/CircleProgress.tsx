export function CircleProgress({
  value,
  size = 120,
  stroke = 10,
  label,
  sublabel,
  color = "var(--primary)",
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{Math.round(value)}{label ? "" : "%"}</div>
        {label && <div className="text-xs text-muted-foreground">{label}</div>}
        {sublabel && <div className="text-[10px] text-muted-foreground">{sublabel}</div>}
      </div>
    </div>
  );
}
