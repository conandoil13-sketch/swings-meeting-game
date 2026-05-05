import { Dispatch } from "react";
import { GameAction, GameState } from "../types/game";
import { GameScreen } from "../screens/GameScreen";
import { HowToPlayScreen } from "../screens/HowToPlayScreen";
import { ResultScreen } from "../screens/ResultScreen";
import { TitleScreen } from "../screens/TitleScreen";

type AppRouterProps = {
  state: GameState;
  dispatch: Dispatch<GameAction>;
};

export function AppRouter({ state, dispatch }: AppRouterProps) {
  if (state.phase === "howto") {
    return <HowToPlayScreen dispatch={dispatch} />;
  }

  if (state.phase === "playing") {
    return <GameScreen state={state} dispatch={dispatch} />;
  }

  if (state.phase === "ended") {
    return <ResultScreen state={state} dispatch={dispatch} />;
  }

  return <TitleScreen dispatch={dispatch} />;
}
