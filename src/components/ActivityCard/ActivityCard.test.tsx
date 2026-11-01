import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Activity } from '../../types';
import { placeholderImage } from '../../utils/getActivityImage';
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback';
import { ActivityCard } from './ActivityCard';

const baseActivity: Activity = {
  id: 'test',
  week: 2,
  title: 'Actividad de prueba',
  summary: 'Resumen corto de la actividad.',
  image: null,
  imageAlt: 'Foto de la actividad',
  duration: '1 semana',
  strategy: 'Estrategia',
  channels: ['Presencial'],
  responsible: 'Equipo',
  resources: ['Recurso'],
  indicators: ['Indicador'],
};

function getImage(container: HTMLElement) {
  const img = container.querySelector('img');
  if (!img) throw new Error('image not found');
  return img;
}

describe('ActivityCard', () => {
  it('shows the placeholder with empty alt when image is null', () => {
    const { container } = render(<ActivityCard activity={baseActivity} onSelect={vi.fn()} />);
    const img = getImage(container);
    expect(img).toHaveAttribute('src', placeholderImage);
    expect(img).toHaveAttribute('alt', '');
  });

  it('shows the placeholder when the image name does not exist', () => {
    const { container } = render(
      <ActivityCard activity={{ ...baseActivity, image: 'no-existe.jpg' }} onSelect={vi.fn()} />,
    );
    expect(getImage(container)).toHaveAttribute('src', placeholderImage);
  });

  it('switches to the placeholder when the image fails to load', () => {
    const { container } = render(
      <ImageWithFallback src="/roto.jpg" alt="Foto" fallbackSrc={placeholderImage} />,
    );
    const img = getImage(container);
    expect(img).toHaveAttribute('src', '/roto.jpg');
    fireEvent.error(img);
    expect(getImage(container)).toHaveAttribute('src', placeholderImage);
    expect(getImage(container)).toHaveAttribute('alt', '');
  });

  it('shows week, title as heading and summary', () => {
    render(<ActivityCard activity={baseActivity} onSelect={vi.fn()} />);
    expect(screen.getByText('Semana 2')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Actividad de prueba/ })).toBeInTheDocument();
    expect(screen.getByText('Resumen corto de la actividad.')).toBeInTheDocument();
  });

  it('calls onSelect on click and on Enter', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ActivityCard activity={baseActivity} onSelect={onSelect} />);
    const button = screen.getByRole('button', { name: /Semana 2.*Actividad de prueba/ });

    await user.click(button);
    expect(onSelect).toHaveBeenCalledWith(baseActivity);

    button.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(2);
  });
});
