import { useState, type CSSProperties } from 'react';
import { ui } from '../../data/ui';
import { getImage, placeholderImage, type ImageFolder } from '../../utils/getImage';
import styles from './SupportImage.module.css';

interface SupportImageProps {
  /** Base file name inside `src/assets/images/<folder>/`; `null` shows the placeholder. */
  name: string | null;
  /** Image folder; defaults to `home`. */
  folder?: ImageFolder;
  alt: string;
  /** CSS aspect-ratio, e.g. `'3 / 2'`. Defaults to the `--support-ratio` token. */
  ratio?: string;
}

const WIDTH = 1200;
const HEIGHT = 800;

/** Support image of a section with a reserved frame and a placeholder fallback. */
export function SupportImage({ name, alt, ratio, folder = 'home' }: SupportImageProps) {
  const resolved = getImage(folder, name);
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
