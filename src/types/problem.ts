export type ProblemSectionKey = 'local' | 'national' | 'global' | 'causes' | 'effects';

export interface ContentBlock {
  /** Required in `causes` and `effects`; optional in the analyses. */
  heading?: string;
  /** At least one non-empty paragraph. */
  paragraphs: string[];
}

export interface ProblemSection {
  /** At least one block. */
  blocks: ContentBlock[];
}

export interface Problem {
  id: string;
  title: string;
  /** Short label used in the main tab. */
  shortTitle: string;
  sections: Record<ProblemSectionKey, ProblemSection>;
}
