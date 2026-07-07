import React, { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
}

interface Nebula {
  x: number;
  y: number;
  r: number;
  color: string;
  alpha: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    let stars: Star[] = [];
    let nebula: Nebula[] = [];
    let shootingStars: ShootingStar[] = [];

    const resize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initScene();
    };

    const initScene = () => {
      // Array.from 최적화 초기화
      stars = Array.from({ length: 280 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.3 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      }));

      const colors = ['rgba(126,184,212,', 'rgba(100,120,180,', 'rgba(80,100,160,'];
      nebula = Array.from({ length: 5 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 180 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.04 + 0.015,
      }));
    };

    const spawnShootingStar = () => {
      const angle = ((Math.random() * 40 + 20) * Math.PI) / 180;
      shootingStars.push({
        x: Math.random() * W * 0.7,
        y: Math.random() * H * 0.3,
        vx: Math.cos(angle) * 5,
        vy: Math.sin(angle) * 5,
        life: 60,
        maxLife: 60,
      });
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const isDark = theme === 'dark';

      // 1. Background Gradient
      if (isDark) {
        const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
        bg.addColorStop(0, '#0c0c1e');
        bg.addColorStop(1, '#04040f');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // 2. Nebula Blobs
        nebula.forEach((n) => {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
          g.addColorStop(0, n.color + n.alpha + ')');
          g.addColorStop(1, n.color + '0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        // Light Mode Background
        const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
        bg.addColorStop(0, '#faf8f2');
        bg.addColorStop(1, '#f4f2ec');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);
      }

      // 3. Stars
      t += 0.008;
      stars.forEach((s) => {
        const a = s.alpha * (0.55 + 0.45 * Math.sin(t * s.speed * 100 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = `rgba(200, 210, 230, ${a * 0.75})`;
        } else {
          ctx.fillStyle = `rgba(40, 70, 150, ${a * 0.2})`;
        }
        ctx.fill();

        // Bright star cross effect
        if (s.r > 1.1 && a > 0.55) {
          ctx.strokeStyle = isDark
            ? `rgba(200, 210, 230, ${a * 0.28})`
            : `rgba(40, 70, 150, ${a * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 3, s.y);
          ctx.lineTo(s.x + s.r * 3, s.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(s.x, s.y - s.r * 3);
          ctx.lineTo(s.x, s.y + s.r * 3);
          ctx.stroke();
        }
      });

      // 4. Shooting Stars
      if (Math.random() < 0.0018) {
        spawnShootingStar();
      }

      shootingStars = shootingStars.filter((ss) => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life--;
        if (ss.life <= 0) return false;

        const a = ss.life / ss.maxLife;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 12, ss.y - ss.vy * 12);

        const g2 = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * 12, ss.y - ss.vy * 12);
        if (isDark) {
          g2.addColorStop(0, `rgba(220, 230, 255, ${a * 0.8})`);
          g2.addColorStop(1, 'rgba(220, 230, 255, 0)');
        } else {
          g2.addColorStop(0, `rgba(40, 70, 150, ${a * 0.3})`);
          g2.addColorStop(1, 'rgba(40, 70, 150, 0)');
        }

        ctx.strokeStyle = g2;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CanvasBackground;
