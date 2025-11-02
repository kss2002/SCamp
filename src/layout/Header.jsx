import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          S.Camp
        </Link>
        <nav className="nav">
          <NavLink to="/ai" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            AI 탐지기
          </NavLink>
          <NavLink to="/board" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            게시판
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            뉴스
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
