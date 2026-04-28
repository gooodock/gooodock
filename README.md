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

## 🖥️ 사용 기술 설명
- login : Gooodock 서비스의 로그인 / 로그아웃을 담당
1. 서비스를 기동하면, Gooodock 로그인 버튼이 표출되며 페이지 이전
> 사용 기술 router.push
2. 로그인 창에서 아이디와 패스워드를 입력할 수 있음(* 추후 db table생성 시, 아이디 매칭 기능 추가)
3. 로그인 아이디에 정규표현식 추가
> 아이디는 이메일 @ 형식에 따라야 하고 , 비밀번호는 영문, 숫자, 특수문자 조합 8자 이상 형식을 따라야 함
4. 로그인 버튼을 누르면 현재 구독하고 있는 정보 시스템으로 이전
> 사용 기술 router.push
5. 메인으로 버튼을 누르면 Gooodock 첫 페이지로 이전
> 사용 기술 router.push

- subscription: Gooodock 서비스의 구독 정보 표시를 담당
1. 페이지 진입 시 useEffect 내부에서 subscriptionApi.getAll()을 호출해 서버에 등록된 전체 구독 목록을 불러옴
2. 받아온 응답을 Array.isArray(data) ? data : [] 형태로 방어 처리 후, Zustand store의 setSubscriptions를 통해 전역 상태로 일괄 세팅
> 사용 기술 Zustand (useSubscriptionStore)
3. 입력 폼은 서비스명(type), 가격(price), 결제일(date) 3개 필드를 useState 기반의 로컬 상태(form)로 관리하며, 공통 handleChange로 name 속성에 따라 필드를 동적으로 갱신
4. 추가 버튼을 누르면 빈 값 검증 후, 기존 subscriptions에서 Math.max로 다음 id를 계산하여 subscriptionApi.add()로 서버에 POST 요청을 보내고, 응답으로 받은 항목을 store의 addSubscription 액션을 통해 상태에 반영 
> 사용 기술 fetch (POST) + Zustand action
5. 삭제 버튼을 누르면 confirm으로 사용자 확인 후, subscriptionApi.remove(id)로 DELETE 요청을 보내고, 성공 시 store의 removeSubscription 액션으로 해당 id 항목을 상태에서 제거
> 사용 기술 fetch (DELETE) + Zustand action
6. 총 결제 금액은 store 내부의 getTotalPrice selector로 계산되며, subscriptions 배열을 reduce로 순회하면서 Number(price)로 형변환 후 누적 합산 
> 사용 기술 Zustand selector (파생 상태)
7. 로딩 상태는 loading 로컬 state로 관리하여 데이터 패칭이 끝나기 전에는 "로딩 중..." UI를 노출하고, 완료 후 테이블을 렌더링

- notification : 현재 결제 예정인 알림창을 띄워줌
1. 시스템의 결제 예정일 불러와 알림 표시
> 사용기술 await JsonAPI(get)
2. 일시적으로 로딩 시 TanStack Query을 도입하여 로딩창을 표출함
> 사용기술 Promise setTimeout
3. 읽음 / 안 읽음 버튼으로 알림을 제어 가능
> 사용기술 await JsonAPI(patch)
4. 헤더 로그아웃
5. 헤더 구독정보를 누르면 구독정보로 이전
> 사용기술 useRouter


## 추후 백엔드 연결 시 개선 계획
- login
1. 로그인과 인증 상태는 다양한 컴포넌트에서 접근해야 하므로 useAuthStore를 만들어 Zustand를 통해 상태를 일관된 흐름으로 관리할 수 있게 리팩토링 예정
2. 현재는 프론트 중심의 설계로 향후 백엔드 연결이 되면 유저 데이터 패칭 시 TanStack Query를 도입
3. 실질적인 유저 검증 엔드포인트에 아이디와 패스워드를 던져 결과를 받는 Fetch층을 추가할 예정
4. 실패/에러 처리도 현재는 단순 값 누락 및 정규식 불일치만 alert를 띄우는 형식이지만 백엔드를 연동하면 응답 코드에 맞춰 유저에게 더 구체적인 에러 메세지를 노출하는 예외 처리를 할 수 있도록 수정

- notification
1. 현재는 모든 알림 리스트를 한 번에 가져오지만 앱의 규모가 커지면 알림 내역 역시 많아지므로 TanStack Query의 useInfiniteQuery등으로 API Fetcher를 수정 예정
2. 마운트될 때 1회성으로 불러오지만 실시간 알림을 유지하기 위해선 SSE나 Socket.io를 연동하는 통신 층을 추가하거나 프로트에서 일정한 주기로 Refetching 해주는 로직 추가 예정
3. Array.isArray(data) ? data : data.notification 형태의 임시 파싱 로직을 삭제하고 Response Format(DTO) 기준으로 파싱 규칙을 교체

- subscription
1. zustand 설계는 잘 되어있지만 비동기 API통신 코드가 컴포턴트 내부의 핸들러에 남아있어 책임을 더 세분화 할 수 있게 개선
2. 조회는 useQuery로 데이터 캐싱 처리, 구독 목록을 추가, 삭제하는 Mutation 성공 이후 캐싱 된 queryKey['subscriptions']를 무효화 시켜 서버의 최신본으로 백그라운드 리패칭을 자동화 
3. 프론트엔드가 임의로 id를 계산하지 않고 온전히 백엔드의 반환 값을 받아 Store에 적재하도록 변경 
