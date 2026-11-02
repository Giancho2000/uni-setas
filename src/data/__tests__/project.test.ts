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

  it('breaks the general objective into the four ideas in order', () => {
    expect(project.generalObjective.ideas.map((idea) => idea.label)).toEqual([
      'Qué es',
      'Para quién',
      'Cómo',
      'Para qué',
    ]);
  });

  it('has the expected number of objectives, indicators, resources and problems', () => {
    expect(project.specificObjectives).toHaveLength(6);
    expect(project.indicators).toHaveLength(8);
    expect(new Set(project.indicators.map((indicator) => indicator.id)).size).toBe(8);
    expect(project.resources).toHaveLength(5);
    for (const group of project.resources) {
      expect(group.items.length).toBeGreaterThan(0);
    }
    expect(project.why.originProblems).toHaveLength(2);
    expect(project.why.paragraphs.length).toBeGreaterThan(0);
  });

  it('has a short objective and one support image per Home section', () => {
    expect(project.shortObjective.length).toBeLessThanOrEqual(160);
    expect(Object.keys(project.sectionImages).sort()).toEqual(['logros', 'proyecto', 'recursos']);
  });
});
