import placeholderUrl from '../assets/images/placeholder.svg';

export interface ResolvedImage {
  src: string;
  isPlaceholder: boolean;
}

/** Folders inside `src/assets/images/` that hold content images. */
export type ImageFolder = 'activities' | 'slider' | 'home';

/** URL of the neutral image shown when there is no real image. */
export const placeholderImage: string = placeholderUrl;

const modules = import.meta.glob<string>(
  '../assets/images/{activities,slider,home}/*.{png,jpg,jpeg,webp,avif,svg}',
  { eager: true, query: '?url', import: 'default' },
);

/** Maps `"<folder>/<file>"` (e.g. `slider/slide-1.webp`) to its bundled URL. */
const imagesByKey: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split('/').slice(-2).join('/'), url]),
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
 * Resolves an image by file name inside `src/assets/images/<folder>/`.
 * Returns the placeholder when the name is empty or the file does not exist.
 */
export function getImage(folder: ImageFolder, name: string | null): ResolvedImage {
  const trimmed = name?.trim();
  const resolved = resolveImage(
    trimmed ? `${folder}/${trimmed}` : null,
    imagesByKey,
    placeholderImage,
  );
  if (import.meta.env.DEV && trimmed && resolved.isPlaceholder) {
    console.warn(
      `[getImage] "${trimmed}" was not found in src/assets/images/${folder}/. Using placeholder.`,
    );
  }
  return resolved;
}
