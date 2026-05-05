import { useCallback, useEffect, useRef } from "react";
import { getAssetUrl } from "../utils/asset";

type AudioName = "swipe" | "stat-up" | "stat-down" | "alert" | "gameover";

const AUDIO_SOURCES: Record<AudioName, string> = {
  swipe: getAssetUrl("/assets/audio/swipe.mp3"),
  "stat-up": getAssetUrl("/assets/audio/stat-up.mp3"),
  "stat-down": getAssetUrl("/assets/audio/stat-down.mp3"),
  alert: getAssetUrl("/assets/audio/deadline-alert.mp3"),
  gameover: getAssetUrl("/assets/audio/gameover.mp3")
};

export function useAudio() {
  const audioMapRef = useRef<Partial<Record<AudioName, HTMLAudioElement>>>({});

  useEffect(() => {
    const entries = Object.entries(AUDIO_SOURCES) as Array<[AudioName, string]>;

    for (const [name, src] of entries) {
      const audio = new Audio(src);
      audio.preload = "auto";
      audioMapRef.current[name] = audio;
    }

    return () => {
      for (const audio of Object.values(audioMapRef.current)) {
        if (!audio) {
          continue;
        }

        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  const play = useCallback((name: AudioName) => {
    const audio = audioMapRef.current[name];

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  }, []);

  return { play };
}
