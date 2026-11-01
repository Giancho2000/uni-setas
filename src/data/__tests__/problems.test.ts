import { describe, expect, it } from 'vitest';
import { PROBLEM_SECTION_LABELS, PROBLEM_SECTION_ORDER, problems } from '../problems';

describe('problems data', () => {
  it('has the two problems with their full titles', () => {
    expect(problems.map((problem) => problem.title)).toEqual([
      'Desempleo y falta de oportunidades de generación de ingresos dignos en comunidades rurales de corregimientos',
      'Subutilización de espacios productivos y bajo aprovechamiento de residuos orgánicos agrícolas en zonas rurales',
    ]);
  });

  it('defines the five sections in order with Spanish labels', () => {
    expect(PROBLEM_SECTION_ORDER).toEqual(['local', 'national', 'global', 'causes', 'effects']);
    expect(PROBLEM_SECTION_ORDER.map((key) => PROBLEM_SECTION_LABELS[key])).toEqual([
      'Local',
      'Nacional',
      'Global',
      'Causas',
      'Efectos',
    ]);
  });

  it('has non-empty content in every section', () => {
    for (const problem of problems) {
      expect(problem.shortTitle.trim()).not.toBe('');
      for (const key of PROBLEM_SECTION_ORDER) {
        const { blocks } = problem.sections[key];
        expect(blocks.length).toBeGreaterThan(0);
        for (const block of blocks) {
          expect(block.paragraphs.length).toBeGreaterThan(0);
          for (const paragraph of block.paragraphs) expect(paragraph.trim()).not.toBe('');
        }
      }
    }
  });

  it('organizes causes and effects by the required categories', () => {
    for (const problem of problems) {
      expect(problem.sections.causes.blocks.map((block) => block.heading)).toEqual([
        'Históricas',
        'Socioculturales',
        'Políticas',
        'Económicas',
      ]);
      expect(problem.sections.effects.blocks.map((block) => block.heading)).toEqual([
        'Sociales',
        'Culturales',
        'Ambientales',
        'Políticos',
      ]);
    }
  });
});
