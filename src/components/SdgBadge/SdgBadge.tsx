import type { CSSProperties } from 'react';
import { ui } from '../../data/ui';
import type { Sdg } from '../../types';
import styles from './SdgBadge.module.css';

interface SdgBadgeProps {
  sdg: Pick<Sdg, 'id' | 'name'>;
  /** Show the SDG name next to the number; when false it stays available to screen readers. */
  showName?: boolean;
  size?: 'sm' | 'md';
}

/** SDG number over its identifying color, always paired with the name (color is never the only cue). */
export function SdgBadge({ sdg, showName = true, size = 'md' }: SdgBadgeProps) {
  const colors = {
    '--badge-bg': `var(--sdg-${sdg.id})`,
    '--badge-fg': `var(--sdg-${sdg.id}-on)`,
  } as CSSProperties;

  return (
    <span className={styles.badge} data-size={size} style={colors}>
      <span className={styles.number}>
        <span className={styles.prefix}>{ui.sdg.sdgPrefix}</span> {sdg.id}
      </span>
      <span className={showName ? styles.name : 'sr-only'}>{sdg.name}</span>
    </span>
  );
}
