# 다시하는 돌잡이 — 배달의민족 인터랙티브 이벤트

PRD 기반 웹뷰 팝업 콘텐츠 구현입니다. 사용자가 돌상 위 5가지 음식 중 하나를 고르면 올해 운세를 받고, 미혼 한부모가정 캠페인 방명록 참여 후 쿠폰을 발급받습니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 을 엽니다.

## 화면 구성 (PRD Screen Flow)

| Screen | 경로 | 설명 |
|--------|------|------|
| SCR-01 | `/` | 스플래시 · 500ms 후 자동 전환 |
| SCR-02 | `/select` | 돌상 메인 · 5종 음식 선택 |
| SCR-03 | `/result/:foodId` | 운세 결과 · 캠페인 메시지 |
| SCR-04 | `/guestbook` | 방명록 · 쿠폰 발급 트리거 |
| SCR-05 | `/coupon` | 쿠폰 코드 · 공유 · 주문 CTA |

## 구현된 PRD 요건

- 5종 음식(잔치국수, 치킨, 샐러드, 비빔밥, 피자) 및 키워드·카피
- Float / slide-up / scale 선택 / fade-in-up / confetti 애니메이션
- 다시 뽑기 1회, 재방문 시 이전 결과 유지
- 방명록 10~100자, 닉네임 선택, 중복 참여 방지
- 쿠폰 1인 1회 발급 (localStorage mock API)
- 카카오·인스타·링크 공유 (Web Share API / 클립보드)
- Firebase Analytics 대신 개발 콘솔 로깅

개발 모드 우하단 **초기화** 버튼으로 참여 상태를 리셋할 수 있습니다.

## 기술 스택

- React 18 + TypeScript + Vite
- React Router 6
- canvas-confetti

## 프로덕션 연동 시

`src/api/mockApi.ts`를 실제 배민 API (`/event/doljanchi/*`)로 교체하고 Bearer 토큰을 주입하면 됩니다.
