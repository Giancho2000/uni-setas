import { ui } from '../../data/ui';
import type { ActivitySdgRow } from '../../utils/sdg';
import { SdgBadge } from '../SdgBadge/SdgBadge';
import styles from './ActivitySdgTable.module.css';

interface ActivitySdgTableProps {
  rows: ActivitySdgRow[];
  caption: string;
}

/** Semantic table relating each work-plan activity with the SDGs it supports. Stacks on mobile. */
export function ActivitySdgTable({ rows, caption }: ActivitySdgTableProps) {
  return (
    <table className={styles.table}>
      <caption className={styles.caption}>{caption}</caption>
      <thead className={styles.head}>
        <tr>
          <th scope="col">{ui.sdg.table.activity}</th>
          <th scope="col">{ui.sdg.table.sdgs}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ activity, sdgs }) => (
          <tr key={activity.id} className={styles.row}>
            <th scope="row" className={styles.activity}>
              <span className={styles.week}>
                {ui.sdg.week} {activity.week}
              </span>
              <span className="sr-only"> · </span>
              <span className={styles.activityTitle}>{activity.title}</span>
            </th>
            <td className={styles.sdgs}>
              <ul className={styles.list}>
                {sdgs.map((sdg) => (
                  <li key={sdg.id}>
                    <SdgBadge sdg={sdg} size="sm" />
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
