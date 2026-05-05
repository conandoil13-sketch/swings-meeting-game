import { Dispatch } from "react";
import { Button } from "../components/Common/Button";
import { ScreenFrame } from "../components/Common/ScreenFrame";
import { GameAction } from "../types/game";

type HowToPlayScreenProps = {
  dispatch: Dispatch<GameAction>;
};

export function HowToPlayScreen({ dispatch }: HowToPlayScreenProps) {
  return (
    <ScreenFrame className="howto-screen">
      <section className="hero-panel">
        <p className="eyebrow">how to play</p>
        <h1>사용법</h1>
        <p className="hero-copy">
          카드가 올라오면 바로 좌우로 결정하세요. 판단이 늦어질수록 납기는 계속 줄어듭니다.
        </p>
      </section>

      <section className="hero-panel hero-panel--muted howto-screen__rules">
        <p>상단: 납기 바를 확인합니다.</p>
        <p>중앙: 인물 카드의 요청과 상황을 읽습니다.</p>
        <p>하단: 잔고, 대표멘탈, 식구력, 완성도를 보며 선택합니다.</p>
        <p>입력: 좌우 스와이프 또는 버튼 탭으로 결정합니다.</p>
      </section>

      <div className="howto-screen__actions">
        <Button onClick={() => dispatch({ type: "START_GAME" })}>바로 시작</Button>
        <Button variant="ghost" onClick={() => dispatch({ type: "GO_TO_TITLE" })}>
          돌아가기
        </Button>
      </div>
    </ScreenFrame>
  );
}
