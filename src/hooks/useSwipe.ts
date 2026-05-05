import { PointerEvent, useCallback, useState } from "react";
import { GAME_CONFIG } from "../data/config";
import { ChoiceDirection } from "../types/card";

type UseSwipeOptions = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export function useSwipe({ onSwipeLeft, onSwipeRight }: UseSwipeOptions) {
  const [startX, setStartX] = useState<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [previewDirection, setPreviewDirection] = useState<ChoiceDirection | null>(null);

  const resetSwipe = useCallback(() => {
    setStartX(null);
    setDragOffsetX(0);
    setPreviewDirection(null);
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setStartX(event.clientX);
    setDragOffsetX(0);
    setPreviewDirection(null);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (startX === null) {
      return;
    }

    const deltaX = event.clientX - startX;
    setDragOffsetX(deltaX);

    if (deltaX <= -GAME_CONFIG.swipeThreshold / 2) {
      setPreviewDirection("left");
      return;
    }

    if (deltaX >= GAME_CONFIG.swipeThreshold / 2) {
      setPreviewDirection("right");
      return;
    }

    setPreviewDirection(null);
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (startX === null) {
      return;
    }

    const deltaX = event.clientX - startX;
    resetSwipe();

    if (deltaX <= -GAME_CONFIG.swipeThreshold) {
      onSwipeLeft();
    } else if (deltaX >= GAME_CONFIG.swipeThreshold) {
      onSwipeRight();
    }
  };

  return {
    swipeBindings: {
      onPointerDown,
      onPointerMove,
      onPointerCancel: resetSwipe,
      onPointerUp
    },
    dragOffsetX,
    previewDirection,
    resetSwipe
  };
}
