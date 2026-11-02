import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ui } from '../../data/ui';
import type { SuccessIndicator } from '../../types';
import { IndicatorCard } from './IndicatorCard';

const base: SuccessIndicator = {
  id: 'participation',
  label: 'Participación',
  criterion: 'Participación',
  description: 'Personas capacitadas y familias vinculadas.',
  target: { value: '15 · 10', detail: 'personas · familias' },
};

describe('IndicatorCard', () => {
  it('shows the label, criterion and target', () => {
    render(<IndicatorCard indicator={base} />);
    expect(screen.getByRole('heading', { level: 4, name: 'Participación' })).toBeInTheDocument();
    expect(screen.getByText('15 · 10')).toBeInTheDocument();
    expect(screen.getByText('personas · familias')).toBeInTheDocument();
    expect(screen.getAllByText('Participación')).toHaveLength(2);
  });

  it('shows the pending text when there is no target', () => {
    render(<IndicatorCard indicator={{ ...base, target: null }} />);
    expect(screen.getByText(ui.home.targetPending)).toBeInTheDocument();
  });
});
