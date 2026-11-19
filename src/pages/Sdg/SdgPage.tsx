import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ActivitySdgTable } from '../../components/ActivitySdgTable/ActivitySdgTable';
import { SdgCard } from '../../components/SdgCard/SdgCard';
import { SdgFilter, type SdgFilterOption } from '../../components/SdgFilter/SdgFilter';
import { SdgModal } from '../../components/SdgModal/SdgModal';
import { Section } from '../../components/Section/Section';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { getRoutePath } from '../../config/routes';
import { sdgLevels, sdgPageContent } from '../../data/sdg';
import { ui } from '../../data/ui';
import type { Sdg, SdgFilterValue } from '../../types';
import { getActivitySdgRows, getSdgsByLevel } from '../../utils/sdg';
import styles from './SdgPage.module.css';

const filterOptions: SdgFilterOption[] = [
  { value: 'todos', label: ui.sdg.filterAll },
  ...sdgLevels.map((level) => ({ value: level.id, label: level.filterLabel })),
];

const activityRows = getActivitySdgRows();

export function SdgPage() {
  const [filter, setFilter] = useState<SdgFilterValue>('todos');
  const [selected, setSelected] = useState<Sdg | null>(null);
  const cardsId = useId();
  const { intro, catalog, summary } = sdgPageContent;

  const groups = getSdgsByLevel(filter);
  const visibleCount = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <div className={styles.page}>
      <header className={`container ${styles.header}`}>
        <SectionTitle as="h1" title={sdgPageContent.title} subtitle={sdgPageContent.subtitle} />
      </header>

      {/* 1. Qué son los ODS */}
      <Section
        id="que-son"
        eyebrow={intro.eyebrow}
        title={intro.title}
        tone="cream"
        image={intro.image}
      >
        <div className={styles.prose}>
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className={styles.localMessage}>{intro.localMessage}</p>
        <p>
          <a
            className={styles.externalLink}
            href={intro.unLink.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intro.unLink.label}
            <ExternalLink className={styles.externalIcon} aria-hidden="true" />
            <span className="sr-only"> {ui.sdg.newTab}</span>
          </a>
        </p>
      </Section>

      {/* 2. ODS a los que contribuye el proyecto */}
      <Section
        id="ods"
        eyebrow={catalog.eyebrow}
        title={catalog.title}
        intro={catalog.intro}
        tone="mint"
      >
        <div className={styles.catalog}>
          <SdgFilter
            label={ui.sdg.filterLabel}
            value={filter}
            options={filterOptions}
            onChange={setFilter}
            controlsId={cardsId}
          />
          <p className="sr-only" aria-live="polite">
            {ui.sdg.showing(visibleCount)}
          </p>
          <div id={cardsId} className={styles.groups}>
            {groups.map(({ level, items }) => {
              const headingId = `${cardsId}-${level.id}`;
              return (
                <div
                  key={level.id}
                  role="group"
                  aria-labelledby={headingId}
                  className={styles.group}
                >
                  <div className={styles.groupHeader}>
                    <h3 id={headingId} className={styles.groupTitle}>
                      {level.title}
                    </h3>
                    <p className={styles.groupDescription}>{level.description}</p>
                  </div>
                  <ul className={styles.grid}>
                    {items.map((sdg) => (
                      <li key={sdg.id}>
                        <SdgCard
                          sdg={sdg}
                          levelLabel={level.badge}
                          onSelect={setSelected}
                          headingLevel={4}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 3. De la actividad al ODS */}
      <Section
        id="de-la-actividad-al-ods"
        eyebrow={summary.eyebrow}
        title={summary.title}
        intro={summary.intro}
        tone="cream"
      >
        <ActivitySdgTable rows={activityRows} caption={summary.caption} />
        <p>
          <Link to={getRoutePath(summary.cta.routeId)} className="btn btnPrimary">
            {summary.cta.label}
            <ArrowRight className="btnIcon" aria-hidden="true" />
          </Link>
        </p>
      </Section>

      <SdgModal sdg={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
