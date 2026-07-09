import "../styles/experience.css";

import { EDUCATION_LIST, WORK_ITEMS } from "../data/portfolioData";
import { PageHeader, ResultPill, Reveal, Tag } from "../components/ui";
import React, { useState } from "react";

/* 임시 주석 처리 (과다/작위적 지표 비활성화)
interface CountUpProps {
  target: number;
  prev?: number;
  suffix?: string;
  trigger: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ target, prev = 0, suffix = '', trigger }) => {
  const [value, setValue] = useState(prev);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!trigger || animatedRef.current) return;
    animatedRef.current = true;

    let startTime: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
      const currentVal = Math.round(prev + (target - prev) * ease);
      setValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [trigger, target, prev]);

  return (
    <>
      {value.toLocaleString()}
      {suffix}
    </>
  );
};
*/

export const Experience: React.FC = () => {
  // const [statsVisible, setStatsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // const statsRowRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   // Stats CountUp Observer
  //   const statsIO = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((e) => {
  //         if (e.isIntersecting) {
  //           setStatsVisible(true);
  //           statsIO.unobserve(e.target);
  //         }
  //       });
  //     },
  //     { threshold: 0.3 }
  //   );
  //
  //   if (statsRowRef.current) {
  //     statsIO.observe(statsRowRef.current);
  //   }
  //
  //   return () => {
  //     if (statsRowRef.current) {
  //       statsIO.unobserve(statsRowRef.current);
  //     }
  //   };
  // }, []);

  const toggleDetail = (index: number) => {
    return;
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="page">
      {/* HEADER */}
      <Reveal>
        <PageHeader
          label=""
          title="WORK EXPERIENCE"
          desc={
            <>
              코드를 작성하기 전, 해결해야 할 진짜 문제를 깊게 고민합니다.
              <br />
              사용자가 불편함을 느끼는 지점으로부터 시작해 기술로 문제를
              돌파하는 과정을 기록했습니다.
            </>
          }
        />
      </Reveal>

      {/* COMPANY: ORDERCHECK */}
      <Reveal delay={100}>
        <div className="company-block">
          <div className="company-header">
            <div className="company-left">
              <div className="company-name">오더체크</div>
              <div className="company-role">Frontend Developer · 정규직</div>
            </div>
            <div className="company-period">
              <strong>1년 2개월</strong>
              2025.02 — 2026.04
            </div>
          </div>

          {/* STATS COUNTUP (임시 주석 처리 - 과다/작위적 지표 비활성화) */}
          {/*
          <div className="stats-row" ref={statsRowRef}>
            <div className="stat-item">
              <div className="stat-num">
                <CountUp target={32} suffix="배" trigger={statsVisible} />
              </div>
              <div className="stat-label">
                구인구직 피처
                <br />
                활성 유저 성장
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                <CountUp target={4786} prev={149} trigger={statsVisible} />
              </div>
              <div className="stat-label">
                MAU 성장
                <br />
                (149 → 4,786)
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                <CountUp target={3} suffix="개" trigger={statsVisible} />
              </div>
              <div className="stat-label">
                주도적으로
                <br />
                설계한 피처
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                <CountUp target={1} suffix="개" trigger={statsVisible} />
              </div>
              <div className="stat-label">
                npm 배포
                <br />
                디자인시스템
              </div>
            </div>
          </div>
          */}

          {/* WORK ITEMS */}
          <div className="work-list">
            {WORK_ITEMS.map((work, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <div
                  key={work.num}
                  className={`work-item ${isOpen ? "expanded" : ""}`}
                  onClick={() => toggleDetail(idx)}
                >
                  <div>
                    <div className="work-header">
                      <span className="work-num">{work.num}</span>
                      <div className="work-title">{work.title}</div>
                    </div>
                    <div className="work-desc">{work.desc}</div>

                    {/* Accordion Detail */}
                    <div className={`work-detail ${isOpen ? "open" : ""}`}>
                      <div className="work-detail-inner">
                        <div className="detail-card">
                          <div className="detail-card-label">Problem</div>
                          <div className="detail-card-text">
                            {work.detail.problem}
                          </div>
                        </div>
                        <div className="detail-card">
                          <div className="detail-card-label">Solution</div>
                          <div className="detail-card-text">
                            {work.detail.solution}
                          </div>
                        </div>
                        <div className="detail-card">
                          <div className="detail-card-label">
                            Result / Trial
                          </div>
                          <div className="detail-card-text">
                            {work.detail.trial}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="work-meta">
                    <div className="work-tags">
                      {work.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <div className="work-result">
                      <ResultPill>{work.result}</ResultPill>
                    </div>
                  </div>

                  {/* <span className="expand-hint">
                    자세히 <span className="expand-arrow">▼</span>
                  </span> */}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* EDUCATION */}
      <Reveal delay={200}>
        <div className="edu-block">
          <div className="edu-header">
            <div>
              <div className="company-name" style={{ fontSize: "34px" }}>
                Education
              </div>
              <div className="company-role">학력 및 수료 이력</div>
            </div>
          </div>
          <div className="edu-items">
            {EDUCATION_LIST.map((edu) => (
              <div key={edu.title} className="edu-item">
                <div
                  className="edu-dot"
                  style={{
                    background: edu.color,
                    boxShadow: `0 0 8px ${edu.color}`,
                  }}
                ></div>
                <div className="edu-item-left">
                  <div className="edu-item-title">{edu.title}</div>
                  <div className="edu-item-desc">{edu.desc}</div>
                </div>
                <div className="edu-item-period">{edu.period}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Experience;
