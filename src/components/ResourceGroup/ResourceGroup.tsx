import type { ResourceGroup as ResourceGroupData } from '../../types';
import { AppIcon } from '../AppIcon/AppIcon';
import styles from './ResourceGroup.module.css';

interface ResourceGroupProps {
  group: ResourceGroupData;
}

/** A category of resources with its item list. */
export function ResourceGroup({ group }: ResourceGroupProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.iconCircle}>
          <AppIcon name={group.icon} className={styles.icon} />
        </span>
        <h3 className={styles.title}>{group.category}</h3>
      </div>
      <ul className={styles.items}>
        {group.items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
