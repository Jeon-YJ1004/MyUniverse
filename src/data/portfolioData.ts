// ── TYPES ──

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
    date: 'JUL — AUG 2024',
    filter: 'web',
    award: '우수상 수상',
    github: 'https://github.com/Jeon-YJ1004',
    detail: {
      problem: [
        { label: '문제 상황', text: '119 신고 시 음성만으로는 현장 상황을 정확히 전달하기 어렵다. 특히 신고자가 패닉 상태일 때 말로 위치와 상황을 설명하는 것 자체가 큰 장벽이었다.' },
        { label: '왜 어려웠는가', text: 'WebRTC 기반 P2P 연결은 NAT 환경에서 연결이 끊기는 경우가 잦았다. OpenVidu를 선택한 건 STUN/TURN 서버 관리를 직접 하지 않아도 되는 추상화 때문이었는데, 초기 연결 지연이 생각보다 길었다.' },
      ],
      techs: [
        { name: 'React', reason: '컴포넌트 재사용성. 영상 스트림 UI와 신고 폼을 분리 관리하기 위해.' },
        { name: 'WebRTC + OpenVidu', reason: 'P2P 실시간 영상 통화. STUN/TURN 추상화로 개발 속도 확보.' },
        { name: 'Spring Boot', reason: '시그널링 서버 구현. WebSocket 기반 연결 중계.' },
      ],
      trial: '처음에는 직접 STUN 서버를 구성했는데 NAT 환경에서 연결 실패율이 높았다. OpenVidu로 전환 후 연결 안정성이 올라갔지만 대신 서버 비용 구조를 이해하고 팀원에게 설명하는 시간이 필요했다.',
      results: [
        { num: '< 2s', desc: '평균 연결 수립 시간' },
        { num: '팀 1위', desc: '공통프로젝트 심사 결과' },
        { num: '우수상', desc: 'SSAFY 11기 수상' },
      ],
    },
  },
  {
    id: 'rungogh',
    name: ['Vincent', 'Run Gogh'],
    category: 'SSAFY 11기 특화프로젝트',
    sub: 'GPS 아트 러닝 서비스',
    tags: ['Svelte', 'Leaflet.js', 'GPS', 'Node.js'],
    color: '#1a2b1a',
    textColor: '#b0ccb0',
    date: 'AUG — OCT 2024',
    filter: 'web',
    github: 'https://github.com/Jeon-YJ1004',
    detail: {
      problem: [
        { label: '문제 상황', text: '러닝은 운동이지만 단순 반복이라 지속하기 어렵다. "내가 뛴 경로가 그림이 된다"면 루트 설계 자체가 목적이 된다는 아이디어에서 시작했다.' },
        { label: '기술적 고민', text: 'React 대신 Svelte를 선택한 건 실시간 GPS 좌표 업데이트 시 불필요한 리렌더링을 줄이기 위해서였다. GPS 좌표가 초당 여러 번 들어오는 환경에서 Svelte의 컴파일 타임 반응성이 유리했다.' },
      ],
      techs: [
        { name: 'Svelte', reason: '실시간 GPS 업데이트 시 리렌더링 최소화. 번들 크기도 React 대비 작음.' },
        { name: 'Leaflet.js', reason: 'OpenStreetMap 기반 커스텀 경로 렌더링. SVG 오버레이로 아트 경로 표현.' },
        { name: 'GPS Web API', reason: 'navigator.geolocation으로 브라우저 네이티브 위치 추적.' },
      ],
      trial: '초기에는 좌표를 전부 저장하다 보니 긴 러닝 후 경로 렌더링이 느려지는 문제가 있었다. Ramer-Douglas-Peucker 알고리즘으로 좌표를 단순화해서 해결했다.',
      results: [
        { num: '1m', desc: '최소 경로 인식 거리' },
        { num: 'SVG', desc: '경로를 아트로 내보내기' },
        { num: '5인', desc: '팀 구성' },
      ],
    },
  },
  {
    id: 'byulee',
    name: ['별이삼샵'],
    category: 'SSAFY 11기 자율프로젝트',
    sub: '위치 기반 쪽지 서비스',
    tags: ['Flutter', 'FCM', 'Kakao Map API', 'GA4'],
    color: '#1e1628',
    textColor: '#c8b8d8',
    date: 'OCT — NOV 2024',
    filter: 'app',
    github: 'https://github.com/Jeon-YJ1004',
    detail: {
      problem: [
        { label: '문제 상황', text: '특정 장소에 의미를 담아 남기고 싶은데, 기존 SNS는 너무 공개적이다. "이 장소에 가야만 볼 수 있는 메시지"라는 개념으로 위치 기반 쪽지 서비스를 기획했다.' },
        { label: '기술적 선택', text: 'Web이 아닌 Flutter를 선택한 이유는 위치 권한과 푸시 알림 처리가 네이티브에 가까울수록 안정적이기 때문이었다. 특히 백그라운드 위치 감지는 WebView 기반에서 제약이 많았다.' },
      ],
      techs: [
        { name: 'Flutter', reason: '크로스플랫폼 + 네이티브 위치/알림 권한 처리. WebView 대비 백그라운드 감지 안정성.' },
        { name: 'FCM', reason: '특정 좌표 반경 진입 시 푸시 알림. 서버에서 트리거 조건 관리.' },
        { name: 'GA4', reason: '어떤 장소 유형에서 쪽지가 많이 남겨지는지 사용 패턴 분석.' },
      ],
      trial: '반경 감지를 처음엔 Geofencing API로 구현했는데 iOS에서 진입 감지 딜레이가 최대 수 분까지 발생했다. 결국 서버 폴링 방식으로 전환하고 배터리 소모를 줄이기 위해 폴링 주기를 동적으로 조절하는 방식을 썼다.',
      results: [
        { num: '50m', desc: '쪽지 수신 반경 (최적화 후)' },
        { num: 'iOS+AOS', desc: '크로스플랫폼 지원' },
        { num: '6인', desc: '팀 구성' },
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
    date: 'MAR — APR 2022',
    filter: 'web',
    github: 'https://github.com/Jeon-YJ1004',
    detail: {
      problem: [
        { label: '문제 상황', text: '태양계 행성 간 거리와 크기 비율을 실제로 느끼기 어렵다. 교과서 그림은 비율을 왜곡한다. 실제 공전 속도 차이를 눈으로 보여주고 싶었다.' },
        { label: '기술적 고민', text: 'Three.js를 React와 통합할 때 DOM과 Canvas 렌더 사이클이 충돌하는 문제가 있었다. React-Three-Fiber가 React 생명주기 안에서 Three.js Scene을 관리할 수 있게 해줘서 선택했다.' },
      ],
      techs: [
        { name: 'Three.js', reason: 'WebGL 기반 3D 렌더링. 행성 메시, 텍스처, 조명 전부 Three.js로 처리.' },
        { name: 'React-Three-Fiber', reason: 'React 선언형 방식으로 3D 씬 구성. useFrame 훅으로 공전 애니메이션.' },
        { name: 'React', reason: '행성 정보 패널 UI와 3D 씬을 같은 상태로 동기화.' },
      ],
      trial: '행성 텍스처를 고해상도로 쓰니 초기 로딩이 너무 느렸다. TextureLoader에 LoadingManager를 붙여 프로그레스 표시를 했고, 뷰포트 거리 기반 LOD를 적용해 멀리 있는 행성은 저해상도 텍스처를 쓰도록 했다.',
      results: [
        { num: '8개', desc: '행성 + 위성 포함 모델링' },
        { num: '60fps', desc: '목표 렌더링 성능' },
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
    date: 'DEC 2022 — AUG 2023',
    filter: 'game',
    wide: true,
    github: 'https://github.com/Jeon-YJ1004',
    detail: {
      problem: [
        { label: '문제 상황', text: '7인 팀에서 프론트엔드 개발자가 Unity 프로젝트를 맡는 건 처음이었다. C#과 Unity의 컴포넌트 시스템은 React의 선언형 패러다임과 달랐고, 게임 루프 안에서 상태를 관리하는 방식을 새로 배워야 했다.' },
        { label: '개발 중 겪은 문제', text: '적 AI의 경로탐색 비용이 커서 적이 많아질수록 프레임이 떨어졌다. A* 알고리즘을 직접 구현했는데, NavMesh 기반으로 전환하고 업데이트 주기를 제한하는 방식으로 성능을 개선했다.' },
      ],
      techs: [
        { name: 'Unity', reason: '2D 물리 엔진과 타일맵 시스템. 로그라이트 맵 생성에 Tilemap 활용.' },
        { name: 'C#', reason: 'Unity 스크립팅. 적 AI, 아이템 시스템, 게임 루프 전반 담당.' },
        { name: 'ScriptableObject', reason: '아이템·스킬 데이터를 코드에서 분리. 기획자가 직접 수치 조정 가능하게.' },
      ],
      trial: 'ScriptableObject 패턴을 중반부에 도입했는데 초기에 하드코딩된 수치들을 전부 마이그레이션하는 데 시간이 꽤 걸렸다. 처음부터 데이터 분리를 설계했어야 했다는 걸 그때 배웠다.',
      results: [
        { num: '7인', desc: '팀 개발' },
        { num: '9개월', desc: '개발 기간' },
        { num: '∞', desc: '로그라이트 무한 플레이' },
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
      trial: '초기에는 GPS 오차를 단순 반경 확대로 해결하려 했는데 그러면 인증 의미가 없어졌다. Rekognition 신뢰도 임계값 튜닝에 시간이 가장 많이 걸렸다.',
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
      solution: 'Rollup으로 tree-shakeable 번들 구성. CSS Variables 기반으로 테마 토큰 설계. Storybook으로 컴포넌트 문서 자동화.',
      trial: '공통 컴포넌트 수정 시 배포 한 번으로 전체 서비스에 반영. 신규 페이지 개발 속도가 체감상 크게 단축됐다.',
    },
  },
];

// ── EDUCATION ──

export const EDUCATION_LIST: EducationItem[] = [
  {
    title: '삼성 청년 SW 아카데미 (SSAFY) 11기 수료',
    desc: '서울 캠퍼스 · 공통/특화/자율 3개 프로젝트 수행 · 우수상 수상 (공통프로젝트 팀 1위)',
    period: '2024.01 — 2024.12',
    color: '#6abaef',
  },
  {
    title: '서울과학기술대학교 컴퓨터공학과 졸업',
    desc: '게임동아리 TCP 활동 · 졸업작품: 3D 태양계 시뮬레이션 (Three.js)',
    period: '2018.03 — 2022.08',
    color: '#6ade8a',
  },
  {
    title: 'SSAFY 11기 공통프로젝트 우수상',
    desc: 'SaveMe & RescU — 119 신고 WebRTC 화상통화 서비스 · 팀 1위 선정',
    period: '2024.08',
    color: '#c080f0',
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

