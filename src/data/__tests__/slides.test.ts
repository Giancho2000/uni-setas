import { describe, expect, it } from 'vitest';
import { slides } from '../slides';

describe('slides data', () => {
  it('has five slides with unique ids', () => {
    expect(slides).toHaveLength(5);
    expect(new Set(slides.map((slide) => slide.id)).size).toBe(slides.length);
  });

  it('keeps texts within their limits', () => {
    for (const slide of slides) {
      expect(slide.alt.trim()).not.toBe('');
      expect(slide.title.trim()).not.toBe('');
      expect(slide.title.length).toBeLessThanOrEqual(40);
      expect(slide.caption.trim()).not.toBe('');
      expect(slide.caption.length).toBeLessThanOrEqual(120);
    }
  });
});
