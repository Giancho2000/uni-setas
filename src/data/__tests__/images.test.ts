import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getImage, type ImageFolder } from '../../utils/getImage';
import { activities } from '../activities';
import { project } from '../project';
import { sdgPageContent, sdgs } from '../sdg';
import { slides } from '../slides';

const CONTENT_FOLDERS: ImageFolder[] = ['slider', 'home', 'activities', 'sdg'];
const FILE_NAME = /^[a-z0-9-]+\.(webp|jpg|jpeg|png|avif|svg)$/;

describe('image references', () => {
  it('connects every slot to its expected file name', () => {
    expect(slides.map((slide) => slide.image)).toEqual([
      'slide-1',
      'slide-2',
      'slide-3',
      'slide-4',
      'slide-5',
    ]);
    expect(project.sectionImages.proyecto.image).toBe('proyecto');
    expect(project.sectionImages.logros.image).toBe('logros');
    expect(project.sectionImages.recursos.image).toBe('recursos');
    for (const activity of activities) expect(activity.image).toBe(`semana-${activity.week}`);
    for (const sdg of sdgs) expect(sdg.image).toBe(`ods-${sdg.id}`);
    expect(sdgPageContent.intro.image).toMatchObject({
      folder: 'sdg',
      image: 'ods-agenda-2030-objetivos-desarrollo-sostenible',
    });
  });

  it('resolves every reference to a real file or to the placeholder', () => {
    const refs: [ImageFolder, string | null][] = [
      ...slides.map((slide): [ImageFolder, string | null] => ['slider', slide.image]),
      ...Object.values(project.sectionImages).map((ref): [ImageFolder, string | null] => [
        'home',
        ref.image,
      ]),
      ...activities.map((activity): [ImageFolder, string | null] => ['activities', activity.image]),
      ...sdgs.map((sdg): [ImageFolder, string | null] => ['sdg', sdg.image]),
      ['sdg', sdgPageContent.intro.image.image],
    ];
    for (const [folder, name] of refs) {
      const resolved = getImage(folder, name);
      expect(typeof resolved.src).toBe('string');
      expect(resolved.src).not.toBe('');
    }
  });

  it('uses the real activity, slider and Home photos already in the repository', () => {
    for (const activity of activities) {
      expect(getImage('activities', activity.image).isPlaceholder).toBe(false);
    }
    for (const sdg of sdgs) expect(getImage('sdg', sdg.image).isPlaceholder).toBe(false);
    expect(getImage('sdg', sdgPageContent.intro.image.image).isPlaceholder).toBe(false);
    for (const slide of slides) expect(getImage('slider', slide.image).isPlaceholder).toBe(false);
    for (const ref of Object.values(project.sectionImages)) {
      expect(getImage('home', ref.image).isPlaceholder).toBe(false);
    }
  });

  it('has descriptive alt texts', () => {
    const alts = [
      ...slides.map((slide) => slide.alt),
      ...Object.values(project.sectionImages).map((ref) => ref.alt),
      ...activities.map((activity) => activity.imageAlt),
      ...sdgs.map((sdg) => sdg.imageAlt),
      sdgPageContent.intro.image.alt,
    ];
    for (const alt of alts) expect(alt.trim().length).toBeGreaterThan(10);
  });

  it('names image files in lowercase without spaces or accents', () => {
    for (const folder of CONTENT_FOLDERS) {
      const dir = resolve(process.cwd(), 'src/assets/images', folder);
      const files = readdirSync(dir).filter((file) => file !== '.gitkeep');
      for (const file of files) expect(file).toMatch(FILE_NAME);
    }
  });
});
