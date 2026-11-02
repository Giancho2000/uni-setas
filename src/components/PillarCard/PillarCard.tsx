import type { Pillar } from '../../types';
import { PillarIcon } from '../PillarIcon/PillarIcon';
import styles from './PillarCard.module.css';

interface PillarCardProps {
  pillar: Pillar;
  /** Heading level of the title, to keep the page outline sequential. Defaults to h3. */
  headingLevel?: 'h3' | 'h4';
}

export function PillarCard({ pillar, headingLevel: Heading = 'h3' }: PillarCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.iconCircle}>
        <PillarIcon icon={pillar.icon} className={styles.icon} />
      </span>
      <Heading className={styles.title}>{pillar.title}</Heading>
      <p className={styles.description}>{pillar.description}</p>
    </article>
  );
}
