import { Dispatch } from "react";
import { Button } from "../components/Common/Button";
import { ScreenFrame } from "../components/Common/ScreenFrame";
import { GAME_CONFIG } from "../data/config";
import { GameAction } from "../types/game";
import { getAssetUrl } from "../utils/asset";

type TitleScreenProps = {
  dispatch: Dispatch<GameAction>;
};

const SWINGS_NORMAL_SRC = getAssetUrl("/assets/swings_face/swings_normal.webp");

export function TitleScreen({ dispatch }: TitleScreenProps) {
  return (
    <ScreenFrame className="title-screen">
      <section className="hero-panel title-screen__hero">
        <img alt="스윙스" className="swings-face swings-face--title" src={SWINGS_NORMAL_SRC} />
        <p className="eyebrow">reigns-style rapid meeting game</p>
        <h1>{GAME_CONFIG.title}</h1>
        <p className="hero-copy">
          스윙스로서 식구들의 감성과 변수 사이에서 결단을 내리며 납기까지 버티는 초고속 카드 게임.
        </p>
      </section>

      <section className="hero-panel hero-panel--muted title-screen__preview">
        <div className="title-screen__preview-bar" />
        <div className="title-screen__preview-card">
          <div className="title-screen__preview-card-top" />
          <div className="title-screen__preview-card-line" />
          <div className="title-screen__preview-card-line title-screen__preview-card-line--short" />
        </div>
        <div className="title-screen__preview-bottom">
          <div className="title-screen__preview-stat" />
          <div className="title-screen__preview-stat" />
          <div className="title-screen__preview-buttons">
            <div className="title-screen__preview-button" />
            <div className="title-screen__preview-button title-screen__preview-button--accent" />
          </div>
        </div>
      </section>

      <div className="title-screen__actions">
        <Button className="title-screen__start" onClick={() => dispatch({ type: "START_GAME" })}>
          시작하기
        </Button>
        <Button variant="ghost" onClick={() => dispatch({ type: "OPEN_HOWTO" })}>
          사용법
        </Button>
      </div>
    </ScreenFrame>
  );
}
