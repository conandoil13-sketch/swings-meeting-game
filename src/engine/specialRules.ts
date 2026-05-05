import { ChoiceDirection, GameCardData } from "../types/card";
import { GameState } from "../types/game";

export type CardPresentation = {
  leftChoice: string;
  rightChoice: string;
};

type ApplySpecialRulesParams = {
  state: GameState;
  card: GameCardData;
  direction: ChoiceDirection;
  nextState: GameState;
};

function createYoungbAftershockCard(): GameCardData {
  return {
    id: `youngb-aftershock-${Date.now()}`,
    artistId: "youngb",
    text: "영비는 결국 안 왔고, 추가 비용과 일정 재조정이 한꺼번에 몰려온다.",
    context: "후속 사고를 지금 수습할지, 오늘은 손절할지 정해야 한다.",
    leftChoice: "일정부터 다시 잡는다",
    rightChoice: "오늘은 접고 정리한다",
    leftEffects: { deadlineProgress: -8, money: -7, mental: -4, crew: 3 },
    rightEffects: { deadlineProgress: 3, crew: -6, mental: 2, quality: -3 },
    tags: ["연락두절", "후폭풍", "재정비"]
  };
}

function createBlacknutDeadlineDropCard(): GameCardData {
  return {
    id: `blacknut-deadline-drop-${Date.now()}`,
    artistId: "blacknut",
    text: "블랙넛이 진짜 마감 직전에 벌스를 던졌다. 지금 넣으면 판이 뒤집힐 수도 있다.",
    context: "시간은 거의 없지만 효율은 압도적이다.",
    leftChoice: "바로 반영해서 역전 노린다",
    rightChoice: "안전하게 일부만 취한다",
    leftEffects: { deadlineProgress: -10, quality: 16, money: 8, mental: -3 },
    rightEffects: { deadlineProgress: -4, quality: 8, money: 4, mental: 1 },
    tags: ["역전", "마감직전", "고효율"]
  };
}

function createNochangDetailFollowupCard(): GameCardData {
  return {
    id: `nochang-followup-${Date.now()}`,
    artistId: "nochang",
    text: "노창이 아까 만진 부분과 지금 질감이 안 맞는다며 한 번만 더 보자고 한다.",
    context: "완성도는 더 올라갈 수 있지만 마감은 더 위험해진다.",
    leftChoice: "끝까지 밀어붙인다",
    rightChoice: "이제 진짜 멈춘다",
    leftEffects: { deadlineProgress: -12, quality: 10, money: -4 },
    rightEffects: { deadlineProgress: 3, quality: -2, mental: 2 },
    tags: ["후속디테일", "집착", "마감압박"]
  };
}

function createOkasianSplitCard(seed: number): GameCardData {
  return {
    id: `okasian-split-${seed}-${Date.now()}`,
    artistId: "okasian",
    text:
      seed === 1
        ? "오카시 단톡방에서 또 다른 수정안이 날아왔다. 방금 합의한 내용이 바로 뒤집혔다."
        : "다른 멤버가 앞선 결론을 부정하며 완전히 다른 수정 방향을 다시 요구한다.",
    context: "정리하려 할수록 말이 갈라진다.",
    leftChoice: seed === 1 ? "가장 최근 의견 따른다" : "처음 합의안 고수",
    rightChoice: seed === 1 ? "처음 결론 유지" : "새 의견으로 갈아탄다",
    leftEffects: { deadlineProgress: -6, crew: -3, quality: 4 },
    rightEffects: { deadlineProgress: -3, crew: -5, mental: -2, quality: 5 },
    tags: ["분열", "혼선", "연속패턴"]
  };
}

function createJusthisDebateCard(): GameCardData {
  return {
    id: `justhis-debate-${Date.now()}`,
    artistId: "justhis",
    text: "저스디스가 방금 결론 낸 안건을 다시 열고, 기준 자체를 다시 정의해야 한다고 말한다.",
    context: "말은 맞는데 시간이 더 타고 분위기도 뜨거워진다.",
    leftChoice: "끝까지 논리로 붙는다",
    rightChoice: "오늘은 결론만 남긴다",
    leftEffects: { deadlineProgress: -8, quality: 7, mental: -5, crew: -4 },
    rightEffects: { deadlineProgress: 1, quality: -2, mental: 2, crew: 1 },
    tags: ["late", "debate", "risky"]
  };
}

function insertAfterCurrent(
  state: GameState,
  cardsToInsert: GameCardData[],
  anchorIndex: number = state.currentCardIndex
): GameState {
  if (cardsToInsert.length === 0) {
    return state;
  }

  const insertIndex = Math.min(anchorIndex + 1, state.deck.length);
  const deck = state.deck.slice();
  deck.splice(insertIndex, 0, ...cardsToInsert);

  return {
    ...state,
    deck
  };
}

function clampStat(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function getCardPresentation(state: GameState, card: GameCardData): CardPresentation {
  let leftChoice = card.leftChoice;
  let rightChoice = card.rightChoice;

  if (card.artistId === "giriboy") {
    leftChoice = `${card.leftChoice.slice(0, 4)}...`;
    rightChoice = "이 느낌으로 간다";
  }

  if (state.special.okasianChaosTurns > 0 && card.artistId !== "okasian") {
    return {
      leftChoice: `${rightChoice}?`,
      rightChoice: `${leftChoice}?`
    };
  }

  return { leftChoice, rightChoice };
}

export function applySpecialRules({
  state,
  card,
  direction,
  nextState
}: ApplySpecialRulesParams): GameState {
  let resultState = nextState;

  if (state.special.kidmilliMoodboardTurns > 0) {
    resultState = {
      ...resultState,
      quality: clampStat(resultState.quality + 3),
      money: clampStat(resultState.money - 4),
      special: {
        ...resultState.special,
        kidmilliMoodboardTurns: Math.max(0, resultState.special.kidmilliMoodboardTurns - 1)
      }
    };
  }

  if (state.special.okasianChaosTurns > 0 && card.artistId !== "okasian") {
    resultState = {
      ...resultState,
      special: {
        ...resultState.special,
        okasianChaosTurns: Math.max(0, resultState.special.okasianChaosTurns - 1)
      }
    };
  }

  switch (card.artistId) {
    case "giriboy":
      resultState = {
        ...resultState,
        quality: clampStat(resultState.quality + (direction === "left" ? 2 : -2)),
        mental: clampStat(resultState.mental + (direction === "left" ? -1 : 1))
      };
      break;
    case "youngb":
      resultState = insertAfterCurrent(
        resultState,
        direction === "left" ? [createYoungbAftershockCard()] : [],
        state.currentCardIndex
      );
      break;
    case "hanyohan":
      resultState = {
        ...resultState,
        crew: clampStat(resultState.crew + (resultState.crew < state.crew ? 5 : 2)),
        mental: clampStat(resultState.mental + (resultState.mental < state.mental ? 2 : 0))
      };
      break;
    case "blacknut":
      if (card.id.startsWith("blacknut-last-file")) {
        resultState = {
          ...resultState,
          special: {
            ...resultState.special,
            blacknutVersePending: direction === "left",
            blacknutPayoffQueued: false
          }
        };
      } else if (card.id.startsWith("blacknut-deadline-drop")) {
        resultState = {
          ...resultState,
          special: {
            ...resultState.special,
            blacknutVersePending: false,
            blacknutPayoffQueued: false
          }
        };
      }
      break;
    case "cjamm":
      resultState = {
        ...resultState,
        quality: clampStat(resultState.quality + 5),
        deadlineProgress: clampStat(resultState.deadlineProgress - 6)
      };
      break;
    case "noel": {
      const swing = Math.random() > 0.5 ? 8 : -8;
      resultState = {
        ...resultState,
        money: clampStat(resultState.money + swing),
        mental: clampStat(resultState.mental - swing)
      };
      break;
    }
    case "okasian":
      resultState = insertAfterCurrent(resultState, [
        createOkasianSplitCard(1),
        createOkasianSplitCard(2)
      ], state.currentCardIndex);
      resultState = {
        ...resultState,
        special: {
          ...resultState.special,
          okasianChaosTurns: 2
        }
      };
      break;
    case "nochang":
      resultState = {
        ...resultState,
        quality: clampStat(resultState.quality + 4),
        deadlineProgress: clampStat(resultState.deadlineProgress - 5)
      };
      resultState = insertAfterCurrent(
        resultState,
        direction === "left" ? [createNochangDetailFollowupCard()] : [],
        state.currentCardIndex
      );
      break;
    case "justhis":
      resultState = {
        ...resultState,
        quality: clampStat(resultState.quality + 4),
        mental: clampStat(resultState.mental - 4),
        crew: clampStat(resultState.crew - 3),
        deadlineProgress: clampStat(resultState.deadlineProgress - 4)
      };
      resultState = insertAfterCurrent(
        resultState,
        Math.random() < 0.45 ? [createJusthisDebateCard()] : [],
        state.currentCardIndex
      );
      break;
    case "kidmilli":
      if (direction === "left" && Math.random() < 0.5) {
        resultState = {
          ...resultState,
          special: {
            ...resultState.special,
            kidmilliMoodboardTurns: 2
          }
        };
      }
      break;
    default:
      break;
  }

  return resultState;
}

export function applyPassiveSpecialRules(state: GameState): GameState {
  if (
    state.special.blacknutVersePending &&
    !state.special.blacknutPayoffQueued &&
    state.deadlineProgress <= 35
  ) {
    const nextState = insertAfterCurrent(state, [createBlacknutDeadlineDropCard()]);
    return {
      ...nextState,
      special: {
        ...nextState.special,
        blacknutPayoffQueued: true
      }
    };
  }

  return state;
}
