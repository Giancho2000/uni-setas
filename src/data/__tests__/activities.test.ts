import { describe, expect, it } from 'vitest';
import { activities } from '../activities';

describe('activities data', () => {
  const sorted = [...activities].sort((a, b) => a.week - b.week);

  it('has four activities with unique consecutive weeks', () => {
    expect(activities).toHaveLength(4);
    expect(sorted.map((activity) => activity.week)).toEqual([1, 2, 3, 4]);
    expect(new Set(activities.map((activity) => activity.id)).size).toBe(4);
  });

  it('keeps the plan titles in week order', () => {
    expect(sorted.map((activity) => activity.title)).toEqual([
      'Capacitación sobre el producto',
      'Concientización sobre la producción sostenible del producto',
      'Creación de la estructuración de la huerta',
      'Siembra del producto',
    ]);
  });

  it('starts without real images and has the required texts', () => {
    for (const activity of activities) {
      expect(activity.image).toBeNull();
      expect(activity.imageAlt.trim()).not.toBe('');
      expect(activity.title.trim()).not.toBe('');
      expect(activity.summary.trim()).not.toBe('');
      expect(activity.summary.length).toBeLessThanOrEqual(160);
    }
  });
});
