import placeholderUrl from '../assets/images/placeholder.svg';

export interface ResolvedImage {
  src: string;
  isPlaceholder: boolean;
}

/** URL of the neutral image shown when an activity has no real image. */
export const placeholderImage: string = placeholderUrl;

const modules = import.meta.glob<string>(
  '../assets/images/activities/*.{png,jpg,jpeg,webp,avif,svg}',
  { eager: true, query: '?url', import: 'default' },
);

/** Maps bare file names (e.g. `capacitacion.jpg`) to their bundled URLs. */
const imagesByName: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split('/').pop() ?? path, url]),
);

/** Pure resolver, exported for tests. */
export function resolveImage(
  name: string | null,
  map: Record<string, string>,
  fallback: string,
): ResolvedImage {
  const key = name?.trim();
  const src = key ? map[key] : undefined;
  return src ? { src, isPlaceholder: false } : { src: fallback, isPlaceholder: true };
}

/**
 * Resolves an activity image by file name inside `src/assets/images/activities/`.
 * Returns the placeholder when the name is empty or the file does not exist.
 */
export function getActivityImage(name: string | null): ResolvedImage {
  const resolved = resolveImage(name, imagesByName, placeholderImage);
  if (import.meta.env.DEV && name?.trim() && resolved.isPlaceholder) {
    console.warn(
      `[getActivityImage] "${name}" was not found in src/assets/images/activities/. Using placeholder.`,
    );
  }
  return resolved;
}
