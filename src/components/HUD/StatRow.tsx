import { StatBar } from "./StatBar";

type StatRowProps = {
  label: string;
  value: number;
  tone: "money" | "mental" | "crew" | "quality";
  highlight?: "up" | "down" | null;
};

export function StatRow({ label, value, tone, highlight = null }: StatRowProps) {
  return (
    <div className={`stat-row ${highlight ? `stat-row--${highlight}` : ""}`.trim()}>
      <span className="stat-row__label">{label}</span>
      <StatBar value={value} tone={tone} />
    </div>
  );
}
