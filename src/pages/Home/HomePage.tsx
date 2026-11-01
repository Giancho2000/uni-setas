import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PillarCard } from '../../components/PillarCard/PillarCard';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { getRoutePath } from '../../config/routes';
import { project } from '../../data/project';
import { ui } from '../../data/ui';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>
            {ui.home.eyebrow} · {project.institution}
          </p>
          <h1 id="hero-title" className={styles.title}>
            {project.name}
          </h1>
          <p className={styles.scientific}>
            <em lang="la">{project.scientificName}</em>
          </p>
          <p className={styles.objective}>{project.objective}</p>
          <div className={styles.actions}>
            <Link to={getRoutePath('problems')} className={`${styles.cta} ${styles.primary}`}>
              {ui.home.ctaProblems}
              <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
            </Link>
            <Link to={getRoutePath('activities')} className={`${styles.cta} ${styles.secondary}`}>
              {ui.home.ctaActivities}
              <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={`container ${styles.pillars}`} aria-labelledby="pillars-title">
        <SectionTitle
          id="pillars-title"
          title={ui.pages.home.pillarsTitle}
          subtitle={ui.pages.home.pillarsIntro}
        />
        <ul className={styles.grid}>
          {project.pillars.map((pillar) => (
            <li key={pillar.id}>
              <PillarCard pillar={pillar} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
