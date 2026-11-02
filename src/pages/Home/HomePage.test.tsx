import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { project } from '../../data/project';
import { ui } from '../../data/ui';
import { HomePage } from './HomePage';

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

function section(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Section #${id} not found`);
  return element;
}

describe('HomePage', () => {
  it('renders the carousel and exactly three titled sections in order', () => {
    const { container } = renderHome();
    expect(screen.getByRole('region', { name: ui.slider.label })).toBeInTheDocument();
    const sections = Array.from(container.querySelectorAll('section[aria-labelledby]'));
    expect(sections).toHaveLength(3);
    expect(
      sections.map((s) => within(s as HTMLElement).getAllByRole('heading')[0]?.textContent),
    ).toEqual(['El proyecto', 'Qué queremos lograr', 'Con qué lo haremos']);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('explains the project: ideas, pillars and work line', () => {
    renderHome();
    const proyecto = within(section('proyecto'));
    for (const label of ['Qué es', 'Para quién', 'Cómo', 'Para qué']) {
      expect(proyecto.getByText(label)).toBeInTheDocument();
    }
    for (const pillar of project.pillars) {
      expect(proyecto.getByRole('heading', { name: pillar.title })).toBeInTheDocument();
    }
    expect(proyecto.getByText('Huertas caseras con alimentos')).toBeInTheDocument();
    expect(proyecto.getByText(project.author.name)).toBeInTheDocument();
  });

  it('lists the six objectives and eight indicators', () => {
    renderHome();
    const logros = within(section('logros'));
    const list = logros.getByRole('list', { name: ui.home.specificObjectivesTitle });
    expect(within(list).getAllByRole('listitem')).toHaveLength(6);
    expect(logros.getAllByRole('article')).toHaveLength(8);
    expect(logros.getByText('15 · 10')).toBeInTheDocument();
  });

  it('groups the resources and links to the other pages', () => {
    renderHome();
    const recursos = within(section('recursos'));
    expect(recursos.getAllByRole('heading', { level: 3 })).toHaveLength(5);
    const production = recursos
      .getByRole('heading', { name: 'Materiales de producción' })
      .closest('article') as HTMLElement;
    expect(within(production).getByText(/guantes/i)).toBeInTheDocument();
    expect(recursos.getByRole('link', { name: ui.home.ctaProblems })).toHaveAttribute(
      'href',
      '/problematicas',
    );
    expect(recursos.getByRole('link', { name: ui.home.ctaActivities })).toHaveAttribute(
      'href',
      '/actividades',
    );
  });
});
