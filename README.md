# 🌌 MyUniverse — 3D Interactive Portfolio

> **인터랙티브 3D 은하수 궤도를 통해 프론트엔드 엔지니어의 우주(기술 스택, 프로젝트, 실무 경험)를 여행하는 포트폴리오 웹사이트입니다.**
> 
> 🔗 **배포 주소**: [https://yjjeon.cloud](https://yjjeon.cloud)

---

## 🎨 주요 기능 및 특징

### 1. WebGL 기반의 3D 입체 은하수 홈화면
* **Three.js**를 활용하여 중앙 행성, 고리, 450개의 미세 별빛 파티클 소행성대로 구성된 행성계를 구축했습니다.
* 마우스의 미세한 움직임을 감지하여 화면 시점이 부드럽게 기울어지는 **3D 패럴랙스 카메라** 기법을 연동했습니다.
* 각 서브페이지 위성(Profile, Projects, Experience, Contact)과 핵심 기술 스택(`React`, `TypeScript`, `Next.js` 등)이 각각의 입체 경사 궤도를 따라 독립적인 속도로 실시간 공전(Orbiting)합니다.

### 2. 가독성을 위한 하이브리드 투영 아키텍처
* 3D 그래픽스 상에 2D 텍스트가 렌더링될 때 깨지는 현상을 극복하기 위해, **3D 가상 객체의 좌표를 브라우저 2D 스크린 좌표로 투영(Projecting)**하여 HTML 위성 카드와 맵핑했습니다.
* 카메라 깊이(Z-Buffer) 연산값에 비례하여 위성 카드의 스케일, 불투명도(Opacity), `z-index`를 동적으로 제어함으로써 입체적인 차폐 효과와 높은 가독성을 동시에 만족시킵니다.

### 3. 반응형 3D 카메라 줌 보정
* 화면 종횡비(Aspect Ratio)와 너비를 실시간으로 계산하여, 모바일/태블릿 등 좁은 화면으로 진입할 때 카메라를 뒤로 줌아웃(Zoom-out)시키는 삼각함수 공식 `targetZ = Math.max(30.0 / aspect, 28.0)`을 구현하여 어느 기기에서도 궤도가 잘리지 않고 중앙에 안착되도록 설계했습니다.

### 4. 서브페이지 인터랙션 및 성능 최적화
* **Experience**: 통계 지표 화면 진입 시 트리거되는 숫자 카운트업 효과와 경력 상세를 담은 부드러운 아코디언 컴포넌트 이식.
* **Projects**: SVG 벡터 아트워크 모션 그래픽스 기반의 프로젝트 카드 및 상세 레이어 팝업 시 부모 스크롤 차단(`body.locked`) 연동.
* **Contact**: 이메일 원클릭 복사 토스트 피드백 및 GitHub API 실시간 통신을 통한 최신 레포지토리 자동 렌더링.

---

## 🛠 Tech Stack

* **Core**: React 19, TypeScript
* **3D Graphics**: Three.js
* **Build tool**: Vite (Rollup 기반 번들링)
* **Hosting**: Vercel (https://yjjeon.cloud)

---

## ⚙️ 실행 및 빌드 방법

### 1. 의존성 패키지 설치
```bash
npm install
```

### 2. 로컬 개발 서버 구동
```bash
npm run dev
```

### 3. 프로덕션 빌드 (출력 경로: `dist_build`)
```bash
npm run build
```
