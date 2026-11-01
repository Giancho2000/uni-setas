import { useState } from 'react';
import { ActivityCard } from '../../components/ActivityCard/ActivityCard';
import { ActivityModal } from '../../components/ActivityModal/ActivityModal';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { activities } from '../../data/activities';
import { ui } from '../../data/ui';
import type { Activity } from '../../types';
import styles from './ActivitiesPage.module.css';

const sortedActivities = [...activities].sort((a, b) => a.week - b.week);

export function ActivitiesPage() {
  const [selected, setSelected] = useState<Activity | null>(null);

  return (
    <div className="container">
      <SectionTitle
        as="h1"
        title={ui.pages.activities.title}
        subtitle={ui.pages.activities.intro}
      />
      <ul className={styles.grid}>
        {sortedActivities.map((activity) => (
          <li key={activity.id}>
            <ActivityCard activity={activity} onSelect={setSelected} />
          </li>
        ))}
      </ul>
      <ActivityModal activity={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
