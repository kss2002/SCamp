import { Outlet } from 'react-router-dom';
import Header from './Header';
import ScrollToTop from '../hooks/useScrollTop';

export default function Layout() {
  return (
    <>
      <Header />
      {/* ScrollToTop must be inside a Router context */}
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
    </>
  );
}
