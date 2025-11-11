import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChartNoAxesGantt, X } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          S.Camp
        </Link>
        <nav className={isMobile ? 'mobile-nav' : 'desktop-nav'}>
          {isMobile ? (
            <div className="hamburger-menu" onClick={handleMenuToggle}>
              {menuOpen ? <X size={24} /> : <ChartNoAxesGantt size={24} />}
            </div>
          ) : (
            <ul>
              <NavLink to="/ai" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                AI 탐지기
              </NavLink>
              <NavLink to="/board" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                게시판
              </NavLink>
              <NavLink to="/news" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                뉴스
              </NavLink>
            </ul>
          )}
        </nav>
        {isMobile && menuOpen && (
          <div className="mobile-menu">
            <ul>
              <NavLink
                to="/ai"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={handleNavClick}
              >
                AI 탐지기
              </NavLink>
              <NavLink
                to="/board"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={handleNavClick}
              >
                게시판
              </NavLink>
              <NavLink
                to="/news"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={handleNavClick}
              >
                뉴스
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
