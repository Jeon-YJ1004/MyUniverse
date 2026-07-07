import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useTheme, ThemeProvider } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { CanvasBackground } from './components/CanvasBackground';
import { Cursor } from './components/Cursor';

// Pages
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';

// Global Styles
import './styles/index.css';

// 스크롤 복원(Scroll Restoration) 컴포넌트
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      {/* 페이지 이동 시 스크롤 맨 위로 초기화 */}
      <ScrollToTop />

      {/* 마우스 인터랙티브 커서 */}
      <Cursor />

      {/* 우주 공간 애니메이션 배경 */}
      <CanvasBackground />

      {/* 상단 공통 내비게이션 바 */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* 페이지 라우팅 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
