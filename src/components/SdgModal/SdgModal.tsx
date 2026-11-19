import { sdgLevels } from '../../data/sdg';
import { ui } from '../../data/ui';
import type { Sdg } from '../../types';
import { getImage, placeholderImage } from '../../utils/getImage';
import { resolveSdgActivities, resolveSdgIndicators } from '../../utils/sdg';
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback';
import { Modal } from '../Modal/Modal';
import { SdgBadge } from '../SdgBadge/SdgBadge';
import styles from './SdgModal.module.css';

interface SdgModalProps {
  sdg: Sdg | null;
  onClose: () => void;
}

/** Detail of an SDG: explanation, targets, supporting activities and success indicators. */
export function SdgModal({ sdg, onClose }: SdgModalProps) {
  if (!sdg) return null;

  const level = sdgLevels.find((item) => item.id === sdg.level);
  const activities = resolveSdgActivities(sdg).sort((a, b) => a.week - b.week);
  const indicators = resolveSdgIndicators(sdg);
  const image = getImage('sdg', sdg.image);
  const labels = ui.sdg.modal;

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={`${ui.sdg.sdgPrefix} ${sdg.id}: ${sdg.name}`}
      eyebrow={
        <span className={styles.eyebrow}>
          <SdgBadge sdg={sdg} showName={false} size="sm" />
          {level && <span className={styles.level}>{level.title}</span>}
        </span>
      }
    >
      <div className={styles.content}>
        <ImageWithFallback
          className={styles.media}
          src={image.src}
          alt={image.isPlaceholder ? '' : sdg.imageAlt}
          fallbackSrc={placeholderImage}
          width={900}
          height={600}
          loading="eager"
        />

        <section className={styles.block}>
          <h3 className={styles.heading}>{labels.explanation}</h3>
          {sdg.detail.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className={styles.block}>
          <h3 className={styles.heading}>{labels.targets}</h3>
          <ul className={styles.list}>
            {sdg.targets.map((target) => (
              <li key={target.code}>
                <strong className={styles.code}>
                  {ui.sdg.targetLabel} {target.code}
                </strong>{' '}
                — {target.text}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h3 className={styles.heading}>{labels.activities}</h3>
          <ul className={styles.list}>
            {activities.map((activity) => (
              <li key={activity.id}>
                <strong>
                  {ui.sdg.week} {activity.week}
                </strong>{' '}
                · {activity.title}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h3 className={styles.heading}>{labels.indicators}</h3>
          {indicators.length === 0 ? (
            <p className={styles.notMeasured}>
              <strong>{ui.sdg.notMeasured}.</strong> {ui.sdg.longTerm}.
            </p>
          ) : (
            <ul className={styles.list}>
              {indicators.map((indicator) => (
                <li key={indicator.id}>
                  <strong>{indicator.label}:</strong> {indicator.description}{' '}
                  <span className={styles.target}>
                    ({ui.home.targetLabel}:{' '}
                    {indicator.target
                      ? [indicator.target.value, indicator.target.detail].filter(Boolean).join(' ')
                      : ui.home.targetPending}
                    )
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Modal>
  );
}
