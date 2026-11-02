import { describe, expect, it } from 'vitest';
import { getActivityImage } from './getActivityImage';
import { getImage, placeholderImage } from './getImage';

describe('getImage', () => {
  it('returns the placeholder for null and unknown names in every folder', () => {
    expect(getImage('home', null)).toEqual({ src: placeholderImage, isPlaceholder: true });
    expect(getImage('slider', 'no-existe.webp')).toEqual({
      src: placeholderImage,
      isPlaceholder: true,
    });
  });

  it('keeps getActivityImage as a wrapper of the activities folder', () => {
    expect(getImage('activities', null)).toEqual(getActivityImage(null));
  });
});
