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
          label="소개 / 프로필"
          title={
            <>
              ABOUT
              <br />
              ME
            </>
          }
          desc={
            <>
              화면 앞의 사람이 <strong>무엇을 불편해하는지</strong>를 먼저 묻는다.
              <br />
              기술은 그 다음이다.
              <br />
              <br />
              React부터 Flutter까지, 문제에 맞는 도구를 골라 쓰는 것보다
              <br />
              <strong>왜 그 도구를 선택했는지</strong>를 더 중요하게 생각한다.
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
              개발을 시작하게 된 계기는 아르바이트였다. 카페에서 일하며 키오스크를 매일 봤는데, 손님들이 특정 버튼 앞에서
              자꾸 멈췄다. 메뉴 이름이 잘못된 게 아니라 <strong>버튼 위치와 흐름이 잘못된 것</strong>이었다. 그 화면을 고치고
              싶었다. 그게 개발자가 되고 싶다는 생각의 시작이었다.
            </p>
            <p className="about-text">
              서울과기대 컴퓨터공학과를 졸업하고, SSAFY에서 5개 프로젝트를 팀으로 만들었다. 오더체크에서 1년 넘게 실무를
              하면서 배운 건 <strong>"동작하는 코드"와 "유지되는 코드"는 다르다</strong>는 것이었다. npm으로 배포한 디자인시스템이
              그 고민의 결과였다.
            </p>
            <div className="about-quote">"코드를 짜기 전에 가장 먼저 묻는 질문 — 이 화면 앞의 사람은 지금 무엇을 느끼는가."</div>
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
