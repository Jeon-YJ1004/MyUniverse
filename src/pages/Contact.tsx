import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import { PageHeader, SectionHeader, Reveal } from '../components/ui';
import '../styles/contact.css';

interface RepoData {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  url: string;
}

interface GitHubProfile {
  avatarUrl: string;
  followers: number;
  publicRepos: number;
  bio: string;
}

export const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Real GitHub Data (repos & profile)
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const username = 'Jeon-YJ1004';
        
        // Fetch Profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile({
            avatarUrl: profileData.avatar_url,
            followers: profileData.followers,
            publicRepos: profileData.public_repos,
            bio: profileData.bio || 'Frontend Developer',
          });
        }

        // Fetch Repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          
          // 언어별 고유 색상 매핑
          const getLangColor = (lang: string) => {
            const colors: { [key: string]: string } = {
              TypeScript: '#3178c6',
              JavaScript: '#f1e05a',
              HTML: '#e34c26',
              CSS: '#563d7c',
              Vue: '#41b883',
              Python: '#3572A5',
              Dart: '#00B4AB',
              Svelte: '#ff3e00',
            };
            return colors[lang] || '#8b8b8b';
          };

          const formattedRepos = reposData.map((repo: any) => ({
            name: repo.name,
            desc: repo.description || '설명이 등록되지 않은 저장소입니다.',
            lang: repo.language || 'Plain Text',
            langColor: getLangColor(repo.language || ''),
            stars: repo.stargazers_count,
            url: repo.html_url,
          }));
          setRepos(formattedRepos);
        }
      } catch (error) {
        console.error('GitHub API Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Toast Handler
  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2200);
  };

  const copyEmail = () => {
    const email = 'jeon.dev@email.com';
    navigator.clipboard.writeText(email).then(() => showToast('✓ 이메일이 복사됐어요'));
  };

  const downloadResume = () => {
    showToast('📄 이력서를 준비 중이에요');
  };

  // Theme-synchronized GitHub contribution chart color
  const chartGlowColor = useMemo(() => {
    return theme === 'dark' ? '6abaef' : '2a7abb';
  }, [theme]);

  return (
    <div className="page">
      {/* HEADER */}
      <Reveal>
        <PageHeader 
          label="연락처 / 링크" 
          title={<>LET'S<br />TALK</>} 
          desc={<>같이 만들어보고 싶은 게 있다면 편하게 연락해요.<br /><strong>코드로 대화해요.</strong></>}
        />
      </Reveal>

      {/* CONTACT LINKS */}
      <Reveal delay={100} className="section">
        <SectionHeader label="Links" />
        <div className="contact-grid">
          {/* Email */}
          <div
            className="contact-card"
            style={{ '--card-glow': 'rgba(106,186,239,.06)' } as React.CSSProperties}
            onClick={copyEmail}
          >
            <div className="contact-icon" style={{ background: 'rgba(106,186,239,.08)' }}>
              ✉️
            </div>
            <div className="contact-info">
              <div className="contact-type">Email</div>
              <div className="contact-value" id="emailVal">
                jeon.dev@email.com
              </div>
            </div>
            <div className="contact-action">복사 →</div>
          </div>

          {/* GitHub */}
          <a
            className="contact-card"
            href="https://github.com/Jeon-YJ1004"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--card-glow': 'rgba(200,200,200,.04)' } as React.CSSProperties}
          >
            <div className="contact-icon" style={{ background: 'rgba(255,255,255,.06)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>
            <div className="contact-info">
              <div className="contact-type">GitHub</div>
              <div className="contact-value">github.com/Jeon-YJ1004</div>
            </div>
            <div className="contact-action">열기 →</div>
          </a>

          {/* Velog */}
          <a
            className="contact-card"
            href="https://velog.io/@jeon-yj"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--card-glow': 'rgba(32,212,113,.04)' } as React.CSSProperties}
          >
            <div className="contact-icon" style={{ background: 'rgba(32,212,113,.08)', color: '#20d471', fontFamily: 'var(--display)', fontSize: '18px' }}>
              V
            </div>
            <div className="contact-info">
              <div className="contact-type">Velog</div>
              <div className="contact-value">velog.io/@jeon-yj</div>
            </div>
            <div className="contact-action">열기 →</div>
          </a>

          {/* Resume */}
          <div
            className="contact-card"
            style={{ '--card-glow': 'rgba(240,200,80,.04)' } as React.CSSProperties}
            onClick={downloadResume}
          >
            <div className="contact-icon" style={{ background: 'rgba(240,200,80,.08)' }}>
              📄
            </div>
            <div className="contact-info">
              <div className="contact-type">Resume</div>
              <div className="contact-value">이력서 PDF 다운로드</div>
            </div>
            <div className="contact-action">저장 →</div>
          </div>
        </div>
      </Reveal>

      {/* GITHUB ACTIVITY */}
      <Reveal delay={200} className="section">
        <SectionHeader label="GitHub Activity" />

        <div className="github-block">
          <div className="github-header">
            <div className="github-header-left">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="GitHub Profile"
                  className="github-avatar"
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div className="github-avatar">전</div>
              )}
              <div>
                <div className="github-username">Jeon-YJ1004</div>
                <div className="github-sub">
                  {profile ? `${profile.bio} · Followers: ${profile.followers}` : 'Frontend Developer'}
                </div>
              </div>
            </div>
            <a className="github-link" href="https://github.com/Jeon-YJ1004" target="_blank" rel="noopener noreferrer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub 열기
            </a>
          </div>

          <div className="contrib-wrap">
            <div className="contrib-label">Contribution Chart · 실시간 기여 현황</div>
            
            {/* Real GitHub Contribution Chart Widget */}
            <div 
              className="contrib-chart-container"
              style={{
                width: '100%',
                overflowX: 'auto',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                border: '0.5px solid var(--border)',
                marginBottom: '1rem'
              }}
            >
              <img 
                src={`https://ghchart.rshah.org/${chartGlowColor}/Jeon-YJ1004`} 
                alt="Jeon-YJ1004's GitHub Contributions Chart" 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: theme === 'dark' ? 'hue-rotate(0deg)' : 'hue-rotate(0deg) contrast(1.15)',
                }}
              />
            </div>

            <div className="contrib-footer">
              <div className="contrib-total">
                {profile ? `공개 저장소 수: ${profile.publicRepos}개` : '실시간 데이터 로드 중...'}
              </div>
            </div>

            {/* Recent Repositories */}
            <div className="contrib-label" style={{ marginTop: '1.5rem', marginBottom: '10px' }}>
              Recent Repositories (실시간)
            </div>
            
            {loading ? (
              <div style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--mono)', padding: '1rem 0' }}>
                저장소 목록을 깃허브에서 가져오고 있습니다...
              </div>
            ) : repos.length > 0 ? (
              <div className="repos-grid">
                {repos.map((repo) => (
                  <a key={repo.name} className="repo-card" href={repo.url} target="_blank" rel="noopener noreferrer">
                    <div className="repo-name">{repo.name}</div>
                    <div className="repo-desc">{repo.desc}</div>
                    <div className="repo-meta">
                      <span className="repo-lang" style={{ color: repo.langColor }}>
                        {repo.lang}
                      </span>
                      <span>⭐ {repo.stars}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--mono)', padding: '1rem 0' }}>
                저장소를 불러오지 못했습니다.
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* CLOSING */}
      <Reveal delay={300} className="section">
        <div style={{ textAlign: 'center', padding: '3rem 0 2rem' }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: '48px', color: 'var(--text)', lineHeight: 1, marginBottom: '1rem' }}>
            MADE WITH
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '.1em' }}>
            React · Vite · TypeScript · Framer Motion · 📡
          </div>
          <div style={{ marginTop: '2rem', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)' }}>
            © 2026 전영주. All rights reserved.
          </div>
        </div>
      </Reveal>

      {/* Toast Alert */}
      <div className={`toast ${toast.show ? 'show' : ''}`} id="toast">
        {toast.message}
      </div>
    </div>
  );
};

export default Contact;

