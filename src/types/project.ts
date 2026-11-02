import type { IconKey } from './icon';

export type PillarId = 'sustainability' | 'income' | 'space-use' | 'organic-input';

/** Subset of `IconKey` used by pillars. */
export type PillarIcon = Extract<IconKey, 'leaf' | 'coins' | 'sprout' | 'recycle'>;

export interface Pillar {
  id: PillarId;
  title: string;
  /** One or two sentences. */
  description: string;
  icon: PillarIcon;
}

export type ObjectiveIdeaLabel = 'Qué es' | 'Para quién' | 'Cómo' | 'Para qué';

export interface ObjectiveIdea {
  label: ObjectiveIdeaLabel;
  icon: IconKey;
  text: string;
}

export type EvaluationCriterion =
  'Cumplimiento' | 'Participación' | 'Resultados' | 'Impactos' | 'Dificultades';

export type IndicatorId =
  | 'compliance'
  | 'participation'
  | 'infrastructure'
  | 'planting'
  | 'learning'
  | 'sustainability'
  | 'income'
  | 'satisfaction';

export interface IndicatorTarget {
  /** Shown large, e.g. "4 de 4", "20 m²". */
  value: string;
  /** Explains the value. */
  detail?: string;
}

export interface SuccessIndicator {
  id: IndicatorId;
  label: string;
  criterion: EvaluationCriterion;
  description: string;
  /** `null` while the team has not set a target ("Por definir con el grupo"). */
  target: IndicatorTarget | null;
}

export type ResourceGroupId = 'human' | 'production' | 'space' | 'teaching' | 'records';

export interface ResourceGroup {
  id: ResourceGroupId;
  category: string;
  icon: IconKey;
  /** At least one item. */
  items: string[];
}

export type HomeSectionId = 'proyecto' | 'logros' | 'recursos';

export interface SupportImageRef {
  /** File name inside `src/assets/images/home/`; `null` shows the placeholder. */
  image: string | null;
  alt: string;
}

export interface ProjectInfo {
  name: string;
  scientificName: string;
  institution: string;
  /** Central objective, one to three sentences (long form). */
  objective: string;
  /** One sentence shown over the slider, at most 160 characters. */
  shortObjective: string;
  why: {
    paragraphs: string[];
    /** Exactly two, in the order of the specification. */
    originProblems: string[];
  };
  author: { name: string; role: string; institution: string };
  community: string;
  workLine: { name: string; methodology: string };
  generalObjective: {
    summary: string;
    /** Exactly four: Qué es, Para quién, Cómo, Para qué. */
    ideas: ObjectiveIdea[];
  };
  /** Exactly six; the number comes from the order. */
  specificObjectives: string[];
  /** Exactly eight. */
  indicators: SuccessIndicator[];
  /** Exactly five categories. */
  resources: ResourceGroup[];
  /** Exactly four pillars, in display order. */
  pillars: Pillar[];
  sectionImages: Record<HomeSectionId, SupportImageRef>;
}
