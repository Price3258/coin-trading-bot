# 트레이딩 봇

## 프로젝트 개요

해당 프로젝트는 개인용으로, 업비트 API를 활용하여 개인 평균에 따라 매도-매수를 하는 시스템을 만들어보기 위함입니다. 또 Next.js를 공부하기 위함입니다.
playwright, msw 를 이용해 e2e 를 구축했습니다.
turbo repo를 이용해 하나의 프로젝트 안에서 관리할 수 있도록 했습니다.

## 🛠️ 기술 스택

- **Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS

  - **DB/State**: React Query, Zustand
  - **Test**: playwright, msw

- **Backend**: Express.js, Node.js
  - **API**: Upbit Open API (시세/주문)

---

### 주요 디렉토리

- **apps/backend**: 백엔드 애플리케이션 코드가 포함되어 있습니다. API 서버와 관련된 로직이 이곳에 위치합니다.
- **apps/frontend**: 프론트엔드 애플리케이션 코드가 포함되어 있습니다. 사용자 인터페이스와 관련된 로직이 이곳에 위치합니다.
- **packages/eslint-config**: 프로젝트 전반에서 사용되는 ESLint 설정이 포함되어 있습니다.
- **packages/typescript-config**: TypeScript 설정이 포함되어 있습니다.
- **packages/ui**: 재사용 가능한 UI 컴포넌트가 포함되어 있습니다.

## 설치 및 실행

### 1. 의존성 설치

프로젝트 루트에서 다음 명령어를 실행하여 의존성을 설치합니다:

```bash
npm install
```

### 2. 실행

하나의 터미널에서

```bash
npm run dev
```

혹은 2개의 터미널에서

```
cd apps/frontend
npm run dev
```

```
cd apps/backend
npm run dev
```

## 📅 진행 상황 요약

- [x] 실시간 시세 조회 구현
- [x] 수동 주문 기능
- [x] 자동 전략 설정
- [x] 주문 내역 페이지
- [x] 인터셉트 라우트 기반 모달 구현
- [x] 코인 검색 기능
- [ ] 코인 모으기 기능
- [ ] 사용자가 매매 기준(이익 실현 %, 손실 매수 %)을 직접 설정할 수 있도록 반영
- [ ] WebSocket 을 활용하여 실시간 가격 변동 감지하도록 수정

---

## 📌 참고

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Upbit Open API](https://docs.upbit.com/)
