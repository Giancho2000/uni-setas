import styles from './ObjectiveList.module.css';

interface ObjectiveListProps {
  objectives: string[];
  /** Accessible name of the list. */
  label: string;
}

/** Ordered list of objectives with a large decorative number. */
export function ObjectiveList({ objectives, label }: ObjectiveListProps) {
  return (
    <ol className={styles.list} aria-label={label}>
      {objectives.map((objective, i) => (
        <li key={objective} className={styles.item}>
          <span className={styles.number} aria-hidden="true">
            {i + 1}
          </span>
          <span className={styles.text}>{objective}</span>
        </li>
      ))}
    </ol>
  );
}
