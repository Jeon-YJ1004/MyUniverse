import React, { useEffect, useRef, type ReactNode } from 'react';

/* ── SECTION HEADER ── */
interface SectionHeaderProps {
  label: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label }) => {
  return (
    <div className="section-header" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.75rem' }}>
      <span
        className="section-label"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '13px',
          fontWeight: '700',
          color: 'var(--text)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <div className="section-line" style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
    </div>
  );
};

/* ── PAGE HEADER ── */
interface PageHeaderProps {
  label: string;
  title: ReactNode;
  desc?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ label, title, desc }) => {
  return (
    <div className="page-header" style={{ marginBottom: '5rem' }}>
      <p
        className="page-label"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '13px',
          fontWeight: '700',
          color: 'var(--text)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        {label}
      </p>
      <h1
        className="page-title"
        style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(60px, 9vw, 96px)',
          lineHeight: 0.9,
          color: 'var(--text)',
        }}
      >
        {title}
      </h1>
      {desc && (
        <p
          className="page-desc"
          style={{
            marginTop: '1.5rem',
            fontSize: '16.5px',
            fontWeight: '500',
            color: 'var(--muted)',
            lineHeight: 1.75,
            maxWidth: '520px',
          }}
        >
          {desc}
        </p>
      )}
    </div>
  );
};

/* ── REVEAL ON SCROLL ── */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(24px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ── TAG PILL ── */
interface TagProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export const Tag: React.FC<TagProps> = ({ children, style = {} }) => {
  return (
    <span
      className="tech-tag"
      style={{
        fontFamily: 'var(--mono)',
        fontSize: '11.5px',
        fontWeight: '700',
        padding: '3px 8px',
        borderRadius: '999px',
        background: 'var(--border)',
        color: 'var(--text)',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/* ── RESULT PILL ── */
interface ResultPillProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export const ResultPill: React.FC<ResultPillProps> = ({ children, style = {} }) => {
  return (
    <span
      className="result-pill"
      style={{
        fontFamily: 'var(--mono)',
        fontSize: '11.5px',
        fontWeight: '700',
        padding: '4px 10px',
        borderRadius: '999px',
        background: 'rgba(106, 222, 138, 0.1)',
        border: '0.5px solid rgba(106, 222, 138, 0.25)',
        color: 'var(--accent2)',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
};
