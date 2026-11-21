export interface Slide {
  /** Unique kebab-case id. */
  id: string;
  /** File name inside `src/assets/images/slider/` (e.g. `slide-1.webp`); `null` shows the placeholder. */
  image: string | null;
  /**
   * Optional focal point (CSS `object-position`, e.g. `'center 20%'`) so the crop keeps the
   * main subject in view at every viewport width. Defaults to `'center'`.
   */
  focus?: string;
  /** Describes the photo; used only when a real photo is shown. */
  alt: string;
  /** Short title, at most 40 characters. */
  title: string;
  /** One sentence, at most 120 characters. */
  caption: string;
}
