import { describe, expect, it } from 'vitest';
import { sdgs } from '../data/sdg';
import type { Sdg } from '../types';
import {
  getActivitySdgRows,
  getSdgsByLevel,
  resolveSdgActivities,
  resolveSdgIndicators,
} from './sdg';

const ids = (list: Sdg[]) => list.map((sdg) => sdg.id);

describe('getSdgsByLevel', () => {
  it('returns three groups in level order with items sorted by id', () => {
    const groups = getSdgsByLevel('todos');
    expect(groups.map((group) => group.level.id)).toEqual([
      'directa',
      'complementaria',
      'indirecta',
    ]);
    expect(groups.map((group) => ids(group.items))).toEqual([
      [2, 8, 12],
      [1, 4, 13, 17],
      [3, 15],
    ]);
  });

  it('returns only the selected level', () => {
    const groups = getSdgsByLevel('directa');
    expect(groups).toHaveLength(1);
    expect(ids(groups[0]?.items ?? [])).toEqual([2, 8, 12]);
  });
});

describe('getActivitySdgRows', () => {
  it('returns one row per activity sorted by week with its SDGs', () => {
    const rows = getActivitySdgRows();
    expect(rows.map((row) => [row.activity.id, ids(row.sdgs)])).toEqual([
      ['product-training', [4, 8, 17]],
      ['sustainable-awareness', [4, 12, 13, 15]],
      ['garden-structure', [2]],
      ['sowing', [1, 2, 3, 8, 12]],
    ]);
  });
});

describe('resolvers', () => {
  const sdg12 = sdgs.find((sdg) => sdg.id === 12) as Sdg;

  it('resolves activities and indicators in the order of the ids', () => {
    expect(resolveSdgActivities(sdg12).map((a) => a.id)).toEqual([
      'sustainable-awareness',
      'sowing',
    ]);
    expect(resolveSdgIndicators(sdg12).map((i) => i.id)).toEqual(['sustainability']);
  });

  it('throws on unknown ids', () => {
    expect(() => resolveSdgActivities({ ...sdg12, activityIds: ['nope'] })).toThrow(/nope/);
    expect(() => resolveSdgIndicators({ ...sdg12, indicatorIds: ['nope' as never] })).toThrow(
      /nope/,
    );
  });
});
