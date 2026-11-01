import { ProblemTabs } from '../../components/ProblemTabs/ProblemTabs';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { problems } from '../../data/problems';
import { ui } from '../../data/ui';

export function ProblemsPage() {
  return (
    <div className="container">
      <SectionTitle as="h1" title={ui.pages.problems.title} subtitle={ui.pages.problems.intro} />
      <ProblemTabs problems={problems} />
    </div>
  );
}
