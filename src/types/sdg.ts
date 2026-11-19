import type { IndicatorId, SupportImageRef } from './project';

/** SDGs the project contributes to (out of the 17). */
export type SdgId = 1 | 2 | 3 | 4 | 8 | 12 | 13 | 15 | 17;

export type SdgLevel = 'directa' | 'complementaria' | 'indirecta';

/** Value of the level filter on the SDG page. */
export type SdgFilterValue = SdgLevel | 'todos';

export interface SdgTarget {
  /** Official target code, e.g. "2.3". Must start with `${sdg.id}.` */
  code: string;
  /** Short Spanish paraphrase of the official UN target. */
  text: string;
}

export interface Sdg {
  id: SdgId;
  /** Official Spanish name, e.g. "Hambre cero". */
  name: string;
  level: SdgLevel;
  /** One sentence for the card (<= 140 characters). */
  summary: string;
  /** Full explanation for the modal (1–3 short paragraphs). */
  detail: string[];
  /** At least one. */
  targets: SdgTarget[];
  /** Base file name in `src/assets/images/sdg/` (e.g. `ods-2`) or `null`. */
  image: string | null;
  /** Spanish alt text, required even while the image is missing. */
  imageAlt: string;
  /** Ids from `activities.ts`; at least one. */
  activityIds: string[];
  /** Ids from `project.indicators`; empty only when `level === 'indirecta'`. */
  indicatorIds: IndicatorId[];
}

export interface SdgLevelInfo {
  id: SdgLevel;
  /** Group heading, e.g. "Contribución directa". */
  title: string;
  /** Filter label, e.g. "Directa". */
  filterLabel: string;
  /** Level label shown on cards. */
  badge: string;
  description: string;
}

export interface SdgPageContent {
  title: string;
  subtitle: string;
  intro: {
    title: string;
    eyebrow: string;
    paragraphs: string[];
    localMessage: string;
    unLink: { label: string; href: string };
    image: SupportImageRef;
  };
  catalog: { title: string; eyebrow: string; intro: string };
  summary: {
    title: string;
    eyebrow: string;
    intro: string;
    caption: string;
    cta: { label: string; routeId: 'activities' };
  };
}
