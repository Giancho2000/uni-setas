import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  as?: 'h1' | 'h2';
  title: string;
  subtitle?: string;
  eyebrow?: string;
  id?: string;
}

export function SectionTitle({
  as: Heading = 'h2',
  title,
  subtitle,
  eyebrow,
  id,
}: SectionTitleProps) {
  return (
    <div className={styles.wrapper}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Heading id={id} className={Heading === 'h1' ? styles.h1 : styles.h2}>
        {title}
      </Heading>
      {!eyebrow && <span className={styles.rule} aria-hidden="true" />}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
