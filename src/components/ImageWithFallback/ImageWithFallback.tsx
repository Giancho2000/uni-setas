import { useState } from 'react';
import styles from './ImageWithFallback.module.css';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}

/** Image that keeps its aspect ratio and switches to `fallbackSrc` if loading fails. */
export function ImageWithFallback({ src, alt, fallbackSrc, className }: ImageWithFallbackProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasFailed = failedSrc === src;
  const currentSrc = hasFailed ? fallbackSrc : src;

  return (
    <div className={className ? `${styles.frame} ${className}` : styles.frame}>
      <img
        className={styles.image}
        src={currentSrc}
        alt={hasFailed ? '' : alt}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (!hasFailed && src !== fallbackSrc) setFailedSrc(src);
        }}
      />
    </div>
  );
}
