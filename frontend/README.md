# Gooodock 📦 (구독)

**Gooodock**은 넷플릭스, 유튜브, 네이버 멤버십 등 사용자가 정기 결제 중인 다양한 구독 서비스들을 한눈에 쉽게 확인하고 관리할 수 있도록 도와주는 구독 관리 서비스입니다.

## ✨ 주요 기능
- **구독 내역 관리**: 등록된 모든 구독 서비스의 결제일 및 금액을 종합적으로 관리하고 조회할 수 있습니다.
- **결제 알림 기능**: 알림 페이지를 통해 다가오는 구독 서비스의 결제 예정일을 미리 파악하여 뜻밖의 지출을 막을 수 있습니다.
- **사용자 인증**: 로그인 페이지를 통한 회원 인증 기능.

## 🛠 기술 스택
- **프론트엔드 프레임워크**: Next.js (v16.2), React (v19)
- **상태 관리**: Zustand
- **스타일링**: CSS Modules (`globals.css`, `page.module.css`)
- **백엔드/데이터(Mock)**: JSON Server (`src/db.json`)

## 🚀 프로젝트 실행 방법

이 프로젝트를 로컬 환경에서 실행하기 위한 방법입니다. Node.js가 설치되어 있어야 합니다.

### 1. 패키지 설치
이 프로젝트의 의존성 패키지를 설치합니다.
```bash
npm install
```

### 2. Mock 서버 실행
가짜(mock) 데이터베이스(json-server)를 구동합니다. 포트 `4000`번에서 실행됩니다.
```bash
npm run mock
```

### 3. 개발 서버 실행
Next.js 개발 서버를 실행합니다. 새로운 터미널을 열고 다음 명령어를 입력하세요.
```bash
npm run dev
```

서버가 가동되면 브라우저를 열고 `http://localhost:3000`에 접속하여 서비스를 확인하실 수 있습니다.

## 📁 주요 디렉토리 구조
- `src/app/`: 페이지 및 레이아웃을 담당하는 Next.js App 라우팅 구조 (login, subscription, notification 등)
- `src/app/components/`: 재사용 가능한 UI 컴포넌트 폴더
- `src/app/api/`: API 경로 관련 폴더
- `src/db.json`: JSON Server 구동을 위한 모의 데이터(subscriptions 및 notification 정보) 파일
