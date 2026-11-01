import { ui } from '../../data/ui';
import styles from './WeekBadge.module.css';

interface WeekBadgeProps {
  week: number;
}

export function WeekBadge({ week }: WeekBadgeProps) {
  return (
    <span className={styles.badge}>
      {ui.week} {week}
    </span>
  );
}
