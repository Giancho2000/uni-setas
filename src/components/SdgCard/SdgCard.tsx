import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { ui } from '../../data/ui';
import type { Sdg } from '../../types';
import { getImage, placeholderImage } from '../../utils/getImage';
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback';
import { SdgBadge } from '../SdgBadge/SdgBadge';
import styles from './SdgCard.module.css';

interface SdgCardProps {
  sdg: Sdg;
  /** Level label shown on the card, e.g. "Contribución directa". */
  levelLabel: string;
  onSelect: (sdg: Sdg) => void;
  headingLevel?: 3 | 4;
}

const IMAGE_WIDTH = 900;
const IMAGE_HEIGHT = 600;

/**
 * Interactive SDG card. Same pattern as ActivityCard: a "stretched" button inside the heading
 * makes the whole card clickable while the heading keeps its semantics.
 */
export function SdgCard({ sdg, levelLabel, onSelect, headingLevel = 3 }: SdgCardProps) {
  const Heading = headingLevel === 4 ? 'h4' : 'h3';
  const image = getImage('sdg', sdg.image);
  const accent = { '--card-accent': `var(--sdg-${sdg.id})` } as CSSProperties;
  const isLongTerm = sdg.level === 'indirecta';

  return (
    <article className={styles.card} style={accent}>
      {/* Decorative: the SDG number and name are announced by the heading button. */}
      <ImageWithFallback
        className={styles.media}
        src={image.src}
        alt=""
        fallbackSrc={placeholderImage}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
      />
      <div className={styles.content}>
        {/* The number and name are already announced by the button below. */}
        <span aria-hidden="true">
          <SdgBadge sdg={sdg} showName={false} />
        </span>
        <Heading className={styles.title}>
          <button
            type="button"
            className={styles.button}
            aria-haspopup="dialog"
            onClick={() => onSelect(sdg)}
          >
            <span className="sr-only">{`${ui.sdg.sdgPrefix} ${sdg.id}:`}</span> {sdg.name}
          </button>
        </Heading>
        <p className={styles.level} data-long-term={isLongTerm}>
          {isLongTerm ? `${levelLabel} · ${ui.sdg.longTerm}` : levelLabel}
        </p>
        <p className={styles.summary}>{sdg.summary}</p>
        <span className={styles.more} aria-hidden="true">
          {ui.sdg.viewRelation}
          <ArrowRight className={styles.moreIcon} />
        </span>
      </div>
    </article>
  );
}
