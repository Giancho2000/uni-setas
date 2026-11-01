import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs, type TabItem } from './Tabs';

const items: TabItem[] = [
  { id: 'local', label: 'Local', content: <p>Contenido local</p> },
  { id: 'national', label: 'Nacional', content: <p>Contenido nacional</p> },
  { id: 'global', label: 'Global', content: <p>Contenido global</p> },
];

function Controlled() {
  const [selected, setSelected] = useState('local');
  return (
    <Tabs
      items={items}
      ariaLabel="Apartados"
      selectedId={selected}
      onChange={setSelected}
      idPrefix="test"
    />
  );
}

describe('Tabs', () => {
  it('renders an accessible tablist with one tab per item', () => {
    render(<Controlled />);
    expect(screen.getByRole('tablist', { name: 'Apartados' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('exposes selection, roving tabindex and panel relationships', () => {
    render(<Controlled />);
    const local = screen.getByRole('tab', { name: 'Local' });
    const national = screen.getByRole('tab', { name: 'Nacional' });
    expect(local).toHaveAttribute('aria-selected', 'true');
    expect(local).toHaveAttribute('tabindex', '0');
    expect(national).toHaveAttribute('aria-selected', 'false');
    expect(national).toHaveAttribute('tabindex', '-1');

    const panel = screen.getByRole('tabpanel', { name: 'Local' });
    expect(local).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveTextContent('Contenido local');
  });

  it('moves selection with arrow keys, wrapping around', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.click(screen.getByRole('tab', { name: 'Local' }));

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Nacional' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Contenido nacional');

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Global' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Global' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Local' })).toHaveFocus();
  });

  it('jumps to first and last tab with Home and End', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.click(screen.getByRole('tab', { name: 'Nacional' }));
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Global' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Local' })).toHaveFocus();
  });

  it('calls onChange with the clicked tab id', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Tabs items={items} ariaLabel="X" selectedId="local" onChange={onChange} idPrefix="t" />,
    );
    await user.click(screen.getByRole('tab', { name: 'Global' }));
    expect(onChange).toHaveBeenCalledWith('global');
  });
});
