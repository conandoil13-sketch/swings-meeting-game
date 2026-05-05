import { GAME_CONFIG } from "../../data/config";
import { formatPercent } from "../../utils/format";

type DeadlineBarProps = {
  value: number;
};

export function DeadlineBar({ value }: DeadlineBarProps) {
  const level =
    value <= GAME_CONFIG.deadlineWarningThreshold
      ? "critical"
      : value <= GAME_CONFIG.deadlineCriticalThreshold
        ? "danger"
        : value <= GAME_CONFIG.deadlineDangerThreshold
          ? "warning"
          : "stable";

  const warningText =
    value <= GAME_CONFIG.deadlineWarningThreshold
      ? "마감 임박"
      : value <= GAME_CONFIG.deadlineCriticalThreshold
        ? "속도 붙는다"
        : value <= GAME_CONFIG.deadlineDangerThreshold
          ? "납기 압박"
          : "진행 중";

  return (
    <section className={`deadline-bar deadline-bar--${level}`}>
      <div className="deadline-bar__label-row">
        <span className="deadline-bar__label">납기</span>
        <span className="deadline-bar__value">{formatPercent(value)}</span>
      </div>
      <div className="deadline-bar__track">
        <div className="deadline-bar__fill" style={{ width: `${value}%` }} />
      </div>
      <div className="deadline-bar__status-row">
        <span className="deadline-bar__warning">{warningText}</span>
        <span className="deadline-bar__speed">
          {value <= GAME_CONFIG.deadlineCriticalThreshold
            ? "감소속도 상승"
            : value <= GAME_CONFIG.deadlineDangerThreshold
              ? "감소속도 주의"
              : "정상 속도"}
        </span>
      </div>
    </section>
  );
}
