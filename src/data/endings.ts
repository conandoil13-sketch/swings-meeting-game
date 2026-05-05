import { Ending } from "../types/ending";

export const endings: Record<Ending["id"], Ending> = {
  "miracle-on-time": {
    id: "miracle-on-time",
    title: "기적의 정시 발매",
    summary: "납기를 지키고 결과물도 살렸다. 다들 지쳤지만 오늘만큼은 전설처럼 남는다."
  },
  "master-delivered": {
    id: "master-delivered",
    title: "명반 납품 완료",
    summary: "시간도 맞췄고 결과물도 세다. 완벽하진 않아도 모두가 납득하는 좋은 끝이다."
  },
  "released-anyway": {
    id: "released-anyway",
    title: "어쨌든 발매",
    summary: "완벽하진 않아도 마감선은 넘겼다. 찝찝함과 안도가 동시에 남는다."
  },
  "viral-but-hollow": {
    id: "viral-but-hollow",
    title: "바이럴은 탔는데 공허함",
    summary: "숫자와 화제성은 따라왔지만 작업실 안에서는 뭔가 덜 남은 기분이다."
  },
  "meeting-forever": {
    id: "meeting-forever",
    title: "회의만 하다 끝남",
    summary: "말은 많았고 결정은 늦었다. 파일보다 회의록이 더 두꺼워졌다."
  },
  "almost-classic": {
    id: "almost-classic",
    title: "거의 명반",
    summary: "조금만 더 있었으면 전설이었을지도 모른다. 아쉬움이 큰 만큼 손맛도 남는다."
  },
  "ceo-walkout": {
    id: "ceo-walkout",
    title: "대표 퇴장",
    summary: "프로젝트보다 대표 멘탈이 먼저 바닥났다. 마지막 결정은 침묵이었다."
  },
  "go-separate-ways": {
    id: "go-separate-ways",
    title: "각자의 길",
    summary: "작업은 끝나기도 전에 팀의 온도가 끝났다. 다들 다른 방향을 보기 시작한다."
  },
  "settlement-bankrupt": {
    id: "settlement-bankrupt",
    title: "정산 파산",
    summary: "프로젝트는 이어졌지만 통장은 버티지 못했다. 정산표를 열자 모두가 조용해진다."
  },
  "quality-evaporated": {
    id: "quality-evaporated",
    title: "껍데기만 발매",
    summary: "납기는 맞췄지만 완성도가 증발했다. 발매는 됐고 표정은 다들 애매하다."
  },
  "barely-held": {
    id: "barely-held",
    title: "간신히 붙잡음",
    summary: "무너지기 직전까지 갔지만 어찌저찌 끌고 왔다. 영광보단 생존에 가까운 승리다."
  },
  "burned-for-art": {
    id: "burned-for-art",
    title: "예술은 남고 모두가 탐",
    summary: "완성도는 끝내 챙겼지만 그 대가가 컸다. 작품은 남았고 사람들은 조금 탔다."
  },
  "silent-release": {
    id: "silent-release",
    title: "조용한 발매",
    summary: "큰 사고도 큰 환호도 없이 조용히 나갔다. 무난하지만 오래 생각나는 종류는 아니다."
  }
};
