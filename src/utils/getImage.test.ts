import { describe, expect, it } from 'vitest';
import { getActivityImage } from './getActivityImage';
import {
  buildImageMap,
  getImage,
  normalizeImageName,
  placeholderImage,
  resolveImage,
} from './getImage';

describe('getImage', () => {
  it('returns the placeholder for null and unknown names in every folder', () => {
    expect(getImage('home', null)).toEqual({ src: placeholderImage, isPlaceholder: true });
    expect(getImage('slider', 'no-existe.webp')).toEqual({
      src: placeholderImage,
      isPlaceholder: true,
    });
    expect(getImage('sdg', '')).toEqual({ src: placeholderImage, isPlaceholder: true });
    expect(getImage('sdg', 'ods-99')).toEqual({ src: placeholderImage, isPlaceholder: true });
  });

  it('keeps getActivityImage as a wrapper of the activities folder', () => {
    expect(getImage('activities', null)).toEqual(getActivityImage(null));
    expect(getImage('activities', 'semana-1')).toEqual(getActivityImage('semana-1'));
  });
});

describe('normalizeImageName', () => {
  it.each(['ods-2', 'ods-2.webp', 'ODS-2.JPG', ' ods-2 ', 'ods-2.jpeg'])(
    'normalizes %j to "ods-2"',
    (name) => {
      expect(normalizeImageName(name)).toBe('ods-2');
    },
  );

  it('returns an empty string for null or blank names', () => {
    expect(normalizeImageName(null)).toBe('');
    expect(normalizeImageName('   ')).toBe('');
  });
});

describe('buildImageMap', () => {
  it('keys by folder and base name, preferring webp > avif > jpg > jpeg > png > svg', () => {
    const map = buildImageMap({
      '../assets/images/sdg/ods-2.png': 'png-url',
      '../assets/images/sdg/ods-2.webp': 'webp-url',
      '../assets/images/sdg/ods-2.jpg': 'jpg-url',
      '../assets/images/home/Proyecto.JPEG': 'proyecto-url',
    });
    expect(map['sdg/ods-2']).toBe('webp-url');
    expect(map['home/proyecto']).toBe('proyecto-url');
  });

  it('resolves names with or without extension to the same image', () => {
    const map = buildImageMap({ '../assets/images/sdg/ods-2.jpg': 'jpg-url' });
    for (const name of ['ods-2', 'ods-2.webp', 'ODS-2.JPG']) {
      expect(resolveImage(`sdg/${normalizeImageName(name)}`, map, 'fallback')).toEqual({
        src: 'jpg-url',
        isPlaceholder: false,
      });
    }
  });
});
