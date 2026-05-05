import { Dispatch, useEffect, useMemo, useState } from "react";
import { Button } from "../components/Common/Button";
import { ScreenFrame } from "../components/Common/ScreenFrame";
import { endings } from "../data/endings";
import { EndingId } from "../types/ending";
import { GameAction, GameState } from "../types/game";
import { getAssetUrl } from "../utils/asset";
import { formatDuration } from "../utils/format";
import { readStoredResults, saveResult, StoredResult } from "../utils/resultStorage";

type ResultScreenProps = {
  state: GameState;
  dispatch: Dispatch<GameAction>;
};

function getResultFaceSrc(endingId: EndingId | null) {
  if (!endingId) {
    return getAssetUrl("/assets/swings_face/swings_normal.webp");
  }

  const successEndings: EndingId[] = [
    "miracle-on-time",
    "master-delivered",
    "released-anyway",
    "almost-classic",
    "barely-held",
    "silent-release"
  ];
  const failEndings: EndingId[] = [
    "ceo-walkout",
    "go-separate-ways",
    "settlement-bankrupt",
    "quality-evaporated",
    "viral-but-hollow",
    "burned-for-art"
  ];

  if (successEndings.includes(endingId)) {
    return getAssetUrl("/assets/swings_face/swings_sucess.png");
  }

  if (failEndings.includes(endingId)) {
    return getAssetUrl("/assets/swings_face/swings_fail.png");
  }

  return getAssetUrl("/assets/swings_face/swings_normal.webp");
}

export function ResultScreen({ state, dispatch }: ResultScreenProps) {
  const ending = state.endingId ? endings[state.endingId] : null;
  const [latestStored, setLatestStored] = useState<StoredResult | null>(null);
  const [bestStored, setBestStored] = useState<StoredResult | null>(null);

  useEffect(() => {
    saveResult(state);
    const stored = readStoredResults();
    setLatestStored(stored.recent[0] ?? null);
    setBestStored(stored.bestQualityRun);
  }, [state]);

  const metrics = useMemo(
    () => [
      { label: "플레이 시간", value: formatDuration(state.elapsedMs) },
      { label: "납기", value: `${Math.round(state.deadlineProgress)}%` },
      { label: "잔고", value: `${Math.round(state.money)}%` },
      { label: "대표멘탈", value: `${Math.round(state.mental)}%` },
      { label: "식구력", value: `${Math.round(state.crew)}%` },
      { label: "완성도", value: `${Math.round(state.quality)}%` }
    ],
    [state]
  );
  const statGraphItems = useMemo(
    () => [
      { label: "잔고", value: state.money, tone: "money" },
      { label: "대표멘탈", value: state.mental, tone: "mental" },
      { label: "식구력", value: state.crew, tone: "crew" },
      { label: "완성도", value: state.quality, tone: "quality" }
    ],
    [state.crew, state.mental, state.money, state.quality]
  );
  const resultFaceSrc = useMemo(() => getResultFaceSrc(state.endingId), [state.endingId]);

  return (
    <ScreenFrame className="result-screen">
      <section className="hero-panel result-screen__hero">
        <img alt="스윙스 결과 얼굴" className="swings-face swings-face--result" src={resultFaceSrc} />
        <p className="eyebrow">final report</p>
        <h1>{ending?.title ?? "회의 종료"}</h1>
        <p className="hero-copy">{ending?.summary ?? "이번 회의는 여기까지다."}</p>
      </section>

      <section className="hero-panel hero-panel--muted result-screen__report">
        <div className="result-screen__report-header">
          <span className="result-screen__report-label">최종 성적표</span>
          <strong className="result-screen__report-grade">TURN {state.turn}</strong>
        </div>
        <div className="result-screen__summary">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="result-screen__metric">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              {index === 1 ? (
                <div className="result-screen__mini-graph" aria-hidden="true">
                  {statGraphItems.map((item) => (
                    <div key={item.label} className="result-screen__mini-graph-item">
                      <div className="result-screen__mini-graph-track">
                        <div
                          className={`result-screen__mini-graph-fill result-screen__mini-graph-fill--${item.tone}`}
                          style={{ height: `${Math.max(10, Math.round(item.value))}%` }}
                        />
                      </div>
                      <span className="result-screen__mini-graph-name">{item.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="hero-panel hero-panel--muted result-screen__archive">
        <div className="result-screen__archive-row">
          <span>최근 기록</span>
          <strong>
            {latestStored?.endingId ? endings[latestStored.endingId].title : "없음"}
          </strong>
        </div>
        <div className="result-screen__archive-row">
          <span>최고 완성도</span>
          <strong>{bestStored ? `${Math.round(bestStored.quality)}%` : "없음"}</strong>
        </div>
      </section>

      <div className="result-screen__actions">
        <Button onClick={() => dispatch({ type: "RESTART_GAME" })}>다시하기</Button>
        <Button variant="ghost" onClick={() => dispatch({ type: "GO_TO_TITLE" })}>
          타이틀로
        </Button>
      </div>
    </ScreenFrame>
  );
}
