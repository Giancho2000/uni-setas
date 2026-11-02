import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import type { HomeSectionId, SupportImageRef } from '../../types';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SupportImage } from '../SupportImage/SupportImage';
import styles from './Section.module.css';

interface SectionProps {
  id: HomeSectionId;
  title: string;
  eyebrow?: string;
  intro?: string;
  tone?: 'cream' | 'mint';
  image?: SupportImageRef;
  imagePosition?: 'start' | 'end';
  /** Main column, next to the image. */
  children: ReactNode;
  /** Full-width content below the two columns. */
  footer?: ReactNode;
}

/** Home section with alternating background, optional support image and scroll reveal. */
export function Section({
  id,
  title,
  eyebrow,
  intro,
  tone = 'cream',
  image,
  imagePosition = 'end',
  children,
  footer,
}: SectionProps) {
  const { ref, isRevealed } = useReveal<HTMLDivElement>();
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={styles.section} data-tone={tone}>
      <div ref={ref} className={`container reveal ${isRevealed ? 'isRevealed' : ''}`}>
        <SectionTitle id={titleId} title={title} eyebrow={eyebrow} subtitle={intro} />
        <div className={styles.layout} data-image={image ? imagePosition : 'none'}>
          <div className={styles.main}>{children}</div>
          {image && (
            <div className={styles.aside}>
              <SupportImage name={image.image} alt={image.alt} />
            </div>
          )}
        </div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </section>
  );
}
