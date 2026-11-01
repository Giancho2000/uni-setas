export type PillarId = 'sustainability' | 'income' | 'space-use' | 'organic-input';

/** Closed set of icon keys mapped to icons in `components/PillarIcon`. */
export type PillarIcon = 'leaf' | 'coins' | 'sprout' | 'recycle';

export interface Pillar {
  id: PillarId;
  title: string;
  /** One or two sentences. */
  description: string;
  icon: PillarIcon;
}

export interface ProjectInfo {
  name: string;
  scientificName: string;
  /** Central objective, one to three sentences. */
  objective: string;
  /** Exactly four pillars, in display order. */
  pillars: Pillar[];
  institution: string;
}
