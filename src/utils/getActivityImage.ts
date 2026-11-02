import { getImage, type ResolvedImage } from './getImage';

export { placeholderImage, resolveImage, type ResolvedImage } from './getImage';

/**
 * Resolves an activity image by file name inside `src/assets/images/activities/`.
 * Returns the placeholder when the name is empty or the file does not exist.
 */
export function getActivityImage(name: string | null): ResolvedImage {
  return getImage('activities', name);
}
