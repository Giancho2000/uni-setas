import { ArrowRight } from 'lucide-react';
import { ui } from '../../data/ui';
import type { Activity } from '../../types';
import { getActivityImage, placeholderImage } from '../../utils/getActivityImage';
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback';
import { WeekBadge } from '../WeekBadge/WeekBadge';
import styles from './ActivityCard.module.css';

interface ActivityCardProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}

/**
 * Card with a "stretched" button inside the heading: the whole card is clickable,
 * the heading keeps its semantics and the button's accessible name includes week and title.
 */
export function ActivityCard({ activity, onSelect }: ActivityCardProps) {
  const image = getActivityImage(activity.image);

  return (
    <article className={styles.card}>
      <ImageWithFallback
        src={image.src}
        alt={image.isPlaceholder ? '' : activity.imageAlt}
        fallbackSrc={placeholderImage}
      />
      <div className={styles.content}>
        <WeekBadge week={activity.week} />
        <h3 className={styles.title}>
          <button
            type="button"
            className={styles.button}
            aria-haspopup="dialog"
            onClick={() => onSelect(activity)}
          >
            <span className="sr-only">
              {ui.week} {activity.week}:{' '}
            </span>
            {activity.title}
          </button>
        </h3>
        <p className={styles.summary}>{activity.summary}</p>
        <span className={styles.more} aria-hidden="true">
          {ui.viewDetail}
          <ArrowRight className={styles.moreIcon} />
        </span>
      </div>
    </article>
  );
}
