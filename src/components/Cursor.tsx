import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 모바일 기기(터치스크린)인 경우 커스텀 커서를 노출하지 않음
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.satellite') ||
        target.closest('.tech-card') ||
        target.closest('.work-item');

      setIsHovered(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 기존 브라우저 기본 커서 비활성화
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 점 (커서 코어) */}
      <div
        style={{
          position: 'fixed',
          width: isHovered ? '14px' : '8px',
          height: isHovered ? '14px' : '8px',
          backgroundColor: 'var(--text)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          left: `${position.x}px`,
          top: `${position.y}px`,
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
        }}
      />
      {/* 바깥 고리 (커서 링) */}
      <div
        style={{
          position: 'fixed',
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          border: '1px solid rgba(232, 228, 216, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isHovered ? 0.5 : 0.8,
          transition: 'transform 0.08s ease-out, width 0.25s, height 0.25s, opacity 0.25s',
        }}
      />
    </>
  );
};
export default Cursor;
