import { formatPercent } from "../../utils/format";

type StatBarProps = {
  value: number;
  tone: "money" | "mental" | "crew" | "quality";
};

export function StatBar({ value, tone }: StatBarProps) {
  return (
    <div className="stat-bar">
      <div className={`stat-bar__fill stat-bar__fill--${tone}`} style={{ width: `${value}%` }} />
      <span className="stat-bar__value">{formatPercent(value)}</span>
    </div>
  );
}
