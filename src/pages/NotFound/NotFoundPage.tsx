import { Link } from 'react-router-dom';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { ui } from '../../data/ui';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={`container ${styles.page}`}>
      <SectionTitle as="h1" title={ui.notFound.title} subtitle={ui.notFound.text} />
      <Link to="/" className={styles.link}>
        {ui.notFound.backHome}
      </Link>
    </div>
  );
}
