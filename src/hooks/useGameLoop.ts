import { useEffect, useRef } from "react";

export function useGameLoop(isRunning: boolean, onFrame: (deltaMs: number) => void) {
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = null;
      previousTimeRef.current = null;
      return;
    }

    const loop = (time: number) => {
      if (previousTimeRef.current !== null) {
        onFrame(time - previousTimeRef.current);
      }

      previousTimeRef.current = time;
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isRunning, onFrame]);
}
