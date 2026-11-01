import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ui } from '../../data/ui';
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.css';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main" className={styles.skipLink}>
        {ui.skipToContent}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
