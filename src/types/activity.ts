export interface Activity {
  id: string;
  /** Integer >= 1, unique; cards are sorted by this field. */
  week: number;
  title: string;
  /** Short card description (<= 160 characters recommended). */
  summary: string;
  /** File name inside `src/assets/images/activities/` (e.g. `capacitacion.jpg`) or `null`. */
  image: string | null;
  /** Spanish alt text, required even while `image` is `null`. */
  imageAlt: string;
  duration: string;
  strategy: string;
  channels: string[];
  responsible: string;
  resources: string[];
  indicators: string[];
}
