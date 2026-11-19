import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { activities } from '../activities';
import { project } from '../project';
import { sdgLevels, sdgPageContent, sdgs } from '../sdg';

const EXPECTED_TARGETS: Record<number, string[]> = {
  1: ['1.4'],
  2: ['2.3', '2.4'],
  3: ['3.4'],
  4: ['4.4', '4.7'],
  8: ['8.3'],
  12: ['12.2', '12.5'],
  13: ['13.3'],
  15: ['15.3'],
  17: ['17.17'],
};

describe('sdg data', () => {
  it('has exactly the 9 SDGs of the spec, unique', () => {
    const ids = sdgs.map((sdg) => sdg.id);
    expect(new Set(ids).size).toBe(9);
    expect([...ids].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 8, 12, 13, 15, 17]);
  });

  it('has 3 direct, 4 complementary and 2 indirect SDGs', () => {
    const count = (level: string) => sdgs.filter((sdg) => sdg.level === level).length;
    expect([count('directa'), count('complementaria'), count('indirecta')]).toEqual([3, 4, 2]);
    expect(sdgLevels.map((level) => level.id)).toEqual(['directa', 'complementaria', 'indirecta']);
  });

  it('uses the official target codes of the spec', () => {
    for (const sdg of sdgs) {
      expect(sdg.targets.map((target) => target.code)).toEqual(EXPECTED_TARGETS[sdg.id]);
      for (const target of sdg.targets) {
        expect(target.code.startsWith(`${sdg.id}.`)).toBe(true);
        expect(target.text.trim()).not.toBe('');
      }
    }
  });

  it('references existing activities and indicators', () => {
    const activityIds = new Set(activities.map((activity) => activity.id));
    const indicatorIds = new Set(project.indicators.map((indicator) => indicator.id));
    for (const sdg of sdgs) {
      expect(sdg.activityIds.length).toBeGreaterThan(0);
      for (const id of sdg.activityIds) expect(activityIds.has(id)).toBe(true);
      for (const id of sdg.indicatorIds) expect(indicatorIds.has(id)).toBe(true);
    }
  });

  it('links every activity to at least one SDG', () => {
    for (const activity of activities) {
      expect(sdgs.some((sdg) => sdg.activityIds.includes(activity.id))).toBe(true);
    }
  });

  it('has no indicators only for indirect SDGs', () => {
    for (const sdg of sdgs) {
      expect(sdg.indicatorIds.length === 0).toBe(sdg.level === 'indirecta');
    }
  });

  it('keeps card summaries short and texts complete', () => {
    for (const sdg of sdgs) {
      expect(sdg.summary.length).toBeLessThanOrEqual(140);
      expect(sdg.detail.length).toBeGreaterThan(0);
      expect(sdg.imageAlt.trim()).not.toBe('');
    }
  });

  it('never claims that the project fulfils an SDG (SC-010)', () => {
    // Official names and target texts are excluded: they quote the UN wording.
    const projectTexts = [
      ...sdgs.flatMap((sdg) => [sdg.summary, ...sdg.detail]),
      ...sdgLevels.map((level) => level.description),
      ...sdgPageContent.intro.paragraphs,
      sdgPageContent.intro.localMessage,
      sdgPageContent.catalog.intro,
      sdgPageContent.summary.intro,
    ];
    for (const text of projectTexts) {
      expect(text).not.toMatch(/\b(cumple|cumplir|cumplen|logra|lograr|logran)\b/i);
    }
  });

  it('defines a color token and a text token for every SDG', () => {
    const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
    for (const sdg of sdgs) {
      expect(tokens).toMatch(new RegExp(`--sdg-${sdg.id}:\\s*#`));
      expect(tokens).toMatch(new RegExp(`--sdg-${sdg.id}-on:`));
    }
  });
});
