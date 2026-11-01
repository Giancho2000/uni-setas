import type { Pillar } from '../../types';
import { PillarIcon } from '../PillarIcon/PillarIcon';
import styles from './PillarCard.module.css';

interface PillarCardProps {
  pillar: Pillar;
}

export function PillarCard({ pillar }: PillarCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.iconCircle}>
        <PillarIcon icon={pillar.icon} className={styles.icon} />
      </span>
      <h3 className={styles.title}>{pillar.title}</h3>
      <p className={styles.description}>{pillar.description}</p>
    </article>
  );
}
