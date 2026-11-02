import { ui } from '../../data/ui';
import type { SuccessIndicator } from '../../types';
import styles from './IndicatorCard.module.css';

interface IndicatorCardProps {
  indicator: SuccessIndicator;
}

/** Success indicator with its evaluation criterion and highlighted target. */
export function IndicatorCard({ indicator }: IndicatorCardProps) {
  const { label, criterion, description, target } = indicator;
  return (
    <article className={styles.card}>
      <p className={styles.criterion}>{criterion}</p>
      <h4 className={styles.label}>{label}</h4>
      <div className={styles.target}>
        <span className="sr-only">{ui.home.targetLabel}: </span>
        {target ? (
          <>
            <span className={styles.value}>{target.value}</span>
            {target.detail && <span className={styles.detail}>{target.detail}</span>}
          </>
        ) : (
          <span className={styles.pending}>{ui.home.targetPending}</span>
        )}
      </div>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
