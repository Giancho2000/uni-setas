import { describe, expect, it } from 'vitest';
import { getActivityImage, placeholderImage, resolveImage } from './getActivityImage';

describe('resolveImage', () => {
  const map = { 'capacitacion.jpg': '/assets/capacitacion-abc.jpg' };

  it('returns the mapped url for a known file name', () => {
    expect(resolveImage('capacitacion.jpg', map, '/ph.svg')).toEqual({
      src: '/assets/capacitacion-abc.jpg',
      isPlaceholder: false,
    });
  });

  it.each([null, '', '   ', 'desconocida.png'])('falls back for %j', (name) => {
    expect(resolveImage(name, map, '/ph.svg')).toEqual({ src: '/ph.svg', isPlaceholder: true });
  });
});

describe('getActivityImage', () => {
  it('returns the placeholder for null and unknown names', () => {
    expect(getActivityImage(null)).toEqual({ src: placeholderImage, isPlaceholder: true });
    expect(getActivityImage('no-existe.jpg')).toEqual({
      src: placeholderImage,
      isPlaceholder: true,
    });
  });
});
