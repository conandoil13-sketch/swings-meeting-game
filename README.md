# swings-meeting-game

모바일 우선 세로형 카드 선택 웹게임 프로토타입입니다.

## 실행 방법

```bash
npm install
npm run dev
```

기본 개발 서버는 `http://localhost:5173` 입니다.

## 빌드 방법

```bash
npm run build
```

빌드 결과물은 `dist/`에 생성됩니다.

## GitHub Pages 배포 방법

이 프로젝트는 `vite.config.ts`에서 다음 순서로 base 경로를 결정합니다.

- `VITE_BASE_PATH`가 있으면 그 값을 사용
- 없으면 GitHub Actions의 `GITHUB_REPOSITORY`에서 실제 리포지토리 이름을 읽어 `/<repo>/` 형태로 자동 설정
- 둘 다 없으면 `/`

루트 도메인이나 사용자 페이지처럼 `/`에 배포할 경우:

```bash
npm run build
```

리포지토리 페이지처럼 `https://<user>.github.io/<repo>/` 형태로 배포할 경우:

```bash
VITE_BASE_PATH="/<repo>/" npm run build
```

예시:

```bash
VITE_BASE_PATH="/swings-meeting-game/" npm run build
```

현재 원격 저장소 주소는 `https://github.com/conandoil13-sketch/swings-meeting-game` 이므로, GitHub Pages 배포 경로는 기본적으로 `/swings-meeting-game/`가 됩니다.

GitHub Actions 배포에서는 리포지토리 이름을 자동으로 읽기 때문에, 워크플로우에서 별도로 base 경로를 하드코딩하지 않아도 됩니다.

생성된 `dist/`를 GitHub Pages에 업로드하거나, GitHub Actions / `gh-pages` 브랜치 배포에 사용하면 됩니다.

## 이미지 교체 방법

### 아티스트 초상화

- 위치: `public/assets/portraits/photo/`
- 현재는 `.webp` 기준으로 연결되어 있습니다.
- 파일명이 데이터 id와 조금 달라도, `src/utils/image.ts`의 `PORTRAIT_FILE_MAP`에서 매핑할 수 있습니다.
- 이미지가 없으면 자동으로 플레이스홀더가 표시됩니다.

지원되는 주요 파일 예시:

- `giriboy.webp`
- `youngb.webp`
- `hanyohan.webp`
- `blacknut.webp`
- `cjamm.webp`
- `noel.webp`
- `okashi.webp` (`okasian` id와 매핑됨)
- `nochang.webp`
- `justhis.webp`
- `kidmilli.webp`

### 스윙스 얼굴 이미지

- 위치: `public/assets/swings_face/`
- 타이틀: `swings_normal.webp`
- 결과 화면 성공/실패용: `swings_sucess.png`, `swings_fail.png`

## `portraitMode` 교체 방법

현재는 `src/data/config.ts`의 `portraitMode` 값을 사용합니다.

```ts
portraitMode: "photo"
```

지금은 캐리커쳐를 따로 사용하지 않아도 동작하도록 정리되어 있고, `caricature`로 바꿔도 내부적으로 `photo` 경로를 fallback으로 보도록 되어 있습니다. 나중에 캐리커쳐 파일을 실제로 쓸 경우 `src/utils/image.ts`에서 경로 정책만 바꾸면 됩니다.

## 카드 데이터 추가 방법

카드는 `src/data/cards.ts`에 있습니다.

각 카드 구조:

```ts
{
  id: "unique-card-id",
  artistId: "giriboy",
  text: "카드 본문",
  context: "상황 설명",
  leftChoice: "왼쪽 선택지",
  rightChoice: "오른쪽 선택지",
  leftEffects: { deadlineProgress: -6, quality: 5 },
  rightEffects: { money: 3, mental: -2 },
  tags: ["mid", "risky"]
}
```

권장 태그:

- 등장 시점: `early`, `mid`, `late`
- 성향: `stable`, `risky`
- 특수 큐/패턴 관련: `queue`, `mood`, `art`, `buzz`, `detail`, `debate`, `visual`

덱 구성은 `src/engine/cardResolver.ts`와 `src/engine/difficultyCurve.ts`에서 처리합니다.

## 배포 전 점검 포인트

- `npm run build`가 통과해야 합니다.
- 정적 에셋 경로는 `src/utils/asset.ts`의 `getAssetUrl()`을 사용하도록 정리되어 있습니다.
- 새 이미지나 오디오를 추가할 때도 가능하면 절대 경로 문자열 대신 `getAssetUrl()` 경유를 권장합니다.

## 현재 포함된 범위

- Vite + React + TypeScript
- 타이틀 / 게임 / 결과 화면
- 실시간 납기 감소 및 경고 연출
- 카드 선택, 스와이프, 방향키 입력
- 아티스트 특수 규칙
- 결과 저장(localStorage)
- GitHub Pages 대응 정적 경로 처리
