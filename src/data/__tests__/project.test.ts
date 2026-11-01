import { describe, expect, it } from 'vitest';
import { project } from '../project';

describe('project data', () => {
  it('has the four pillars in order', () => {
    expect(project.pillars.map((pillar) => pillar.id)).toEqual([
      'sustainability',
      'income',
      'space-use',
      'organic-input',
    ]);
  });

  it('has non-empty texts', () => {
    expect(project.name.trim()).not.toBe('');
    expect(project.objective.trim()).not.toBe('');
    expect(project.scientificName.trim()).not.toBe('');
    for (const pillar of project.pillars) {
      expect(pillar.title.trim()).not.toBe('');
      expect(pillar.description.trim()).not.toBe('');
    }
  });
});
