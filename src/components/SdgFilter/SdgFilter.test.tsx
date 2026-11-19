import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { SdgFilterValue } from '../../types';
import { SdgFilter, type SdgFilterOption } from './SdgFilter';

const options: SdgFilterOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'directa', label: 'Directa' },
  { value: 'complementaria', label: 'Complementaria' },
  { value: 'indirecta', label: 'Indirecta' },
];

function Harness({ onChange }: { onChange: (value: SdgFilterValue) => void }) {
  const [value, setValue] = useState<SdgFilterValue>('todos');
  return (
    <SdgFilter
      label="Filtrar por nivel de contribución"
      value={value}
      options={options}
      controlsId="cards"
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
}

const radio = (name: string) => screen.getByRole('radio', { name });

describe('SdgFilter', () => {
  it('renders a labelled radio group with one checked option', () => {
    render(<Harness onChange={vi.fn()} />);
    expect(
      screen.getByRole('radiogroup', { name: 'Filtrar por nivel de contribución' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('radio').map((item) => item.textContent)).toEqual([
      'Todos',
      'Directa',
      'Complementaria',
      'Indirecta',
    ]);
    expect(radio('Todos')).toHaveAttribute('aria-checked', 'true');
    expect(radio('Todos')).toHaveAttribute('tabindex', '0');
    expect(radio('Directa')).toHaveAttribute('aria-checked', 'false');
    expect(radio('Directa')).toHaveAttribute('tabindex', '-1');
    expect(radio('Todos')).toHaveAttribute('aria-controls', 'cards');
    expect(radio('Todos').querySelector('svg')).not.toBeNull();
    expect(radio('Directa').querySelector('svg')).toBeNull();
  });

  it('selects with click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await user.click(radio('Complementaria'));
    expect(onChange).toHaveBeenLastCalledWith('complementaria');
    expect(radio('Complementaria')).toHaveAttribute('aria-checked', 'true');
    expect(radio('Todos')).toHaveAttribute('aria-checked', 'false');
  });

  it('moves and selects with arrow keys, Home and End', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await user.tab();
    expect(radio('Todos')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(radio('Directa')).toHaveFocus();
    expect(radio('Directa')).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{ArrowDown}');
    expect(radio('Complementaria')).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{End}');
    expect(radio('Indirecta')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(radio('Todos')).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{ArrowLeft}');
    expect(radio('Indirecta')).toHaveAttribute('aria-checked', 'true');

    await user.keyboard('{Home}');
    expect(onChange).toHaveBeenLastCalledWith('todos');
  });
});
