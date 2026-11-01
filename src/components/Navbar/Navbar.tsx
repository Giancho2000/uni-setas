import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Sprout, X } from 'lucide-react';
import { appRoutes } from '../../config/routes';
import { ui } from '../../data/ui';
import type { AppRoute } from '../../types';
import styles from './Navbar.module.css';

const DESKTOP_QUERY = '(min-width: 40rem)';
const MENU_ID = 'main-menu';

interface NavbarProps {
  routes?: AppRoute[];
}

export function Navbar({ routes = appRoutes }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const navRoutes = routes.filter((route) => route.showInNav);

  const close = useCallback(() => setIsOpen(false), []);

  // Close whenever the route changes.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Close with Escape and return focus to the toggle button.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  // Close when the viewport grows to the desktop layout.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [close]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <Sprout className={styles.brandIcon} aria-hidden="true" />
          <span>{ui.siteShortName}</span>
        </Link>

        <button
          ref={buttonRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={MENU_ID}
          aria-label={isOpen ? ui.closeMenu : ui.openMenu}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav aria-label={ui.navAriaLabel} className={styles.nav}>
          <ul id={MENU_ID} className={styles.menu} data-open={isOpen}>
            {navRoutes.map((route) => (
              <li key={route.id}>
                <NavLink
                  to={route.path}
                  end={route.end}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  onClick={close}
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
