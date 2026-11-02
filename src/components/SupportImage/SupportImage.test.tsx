import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ui } from '../../data/ui';
import { placeholderImage } from '../../utils/getImage';
import { SupportImage } from './SupportImage';

describe('SupportImage', () => {
  it.each([null, 'no-existe.webp'])('shows the placeholder and caption for %j', (name) => {
    const { container } = render(<SupportImage name={name} alt="Foto de la huerta" />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', placeholderImage);
    expect(image).toHaveAttribute('alt', '');
    expect(image).toHaveAttribute('width', '1200');
    expect(image).toHaveAttribute('height', '800');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(screen.getByText(ui.home.supportImagePending)).toBeInTheDocument();
  });
});
