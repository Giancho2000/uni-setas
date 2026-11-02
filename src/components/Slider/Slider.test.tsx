import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { slides } from '../../data/slides';
import { ui } from '../../data/ui';
import { setReducedMotion } from '../../test/matchMedia';
import { placeholderImage } from '../../utils/getImage';
import { Slider } from './Slider';

function renderSlider(items = slides) {
  return render(
    <Slider slides={items} label={ui.slider.label} overlay={<h1>Nombre del proyecto</h1>} />,
  );
}

function activeLabel() {
  const groups = screen.getAllByRole('group', { hidden: true });
  const active = groups.find((group) => group.getAttribute('aria-hidden') !== 'true');
  return active?.getAttribute('aria-label') ?? '';
}

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

describe('Slider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a carousel region with five labelled slides and the overlay', () => {
    renderSlider();
    const region = screen.getByRole('region', { name: ui.slider.label });
    expect(region).toHaveAttribute('aria-roledescription', 'carrusel');
    const groups = within(region).getAllByRole('group', { hidden: true });
    expect(groups).toHaveLength(5);
    groups.forEach((group, i) => {
      expect(group).toHaveAttribute('aria-roledescription', 'diapositiva');
      expect(group.getAttribute('aria-label')).toMatch(new RegExp(`^${i + 1} de 5: `));
    });
    expect(screen.getByRole('heading', { level: 1, name: 'Nombre del proyecto' })).toBeVisible();
  });

  it('shows the placeholder when a slide has no image', () => {
    const { container } = renderSlider();
    const first = container.querySelector('img');
    expect(first).toHaveAttribute('src', placeholderImage);
    expect(first).toHaveAttribute('alt', '');
    expect(first).toHaveAttribute('loading', 'eager');
  });

  it('advances automatically every 6 seconds and loops', () => {
    renderSlider();
    expect(activeLabel()).toMatch(/^1 de 5/);
    advance(6000);
    expect(activeLabel()).toMatch(/^2 de 5/);
    for (let step = 0; step < 4; step += 1) advance(6000);
    expect(activeLabel()).toMatch(/^1 de 5/);
  });

  it('moves with the arrow buttons, the keyboard and the dots', () => {
    renderSlider();
    fireEvent.click(screen.getByRole('button', { name: ui.slider.next }));
    expect(activeLabel()).toMatch(/^2 de 5/);
    fireEvent.click(screen.getByRole('button', { name: ui.slider.previous }));
    fireEvent.click(screen.getByRole('button', { name: ui.slider.previous }));
    expect(activeLabel()).toMatch(/^5 de 5/);

    const region = screen.getByRole('region', { name: ui.slider.label });
    fireEvent.keyDown(region, { key: 'ArrowRight' });
    expect(activeLabel()).toMatch(/^1 de 5/);
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(activeLabel()).toMatch(/^5 de 5/);

    const third = screen.getByRole('button', { name: new RegExp(`${ui.slider.goTo} 3`) });
    fireEvent.click(third);
    expect(activeLabel()).toMatch(/^3 de 5/);
    expect(third).toHaveAttribute('aria-current', 'true');
  });

  it('pauses with the button and announces politely while stopped', () => {
    const { container } = renderSlider();
    const live = container.querySelector('[aria-live]');
    expect(live).toHaveAttribute('aria-live', 'off');

    fireEvent.click(screen.getByRole('button', { name: ui.slider.pause }));
    advance(12000);
    expect(activeLabel()).toMatch(/^1 de 5/);
    expect(screen.getByRole('button', { name: ui.slider.play })).toBeInTheDocument();
    expect(live).toHaveAttribute('aria-live', 'polite');

    fireEvent.click(screen.getByRole('button', { name: ui.slider.play }));
    advance(6000);
    expect(activeLabel()).toMatch(/^2 de 5/);
  });

  it('pauses while hovered and resumes on leave', () => {
    renderSlider();
    const region = screen.getByRole('region', { name: ui.slider.label });
    fireEvent.mouseEnter(region);
    advance(12000);
    expect(activeLabel()).toMatch(/^1 de 5/);
    fireEvent.mouseLeave(region);
    advance(6000);
    expect(activeLabel()).toMatch(/^2 de 5/);
  });

  it('does not autoplay when the visitor prefers reduced motion', () => {
    setReducedMotion(true);
    renderSlider();
    advance(12000);
    expect(activeLabel()).toMatch(/^1 de 5/);
    expect(screen.getByRole('button', { name: ui.slider.play })).toBeInTheDocument();
  });

  it('changes slide with a horizontal swipe', () => {
    renderSlider();
    const region = screen.getByRole('region', { name: ui.slider.label });
    fireEvent.pointerDown(region, { pointerType: 'touch', clientX: 300, clientY: 100 });
    fireEvent.pointerUp(region, { pointerType: 'touch', clientX: 120, clientY: 110 });
    expect(activeLabel()).toMatch(/^2 de 5/);
    fireEvent.pointerDown(region, { pointerType: 'touch', clientX: 100, clientY: 100 });
    fireEvent.pointerUp(region, { pointerType: 'touch', clientX: 120, clientY: 300 });
    expect(activeLabel()).toMatch(/^2 de 5/);
  });

  it('renders no controls for a single slide', () => {
    renderSlider(slides.slice(0, 1));
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
