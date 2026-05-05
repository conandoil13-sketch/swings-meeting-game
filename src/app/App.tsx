import { useMemo, useReducer } from "react";
import { createInitialGameState, gameReducer } from "../store/gameStore";
import { AppRouter } from "./router";

export default function App() {
  const initialState = useMemo(() => createInitialGameState(), []);
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return <AppRouter state={state} dispatch={dispatch} />;
}
