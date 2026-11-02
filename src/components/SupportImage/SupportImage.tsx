import { useState, type CSSProperties } from 'react';
import { ui } from '../../data/ui';
import { getImage, placeholderImage } from '../../utils/getImage';
import styles from './SupportImage.module.css';

interface SupportImageProps {
  /** File name inside `src/assets/images/home/`; `null` shows the placeholder. */
  name: string | null;
  alt: string;
  /** CSS aspect-ratio, e.g. `'3 / 2'`. Defaults to the `--support-ratio` token. */
  ratio?: string;
}

const WIDTH = 1200;
const HEIGHT = 800;

/** Support image of a Home section with a reserved frame and a placeholder fallback. */
export function SupportImage({ name, alt, ratio }: SupportImageProps) {
  const resolved = getImage('home', name);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const isPlaceholder = resolved.isPlaceholder || failedSrc === resolved.src;
  const frameStyle = ratio ? ({ '--ratio': ratio } as CSSProperties) : undefined;

  return (
    <figure className={styles.figure}>
      <div className={styles.frame} style={frameStyle}>
        <img
          className={styles.image}
          src={isPlaceholder ? placeholderImage : resolved.src}
          alt={isPlaceholder ? '' : alt}
          width={WIDTH}
          height={HEIGHT}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (!isPlaceholder) setFailedSrc(resolved.src);
          }}
        />
      </div>
      {isPlaceholder && (
        <figcaption className={styles.caption}>{ui.home.supportImagePending}</figcaption>
      )}
    </figure>
  );
}
