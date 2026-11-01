import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir detalle
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Detalle de prueba">
        <a href="#uno">Primer enlace</a>
        <a href="#dos">Último enlace</a>
      </Modal>
    </>
  );
}

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Oculto">
        contenido
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders an accessible modal dialog in document.body and focuses the close button', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Capacitación">
        <p>contenido</p>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Capacitación' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog.closest('body')).toBe(document.body);
    expect(screen.getByRole('button', { name: 'Cerrar' })).toHaveFocus();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Escape">
        contenido
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the close button is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Botón">
        contenido
      </Modal>,
    );
    await user.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on backdrop click but not on clicks inside the panel', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Backdrop">
        <p>Texto interno</p>
      </Modal>,
    );
    await user.click(screen.getByText('Texto interno'));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus inside the dialog', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Abrir detalle' }));
    const close = screen.getByRole('button', { name: 'Cerrar' });
    const last = screen.getByRole('link', { name: 'Último enlace' });

    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(last).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
  });

  it('locks body scroll while open and returns focus to the trigger on close', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Abrir detalle' });
    await user.click(trigger);
    expect(document.body).toHaveClass('scroll-locked');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass('scroll-locked');
    expect(trigger).toHaveFocus();
  });
});
