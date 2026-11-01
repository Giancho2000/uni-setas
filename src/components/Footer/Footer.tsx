import { project } from '../../data/project';
import { ui } from '../../data/ui';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.name}>{project.name}</p>
        <p>
          {ui.footer.text} · {project.institution}
        </p>
        <p className={styles.small}>
          © {year} · {ui.footer.rights}
        </p>
      </div>
    </footer>
  );
}
