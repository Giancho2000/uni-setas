import placeholderUrl from '../assets/images/placeholder.svg';

export interface ResolvedImage {
  src: string;
  isPlaceholder: boolean;
}

/** Folders inside `src/assets/images/` that hold content images. */
export type ImageFolder = 'activities' | 'slider' | 'home' | 'sdg';

/** URL of the neutral image shown when there is no real image. */
export const placeholderImage: string = placeholderUrl;

/** When two files share a base name, the first extension in this list wins. */
const EXTENSION_PRIORITY = ['webp', 'avif', 'jpg', 'jpeg', 'png', 'svg'];

const modules = import.meta.glob<string>(
  '../assets/images/{activities,slider,home,sdg}/*.{png,jpg,jpeg,webp,avif,svg,PNG,JPG,JPEG,WEBP}',
  { eager: true, query: '?url', import: 'default' },
);

/** Lowercase base name without extension: `' ODS-2.JPG '` → `'ods-2'`. */
export function normalizeImageName(name: string | null): string {
  const trimmed = name?.trim().toLowerCase() ?? '';
  return trimmed.replace(/\.(webp|avif|jpe?g|png|svg)$/, '');
}

function extensionRank(path: string): number {
  const extension = path.split('.').pop()?.toLowerCase() ?? '';
  const rank = EXTENSION_PRIORITY.indexOf(extension);
  return rank === -1 ? EXTENSION_PRIORITY.length : rank;
}

/** Maps `"<folder>/<base-name>"` (e.g. `sdg/ods-2`) to its bundled URL. Exported for tests. */
export function buildImageMap(entries: Record<string, string>): Record<string, string> {
  const map: Record<string, string> = {};
  const chosenPath: Record<string, string> = {};

  for (const [path, url] of Object.entries(entries)) {
    const [folder = '', file = ''] = path.split('/').slice(-2);
    const key = `${folder}/${normalizeImageName(file)}`;
    const previous = chosenPath[key];
    if (previous !== undefined) {
      if (import.meta.env.DEV) {
        console.warn(`[getImage] "${previous}" and "${path}" share the name "${key}".`);
      }
      if (extensionRank(path) >= extensionRank(previous)) continue;
    }
    chosenPath[key] = path;
    map[key] = url;
  }
  return map;
}

const imagesByKey = buildImageMap(modules);

/** Pure resolver, exported for tests. */
export function resolveImage(
  key: string | null,
  map: Record<string, string>,
  fallback: string,
): ResolvedImage {
  const trimmed = key?.trim();
  const src = trimmed ? map[trimmed] : undefined;
  return src ? { src, isPlaceholder: false } : { src: fallback, isPlaceholder: true };
}

/**
 * Resolves an image by base name inside `src/assets/images/<folder>/`; the extension is optional.
 * Returns the placeholder when the name is empty or the file does not exist.
 */
export function getImage(folder: ImageFolder, name: string | null): ResolvedImage {
  const baseName = normalizeImageName(name);
  const resolved = resolveImage(
    baseName ? `${folder}/${baseName}` : null,
    imagesByKey,
    placeholderImage,
  );
  if (
    import.meta.env.DEV &&
    baseName &&
    resolved.isPlaceholder &&
    import.meta.env.MODE !== 'test'
  ) {
    console.warn(
      `[getImage] "${baseName}" was not found in src/assets/images/${folder}/. Using placeholder.`,
    );
  }
  return resolved;
}
