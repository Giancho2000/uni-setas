import { useState } from 'react';
import { PROBLEM_SECTION_LABELS, PROBLEM_SECTION_ORDER } from '../../data/problems';
import { ui } from '../../data/ui';
import type { Problem, ProblemSection, ProblemSectionKey } from '../../types';
import { Tabs } from '../Tabs/Tabs';
import styles from './ProblemTabs.module.css';

interface ProblemTabsProps {
  problems: Problem[];
}

function SectionContent({ section }: { section: ProblemSection }) {
  return (
    <div className={styles.reading}>
      {section.blocks.map((block, blockIndex) => (
        <section key={block.heading ?? blockIndex} className={styles.block}>
          {block.heading && <h3 className={styles.blockHeading}>{block.heading}</h3>}
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}

function isSectionKey(id: string): id is ProblemSectionKey {
  return (PROBLEM_SECTION_ORDER as string[]).includes(id);
}

export function ProblemTabs({ problems }: ProblemTabsProps) {
  const [problemId, setProblemId] = useState(problems[0]?.id ?? '');
  const [sectionKey, setSectionKey] = useState<ProblemSectionKey>('local');

  const changeProblem = (id: string) => {
    if (id === problemId) return;
    setProblemId(id);
    setSectionKey('local');
  };

  const problemItems = problems.map((problem) => ({
    id: problem.id,
    label: problem.shortTitle,
    content: (
      <article className={styles.problem}>
        <h2 className={styles.problemTitle}>{problem.title}</h2>
        <Tabs
          variant="primary"
          idPrefix={`problem-${problem.id}`}
          ariaLabel={ui.sectionsTabsLabel}
          selectedId={sectionKey}
          onChange={(id) => {
            if (isSectionKey(id)) setSectionKey(id);
          }}
          items={PROBLEM_SECTION_ORDER.map((key) => ({
            id: key,
            label: PROBLEM_SECTION_LABELS[key],
            content: <SectionContent section={problem.sections[key]} />,
          }))}
        />
      </article>
    ),
  }));

  return (
    <Tabs
      variant="primary"
      idPrefix="problems"
      ariaLabel={ui.problemsTabsLabel}
      selectedId={problemId}
      onChange={changeProblem}
      items={problemItems}
    />
  );
}
