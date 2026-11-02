import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AppIcon } from '../../components/AppIcon/AppIcon';
import { IndicatorCard } from '../../components/IndicatorCard/IndicatorCard';
import { ObjectiveList } from '../../components/ObjectiveList/ObjectiveList';
import { PillarCard } from '../../components/PillarCard/PillarCard';
import { ResourceGroup } from '../../components/ResourceGroup/ResourceGroup';
import { Section } from '../../components/Section/Section';
import { Slider } from '../../components/Slider/Slider';
import { getRoutePath } from '../../config/routes';
import { project } from '../../data/project';
import { slides } from '../../data/slides';
import { ui } from '../../data/ui';
import styles from './HomePage.module.css';

export function HomePage() {
  const { sections } = ui.home;

  return (
    <div className={styles.page}>
      <Slider
        slides={slides}
        label={ui.slider.label}
        overlay={
          <>
            <p className={styles.heroEyebrow}>
              {ui.home.eyebrow} · {project.institution}
            </p>
            <h1>{project.name}</h1>
            <p>
              <em lang="la">{project.scientificName}</em>
            </p>
            <p>{project.shortObjective}</p>
          </>
        }
      />

      <Section
        id="proyecto"
        eyebrow={sections.proyecto.eyebrow}
        title={sections.proyecto.title}
        tone="cream"
        image={project.sectionImages.proyecto}
        footer={
          <div className={styles.block}>
            <h3>{ui.home.pillarsTitle}</h3>
            <ul className={styles.pillarGrid}>
              {project.pillars.map((pillar) => (
                <li key={pillar.id}>
                  <PillarCard pillar={pillar} headingLevel="h4" />
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <p className={styles.badge}>
          <AppIcon name="badge" className={styles.badgeIcon} />
          <span>
            <span className={styles.badgeLabel}>{ui.home.workLineLabel}: </span>
            <strong>{project.workLine.name}</strong>
            <span className={styles.badgeMethod}> · {project.workLine.methodology}</span>
          </span>
        </p>

        <div className={styles.block}>
          <h3>{ui.home.whyTitle}</h3>
          {project.why.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.prose}>
              {paragraph}
            </p>
          ))}
          <h4 className={styles.subheading}>{ui.home.originProblemsTitle}</h4>
          <ol className={styles.problems}>
            {project.why.originProblems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ol>
        </div>

        <div className={styles.block}>
          <h3>{ui.home.whoTitle}</h3>
          <div className={styles.who}>
            <p className={styles.whoName}>{project.author.name}</p>
            <p>{project.author.role}</p>
            <p className={styles.whoMeta}>{project.author.institution}</p>
          </div>
          <p className={styles.prose}>{project.community}</p>
        </div>

        <div className={styles.block}>
          <h3>{ui.home.objectiveTitle}</h3>
          <p className={styles.prose}>{project.generalObjective.summary}</p>
          <dl className={styles.ideas}>
            {project.generalObjective.ideas.map((idea) => (
              <div key={idea.label} className={styles.idea}>
                <dt className={styles.ideaLabel}>
                  <AppIcon name={idea.icon} className={styles.ideaIcon} />
                  {idea.label}
                </dt>
                <dd>{idea.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section
        id="logros"
        eyebrow={sections.logros.eyebrow}
        title={sections.logros.title}
        tone="mint"
        image={project.sectionImages.logros}
        imagePosition="start"
        footer={
          <div className={styles.block}>
            <h3>{ui.home.indicatorsTitle}</h3>
            <ul className={styles.indicatorGrid}>
              {project.indicators.map((indicator) => (
                <li key={indicator.id}>
                  <IndicatorCard indicator={indicator} />
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className={styles.block}>
          <h3>{ui.home.specificObjectivesTitle}</h3>
          <ObjectiveList
            objectives={project.specificObjectives}
            label={ui.home.specificObjectivesTitle}
          />
        </div>
      </Section>

      <Section
        id="recursos"
        eyebrow={sections.recursos.eyebrow}
        title={sections.recursos.title}
        tone="cream"
        image={project.sectionImages.recursos}
        footer={
          <div className={styles.cta}>
            <p className={styles.ctaTitle}>{ui.home.ctaTitle}</p>
            <div className={styles.ctaActions}>
              <Link to={getRoutePath('problems')} className="btn btnPrimary">
                {ui.home.ctaProblems}
                <ArrowRight className="btnIcon" aria-hidden="true" />
              </Link>
              <Link to={getRoutePath('activities')} className="btn btnSecondary">
                {ui.home.ctaActivities}
                <ArrowRight className="btnIcon" aria-hidden="true" />
              </Link>
            </div>
          </div>
        }
      >
        <ul className={styles.resourceGrid}>
          {project.resources.map((group) => (
            <li key={group.id}>
              <ResourceGroup group={group} />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
