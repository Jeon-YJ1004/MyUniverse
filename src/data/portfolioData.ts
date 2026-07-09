export type Filter = 'all' | 'web' | 'app' | 'game';

export interface ProjectDetail {
  problem: { label: string; text: string }[];
  techs: { name: string; reason: string }[];
  trial: string;
  results: { num: string; desc: string }[];
}

export interface Project {
  id: string;
  name: string[];
  category: string;
  sub: string;
  tags: string[];
  color: string;
  textColor: string;
  date: string;
  cardDate: string;
  filter: Filter;
  wide?: boolean;
  award?: string;
  github: string;
  detail: ProjectDetail;
}

export interface WorkItem {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  result: string;
  detail: {
    problem: string;
    solution: string;
    trial: string;
  };
}

export interface EducationItem {
  title: string;
  desc: string;
  period: string;
  color: string;
}

export interface TechItem {
  name: string;
  level: string;
  reason: string;
  tags: string[];
  color: string;
  iconText: string;
  iconBg: string;
  iconColor: string;
  iconFontSize?: string;
}

// ── PROJECTS ──

export const PROJECTS: Project[] = [
  {
    id: 'saveme',
    name: ['SaveMe', 'RescU'],
    category: 'SSAFY 11기 공통프로젝트',
    sub: '119 신고 화상통화 서비스',
    tags: ['React', 'WebRTC', 'OpenVidu', 'Spring Boot'],
    color: '#1a2a3a',
    textColor: '#c8dde8',
    date: '2024.07~2024.08',
    cardDate: '2024.07',
    filter: 'web',
    award: '우수상 수상',
    github: 'https://github.com/common11-B305/SaveMe_RescU',
    detail: {
      problem: [
        { label: '문제 상황', text: '기존 신고 시스템은 음성 중심이라 시각적 정보 전달이 어렵고, 긴급 상황에서 의료 정보 전달이 지연되는 한계가 있었습니다.' },
        { label: '기획 의도', text: '실시간 화상 신고와 의료 정보 자동 전달로 구조 효율성을 높이고, NFC 태깅을 통해 주변인이 빠르게 대리 신고할 수 있는 기능을 기획했습니다.' },
      ],
      techs: [
        { name: 'React & Zustand', reason: '단계별 폼 입력과 같은 복잡한 클라이언트 상태를 Zustand로 전역 관리하여 UI 일관성을 유지했습니다.' },
        { name: 'WebRTC (OpenVidu)', reason: '119 상황실과 신고자 간의 지연 없는 실시간 영상 소통과 채팅 신고를 구현하기 위해 도입했습니다.' },
        { name: 'Axios Interceptor', reason: 'JWT 토큰 갱신 오류를 방지하고 자동 갱신 로직을 처리하여 안정적인 사용자 세션을 유지했습니다.' },
      ],
      trial: 'API 호출 실패 상황에 대비해 Axios retry 로직을 적용하고 반복 실패 시 일반 전화로 안내하도록 예외를 처리했습니다. 또한 방대한 의약품 데이터 자동완성 검색 기능에 Debounce 기법을 얹어 API 호출을 60~75% 절감하는 성능 최적화를 이루어냈습니다.',
      results: [
        { num: '60~75% ↓', desc: '의약품 검색 API 호출 절감' },
        { num: '우수상', desc: 'SSAFY 공통프로젝트' },
        { num: '입상', desc: 'SSAFY UCC 경진대회' },
      ],
    },
  },
  {
    id: 'rungogh',
    name: ['Vincent', 'Run Gogh'],
    category: 'SSAFY 11기 특화프로젝트',
    sub: 'GPS 아트 러닝 서비스',
    tags: ['Svelte', 'TypeScript', 'Leaflet.js', 'TailwindCSS'],
    color: '#1a2b1a',
    textColor: '#b0ccb0',
    date: '2024.08~2024.10',
    cardDate: '2024.08',
    filter: 'web',
    github: 'https://github.com/VincentRunGogh/VincentRunGogh',
    detail: {
      problem: [
        { label: '문제 상황', text: 'GPS 신호 불안정으로 인해 렌더링되는 경로 데이터가 튀는 문제가 잦았고, 지도 캡처 시 비동기 로딩 누락이 발생했습니다.' },
        { label: '기획 의도', text: '러닝 경로를 예술적으로 기록(GPS 아트)하고, 이를 FullCalendar 기반의 개인 기록과 커뮤니티 공유로 확장하는 피트니스 서비스입니다.' },
      ],
      techs: [
        { name: 'Svelte', reason: '가볍고 반응성이 뛰어난 런타임 성능을 바탕으로 복잡한 리액티브 상태를 제어하며 프론트엔드 코드량을 30% 감소시켰습니다.' },
        { name: 'TypeScript', reason: 'JS에서 TS로 마이그레이션을 진행하여 방대한 GPS 데이터 타입과 객체 안정성을 대폭 향상시켰습니다.' },
        { name: 'Leaflet.js', reason: '실시간 사용자의 이동 위치를 SVG 경로로 정밀하게 추적하고 시각화하는 맵 엔진으로 사용했습니다.' },
      ],
      trial: 'GPS 데이터 튐 현상을 해결하기 위해 속도 기반 필터링과 좌표 보정 로직을 직접 설계해 깔끔한 경로 드로잉을 이끌어냈습니다. 또한, 운동 완료 후 지도 이미지 캡처 누락 문제를 렌더링 비동기 대기 로직과 타임아웃 처리를 추가하여 완벽하게 방어했습니다.',
      results: [
        { num: '30% 감소', desc: 'Svelte 도입 후 코드량' },
        { num: 'TS 전환', desc: '타입 안정성 향상' },
        { num: '오차 보정', desc: '속도 기반 좌표 필터링 설계' },
      ],
    },
  },
  {
    id: 'byulee',
    name: ['별이삼샵'],
    category: 'SSAFY 11기 자율프로젝트',
    sub: '위치 기반 쪽지 서비스',
    tags: ['Flutter', 'Firebase', 'Kakao Map', 'GA4'],
    color: '#1e1628',
    textColor: '#c8b8d8',
    date: '2024.10~2024.11',
    cardDate: '2024.10',
    filter: 'app',
    github: 'https://github.com/givemagalaxy/star23sharp',
    detail: {
      problem: [
        { label: '문제 상황', text: '앱 환경에서 API 호출 실패 시 앱이 멈추거나, 데이터 직렬화 문제로 메시지 전송이 불안정해지는 크리티컬한 이슈가 있었습니다.' },
        { label: '기획 의도', text: '특정 랜드마크에 가야만 열어볼 수 있는 위치 기반 쪽지(보물 쪽지)를 통해 재미와 소통을 결합한 감성 메신저 서비스입니다.' },
      ],
      techs: [
        { name: 'Flutter & Provider', reason: '단일 코드베이스로 모바일 네이티브 환경(Kakao Map, 권한)을 제어하고, Provider 패턴으로 앱 전역 상태를 관리했습니다.' },
        { name: 'Firebase (FCM)', reason: '쪽지가 수신되거나 주변 위치에 도달했을 때 실시간으로 백그라운드 푸시 알림을 전달하기 위해 사용했습니다.' },
        { name: 'Dio', reason: 'API 통신 과정에서 직렬화와 인터셉터를 다루며 통신 타임아웃 문제를 해결하는 핵심 HTTP 클라이언트로 활용했습니다.' },
      ],
      trial: 'API 호출 타임아웃 문제를 겪고 이미지 용량을 압축해보았으나 문제가 지속되었습니다. 원인 분석 결과 Dio 직렬화 로직의 문제임을 파악하고 이를 수정하여 전송을 안정화했습니다. 런칭 후에는 닉북 기반 친구 자동완성 기능을 추가하여 사용자 입력 불편을 개선했습니다.',
      results: [
        { num: '189명', desc: '1차 배포 활성 사용자' },
        { num: '25개', desc: 'GA4/피드백 기반 기능 개선' },
        { num: '안정화', desc: '에러 핸들링/직렬화 최적화' },
      ],
    },
  },
  {
    id: 'solar',
    name: ['3D Solar', 'System'],
    category: '서울과기대 졸업작품',
    sub: '인터랙티브 3D 태양계 시뮬레이션',
    tags: ['React', 'Three.js', 'React-Three-Fiber'],
    color: '#0a0a16',
    textColor: '#c8c0e0',
    date: '2022.03~2022.04',
    cardDate: '2022.03',
    filter: 'web',
    github: 'https://github.com/jeon-yj1004/Capstone-Design2',
    detail: {
      problem: [
        { label: '기획 의도', text: '평면적인 교과서 이미지로는 체감하기 어려운 태양계 천체들의 실제 크기 비율과 자전/공전 속도를 3D 공간에서 인터랙티브하게 체험할 수 있는 웹 기반 시뮬레이터입니다.' },
        { label: '핵심 목표', text: 'NASA의 실제 천체 수치 데이터를 기반으로 물리적 정확도를 높이고, 브라우저 상에서 부드러운 3D 렌더링 성능을 달성하는 것이 핵심 과제였습니다.' },
      ],
      techs: [
        { name: 'React-Three-Fiber', reason: '기존의 복잡한 Three.js 코드를 React의 선언적 컴포넌트 구조로 캡슐화하여 3D 씬과 UI 상태 연동을 유기적으로 관리했습니다.' },
        { name: 'Three.js (WebGL)', reason: '고해상도 텍스처를 매핑하고 조명(PointLight) 및 재질(Material)을 다루어 사실적인 질감의 우주 공간을 브라우저에 렌더링했습니다.' },
        { name: 'NASA 데이터', reason: '실제 천체들의 반지름, 자전축 기울기, 궤도 주기 등의 정확한 물리 변수를 시뮬레이션 알고리즘에 반영했습니다.' },
      ],
      trial: '1인 전담 개발 프로젝트로서, 고해상도 이미지(Texture)들을 로드할 때 발생하는 렌더링 병목 현상을 관리하고, React 컴포넌트 생명주기와 Three.js의 매 프레임 업데이트(useFrame) 사이클을 동기화하는 귀중한 최적화 경험을 얻었습니다.',
      results: [
        { num: 'NASA Data', desc: '실제 천체 물리 수치 적용' },
        { num: 'WebGL', desc: '브라우저 3D 렌더링' },
        { num: '1인', desc: '졸업 개인 프로젝트' },
      ],
    },
  },
  {
    id: 'human',
    name: ['Human', 'Survival'],
    category: '서울과기대 게임동아리 TCP',
    sub: '로그라이트 생존 게임',
    tags: ['Unity', 'C#', 'Game Design'],
    color: '#160a08',
    textColor: '#d8c870',
    date: '2022.12~2023.08',
    cardDate: '2022.12',
    filter: 'game',
    wide: true,
    github: 'https://github.com/SeoulTechTCPGame/HumanSurvival?tab=readme-ov-file',
    detail: {
      problem: [
        { label: '프로젝트 개요', text: '7명 규모의 대학교 게임 개발 동아리 팀에서 협업하여 제작한 뱀파이어 서바이벌 장르의 탑다운 로그라이트 액션 생존 게임입니다.' },
        { label: '개발 역할', text: 'Unity 엔진 환경에서 C#을 활용해 몬스터의 스폰 및 추적 로직, 플레이어의 조작 및 데미지 연산, 아이템 상호작용 등 주요 인게임 시스템 구현을 담당했습니다.' },
      ],
      techs: [
        { name: 'Unity Engine', reason: '게임 내 물리 엔진, 충돌 판정, 애니메이션 제어 등 로그라이트 생존 액션 구현을 위한 종합적인 툴셋으로 활용했습니다.' },
        { name: 'C# (OOP)', reason: '다양한 형태의 몬스터와 무기 로직을 모듈화하기 위해 객체지향 원칙과 다형성(Interface)을 적용하여 유지보수성을 높였습니다.' },
        { name: '데이터 분리', reason: '기획 담당 팀원이 직접 유니티 인스펙터를 통해 몬스터 스탯과 난이도를 밸런싱할 수 있도록 코드와 데이터를 분리하는 데 집중했습니다.' },
      ],
      trial: '끊임없이 다수의 적이 생성되고 파괴되는 로그라이트 장르의 특성상 게임 루프 성능 최적화가 필수적이었습니다. 다양한 클래스 간의 의존성을 분리하고 객체의 라이프사이클을 제어하는 구조 설계를 통해 협업 프로젝트에서의 C# 아키텍처 능력을 크게 향상시켰습니다.',
      results: [
        { num: 'Unity C#', desc: '객체지향 로직 구현' },
        { num: '협업 구조', desc: '기획-개발 밸런싱 분리' },
        { num: '7인', desc: '장기 팀 개발 완주' },
      ],
    },
  },
];

// ── EXPERIENCE ──

export const WORK_ITEMS: WorkItem[] = [
  {
    num: '01',
    title: '구인구직 피처 설계 & 개발',
    desc: '네이버 밴드 크롤링 기반 구인구직 데이터를 수집해 자체 서비스로 구축. 지역·직종 필터와 알림 구조까지 설계했다. 기획 → 설계 → 배포까지 프론트엔드 전 과정을 담당했다.',
    tags: ['React', 'TypeScript', 'Python', 'FCM'],
    result: 'MAU 32배 ↑',
    detail: {
      problem: '기존 밴드 게시글은 검색·필터가 없어 원하는 구인 정보를 찾기 어려웠다. 데이터가 흩어져 있어 집계 자체가 불가능한 상태였다.',
      solution: 'Python 크롤러로 데이터 수집 후 지역/직종/급여 기준 필터 UI 설계. 새 공고 등록 시 FCM 알림 트리거 구조도 함께 구현했다.',
      trial: '서비스 오픈 3개월 내 MAU 149 → 4,786. 활성 유저 32배 성장. 구인구직이 서비스 내 가장 많이 사용되는 피처가 됐다.',
    },
  },
  {
    num: '02',
    title: 'GPS + 얼굴인식 출석 인증 시스템',
    desc: '현장 근무자의 출퇴근 인증을 GPS 위치 + AWS Rekognition 얼굴 인식 이중 검증으로 구현. 기존 수기 출석 방식을 대체하는 프론트엔드 전체를 담당했다.',
    tags: ['React', 'AWS Rekognition', 'Kakao Map API'],
    result: '이중 인증 구현',
    detail: {
      problem: 'GPS 단독 인증은 신호 오차로 현장 밖에서도 인증되는 문제가 있었다. 정확도를 높이면서도 인증 UX가 번거롭지 않아야 했다.',
      solution: 'GPS 반경 검증 + 카메라 촬영 → AWS Rekognition 비교 순서로 이중 검증. Kakao Map API의 좌표 보정 로직을 적용했다.',
      trial: '초기에는 GPS 오차을 단순 반경 확대로 해결하려 했는데 그러면 인증 의미가 없어졌다. Rekognition 신뢰도 임계값 튜닝에 시간이 가장 많이 걸렸다.',
    },
  },
  {
    num: '03',
    title: '디자인시스템 npm 패키지 배포',
    desc: '서비스 전반에서 반복되는 컴포넌트를 추출해 npm 패키지로 배포. 디자이너와 협업해 토큰 기반 색상/타이포 시스템을 정의하고 Storybook으로 문서화했다.',
    tags: ['React', 'Rollup', 'Storybook', 'npm'],
    result: 'npm 배포 완료',
    detail: {
      problem: 'Button, Input, Modal 등 동일한 컴포넌트가 여러 페이지에 각각 다르게 구현돼 있어 수정 시 모든 파일을 찾아야 했다.',
      solution: 'Rollup으로 tree-shakeable 번들 구성. CSS Variables 기반 시각 토큰 설계. Storybook으로 컴포넌트 문서 자동화.',
      trial: '공통 컴포넌트 수정 시 배포 한 번으로 전체 서비스에 반영. 신규 페이지 개발 속도가 체감상 크게 단축됐다.',
    },
  },
];

// ── EDUCATION ──

export const EDUCATION_LIST: EducationItem[] = [
  {
    title: '서울과학기술대학교 컴퓨터공학과 졸업',
    desc: '게임동아리 TCP 활동 · 졸업작품: 3D 태양계 시뮬레이션 (Three.js)',
    period: '2018.03 — 2022.08',
    color: '#6ade8a',
  },
  {
    title: '정보처리기사 자격증 취득',
    desc: '한국산업인력공단 (Q-Net) 발행 · 컴퓨터 시스템 및 소프트웨어 전공 기본 소양 검증',
    period: '2022.11',
    color: '#f0a830',
  },
  {
    title: 'SSAFY 11기 공통프로젝트 우수상',
    desc: 'SaveMe & RescU — 119 신고 WebRTC 화상통화 서비스 · 팀 1위 선정',
    period: '2024.08',
    color: '#c080f0',
  },
  {
    title: '삼성 청년 SW 아카데미 (SSAFY) 11기 수료',
    desc: '서울 캠퍼스 · 공통/특화/자율 3개 프로젝트 수행 · 우수상 수상 (공통프로젝트 팀 1위)',
    period: '2024.01 — 2024.12',
    color: '#6abaef',
  },
];

// ── TECH STACK ──

export const TECH_STACK: TechItem[] = [
  {
    name: 'React',
    level: 'Main',
    reason: '실무 메인 스택. 컴포넌트 재사용성과 생태계 덕분에 팀 협업에서 가장 효율적이었다. 상태 관리는 Zustand, 서버 상태는 React Query로 분리해서 쓴다.',
    tags: ['Zustand', 'React Query', 'TypeScript'],
    color: 'rgba(97,218,251,.5)',
    iconText: 'R',
    iconBg: 'rgba(97,218,251,.1)',
    iconColor: '#61dafb',
  },
  {
    name: 'Svelte',
    level: 'Used',
    reason: '실시간 GPS 좌표가 초당 여러 번 들어오는 Vincent Run Gogh에서 선택했다. 컴파일 타임 반응성으로 불필요한 리렌더링을 줄일 수 있었다. 번들 크기도 작다.',
    tags: ['SvelteKit', 'Stores'],
    color: 'rgba(255,62,0,.5)',
    iconText: 'S',
    iconBg: 'rgba(255,62,0,.1)',
    iconColor: '#ff3e00',
  },
  {
    name: 'Flutter',
    level: 'Used',
    reason: '별이삼샵에서 위치 기반 백그라운드 감지와 FCM이 필요했다. WebView 기반보다 네이티브 권한 처리가 안정적이라 Flutter를 선택했다. iOS·Android 동시 지원도 장점이었다.',
    tags: ['Dart', 'FCM', 'Provider'],
    color: 'rgba(83,193,222,.5)',
    iconText: 'F',
    iconBg: 'rgba(83,193,222,.1)',
    iconColor: '#53c1de',
  },
  {
    name: 'TypeScript',
    level: 'Always',
    reason: '타입 없이 짠 코드는 3개월 뒤 내가 봐도 모른다. API 응답 타입을 정의해두면 백엔드 변경이 생겼을 때 영향 범위가 바로 보인다. 이제 JS만으로는 못 돌아간다.',
    tags: ['Zod', 'Generic'],
    color: 'rgba(49,120,198,.5)',
    iconText: 'TS',
    iconBg: 'rgba(49,120,198,.1)',
    iconColor: '#3178c6',
  },
  {
    name: 'Next.js',
    level: 'Learning',
    reason: '이 포트폴리오가 Next.js로 만들어진다. SSG로 SEO 챙기면서 Vercel 배포까지 자연스럽게 이어지는 흐름이 좋다. App Router 방식으로 공부 중이다.',
    tags: ['App Router', 'SSG', 'Vercel'],
    color: 'rgba(106,186,239,.4)',
    iconText: '▲',
    iconBg: 'rgba(255,255,255,.07)',
    iconColor: 'var(--text)',
    iconFontSize: '16px',
  },
  {
    name: 'Three.js',
    level: 'Used',
    reason: '졸업작품 3D 태양계 시뮬레이션에서 처음 썼다. WebGL을 직접 다루지 않아도 3D 씬을 구성할 수 있다는 게 인상적이었다. React-Three-Fiber로 React와 통합하는 법도 익혔다.',
    tags: ['R3F', 'WebGL', 'Shader'],
    color: 'rgba(106,222,138,.4)',
    iconText: '3D',
    iconBg: 'rgba(106,222,138,.1)',
    iconColor: '#6ade8a',
  },
];

// ── TIMELINE ──

export interface TimelineItem {
  period: string;
  title: string;
  desc: string;
  badge?: string;
  color?: string;
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    period: '2025.02 — 2026.04',
    title: '오더체크 Frontend Developer',
    desc: '구인구직 피처 설계·개발, GPS+얼굴인식 출석 시스템, 디자인시스템 npm 패키지 배포. MAU 149 → 4,786 성장에 기여.',
    badge: '실무 1년 2개월',
    color: '#6abaef',
  },
  {
    period: '2024.01 — 2024.12',
    title: '삼성 청년 SW 아카데미 (SSAFY) 11기 수료',
    desc: '서울 캠퍼스. 공통/특화/자율 3개 팀 프로젝트 수행. WebRTC, Svelte, Flutter, GPS 등 다양한 기술 스택 경험.',
    badge: '우수상 수상',
    color: '#6ade8a',
  },
  {
    period: '2018.03 — 2022.08',
    title: '서울과학기술대학교 컴퓨터공학과 졸업',
    desc: '게임동아리 TCP 활동 (Unity, C# 7인 프로젝트). 졸업작품: Three.js 기반 3D 태양계 인터랙티브 시뮬레이션.',
    color: '#c080f0',
  },
];
