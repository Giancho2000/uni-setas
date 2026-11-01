import { describe, expect, it } from 'vitest';
import { appRoutes } from './routes';

describe('appRoutes', () => {
  it('has unique ids and paths', () => {
    const ids = appRoutes.map((route) => route.id);
    const paths = appRoutes.map((route) => route.path);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('has valid paths and non-empty labels', () => {
    for (const route of appRoutes) {
      expect(route.path.startsWith('/')).toBe(true);
      expect(route.label.trim()).not.toBe('');
    }
  });

  it('marks only the home route as exact match', () => {
    const exact = appRoutes.filter((route) => route.end);
    expect(exact).toHaveLength(1);
    expect(exact[0]?.path).toBe('/');
  });
});
