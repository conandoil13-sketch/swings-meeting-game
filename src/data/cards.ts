import { GameCardData } from "../types/card";

const makeCard = (card: GameCardData) => card;

export const cards: GameCardData[] = [
  makeCard({
    id: "giriboy-fridge-light",
    artistId: "giriboy",
    text: "기리보이가 말한다. '형 이건 약간 새벽 냉장고 불빛인데, 너무 설명되면 또 죽어요.'",
    context: "기획서를 다시 받을지, 그냥 감으로 진행할지 정해야 한다.",
    leftChoice: "명확하게 다시 말해",
    rightChoice: "그 감성 그대로 간다",
    leftEffects: { deadlineProgress: -7, mental: -3, quality: 6 },
    rightEffects: { deadlineProgress: 3, crew: 3, quality: -4 },
    tags: ["early", "mood", "stable"]
  }),
  makeCard({
    id: "giriboy-title-cloud",
    artistId: "giriboy",
    text: "기리보이가 파일명 없이 '이게 그 버전'만 보내왔다.",
    context: "버전을 다시 확인할지, 믿고 세션에 올릴지 정해야 한다.",
    leftChoice: "버전부터 확인",
    rightChoice: "일단 세션에 올린다",
    leftEffects: { deadlineProgress: -5, quality: 4, mental: -2 },
    rightEffects: { deadlineProgress: 2, quality: -3, crew: 2 },
    tags: ["early", "communication", "stable"]
  }),
  makeCard({
    id: "giriboy-half-explained-hook",
    artistId: "giriboy",
    text: "훅 방향은 설명했는데 핵심 단어를 계속 비유로만 말한다.",
    context: "시간을 써서 번역할지, 감으로 받아 적을지 골라야 한다.",
    leftChoice: "한 줄로 다시 정리시킨다",
    rightChoice: "지금 감으로 받아 적는다",
    leftEffects: { deadlineProgress: -6, quality: 5, mental: -2 },
    rightEffects: { deadlineProgress: 3, crew: 2, quality: -3 },
    tags: ["mid", "mood", "stable"]
  }),
  makeCard({
    id: "giriboy-reference-rabbit-hole",
    artistId: "giriboy",
    text: "레퍼런스를 묻자 갑자기 세 곡을 말했는데 셋 다 결이 다르다.",
    context: "레퍼런스를 좁힐지, 다 섞어보며 탐험할지 정해야 한다.",
    leftChoice: "하나만 고르게 한다",
    rightChoice: "일단 다 섞어본다",
    leftEffects: { deadlineProgress: -7, quality: 5, crew: -1 },
    rightEffects: { deadlineProgress: -2, quality: 2, mental: -3 },
    tags: ["mid", "communication", "risky"]
  }),
  makeCard({
    id: "giriboy-last-minute-doubt",
    artistId: "giriboy",
    text: "거의 끝났는데 기리보이가 '형 근데 이거 너무 이해되면 재미없지 않아요?'라고 한다.",
    context: "막판에 다시 흔들지, 여기서 닫을지 선택해야 한다.",
    leftChoice: "조금 더 비틀어본다",
    rightChoice: "여기서 닫는다",
    leftEffects: { deadlineProgress: -9, quality: 6, mental: -4 },
    rightEffects: { deadlineProgress: 3, quality: -2, mental: 1 },
    tags: ["late", "mood", "risky"]
  }),
  makeCard({
    id: "giriboy-vague-memo",
    artistId: "giriboy",
    text: "수정 메모가 '좀 더... 알지?' 한 줄이다.",
    context: "해석해서 시도할지, 다시 구체화를 요청할지 골라야 한다.",
    leftChoice: "다시 구체화 요청",
    rightChoice: "해석해서 시도",
    leftEffects: { deadlineProgress: -5, quality: 4, mental: -2 },
    rightEffects: { deadlineProgress: 2, quality: -2, crew: 2 },
    tags: ["late", "communication", "stable"]
  }),

  makeCard({
    id: "youngb-noshow",
    artistId: "youngb",
    text: "영비가 또 연락을 안 본다. 녹음실은 이미 켜졌고 엔지니어도 와 있다.",
    context: "기다릴지, 스케줄을 갈아엎을지 선택해야 한다.",
    leftChoice: "일단 기다린다",
    rightChoice: "바로 다음 플랜 간다",
    leftEffects: { deadlineProgress: -8, crew: 4, mental: -4 },
    rightEffects: { deadlineProgress: 2, crew: -5, money: -3 },
    tags: ["early", "schedule", "risky"]
  }),
  makeCard({
    id: "youngb-sleep-pattern",
    artistId: "youngb",
    text: "밤새 작업했다더니 낮에는 완전히 잠수다.",
    context: "밤 작업으로 시간을 다시 옮길지, 그냥 오늘 일정을 포기할지 고른다.",
    leftChoice: "밤 스케줄로 다시 잡는다",
    rightChoice: "오늘은 포기한다",
    leftEffects: { deadlineProgress: -6, mental: -3, crew: 2 },
    rightEffects: { deadlineProgress: 1, quality: -3, money: -2 },
    tags: ["early", "schedule", "stable"]
  }),
  makeCard({
    id: "youngb-last-minute-text",
    artistId: "youngb",
    text: "한참 뒤에 '형 20분 뒤 가능'이라고 온다.",
    context: "지금 흐름을 멈추고 맞춰줄지, 이미 가던 플랜을 유지할지 정해야 한다.",
    leftChoice: "흐름 멈추고 맞춘다",
    rightChoice: "가던 플랜 유지",
    leftEffects: { deadlineProgress: -7, crew: 3, mental: -2 },
    rightEffects: { deadlineProgress: 2, crew: -4, quality: -2 },
    tags: ["mid", "schedule", "risky"]
  }),
  makeCard({
    id: "youngb-voice-condition",
    artistId: "youngb",
    text: "겨우 왔는데 목 상태가 별로라 텐션이 애매하다.",
    context: "오늘이라도 녹음할지, 컨디션 좋은 날 다시 잡을지 결정해야 한다.",
    leftChoice: "오늘이라도 따둔다",
    rightChoice: "좋은 날 다시 잡는다",
    leftEffects: { deadlineProgress: -5, quality: 2, crew: 1 },
    rightEffects: { deadlineProgress: -2, quality: 4, money: -2 },
    tags: ["mid", "recording", "stable"]
  }),
  makeCard({
    id: "youngb-missed-attachment",
    artistId: "youngb",
    text: "보냈다는 파일에는 첨부가 없었다.",
    context: "다시 받을지, 빈 자리를 임시 가이드로 메울지 골라야 한다.",
    leftChoice: "파일 다시 요청",
    rightChoice: "가이드로 임시 메운다",
    leftEffects: { deadlineProgress: -6, mental: -2, quality: 3 },
    rightEffects: { deadlineProgress: 2, quality: -4, crew: -2 },
    tags: ["late", "schedule", "risky"]
  }),
  makeCard({
    id: "youngb-ghost-read",
    artistId: "youngb",
    text: "메시지는 읽었는데 답장이 없다. 더 재촉하면 싸해질 분위기다.",
    context: "한 번 더 밀어붙일지, 조용히 대체 플랜으로 갈지 정해야 한다.",
    leftChoice: "한 번 더 재촉",
    rightChoice: "조용히 대체 플랜",
    leftEffects: { deadlineProgress: -4, crew: -4, mental: -2 },
    rightEffects: { deadlineProgress: 2, quality: -2, money: -2 },
    tags: ["late", "communication", "risky"]
  }),

  makeCard({
    id: "hanyohan-live-take",
    artistId: "hanyohan",
    text: "한요한이 기타를 들더니 지금 라이브로 다시 녹음하면 곡이 산다고 한다.",
    context: "현장 에너지는 미쳤지만, 일정은 더 꼬일 수 있다.",
    leftChoice: "즉흥 편곡 허용",
    rightChoice: "원안대로 진행",
    leftEffects: { deadlineProgress: -7, mental: 3, quality: 5 },
    rightEffects: { deadlineProgress: 3, mental: -2, quality: -1 },
    tags: ["early", "energy", "stable"]
  }),
  makeCard({
    id: "hanyohan-rehearsal",
    artistId: "hanyohan",
    text: "한요한이 본 녹음 전에 한 번만 더 맞춰보자며 다 같이 리허설을 제안한다.",
    context: "조금 느려져도 합을 맞출지, 바로 본 녹음으로 갈지 정해야 한다.",
    leftChoice: "리허설 간다",
    rightChoice: "바로 본 녹음",
    leftEffects: { deadlineProgress: -5, crew: 4, quality: 3 },
    rightEffects: { deadlineProgress: 3, quality: -2, mental: -1 },
    tags: ["early", "crew", "stable"]
  }),
  makeCard({
    id: "hanyohan-loud-idea",
    artistId: "hanyohan",
    text: "갑자기 더 세게, 더 날것으로 가야 한다며 기존 톤을 뒤집자고 한다.",
    context: "확실히 분위기는 살겠지만 재작업이 생길 수 있다.",
    leftChoice: "톤 뒤집는다",
    rightChoice: "기존 결 유지",
    leftEffects: { deadlineProgress: -8, crew: 3, quality: 4 },
    rightEffects: { deadlineProgress: 2, crew: -2, quality: -1 },
    tags: ["mid", "energy", "risky"]
  }),
  makeCard({
    id: "hanyohan-room-vibe",
    artistId: "hanyohan",
    text: "스튜디오 공기가 죽었다며 조명부터 바꾸자고 한다.",
    context: "작업은 잠깐 멈추지만 팀 분위기는 살아날 수도 있다.",
    leftChoice: "분위기부터 살린다",
    rightChoice: "그냥 계속 간다",
    leftEffects: { deadlineProgress: -4, crew: 4, mental: 2 },
    rightEffects: { deadlineProgress: 2, crew: -2, mental: -2 },
    tags: ["mid", "crew", "stable"]
  }),
  makeCard({
    id: "hanyohan-last-push",
    artistId: "hanyohan",
    text: "끝나기 직전 한요한이 마지막 한 테이크만 더 하면 감정선이 선다고 한다.",
    context: "한 번 더 달리면 살아날 수 있지만 시간은 더 빠진다.",
    leftChoice: "한 테이크 더 간다",
    rightChoice: "여기서 닫는다",
    leftEffects: { deadlineProgress: -7, quality: 4, mental: 2 },
    rightEffects: { deadlineProgress: 3, quality: -1, crew: -1 },
    tags: ["late", "energy", "stable"]
  }),
  makeCard({
    id: "hanyohan-chaos-jam",
    artistId: "hanyohan",
    text: "다 같이 잼처럼 풀어보자며 구조를 잠깐 버리자고 한다.",
    context: "분위기는 오르지만 정리하는 데 손이 더 간다.",
    leftChoice: "잼으로 푼다",
    rightChoice: "구조 유지한다",
    leftEffects: { deadlineProgress: -8, crew: 5, quality: 2 },
    rightEffects: { deadlineProgress: 2, crew: -2, quality: 1 },
    tags: ["late", "energy", "risky"]
  }),

  makeCard({
    id: "blacknut-last-file",
    artistId: "blacknut",
    text: "블랙넛 벌스가 아직 안 왔다. 파일은 없는데 본인은 '곧 감'이라고만 한다.",
    context: "기다리면 후반 역전이 가능할 수도 있고, 지금 정리하면 마감은 조금 안전해진다.",
    leftChoice: "일단 믿고 기다린다",
    rightChoice: "없는 셈 치고 진행한다",
    leftEffects: { deadlineProgress: -6, mental: -3 },
    rightEffects: { deadlineProgress: 4, quality: -4, crew: -2 },
    tags: ["early", "queue", "stable"]
  }),
  makeCard({
    id: "blacknut-seen-zone",
    artistId: "blacknut",
    text: "읽씹 상태가 길어지고 있다. 답은 없는데 온라인은 찍힌다.",
    context: "더 밀어붙일지, 다른 파트를 먼저 정리할지 골라야 한다.",
    leftChoice: "더 밀어붙인다",
    rightChoice: "다른 파트 먼저",
    leftEffects: { deadlineProgress: -5, mental: -3, crew: -2 },
    rightEffects: { deadlineProgress: 2, quality: -2, money: -1 },
    tags: ["early", "communication", "risky"]
  }),
  makeCard({
    id: "blacknut-placeholder",
    artistId: "blacknut",
    text: "빈 자리를 놔두자니 불안해서 임시 벌스를 세워둘지 고민된다.",
    context: "임시 구조를 만들면 뒤에 갈아엎을 수도 있다.",
    leftChoice: "임시 벌스 세운다",
    rightChoice: "빈 채로 둔다",
    leftEffects: { deadlineProgress: -4, quality: 2, mental: 1 },
    rightEffects: { deadlineProgress: 1, quality: -2, crew: -1 },
    tags: ["mid", "structure", "stable"]
  }),
  makeCard({
    id: "blacknut-rough-file",
    artistId: "blacknut",
    text: "드디어 왔는데 러프 느낌이 강하다. 살릴지, 손볼지 고민된다.",
    context: "빠르게 살리면 속도는 붙고, 손보면 완성도는 오를 수 있다.",
    leftChoice: "러프 결 그대로 살린다",
    rightChoice: "손봐서 다듬는다",
    leftEffects: { deadlineProgress: 3, quality: -1, mental: 1 },
    rightEffects: { deadlineProgress: -6, quality: 5, mental: -2 },
    tags: ["mid", "delivery", "stable"]
  }),
  makeCard({
    id: "blacknut-adlib-bomb",
    artistId: "blacknut",
    text: "애드립 파일까지 한꺼번에 던져왔다. 전부 쓰면 확실히 세지지만 정리가 어렵다.",
    context: "전부 반영할지, 핵심만 추릴지 정해야 한다.",
    leftChoice: "전부 반영",
    rightChoice: "핵심만 추린다",
    leftEffects: { deadlineProgress: -8, quality: 5, money: 4, mental: -2 },
    rightEffects: { deadlineProgress: -3, quality: 3, crew: 1 },
    tags: ["late", "delivery", "risky"]
  }),
  makeCard({
    id: "blacknut-final-line",
    artistId: "blacknut",
    text: "마감 코앞에 마지막 한 줄만 더 꽂으면 된다고 한다.",
    context: "짧지만 임팩트는 크다. 대신 다시 bounce가 필요하다.",
    leftChoice: "한 줄 더 꽂는다",
    rightChoice: "여기서 끝낸다",
    leftEffects: { deadlineProgress: -6, quality: 5, money: 3 },
    rightEffects: { deadlineProgress: 2, quality: -1, mental: 1 },
    tags: ["late", "delivery", "risky"]
  }),

  makeCard({
    id: "cjamm-mood-first",
    artistId: "cjamm",
    text: "씨잼이 말한다. '이건 맞는 가사여도 무드가 안 맞으면 그냥 아니야.'",
    context: "작품성을 위해 다시 갈아엎을지, 현실적으로 정리할지 골라야 한다.",
    leftChoice: "무드 우선으로 수정",
    rightChoice: "지금 버전으로 묶는다",
    leftEffects: { deadlineProgress: -8, quality: 7, money: -3 },
    rightEffects: { deadlineProgress: 3, quality: -3, mental: 2 },
    tags: ["early", "art", "risky"]
  }),
  makeCard({
    id: "cjamm-word-choice",
    artistId: "cjamm",
    text: "단어 하나가 전체 톤을 망친다며 한 구절을 통째로 다시 쓰자고 한다.",
    context: "시간은 타지만 결과는 더 정교해질 수 있다.",
    leftChoice: "통째로 다시 쓴다",
    rightChoice: "핵심만 손본다",
    leftEffects: { deadlineProgress: -7, quality: 6, mental: -2 },
    rightEffects: { deadlineProgress: -3, quality: 3, money: 1 },
    tags: ["early", "art", "stable"]
  }),
  makeCard({
    id: "cjamm-mix-vibe",
    artistId: "cjamm",
    text: "믹스는 맞는데 공기가 안 맞는다며 리버브 결부터 다시 잡자고 한다.",
    context: "완성도는 뛰지만 시간은 더 든다.",
    leftChoice: "공기감 다시 잡는다",
    rightChoice: "지금 밸런스로 간다",
    leftEffects: { deadlineProgress: -8, quality: 7, money: -2 },
    rightEffects: { deadlineProgress: 3, quality: -2, crew: 1 },
    tags: ["mid", "art", "risky"]
  }),
  makeCard({
    id: "cjamm-silence-space",
    artistId: "cjamm",
    text: "오히려 덜 채워야 멋있다며 비는 공간을 더 만들자고 한다.",
    context: "모험적이지만 잘 되면 확실히 살아난다.",
    leftChoice: "공간을 더 만든다",
    rightChoice: "채워서 안정감 준다",
    leftEffects: { deadlineProgress: -6, quality: 5, mental: 1 },
    rightEffects: { deadlineProgress: 2, quality: -2, crew: 1 },
    tags: ["mid", "art", "stable"]
  }),
  makeCard({
    id: "cjamm-last-polish",
    artistId: "cjamm",
    text: "거의 끝났는데 씨잼이 지금의 텍스처는 아직 덜 익었다고 한다.",
    context: "마감은 위험하지만 완성도는 확실히 오를 수 있다.",
    leftChoice: "더 폴리싱한다",
    rightChoice: "여기서 멈춘다",
    leftEffects: { deadlineProgress: -9, quality: 8, mental: -2 },
    rightEffects: { deadlineProgress: 3, quality: -2, money: 1 },
    tags: ["late", "art", "risky"]
  }),
  makeCard({
    id: "cjamm-theme-shift",
    artistId: "cjamm",
    text: "지금까지 쌓은 방향도 좋지만, 테마를 한 톤 더 어둡게 바꾸자고 한다.",
    context: "분위기는 짙어지지만 다시 정리할 일이 생긴다.",
    leftChoice: "한 톤 어둡게 간다",
    rightChoice: "현재 방향 유지",
    leftEffects: { deadlineProgress: -7, quality: 6, crew: -1 },
    rightEffects: { deadlineProgress: 2, quality: -1, mental: 1 },
    tags: ["late", "art", "risky"]
  }),

  makeCard({
    id: "noel-risk",
    artistId: "noel",
    text: "노엘 파트가 들어가면 화제성은 커지는데, 동시에 회의실 공기도 복잡해진다.",
    context: "버즈를 탈지, 리스크를 피할지 정해야 한다.",
    leftChoice: "화제성 밀어붙인다",
    rightChoice: "안전하게 정리한다",
    leftEffects: { money: 7, crew: -5, mental: -4, quality: 2 },
    rightEffects: { money: -2, mental: 3, crew: 2, deadlineProgress: 2 },
    tags: ["early", "buzz", "risky"]
  }),
  makeCard({
    id: "noel-title-bait",
    artistId: "noel",
    text: "제목부터 세게 가면 화제는 되지만 내부에서 말이 나올 수 있다.",
    context: "세게 밀지, 한 단계 완충할지 선택해야 한다.",
    leftChoice: "세게 간다",
    rightChoice: "한 단계 완충",
    leftEffects: { money: 6, mental: -4, crew: -3 },
    rightEffects: { money: -1, crew: 2, quality: 1 },
    tags: ["early", "buzz", "risky"]
  }),
  makeCard({
    id: "noel-press-angle",
    artistId: "noel",
    text: "보도 포인트를 과하게 잡으면 크게 뜰 수도, 크게 흔들릴 수도 있다.",
    context: "판을 키울지, 음악 중심으로만 갈지 정한다.",
    leftChoice: "판을 키운다",
    rightChoice: "음악 중심으로 간다",
    leftEffects: { money: 8, mental: -5, crew: -2 },
    rightEffects: { money: 1, quality: 2, mental: 1 },
    tags: ["mid", "buzz", "risky"]
  }),
  makeCard({
    id: "noel-comment-storm",
    artistId: "noel",
    text: "커뮤니티 반응이 갈리기 시작했다. 대응을 할지, 그냥 음악으로 넘길지 고민된다.",
    context: "대응하면 피로도가 오르고, 무시하면 여론이 커질 수 있다.",
    leftChoice: "짧게 대응한다",
    rightChoice: "그냥 음악으로 민다",
    leftEffects: { mental: -4, crew: -2, money: 3 },
    rightEffects: { money: 4, mental: -2, quality: 1 },
    tags: ["mid", "risk", "risky"]
  }),
  makeCard({
    id: "noel-last-minute-clip",
    artistId: "noel",
    text: "막판에 짧은 티저만 잘라 올려도 반응이 크게 올 수 있다.",
    context: "효과는 큰데 불도 같이 붙을 수 있다.",
    leftChoice: "티저 바로 올린다",
    rightChoice: "조용히 발매 준비",
    leftEffects: { money: 7, mental: -4, crew: -3, deadlineProgress: -2 },
    rightEffects: { money: 1, quality: 2, deadlineProgress: 1 },
    tags: ["late", "buzz", "risky"]
  }),
  makeCard({
    id: "noel-controversy-buffer",
    artistId: "noel",
    text: "논란 포인트를 조금 눌러두면 반응은 줄지만 피로도도 덜하다.",
    context: "안전하게 갈지, 여전히 끝까지 밀지 정해야 한다.",
    leftChoice: "포인트를 눌러둔다",
    rightChoice: "끝까지 민다",
    leftEffects: { money: -2, mental: 4, crew: 2 },
    rightEffects: { money: 6, mental: -5, crew: -2, quality: 1 },
    tags: ["late", "risk", "stable"]
  }),

  makeCard({
    id: "okasian-group-chat",
    artistId: "okasian",
    text: "오카시 쪽에서 여러 명이 동시에 다른 수정을 보내서 선택지가 세 갈래로 꼬였다.",
    context: "한 번에 정리해달라고 할지, 제일 센 의견 하나만 따라갈지 골라야 한다.",
    leftChoice: "의견 하나로 정리 요청",
    rightChoice: "가장 강한 의견 채택",
    leftEffects: { deadlineProgress: -6, crew: 4, mental: -2 },
    rightEffects: { deadlineProgress: 3, crew: -5, quality: 2 },
    tags: ["early", "queue", "risky"]
  }),
  makeCard({
    id: "okasian-translation-gap",
    artistId: "okasian",
    text: "각자 표현 방식이 달라 같은 말인지 다른 말인지부터 헷갈린다.",
    context: "시간 써서 맞출지, 대충 한쪽 의미로 통일할지 정해야 한다.",
    leftChoice: "의미를 맞춘다",
    rightChoice: "한쪽 의미로 밀어",
    leftEffects: { deadlineProgress: -5, quality: 4, crew: 1 },
    rightEffects: { deadlineProgress: 2, quality: -3, crew: -3 },
    tags: ["early", "communication", "stable"]
  }),
  makeCard({
    id: "okasian-thread-fork",
    artistId: "okasian",
    text: "이야기하다 보니 단톡방이 두 갈래로 갈라져 서로 다른 수정을 말하고 있다.",
    context: "둘 다 들어줄지, 한 갈래만 잡을지 결정해야 한다.",
    leftChoice: "둘 다 듣고 정리",
    rightChoice: "한 갈래만 잡는다",
    leftEffects: { deadlineProgress: -7, crew: 3, mental: -2 },
    rightEffects: { deadlineProgress: 2, crew: -4, quality: 1 },
    tags: ["mid", "queue", "risky"]
  }),
  makeCard({
    id: "okasian-voice-note-rush",
    artistId: "okasian",
    text: "텍스트 대신 보이스노트가 여러 개 쌓였다. 요약이 안 된다.",
    context: "다 듣고 정리할지, 핵심만 물어 다시 받을지 고른다.",
    leftChoice: "다 듣고 정리",
    rightChoice: "핵심만 다시 받는다",
    leftEffects: { deadlineProgress: -6, quality: 4, mental: -2 },
    rightEffects: { deadlineProgress: 1, crew: -2, quality: -1 },
    tags: ["mid", "communication", "stable"]
  }),
  makeCard({
    id: "okasian-late-reversal",
    artistId: "okasian",
    text: "거의 끝났는데 한 멤버가 '애초에 그 방향이 아니었다'고 다시 말한다.",
    context: "지금 뒤집을지, 정리된 방향을 강행할지 정해야 한다.",
    leftChoice: "지금이라도 반영",
    rightChoice: "정리된 방향 강행",
    leftEffects: { deadlineProgress: -8, quality: 5, crew: -2 },
    rightEffects: { deadlineProgress: 2, crew: -5, mental: -2 },
    tags: ["late", "queue", "risky"]
  }),
  makeCard({
    id: "okasian-final-consensus",
    artistId: "okasian",
    text: "드물게 다들 비슷한 말을 한다. 지금이 정리 타이밍일 수 있다.",
    context: "빠르게 합의문처럼 묶을지, 더 디테일을 받을지 고른다.",
    leftChoice: "지금 합의로 묶는다",
    rightChoice: "디테일 더 받는다",
    leftEffects: { deadlineProgress: 3, crew: 3, quality: 1 },
    rightEffects: { deadlineProgress: -5, quality: 4, mental: -1 },
    tags: ["late", "communication", "stable"]
  }),

  makeCard({
    id: "nochang-detail",
    artistId: "nochang",
    text: "그냥노창이 킥 하나만 더 다듬으면 곡의 공기가 바뀐다고 말한다.",
    context: "진짜 좋아질 수도 있고, 또 한 시간 갈 수도 있다.",
    leftChoice: "디테일 더 판다",
    rightChoice: "여기서 마감한다",
    leftEffects: { deadlineProgress: -10, quality: 8, money: -3 },
    rightEffects: { deadlineProgress: 4, quality: -3, mental: 2 },
    tags: ["early", "queue", "risky"]
  }),
  makeCard({
    id: "nochang-snare-layer",
    artistId: "nochang",
    text: "스네어 레이어를 한 겹만 더 얹으면 입체감이 산다고 한다.",
    context: "미세한 차이지만 한번 파기 시작하면 길어진다.",
    leftChoice: "한 겹 더 얹는다",
    rightChoice: "지금 질감 유지",
    leftEffects: { deadlineProgress: -7, quality: 6, money: -2 },
    rightEffects: { deadlineProgress: 2, quality: -2, mental: 1 },
    tags: ["early", "detail", "stable"]
  }),
  makeCard({
    id: "nochang-low-end",
    artistId: "nochang",
    text: "저역이 지금은 듣기 좋은데 큰 스피커에서는 번질 수 있다며 다시 보자고 한다.",
    context: "불안요소를 미리 잡을지, 체감상 괜찮으니 밀어붙일지 고른다.",
    leftChoice: "지금 다시 잡는다",
    rightChoice: "체감상 괜찮으니 간다",
    leftEffects: { deadlineProgress: -8, quality: 7, mental: -1 },
    rightEffects: { deadlineProgress: 2, quality: -3, crew: 1 },
    tags: ["mid", "detail", "risky"]
  }),
  makeCard({
    id: "nochang-ambience-noise",
    artistId: "nochang",
    text: "배경 노이즈를 아주 얇게 깔면 분위기가 훨씬 산다고 한다.",
    context: "좋아질 수 있지만 수정 체감은 팀마다 갈릴 수 있다.",
    leftChoice: "배경 노이즈 깐다",
    rightChoice: "깨끗하게 유지",
    leftEffects: { deadlineProgress: -6, quality: 5, crew: -1 },
    rightEffects: { deadlineProgress: 2, quality: -1, mental: 1 },
    tags: ["mid", "detail", "stable"]
  }),
  makeCard({
    id: "nochang-master-bounce",
    artistId: "nochang",
    text: "거의 끝났는데 바운스를 한 번 더 들어봐야 진짜 판단이 된다고 한다.",
    context: "한 번 더 들으면 좋은데 시간은 또 빠진다.",
    leftChoice: "한 번 더 들어본다",
    rightChoice: "지금 결론 낸다",
    leftEffects: { deadlineProgress: -7, quality: 6, mental: -2 },
    rightEffects: { deadlineProgress: 2, quality: -2, money: 1 },
    tags: ["late", "detail", "risky"]
  }),
  makeCard({
    id: "nochang-last-percent",
    artistId: "nochang",
    text: "마지막 5%만 더 올리면 된다고 하는데, 그 5%가 늘 길다.",
    context: "끝까지 챙길지, 생존 우선으로 닫을지 선택해야 한다.",
    leftChoice: "끝까지 5% 올린다",
    rightChoice: "생존 우선으로 닫는다",
    leftEffects: { deadlineProgress: -9, quality: 8, money: -2 },
    rightEffects: { deadlineProgress: 3, quality: -2, mental: 2 },
    tags: ["late", "queue", "risky"]
  }),

  makeCard({
    id: "justhis-topic-shift",
    artistId: "justhis",
    text: "저스디스가 갑자기 실무 얘기보다 이 프로젝트의 본질부터 다시 정의해야 한다고 한다.",
    context: "논쟁은 길어지지만, 잘 풀리면 방향이 또렷해질 수 있다.",
    leftChoice: "본질부터 다시 붙는다",
    rightChoice: "오늘은 실무만 정리한다",
    leftEffects: { deadlineProgress: -8, quality: 7, mental: -5, crew: -3 },
    rightEffects: { deadlineProgress: 2, quality: -2, mental: 2 },
    tags: ["mid", "debate", "risky"]
  }),
  makeCard({
    id: "justhis-definition-battle",
    artistId: "justhis",
    text: "용어 하나의 정의가 틀리면 다 틀리는 거라며 단어 선택부터 다시 잡자고 한다.",
    context: "정확도는 오르지만 회의실 온도도 함께 오른다.",
    leftChoice: "정의부터 다시 맞춘다",
    rightChoice: "실무 감각으로 밀어간다",
    leftEffects: { deadlineProgress: -7, quality: 6, mental: -4, crew: -2 },
    rightEffects: { deadlineProgress: 3, quality: -3, crew: 1 },
    tags: ["mid", "debate", "risky"]
  }),
  makeCard({
    id: "justhis-standards",
    artistId: "justhis",
    text: "지금 기준으로 만족하면 안 된다며 퀄리티 기준치를 한 단계 올리자고 한다.",
    context: "작품성은 분명 올라가지만 모두가 더 빡빡해진다.",
    leftChoice: "기준 올린다",
    rightChoice: "지금 기준 유지",
    leftEffects: { deadlineProgress: -8, quality: 8, mental: -4, crew: -3 },
    rightEffects: { deadlineProgress: 2, quality: -1, mental: 1 },
    tags: ["late", "debate", "risky"]
  }),
  makeCard({
    id: "justhis-cross-exam",
    artistId: "justhis",
    text: "방금 나온 아이디어의 근거를 하나씩 따지기 시작한다.",
    context: "논리적으로는 맞는 말인데 팀 멘탈은 빠르게 마모된다.",
    leftChoice: "끝까지 검증한다",
    rightChoice: "적당히 선 긋고 간다",
    leftEffects: { deadlineProgress: -6, quality: 5, mental: -5, crew: -2 },
    rightEffects: { deadlineProgress: 2, quality: -2, crew: 1, mental: 1 },
    tags: ["late", "debate", "risky"]
  }),

  makeCard({
    id: "kidmilli-moodboard",
    artistId: "kidmilli",
    text: "키드밀리가 지금 무드가 약하다며 레퍼런스와 비주얼 톤부터 다시 깔자고 한다.",
    context: "분위기는 확실히 올라가지만 돈과 시간이 먼저 타기 시작한다.",
    leftChoice: "무드보드부터 다시 깐다",
    rightChoice: "음악 중심으로 바로 간다",
    leftEffects: { deadlineProgress: -7, quality: 6, money: -6, crew: 2 },
    rightEffects: { deadlineProgress: 2, quality: -2, money: 1 },
    tags: ["mid", "mood", "risky"]
  }),
  makeCard({
    id: "kidmilli-style-pass",
    artistId: "kidmilli",
    text: "스타일링 톤이 지금 음악의 인상을 절반밖에 못 살린다고 한다.",
    context: "비주얼을 손보면 확실히 트렌디해지지만 예산이 먼저 빠진다.",
    leftChoice: "비주얼까지 맞춘다",
    rightChoice: "오디오에만 집중한다",
    leftEffects: { deadlineProgress: -6, quality: 5, money: -7, mental: 1 },
    rightEffects: { deadlineProgress: 2, quality: -1, money: 1 },
    tags: ["mid", "visual", "risky"]
  }),
  makeCard({
    id: "kidmilli-fashion-tune",
    artistId: "kidmilli",
    text: "패션 톤이 곡 분위기와 안 맞는다며 전체 인상을 더 세련되게 바꾸자고 한다.",
    context: "결은 확 올라가지만 시간과 비용이 만만치 않다.",
    leftChoice: "전체 톤 다시 맞춘다",
    rightChoice: "지금 콘셉트로 유지",
    leftEffects: { deadlineProgress: -7, quality: 6, money: -6, crew: 1 },
    rightEffects: { deadlineProgress: 2, quality: -2, mental: 1 },
    tags: ["late", "visual", "risky"]
  }),
  makeCard({
    id: "kidmilli-trendy-polish",
    artistId: "kidmilli",
    text: "지금도 괜찮지만 한 끗 트렌디함이 부족하다며 마지막 폴리싱을 제안한다.",
    context: "무드가 살아나는 대신 통장과 납기가 같이 깎인다.",
    leftChoice: "한 끗 더 올린다",
    rightChoice: "여기서 멈춘다",
    leftEffects: { deadlineProgress: -6, quality: 5, money: -5, mental: 1 },
    rightEffects: { deadlineProgress: 3, quality: -1, money: 1 },
    tags: ["late", "mood", "risky"]
  })
];
