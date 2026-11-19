import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { sdgs } from '../../data/sdg';
import type { Sdg } from '../../types';
import { SdgModal } from './SdgModal';

const find = (id: number) => sdgs.find((sdg) => sdg.id === id) as Sdg;

describe('SdgModal', () => {
  it('shows explanation, targets, supporting activities and indicators', () => {
    const sdg12 = find(12);
    render(<SdgModal sdg={sdg12} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog', {
      name: 'ODS 12: Producción y consumo responsables',
    });
    const view = within(dialog);
    for (const paragraph of sdg12.detail) expect(view.getByText(paragraph)).toBeInTheDocument();
    expect(view.getByText('Meta 12.2')).toBeInTheDocument();
    expect(view.getByText('Meta 12.5')).toBeInTheDocument();
    expect(
      view.getByText(
        (_, element) =>
          element?.tagName === 'LI' &&
          element.textContent ===
            'Semana 2 · Concientización sobre la producción sostenible del producto',
      ),
    ).toBeInTheDocument();
    expect(
      view.getByText(
        (_, element) =>
          element?.tagName === 'LI' && element.textContent === 'Semana 4 · Siembra del producto',
      ),
    ).toBeInTheDocument();
    expect(view.getByText('Sostenibilidad:')).toBeInTheDocument();
    expect(view.queryByText(/No se mide en el plan actual/)).not.toBeInTheDocument();
  });

  it('says that indirect SDGs are not measured in the current plan', () => {
    render(<SdgModal sdg={find(3)} onClose={vi.fn()} />);
    const view = within(screen.getByRole('dialog', { name: 'ODS 3: Salud y bienestar' }));
    expect(view.getByText(/No se mide en el plan actual/)).toBeInTheDocument();
    expect(view.getByText(/Contribución de largo plazo/)).toBeInTheDocument();
    expect(view.getByText('Meta 3.4')).toBeInTheDocument();
  });

  it('renders nothing without an SDG', () => {
    render(<SdgModal sdg={null} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
