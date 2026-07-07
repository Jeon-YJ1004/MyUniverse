import React from 'react';
import { TECH_STACK, TIMELINE_ITEMS } from '../data/portfolioData';
import { PageHeader, SectionHeader, Reveal, Tag } from '../components/ui';
import '../styles/profile.css';

export const Profile: React.FC = () => {
  return (
    <div className="page">
      {/* HEADER */}
      <Reveal>
        <PageHeader
          label=""
          title="ABOUT ME"
          desc={
            <>
              화면 너머에 있는 사용자가 <strong>어떤 순간에 머뭇거리고 불편함을 느끼는지</strong>를 항상 먼저 관찰합니다.
              <br />
              화려한 기술을 쫓기보다는, 기술이 사람에게 주는 가치에 더 관심이 많습니다.
              <br />
              <br />
              다양한 기술 스택을 유연하게 골라 쓰며, 문제 해결을 위해 <strong>'왜 이 도구여야 하는지'</strong> 논리적인 이유를 찾는 과정을 즐깁니다.
            </>
          }
        />
      </Reveal>

      {/* STORY */}
      <Reveal delay={100}>
        <div className="section">
          <SectionHeader label="Story" />
          <div className="about-card">
            <p className="about-text">
              대학에서 컴퓨터공학을 공부하며 사용자 경험(UX)과 프론트엔드 인터랙션에 깊은 흥미를 가지게 되었습니다.
              화면의 미세한 흐름 하나가 사용자의 기분과 행동을 바꿀 수 있다는 것을 깨달은 뒤로,
              단순한 기능 개발을 넘어 **디테일이 살아있는 직관적인 웹 인터페이스**를 만드는 개발자가 되기로 결심했습니다.
            </p>
            <p className="about-text">
              이후 SSAFY에서 다양한 동료들과 함께 5개의 풍부한 프로젝트를 설계하고 구축하며 협업의 즐거움을 깨달았습니다.
              오더체크에서는 1년 2개월간 실무 프론트엔드 엔지니어로 근무하며,
              프로덕션 서비스의 신규 피처 개발뿐만 아니라 동료 개발자들의 생산성을 높이기 위한 공통 디자인 시스템 컴포넌트를 설계하고 npm 패키지로 배포하는 값진 경험을 쌓았습니다.
            </p>
            <div className="about-quote">"코드를 적기 전에 먼저 생각합니다. 이 화면을 마주할 사람은 지금 어떤 기분을 느끼고 있을까."</div>
          </div>
        </div>
      </Reveal>

      {/* TECH STACK */}
      <Reveal delay={200}>
        <div className="section">
          <SectionHeader label="Tech Stack" />
          <div className="tech-grid">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="tech-card"
                style={{ '--tc': tech.color } as React.CSSProperties}
              >
                <div className="tech-top">
                  <div
                    className="tech-icon"
                    style={{
                      background: tech.iconBg,
                      color: tech.iconColor,
                      fontSize: tech.iconFontSize || 'inherit',
                    }}
                  >
                    {tech.iconText}
                  </div>
                  <span className="tech-name">{tech.name}</span>
                  <span
                    className="tech-level"
                    style={{
                      background: tech.iconBg,
                      color: tech.iconColor,
                    }}
                  >
                    {tech.level}
                  </span>
                </div>
                <div className="tech-reason">{tech.reason}</div>
                <div className="tech-tags">
                  {tech.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* TIMELINE */}
      <Reveal delay={300}>
        <div className="section">
          <SectionHeader label="Timeline" />
          <div className="timeline">
            {TIMELINE_ITEMS.map((item) => (
              <div key={item.title} className="tl-item">
                <div
                  className="tl-dot"
                  style={{ '--tl-color': item.color } as React.CSSProperties}
                ></div>
                <div className="tl-year">{item.period}</div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-desc">{item.desc}</div>
                {item.badge && <span className="tl-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Profile;
