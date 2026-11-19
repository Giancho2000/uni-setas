import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SdgBadge } from './SdgBadge';

const sdg = { id: 2 as const, name: 'Hambre cero' };

describe('SdgBadge', () => {
  it('shows the number and the name, with colors from tokens only', () => {
    const { container } = render(<SdgBadge sdg={sdg} />);
    expect(screen.getByText('ODS')).toBeInTheDocument();
    expect(screen.getByText('Hambre cero')).not.toHaveClass('sr-only');
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--badge-bg')).toBe('var(--sdg-2)');
    expect(root.style.getPropertyValue('--badge-fg')).toBe('var(--sdg-2-on)');
    expect(root.getAttribute('style')).not.toMatch(/#[0-9a-f]{3,6}/i);
  });

  it('keeps the name for screen readers when it is visually hidden', () => {
    render(<SdgBadge sdg={sdg} showName={false} />);
    expect(screen.getByText('Hambre cero')).toHaveClass('sr-only');
  });
});
