const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

let reducedMotion = false;

/** Controls what `matchMedia('(prefers-reduced-motion: reduce)')` reports in tests. */
export function setReducedMotion(value: boolean): void {
  reducedMotion = value;
}

/** Installs a minimal `window.matchMedia` for jsdom, which does not implement it. */
export function installMatchMedia(): void {
  if (typeof window === 'undefined') return;
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: query === REDUCED_MOTION_QUERY ? reducedMotion : false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  });
}
