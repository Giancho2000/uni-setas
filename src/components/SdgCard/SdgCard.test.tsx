import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { sdgs } from '../../data/sdg';
import type { Sdg } from '../../types';
import { placeholderImage } from '../../utils/getImage';
import { SdgCard } from './SdgCard';

const sdg2 = sdgs.find((sdg) => sdg.id === 2) as Sdg;
const sdg3 = sdgs.find((sdg) => sdg.id === 3) as Sdg;

describe('SdgCard', () => {
  it('shows image, badge, name, level, summary and the open hint', () => {
    const { container } = render(
      <SdgCard
        sdg={{ ...sdg2, image: 'no-existe' }}
        levelLabel="Contribución directa"
        onSelect={vi.fn()}
      />,
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', placeholderImage);
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('width', '900');
    expect(img).toHaveAttribute('height', '600');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(screen.getByText('Contribución directa')).toBeInTheDocument();
    expect(screen.getByText(sdg2.summary)).toBeInTheDocument();
    expect(screen.getByText('Ver cómo se relaciona')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'ODS 2: Hambre cero' });
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    expect(
      screen.getByRole('heading', { level: 3, name: 'ODS 2: Hambre cero' }),
    ).toBeInTheDocument();
  });

  it('opens with click, Enter and Space', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SdgCard sdg={sdg2} levelLabel="Contribución directa" onSelect={onSelect} />);
    const button = screen.getByRole('button', { name: 'ODS 2: Hambre cero' });

    await user.click(button);
    button.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onSelect).toHaveBeenCalledTimes(3);
    expect(onSelect).toHaveBeenCalledWith(sdg2);
  });

  it('supports an h4 heading and marks long-term SDGs', () => {
    render(
      <SdgCard
        sdg={sdg3}
        levelLabel="Contribución indirecta"
        onSelect={vi.fn()}
        headingLevel={4}
      />,
    );
    expect(
      screen.getByRole('heading', { level: 4, name: 'ODS 3: Salud y bienestar' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Contribución de largo plazo/)).toBeInTheDocument();
  });
});
