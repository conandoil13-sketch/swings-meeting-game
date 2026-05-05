import { StatKey } from "../../types/game";

export type FloatingChangeItem = {
  id: string;
  stat: StatKey | "deadlineProgress";
  delta: number;
};

type FloatingStatChangeProps = {
  item: FloatingChangeItem;
};

function getLabel(stat: FloatingChangeItem["stat"]) {
  switch (stat) {
    case "money":
      return "잔고";
    case "mental":
      return "멘탈";
    case "crew":
      return "식구력";
    case "quality":
      return "완성도";
    case "deadlineProgress":
      return "납기";
    default:
      return "";
  }
}

export function FloatingStatChange({ item }: FloatingStatChangeProps) {
  const sign = item.delta > 0 ? "+" : "";
  const tone = item.delta > 0 ? "up" : "down";
  const emphasis = Math.abs(item.delta) >= 8 ? "strong" : "normal";

  return (
    <div
      className={`floating-stat-change floating-stat-change--${tone} floating-stat-change--${emphasis}`}
    >
      <span className="floating-stat-change__label">{getLabel(item.stat)}</span>
      <strong className="floating-stat-change__value">
        {sign}
        {Math.round(item.delta)}
      </strong>
    </div>
  );
}
