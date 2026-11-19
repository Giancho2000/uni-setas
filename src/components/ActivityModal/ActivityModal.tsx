import { ui } from '../../data/ui';
import type { Activity } from '../../types';
import { getActivityImage, placeholderImage } from '../../utils/getActivityImage';
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback';
import { Modal } from '../Modal/Modal';
import { WeekBadge } from '../WeekBadge/WeekBadge';
import styles from './ActivityModal.module.css';

interface ActivityModalProps {
  activity: Activity | null;
  onClose: () => void;
}

function TextValue({ value }: { value: string }) {
  return value.trim() ? <p>{value}</p> : <p className={styles.empty}>{ui.notDefined}</p>;
}

function ListValue({ items }: { items: string[] }) {
  const filled = items.filter((item) => item.trim());
  if (filled.length === 0) return <p className={styles.empty}>{ui.notDefined}</p>;
  return (
    <ul className={styles.list}>
      {filled.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ActivityModal({ activity, onClose }: ActivityModalProps) {
  if (!activity) return null;
  const fields = ui.activityFields;
  const image = getActivityImage(activity.image);

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={activity.title}
      eyebrow={<WeekBadge week={activity.week} />}
    >
      <ImageWithFallback
        className={styles.media}
        src={image.src}
        alt={image.isPlaceholder ? '' : activity.imageAlt}
        fallbackSrc={placeholderImage}
        width={900}
        height={600}
        loading="eager"
      />
      <dl className={styles.details}>
        <div className={styles.item}>
          <dt>{fields.duration}</dt>
          <dd>
            <TextValue value={activity.duration} />
          </dd>
        </div>
        <div className={styles.item}>
          <dt>{fields.strategy}</dt>
          <dd>
            <TextValue value={activity.strategy} />
          </dd>
        </div>
        <div className={styles.item}>
          <dt>{fields.channels}</dt>
          <dd>
            <ListValue items={activity.channels} />
          </dd>
        </div>
        <div className={styles.item}>
          <dt>{fields.responsible}</dt>
          <dd>
            <TextValue value={activity.responsible} />
          </dd>
        </div>
        <div className={styles.item}>
          <dt>{fields.resources}</dt>
          <dd>
            <ListValue items={activity.resources} />
          </dd>
        </div>
        <div className={styles.item}>
          <dt>{fields.indicators}</dt>
          <dd>
            <ListValue items={activity.indicators} />
          </dd>
        </div>
      </dl>
    </Modal>
  );
}
