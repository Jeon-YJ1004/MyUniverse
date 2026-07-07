import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';
import '../styles/home.css';

interface SatData {
  id: string;
  href: string;
  label: string;
  tip: string;
  glow: string;
  orbitRadius: number;
  speed: number;
  angleOffset: number;
  rotX: number;
  rotY: number;
  icon: React.ReactNode;
}

interface TechAsteroid {
  name: string;
  orbitRadius: number;
  speed: number;
  angleOffset: number;
  rotX: number;
  rotY: number;
  color: string; // 고유 브랜드 컬러
}

export const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  // 위성 및 기술 스택 2D 투영 좌표 상태 관리
  const [satPositions, setSatPositions] = useState<{ [key: string]: { x: number; y: number; scale: number; opacity: number; zIndex: number } }>({});
  const [techPositions, setTechPositions] = useState<{ [key: string]: { x: number; y: number; scale: number; opacity: number; zIndex: number } }>({});
  const [hoveredSat, setHoveredSat] = useState<string | null>(null);

  const isLight = theme === 'light';

  // 위성 데이터 정의 (3D 입체 궤도)
  const satellites: SatData[] = [
    {
      id: 'profile',
      href: '/profile',
      label: 'Profile',
      tip: '프로필 — 기술 스택 & 스토리',
      glow: 'rgba(100,200,255,0.7)',
      orbitRadius: 4.8,
      speed: 0.16, // 속도 통일
      angleOffset: 0,
      rotX: 1.05, // 60deg
      rotY: 0.17, // 10deg
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="14" r="10" fill="#2a5a8a" stroke="#6abaef" strokeWidth="1.2" />
          <ellipse cx="16" cy="14" rx="6" ry="5" fill="#0a1a2a" opacity=".8" />
          <ellipse cx="16" cy="14" rx="5" ry="4" fill="#1a3a6a" opacity=".6" />
          <circle cx="14" cy="12" r="1.5" fill="#6abaef" opacity=".4" />
          <rect x="13" y="23" width="6" height="4" rx="1" fill="#2a5a8a" stroke="#6abaef" strokeWidth=".5" />
          <path d="M12 10 C13 8 18 8 20 10" stroke="#aaddff" strokeWidth=".8" fill="none" opacity=".5" />
        </svg>
      ),
    },
    {
      id: 'projects',
      href: '/projects',
      label: 'Projects',
      tip: '프로젝트 — 5개 작업물',
      glow: 'rgba(255,180,80,0.75)',
      orbitRadius: 7.2,
      speed: 0.16, // 속도 통일
      angleOffset: Math.PI * 0.5,
      rotX: -0.87, // -50deg
      rotY: -0.35, // -20deg
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="13" width="18" height="7" rx="3.5" fill="#8a6020" stroke="#e0a840" strokeWidth="1.2" transform="rotate(-30,16,16)" />
          <circle cx="22" cy="10" r="4" fill="#1a2a3a" stroke="#e0a840" strokeWidth="1" />
          <circle cx="22" cy="10" r="2.5" fill="#2a4a8a" opacity=".7" />
          <circle cx="21" cy="9" r=".8" fill="#6ab0ff" opacity=".5" />
          <line x1="16" y1="20" x2="12" y2="26" stroke="#e0a840" strokeWidth="1.2" />
          <line x1="16" y1="20" x2="20" y2="26" stroke="#e0a840" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: 'experience',
      href: '/experience',
      label: 'Experience',
      tip: '경험 — 오더체크 실무',
      glow: 'rgba(100,255,160,0.7)',
      orbitRadius: 9.6,
      speed: 0.16, // 속도 통일
      angleOffset: Math.PI,
      rotX: 0.78, // 45deg
      rotY: -0.52, // -30deg
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <path d="M16 4 C12 8 11 14 12 20 L16 22 L20 20 C21 14 20 8 16 4Z" fill="#2a5a2a" stroke="#6ade6a" strokeWidth="1.2" />
          <circle cx="16" cy="13" r="2.5" fill="#0a1a0a" stroke="#6ade6a" strokeWidth=".8" />
          <circle cx="15" cy="12" r=".8" fill="#6ade6a" opacity=".4" />
          <path d="M12 20 L8 24 L12 22Z" fill="#1e3e1e" stroke="#6ade6a" strokeWidth=".6" />
          <path d="M20 20 L24 24 L20 22Z" fill="#1e3e1e" stroke="#6ade6a" strokeWidth=".6" />
          <path d="M14 22 C14 26 13 28 16 27 C19 28 18 26 18 22Z" fill="#f0a830" opacity=".8" />
          <path d="M15 22 C15 24 16 25 16 25 C16 25 17 24 17 22Z" fill="#fff" opacity=".6" />
        </svg>
      ),
    },
    {
      id: 'contact',
      href: '/contact',
      label: 'Contact',
      tip: '연락처 — 이메일 & GitHub',
      glow: 'rgba(220,140,255,0.7)',
      orbitRadius: 12.0,
      speed: 0.16, // 속도 통일
      angleOffset: Math.PI * 1.5,
      rotX: -1.13, // -65deg
      rotY: 0.26, // 15deg
      icon: (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <rect x="12" y="12" width="8" height="8" rx="2" fill="#4a2a6a" stroke="#c080f0" strokeWidth="1.2" />
          <rect x="2" y="13" width="8" height="6" rx="1" fill="#2a1a4a" stroke="#c080f0" strokeWidth=".8" />
          <line x1="4" y1="13" x2="4" y2="19" stroke="#c080f0" strokeWidth=".5" opacity=".6" />
          <line x1="6" y1="13" x2="6" y2="19" stroke="#c080f0" strokeWidth=".5" opacity=".6" />
          <line x1="8" y1="13" x2="8" y2="19" stroke="#c080f0" strokeWidth=".5" opacity=".6" />
          <rect x="22" y="13" width="8" height="6" rx="1" fill="#2a1a4a" stroke="#c080f0" strokeWidth=".8" />
          <line x1="24" y1="13" x2="24" y2="19" stroke="#c080f0" strokeWidth=".5" opacity=".6" />
          <line x1="26" y1="13" x2="26" y2="19" stroke="#c080f0" strokeWidth=".5" opacity=".6" />
          <line x1="28" y1="13" x2="28" y2="19" stroke="#c080f0" strokeWidth=".5" opacity=".6" />
          <line x1="16" y1="12" x2="16" y2="6" stroke="#c080f0" strokeWidth="1" />
          <circle cx="16" cy="5" r="2" fill="none" stroke="#c080f0" strokeWidth="1" />
          <circle cx="16" cy="5" r=".8" fill="#c080f0" opacity=".6" />
        </svg>
      ),
    },
  ];

  // 기술 스택 소행성 정의 및 명확한 브랜드 컬러 지정
  const techAsteroids: TechAsteroid[] = [
    { name: 'React', orbitRadius: 3.3, speed: 0.45, angleOffset: 0, rotX: 1.2, rotY: -0.1, color: '#00d8ff' },
    { name: 'TypeScript', orbitRadius: 3.5, speed: 0.38, angleOffset: 1.1, rotX: 1.1, rotY: 0.25, color: '#3178c6' },
    { name: 'JavaScript', orbitRadius: 3.2, speed: -0.42, angleOffset: 2.3, rotX: -1.15, rotY: -0.15, color: '#f7df1e' },
    { name: 'Vite', orbitRadius: 3.6, speed: 0.35, angleOffset: 3.4, rotX: 1.05, rotY: -0.3, color: '#bd34fe' },
    { name: 'Next.js', orbitRadius: 3.4, speed: -0.32, angleOffset: 4.5, rotX: -1.25, rotY: 0.2, color: '#ffffff' },
    { name: 'CSS3', orbitRadius: 3.1, speed: 0.5, angleOffset: 5.6, rotX: 1.3, rotY: 0.05, color: '#264de4' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene, Camera, Renderer 셋업
    const scene = new THREE.Scene();
    
    // 원근 카메라 배치
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    
    // 반응형 카메라 Z축 안전 거리를 위한 변수 정의
    let targetZ = 28.0;
    camera.position.z = 35.0; // 뒤쪽에서 스무스하게 줌인하며 시작

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 2. 조명(Lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 0.75 : 0.45);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, isLight ? 2.5 : 3.5, 50);
    pointLight.position.set(6, 4, 8);
    scene.add(pointLight);

    const fillLight = new THREE.PointLight(0x7090ff, isLight ? 0.6 : 2.0, 30);
    fillLight.position.set(-8, -4, -6);
    scene.add(fillLight);

    // 3. 중앙 행성 (Center Planet) 생성
    const planetGeo = new THREE.SphereGeometry(1.8, 64, 64);
    
    const planetColor = isLight ? 0xd0c0a0 : 0x2e5990;
    const planetEmissive = isLight ? 0x2b1e06 : 0x051329;
    const planetSpecular = isLight ? 0xffffff : 0x6abaef;

    const planetMat = new THREE.MeshPhongMaterial({
      color: planetColor,
      emissive: planetEmissive,
      specular: planetSpecular,
      shininess: 40,
      flatShading: false,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    // 행성의 3D 링
    const ringGeo = new THREE.RingGeometry(2.3, 3.1, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0xa89675 : 0x6abaef,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isLight ? 0.32 : 0.22,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.42;
    ring.rotation.y = Math.PI * 0.08;
    scene.add(ring);

    // 4. 소행성 파티클 대
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 450;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.8 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.18;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const z = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi);

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      color: isLight ? 0x907858 : 0xa0c8ff,
      transparent: true,
      opacity: isLight ? 0.75 : 0.65,
    });
    const particleBelt = new THREE.Points(particleGeo, particleMat);
    particleBelt.rotation.x = Math.PI * 0.42;
    particleBelt.rotation.y = Math.PI * 0.08;
    scene.add(particleBelt);

    // 5. 위성 및 기술 스택 가상 객체
    const satObjects: { [key: string]: THREE.Object3D } = {};
    satellites.forEach((sat) => {
      const obj = new THREE.Object3D();
      scene.add(obj);
      satObjects[sat.id] = obj;
    });

    const techObjects: { [key: string]: THREE.Object3D } = {};
    techAsteroids.forEach((tech) => {
      const obj = new THREE.Object3D();
      scene.add(obj);
      techObjects[tech.name] = obj;
    });

    // 6. 3D 궤도링(Orbit Line) 시각화 도면 추가
    const createOrbitLine = (radius: number, rx: number, ry: number) => {
      const orbitGeo = new THREE.BufferGeometry();
      const points = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      orbitGeo.setFromPoints(points);
      const orbitMat = new THREE.LineBasicMaterial({
        color: isLight ? 0x000000 : 0xffffff,
        transparent: true,
        opacity: isLight ? 0.12 : 0.07,
      });
      const line = new THREE.Line(orbitGeo, orbitMat);
      line.rotation.x = rx;
      line.rotation.y = ry;
      scene.add(line);
    };

    satellites.forEach((sat) => createOrbitLine(sat.orbitRadius, sat.rotX, sat.rotY));

    // 7. 마우스 움직임 반응형 카메라 앵글
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) / 1000;
      mouseY = (e.clientY - windowHalfY) / 1000;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. 윈도우 리사이즈 및 카메라 Z축 반응형 줌 조절 (수학적으로 안전 마진 계산)
    const handleResize = () => {
      if (!canvas || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // 종횡비(aspect ratio)를 기반으로 3D 물체가 화면 양옆/상하에서 절대 잘리지 않는 물리 Z 축 산출
      // 최외곽 궤도 지름(24.0) + 위성 크기/패널 마진 여유(약 4.0) = 총 28.0의 가시 공간 확보 필요
      const aspect = w / h;
      
      // 세로 높이 방향 안전거리: 26.0 (Z >= 28.0)
      // 가로 너비 방향 안전거리: 30.0 / aspect
      // 이 둘 중 맥스 값을 사용하여 뷰포트 종횡비에 구애받지 않고 무조건 100% 궤도 안착
      targetZ = Math.max(30.0 / aspect, 28.0);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // 즉시 1회 호출로 초기 카메라 Z 반영

    // 9. 애니메이션 루프
    const timer = new (THREE as any).Timer();
    let animationFrameId: number;

    const tempV = new THREE.Vector3();

    const animate = () => {
      timer.update();
      const elapsedTime = timer.getElapsed();
      const widthHalf = container.clientWidth / 2;
      const heightHalf = container.clientHeight / 2;

      planet.rotation.y = elapsedTime * 0.15;
      ring.rotation.z = -elapsedTime * 0.05;
      particleBelt.rotation.z = elapsedTime * 0.03;

      // 마우스에 의한 카메라 패럴랙스
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 6;
      camera.position.y = -targetY * 6;

      // 반응형 카메라 Z 위치를 스무스하게 보간(Lerp)하여 적용
      camera.position.z += (targetZ - camera.position.z) * 0.06;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // 3D 위성 공전 위치 계산 및 2D 투영
      const nextSatPositions: typeof satPositions = {};
      satellites.forEach((sat) => {
        const obj = satObjects[sat.id];
        const currentAngle = sat.angleOffset + elapsedTime * sat.speed * 0.5;
        
        const localX = Math.cos(currentAngle) * sat.orbitRadius;
        const localZ = Math.sin(currentAngle) * sat.orbitRadius;
        
        const vector = new THREE.Vector3(localX, 0, localZ);
        vector.applyAxisAngle(new THREE.Vector3(1, 0, 0), sat.rotX);
        vector.applyAxisAngle(new THREE.Vector3(0, 1, 0), sat.rotY);

        obj.position.copy(vector);

        obj.getWorldPosition(tempV);
        tempV.project(camera);

        const x = (tempV.x * widthHalf) + widthHalf;
        const y = -(tempV.y * heightHalf) + heightHalf;

        // 크기 및 명확한 대비를 위해 스케일/투명도 최저 범위 상향 조정 (가독성 확보)
        const depth = tempV.z; // 0 ~ 1
        const scale = 1.55 - depth * 0.45;
        const opacity = 1.0 - depth * 0.3;
        const zIndex = depth < 0.95 ? 20 : 5;

        nextSatPositions[sat.id] = { x, y, scale, opacity, zIndex };
      });
      setSatPositions(nextSatPositions);

      // 기술 스택 3D 투영
      const nextTechPositions: typeof techPositions = {};
      techAsteroids.forEach((tech) => {
        const obj = techObjects[tech.name];
        const currentAngle = tech.angleOffset + elapsedTime * tech.speed * 0.6;
        
        const localX = Math.cos(currentAngle) * tech.orbitRadius;
        const localZ = Math.sin(currentAngle) * tech.orbitRadius;

        const vector = new THREE.Vector3(localX, 0, localZ);
        vector.applyAxisAngle(new THREE.Vector3(1, 0, 0), tech.rotX);
        vector.applyAxisAngle(new THREE.Vector3(0, 1, 0), tech.rotY);

        obj.position.copy(vector);

        obj.getWorldPosition(tempV);
        tempV.project(camera);

        const x = (tempV.x * widthHalf) + widthHalf;
        const y = -(tempV.y * heightHalf) + heightHalf;

        const depth = tempV.z;
        const scale = 1.25 - depth * 0.35;
        const opacity = 1.0 - depth * 0.35;
        const zIndex = depth < 0.95 ? 15 : 4;

        nextTechPositions[tech.name] = { x, y, scale, opacity, zIndex };
      });
      setTechPositions(nextTechPositions);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      planetGeo.dispose();
      planetMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme]);

  const handleNavigate = (href: string) => {
    document.body.style.transition = 'opacity 0.35s';
    document.body.style.opacity = '0';
    setTimeout(() => {
      navigate(href);
      document.body.style.opacity = '1';
    }, 320);
  };

  return (
    <div className="scene" ref={containerRef}>
      <canvas ref={canvasRef} className="three-canvas" />

      {/* HTML Overlays: 3D 투영 연동 위성들 */}
      {satellites.map((sat) => {
        const pos = satPositions[sat.id] || { x: 0, y: 0, scale: 1, opacity: 0, zIndex: 1 };
        const isHovered = hoveredSat === sat.id;

        return (
          <div
            key={sat.id}
            className="sat-html-wrapper"
            style={{
              position: 'absolute',
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: `translate(-50%, -50%) scale(${pos.scale})`,
              opacity: pos.opacity,
              zIndex: pos.zIndex,
              pointerEvents: pos.opacity < 0.2 ? 'none' : 'auto',
              transition: 'opacity 0.15s, transform 0.05s linear',
            }}
          >
            <div
              className="satellite"
              onMouseEnter={() => setHoveredSat(sat.id)}
              onMouseLeave={() => setHoveredSat(null)}
              onClick={() => handleNavigate(sat.href)}
            >
              <div
                className="sat-icon"
                style={{
                  '--glow': sat.glow,
                  transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                } as React.CSSProperties}
              >
                {sat.icon}
              </div>
              
              <span className="sat-label active">
                {sat.label}
              </span>

              {/* 툴팁 */}
              {isHovered && (
                <div className="sat-tooltip visible" style={{ top: '115%' }}>
                  {sat.tip}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* HTML Overlays: 3D 투영 기술 스택 소행성 텍스트들 */}
      {techAsteroids.map((tech) => {
        const pos = techPositions[tech.name] || { x: 0, y: 0, scale: 1, opacity: 0, zIndex: 1 };
        const resolvedColor = tech.name === 'Next.js' && isLight ? '#111111' : tech.color;

        return (
          <span
            key={tech.name}
            className="asteroid-text-node"
            style={{
              position: 'absolute',
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: `translate(-50%, -50%) scale(${pos.scale})`,
              opacity: pos.opacity * 0.95,
              zIndex: pos.zIndex,
              color: resolvedColor,
              textShadow: isLight
                ? `0 0 8px rgba(255, 255, 255, 0.9), 0 0 2px rgba(255, 255, 255, 1)`
                : `0 0 8px ${tech.color}44, 0 0 2px rgba(4, 4, 15, 0.95)`,
              transition: 'transform 0.05s linear',
            }}
          >
            {tech.name}
          </span>
        );
      })}

      <div className="nav-hint">
        <span className="scroll-dot"></span>
        <span className="scroll-dot"></span>
        <span className="scroll-dot"></span>
        &nbsp;원하는 궤도의 위성을 클릭하여 탐험하세요
      </div>
    </div>
  );
};

export default Home;
