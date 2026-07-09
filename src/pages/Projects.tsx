import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "../data/portfolioData";
import { PageHeader, Tag } from "../components/ui";
import "../styles/projects.css";

/* ── SATELLITE SVG INTERACTIVE COMPONENTS ── */
interface ObjectProps {
  hovered: boolean;
}

const SaveMeObject: React.FC<ObjectProps> = ({ hovered }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 150,
        height: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 삐용삐용 퍼져나가는 긴급 신호 파동 배경 */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            border: "1.5px solid #e05050",
            width: 44,
            height: 44,
            top: "41%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          animate={
            hovered
              ? { scale: [0.4, 2.4], opacity: [0.65, 0] }
              : { scale: 0.4, opacity: 0 }
          }
          transition={{
            duration: 1.5,
            delay: i * 0.35,
            repeat: hovered ? Infinity : 0,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 스마트폰 및 내부 119 구급차 그래픽 */}
      <svg width="72" height="112" viewBox="0 0 72 112" fill="none">
        {/* Smartphone Shell */}
        <rect
          x="6"
          y="6"
          width="60"
          height="100"
          rx="10"
          fill="#1b2533"
          stroke="#4a9eca"
          strokeWidth="1.5"
        />
        {/* Screen */}
        <rect x="10" y="10" width="52" height="92" rx="7" fill="#0c121d" />
        {/* Dynamic Island */}
        <rect x="28" y="13" width="16" height="3.5" rx="1.75" fill="#1b2533" />

        {/* 119 앰뷸런스 구급차 일러스트 */}
        {/* Ambulance Body */}
        <rect x="20" y="52" width="26" height="18" rx="2" fill="#ffffff" />
        <path d="M46 56 L54 56 L52 52 L46 52 Z" fill="#ffffff" />
        {/* Driver Window */}
        <path d="M46 54 L50 54 L49 53 L46 53 Z" fill="#1b2533" />
        {/* Red Decor Line */}
        <rect x="20" y="61" width="31" height="2.5" fill="#e05050" />
        {/* Red Cross */}
        <line
          x1="30"
          y1="56"
          x2="30"
          y2="60"
          stroke="#e05050"
          strokeWidth="1.5"
        />
        <line
          x1="28"
          y1="58"
          x2="32"
          y2="58"
          stroke="#e05050"
          strokeWidth="1.5"
        />

        {/* Wheels */}
        <circle
          cx="27"
          cy="70"
          r="4"
          fill="#151b22"
          stroke="#4a9eca"
          strokeWidth="0.8"
        />
        <circle cx="27" cy="70" r="1.2" fill="#ffffff" />
        <circle
          cx="45"
          cy="70"
          r="4"
          fill="#151b22"
          stroke="#4a9eca"
          strokeWidth="0.8"
        />
        <circle cx="45" cy="70" r="1.2" fill="#ffffff" />

        {/* Siren Base & Bulb */}
        <rect x="34" y="48" width="2.5" height="4" fill="#8b8b8b" />
        <motion.circle
          cx="35.2"
          cy="46.5"
          r="3.5"
          fill="#ff3b30"
          animate={
            hovered
              ? {
                  fill: ["#ff3b30", "#007aff", "#ff3b30"],
                  scale: [1, 1.2, 1],
                }
              : { fill: "#ff3b30" }
          }
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />

        {/* 삐용삐용 사이렌 무선 신호 전파 아치 */}
        <motion.path
          d="M27 39 Q35.2 30 43.5 39"
          stroke="#ff3b30"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          animate={
            hovered
              ? { scale: [0.92, 1.25, 0.92], opacity: [0.3, 1, 0.3] }
              : { opacity: 0.3 }
          }
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "35.2px 46.5px" }}
        />
        <motion.path
          d="M19 32 Q35.2 18 51.5 32"
          stroke="#007aff"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          animate={
            hovered
              ? { scale: [0.88, 1.35, 0.88], opacity: [0.2, 0.9, 0.2] }
              : { opacity: 0.2 }
          }
          transition={{
            duration: 1.2,
            delay: 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "35.2px 46.5px" }}
        />
      </svg>
    </div>
  );
};

interface FootprintProps {
  x: number;
  y: number;
  rotate: number;
  animate: boolean;
  delay: number;
}

const Footprint: React.FC<FootprintProps> = ({
  x,
  y,
  rotate,
  animate,
  delay,
}) => {
  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${y}px` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={
        animate
          ? { opacity: [0, 0.75, 0.75, 0.45], scale: [0, 1.2, 1, 1] }
          : { opacity: 0, scale: 0 }
      }
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <ellipse
        cx={x}
        cy={y}
        rx="4"
        ry="5.5"
        fill="#6dde6d"
        transform={`rotate(${rotate},${x},${y})`}
      />
      <ellipse
        cx={x + 7}
        cy={y + 2}
        rx="3"
        ry="4.5"
        fill="#6dde6d"
        transform={`rotate(${rotate},${x + 7},${y + 2})`}
      />
      <circle
        cx={x - 2}
        cy={y - 6}
        r="1.8"
        fill="#6dde6d"
        transform={`rotate(${rotate},${x - 2},${y - 6})`}
      />
      <circle
        cx={x + 3}
        cy={y - 7}
        r="1.5"
        fill="#6dde6d"
        transform={`rotate(${rotate},${x + 3},${y - 7})`}
      />
      <circle
        cx={x + 8}
        cy={y - 5}
        r="1.5"
        fill="#6dde6d"
        transform={`rotate(${rotate},${x + 8},${y - 5})`}
      />
    </motion.g>
  );
};

const RunGoghObject: React.FC<ObjectProps> = ({ hovered }) => {
  const footprints = [
    { x: 30, y: 110, rotate: -10, delay: 0.55 },
    { x: 50, y: 90, rotate: 75, delay: 0.72 },
    { x: 72, y: 65, rotate: -5, delay: 0.88 },
    { x: 95, y: 52, rotate: 80, delay: 1.02 },
    { x: 112, y: 72, rotate: 170, delay: 1.15 },
    { x: 95, y: 95, rotate: 100, delay: 1.28 },
  ];
  return (
    <div style={{ position: "relative", width: 155, height: 155 }}>
      <svg width="155" height="155" viewBox="0 0 150 150" fill="none">
        <rect width="150" height="150" fill="#1e3020" />
        <line
          x1="0"
          y1="50"
          x2="150"
          y2="50"
          stroke="#2a4a2a"
          strokeWidth="7"
        />
        <line
          x1="0"
          y1="100"
          x2="150"
          y2="100"
          stroke="#2a4a2a"
          strokeWidth="5"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="150"
          stroke="#2a4a2a"
          strokeWidth="5"
        />
        <line
          x1="110"
          y1="0"
          x2="110"
          y2="150"
          stroke="#2a4a2a"
          strokeWidth="7"
        />
        {[
          [0, 0, 48, 48],
          [52, 0, 56, 48],
          [112, 0, 38, 48],
          [0, 52, 48, 46],
          [52, 52, 56, 46],
          [112, 52, 38, 46],
          [0, 102, 48, 48],
          [52, 102, 56, 48],
          [112, 102, 38, 48],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="2"
            fill="#243824"
            opacity=".55"
          />
        ))}
        <motion.path
          d="M25 120 L25 75 L50 75 L50 50 L75 50 L75 25 L110 25 L110 50 L130 50 L130 75 L110 75 L110 100 L75 100 L75 120 L50 120"
          stroke="#6dde6d"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: hovered ? 1 : 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />
        {footprints.map((f, i) => (
          <Footprint key={i} {...f} animate={hovered} />
        ))}
        <motion.circle
          cx="25"
          cy="120"
          r="5"
          fill="#6dde6d"
          animate={{ opacity: hovered ? [0.3, 0.9, 0.3] : 0.3 }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </svg>
      <motion.svg
        style={{
          position: "absolute",
          bottom: 14,
          right: 6,
          width: 56,
          transformOrigin: "50% 100%",
        }}
        viewBox="0 0 100 68"
        fill="none"
        animate={
          hovered
            ? { y: [0, -5, 0], rotate: [-4, -7, -3] }
            : { y: 0, rotate: -4 }
        }
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <path
          d="M8 54 C5 54 3 52 3 49 L3 45 C3 43 5 41 8 41 L84 41 C92 41 97 45 97 49 C97 52 94 54 90 54Z"
          fill="#2a4a2a"
        />
        <path
          d="M8 41 L84 41 C92 41 96 44 96 47 L96 51 C96 53 93 54 89 54 L8 54 C5 54 3 52 3 50 L3 45 C3 43 5 41 8 41Z"
          fill="#1e3a1e"
          stroke="#5a9b5a"
          strokeWidth=".5"
        />
        <path
          d="M13 41 C13 41 8 37 8 30 C8 22 15 16 23 15 C27 14 30 15 30 15 C19 19 15 27 15 35Z"
          fill="#2e5e2e"
        />
        <path
          d="M30 15 C30 15 33 9 45 9 C55 9 65 13 69 17 L66 15 C56 13 42 11 30 15Z"
          fill="#4a8a4a"
        />
        <path d="M82 29 C82 29 88 31 90 37 L86 37 L84 29Z" fill="#2e5e2e" />
        {[42, 50, 58, 66].map((cx) => (
          <circle key={cx} cx={cx} cy={23} r="2" fill="#1e3a1e" />
        ))}
        <path
          d="M42 23 L50 21 M50 21 L58 21 M58 21 L66 22"
          stroke="#8aba8a"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M23 33 C29 29 41 27 55 29"
          stroke="#5aba5a"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M39 15 L37 29 L49 29 L47 15Z" fill="#4a8a4a" opacity=".7" />
      </motion.svg>
    </div>
  );
};

const ByuleObject: React.FC<ObjectProps> = ({ hovered }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 140,
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", width: 90, height: 72 }}>
        <svg
          width="90"
          height="72"
          viewBox="0 0 80 60"
          fill="none"
          style={{ position: "relative", zIndex: 1 }}
        >
          <rect
            x="4"
            y="20"
            width="72"
            height="36"
            rx="4"
            fill="#3d2a5a"
            stroke="#7a5aaa"
            strokeWidth=".8"
          />
          <path
            d="M4 20 L40 44 L76 20"
            stroke="#7a5aaa"
            strokeWidth=".8"
            fill="none"
          />
          <path
            d="M4 20 L4 56 L40 44Z"
            fill="#4a3568"
            stroke="#7a5aaa"
            strokeWidth=".5"
          />
          <path
            d="M76 20 L76 56 L40 44Z"
            fill="#4a3568"
            stroke="#7a5aaa"
            strokeWidth=".5"
          />
        </svg>
        <motion.svg
          viewBox="0 0 80 28"
          fill="none"
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            width: 90,
            zIndex: 2,
            transformOrigin: "50% 0%",
          }}
          animate={hovered ? { rotateX: 160 } : { rotateX: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <path
            d="M4 20 L40 2 L76 20Z"
            fill="#5a3d7a"
            stroke="#9a7aca"
            strokeWidth=".8"
          />
        </motion.svg>
        <motion.div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 64,
            height: 44,
            background: "#f5f0e8",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            zIndex: 3,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={hovered ? { opacity: 1, y: -16 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {[42, 34, 38].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 2,
                background: "#c8baa8",
                borderRadius: 1,
              }}
            />
          ))}
        </motion.div>
      </div>
      {[
        [18, 22],
        [70, 18],
        [12, 55],
        [74, 58],
      ].map(([x, y], i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            color: "#c8a8e8",
            fontSize: 10,
            pointerEvents: "none",
          }}
          animate={
            hovered
              ? { opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.2, 0.8] }
              : { opacity: 0.2 }
          }
          transition={{
            duration: 1.2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          ★
        </motion.div>
      ))}
    </div>
  );
};

const SolarObject: React.FC<ObjectProps> = ({ hovered }) => {
  const orbitStyle = (dur: number) => ({
    animation: hovered ? `orbit-spin ${dur}s linear infinite` : "none",
  });
  return (
    <div
      style={{
        position: "relative",
        width: 140,
        height: 140,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {[
        [15, 20],
        [120, 30],
        [10, 110],
        [130, 100],
        [70, 10],
        [60, 130],
      ].map(([x, y], i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "#fff",
            pointerEvents: "none",
          }}
          animate={hovered ? { opacity: [0.2, 0.9, 0.2] } : { opacity: 0.15 }}
          transition={{
            duration: 1.5 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      <div style={{ position: "relative", width: 100, height: 100 }}>
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#f5c842",
            zIndex: 3,
          }}
          animate={
            hovered
              ? {
                  boxShadow: [
                    "0 0 6px #f5c842",
                    "0 0 18px #f5c842",
                    "0 0 6px #f5c842",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div
          className="orbit"
          style={{ width: 38, height: 38, ...orbitStyle(2) }}
        >
          <div
            className="planet"
            style={{
              width: 6,
              height: 6,
              background: "#a8d8ea",
              marginTop: -3,
            }}
          />
        </div>
        <div
          className="orbit"
          style={{ width: 62, height: 62, ...orbitStyle(3.8) }}
        >
          <div
            className="planet"
            style={{
              width: 8,
              height: 8,
              background: "#e07b54",
              marginTop: -4,
            }}
          />
        </div>
        <div
          className="orbit"
          style={{ width: 88, height: 88, ...orbitStyle(6) }}
        >
          <div
            className="planet"
            style={{
              width: 7,
              height: 7,
              background: "#7bc4a0",
              marginTop: -3.5,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const HumanObject: React.FC<ObjectProps> = ({ hovered }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 160,
        height: 155,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 55%, rgba(200,20,20,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        animate={{ opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4 }}
      />
      <svg width="120" height="145" viewBox="0 0 120 140" fill="none">
        <rect
          x="10"
          y="86"
          width="100"
          height="42"
          rx="9"
          fill="#220e0e"
          stroke="#4a1a1a"
          strokeWidth="1"
        />
        <rect
          x="16"
          y="92"
          width="88"
          height="30"
          rx="6"
          fill="#180808"
          stroke="#2e1010"
          strokeWidth=".5"
        />
        <circle
          cx="88"
          cy="105"
          r="12"
          fill="#991010"
          stroke="#660a0a"
          strokeWidth="1.5"
        />
        <circle cx="88" cy="105" r="8" fill="#cc1818" />
        <circle cx="84" cy="101" r="3" fill="#ee5050" opacity=".5" />
        <text
          x="88"
          y="109"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="8"
          fill="#ffaaaa"
          opacity=".85"
        >
          A
        </text>
        <circle
          cx="68"
          cy="116"
          r="9"
          fill="#806010"
          stroke="#5a4008"
          strokeWidth="1"
        />
        <circle cx="68" cy="116" r="6" fill="#c0a018" />
        <circle cx="65" cy="113" r="2" fill="#e8c838" opacity=".5" />
        <text
          x="68"
          y="120"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="7"
          fill="#f0d860"
          opacity=".8"
        >
          B
        </text>
        <circle
          cx="38"
          cy="106"
          r="20"
          fill="#150606"
          stroke="#3a1010"
          strokeWidth="1.5"
        />
        <circle
          cx="38"
          cy="106"
          r="15"
          fill="#0e0404"
          stroke="#250a0a"
          strokeWidth=".5"
        />
        <line
          x1="38"
          y1="93"
          x2="38"
          y2="119"
          stroke="#2a0808"
          strokeWidth="1"
          opacity=".5"
        />
        <line
          x1="25"
          y1="106"
          x2="51"
          y2="106"
          stroke="#2a0808"
          strokeWidth="1"
          opacity=".5"
        />
        <motion.g
          style={{ transformOrigin: "38px 114px" }}
          animate={
            hovered
              ? { rotate: [0, -16, 16, -13, 13, -7, 7, -3, 3, 0] }
              : { rotate: 0 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <rect x="35" y="74" width="6" height="36" rx="3" fill="#5a1a1a" />
          <ellipse cx="38" cy="94" rx="7" ry="2.5" fill="#000" opacity=".3" />
          <circle
            cx="38"
            cy="70"
            r="16"
            fill="#cc1515"
            stroke="#880808"
            strokeWidth="1.5"
          />
          <circle cx="32" cy="64" r="5" fill="#ee4444" opacity=".5" />
          <circle cx="30" cy="62" r="2.5" fill="#ff8080" opacity=".4" />
          <path
            d="M44 76 C48 72 50 67 48 63"
            stroke="#880808"
            strokeWidth="1.5"
            fill="none"
            opacity=".4"
          />
        </motion.g>
        <ellipse cx="38" cy="112" rx="8" ry="3" fill="#000" opacity=".5" />
      </svg>
    </div>
  );
};

const OBJECTS: { [key: string]: React.FC<ObjectProps> } = {
  saveme: SaveMeObject,
  rungogh: RunGoghObject,
  byulee: ByuleObject,
  solar: SolarObject,
  human: HumanObject,
};

/* ════════════════════════════════════════
   PROJECT CARD COMPONENT
   ════════════════════════════════════════ */
interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const Obj = OBJECTS[project.id];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = () => {
    if (isMobile) {
      // 1. 탭 즉시 꾹 눌리는 피드백 효과(스케일 다운) 및 애니메이션 기동
      setIsClicked(true);
      setHovered(true);

      // 2. 200ms 후 카드를 복원하여 튕기는 물리 반동(Spring) 체감 부여
      setTimeout(() => {
        setIsClicked(false);
      }, 200);

      // 3. 총 600ms 동안 물리 피드백 및 애니메이션 전개를 충족한 후 자연스럽게 모달 오픈
      setTimeout(() => {
        onClick(project);

        setTimeout(() => {
          setHovered(false);
        }, 300);
      }, 600);
    } else {
      // 데스크톱은 지체 없이 바로 모달 호출
      onClick(project);
    }
  };

  return (
    <motion.div
      className={`proj-card${project.wide ? " card-wide" : ""}`}
      style={{ background: project.color }}
      animate={isClicked ? { scale: 0.94 } : { scale: 1 }}
      onHoverStart={() => !isMobile && setHovered(true)}
      onHoverEnd={() => !isMobile && setHovered(false)}
      onClick={handleCardClick}
      whileHover={!isMobile ? { y: -6 } : {}}
      whileTap={!isMobile ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      layout
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 80% 50%, ${project.color}22 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <div className="card-left">
        <div className="card-meta">
          {project.category} <span className="slash">·</span> {project.cardDate}
          <br />
          {project.sub}
        </div>
        <div className="card-name" style={{ color: project.textColor }}>
          {project.name.join(' ')}
        </div>
        <div>
          <div className="card-tags">
            {project.tags.slice(0, 3).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="card-right">
        {/* 모바일에서는 상시 실행 대신 탭 액션 시에만 실행되므로, hovered 값을 넘겨줌 */}
        {Obj && <Obj hovered={hovered} />}
      </div>
    </motion.div>
  );
};

/* ════════════════════════════════════════
   DETAIL PANEL (MODAL)
   ════════════════════════════════════════ */
interface DetailPanelProps {
  project: Project;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.classList.add("locked");
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.classList.remove("locked");
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <motion.div
      className="overlay active"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="overlay-bg" onClick={onClose} />
      <motion.div
        className="detail-panel"
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {/* Hero Area */}
        <div className="detail-hero" style={{ background: project.color }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 80% 50%, ${project.textColor}22 0%, transparent 65%)`,
            }}
          />
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
          <div className="detail-hero-content">
            <div className="detail-title" style={{ color: project.textColor }}>
              {project.name.join(" ")}
            </div>
            <div className="detail-category">{project.date}</div>
            <div className="detail-tags">
              {project.tags.map((t) => (
                <span key={t} className="detail-tag">
                  {t}
                </span>
              ))}
              {project.award && (
                <span
                  className="detail-tag"
                  style={{
                    background: "rgba(255,210,80,.15)",
                    color: "#f0d060",
                  }}
                >
                  🏆 {project.award}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body Area */}
        <div className="detail-body">
          {/* Problem */}
          <div className="detail-section">
            <div className="section-label">Problem</div>
            {project.detail.problem.map((p, i) => (
              <div key={i} className="problem-block">
                <div className="pb-label">{p.label}</div>
                <div className="pb-text">{p.text}</div>
              </div>
            ))}
          </div>

          {/* Tech Choices */}
          <div className="detail-section">
            <div className="section-label">Tech Choices</div>
            <div className="tech-row">
              {project.detail.techs.map((t, i) => (
                <div key={i} className="tech-card">
                  <div className="tech-name">{t.name}</div>
                  <div className="tech-reason">{t.reason}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trial & Error */}
          <div className="detail-section">
            <div className="section-label">Trial & Error</div>
            <div className="problem-block">
              <div className="pb-text">{project.detail.trial}</div>
            </div>
          </div>

          {/* Results */}
          <div className="detail-section">
            <div className="section-label">Results</div>
            <div className="result-row">
              {project.detail.results.map((r, i) => (
                <div key={i} className="result-card">
                  <div
                    className="result-num"
                    style={{ color: project.textColor }}
                  >
                    {r.num}
                  </div>
                  <div className="result-desc">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="detail-section">
            <div className="section-label">Links</div>
            <div className="links-row">
              <a
                className="link-btn"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════════════════════
   MAIN PROJECTS PAGE COMPONENT
   ════════════════════════════════════════ */
const FILTERS = ["all", "web", "app", "game"];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = PROJECTS.filter(
    (p) => filter === "all" || p.filter === filter,
  );

  return (
    <div className="page">
      <PageHeader label="" title="PROJECTS" />

      <div className="filter-row">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div className="cards-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              className={p.wide ? "card-wide" : ""}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ProjectCard project={p} onClick={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <DetailPanel
            key="detail"
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
