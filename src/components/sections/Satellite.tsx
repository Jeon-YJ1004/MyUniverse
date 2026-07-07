import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SatelliteProps {
  href: string;
  label: string;
  tip: string;
  glow: string;
  orbitSize: number;
  duration: string;
  orbitAnimName: string;
  counterAnimName: string;
  startDelay?: string;
  icon: React.ReactNode;
}

export const Satellite: React.FC<SatelliteProps> = ({
  href,
  label,
  tip,
  glow,
  orbitSize,
  duration,
  orbitAnimName,
  counterAnimName,
  startDelay = '0s',
  icon,
}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="satellite-orbit"
      style={{
        width: `${orbitSize}px`,
        height: `${orbitSize}px`,
        animationName: orbitAnimName,
        animationDuration: duration,
        animationDelay: startDelay,
      }}
    >
      <div
        className="satellite-wrap"
        style={{
          animationName: counterAnimName,
          animationDuration: duration,
          animationDelay: startDelay,
        }}
      >
        <Link
          className="satellite"
          to={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={(e) => {
            e.preventDefault();
            document.body.style.transition = 'opacity 0.35s';
            document.body.style.opacity = '0';
            setTimeout(() => {
              navigate(href);
              document.body.style.opacity = '1';
            }, 320);
          }}
        >
          <div
            className="sat-icon"
            style={{
              '--glow': glow,
              transform: hovered ? 'scale(1.15)' : 'scale(1)',
            } as React.CSSProperties}
          >
            {icon}
          </div>
          <span
            className="sat-label"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(4px)',
            }}
          >
            {label}
          </span>

          {/* 위성 바로 하단 툴팁 */}
          {hovered && (
            <div
              className="sat-tooltip visible"
              style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {tip}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Satellite;
