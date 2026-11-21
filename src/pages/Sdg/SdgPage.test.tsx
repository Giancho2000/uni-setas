import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { sdgPageContent, sdgs } from '../../data/sdg';
import { placeholderImage } from '../../utils/getImage';
import { getActivitySdgRows, resolveSdgActivities } from '../../utils/sdg';
import { SdgPage } from './SdgPage';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/ods']}>
      <SdgPage />
    </MemoryRouter>,
  );
}

const cardButtons = () => screen.queryAllByRole('button', { name: /^ODS \d+:/ });

describe('SdgPage', () => {
  it('has at most 3 sections, in the order of the spec', () => {
    const { container } = renderPage();
    const sections = container.querySelectorAll('section');
    expect([...sections].map((section) => section.id)).toEqual([
      'que-son',
      'ods',
      'de-la-actividad-al-ods',
    ]);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(sdgPageContent.title);
  });

  describe('section 1: qué son los ODS', () => {
    it('explains the ODS, shows the local message and links to the UN', () => {
      const { container } = renderPage();
      const section = within(container.querySelector('#que-son') as HTMLElement);
      expect(sdgPageContent.intro.paragraphs.length).toBeLessThanOrEqual(2);
      for (const paragraph of sdgPageContent.intro.paragraphs) {
        expect(section.getByText(paragraph)).toBeInTheDocument();
      }
      expect(section.getByText(sdgPageContent.intro.localMessage)).toBeInTheDocument();

      const link = section.getByRole('link', { name: /sitio oficial de la ONU/ });
      expect(link).toHaveAttribute('href', 'https://www.un.org/sustainabledevelopment/es/');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
      expect(link).toHaveAccessibleName(/\(abre en una pestaña nueva\)/);
    });

    it('shows the square Agenda 2030 wheel with its alt text', () => {
      const { container } = renderPage();
      const img = container.querySelector('#que-son img');
      expect(img).not.toHaveAttribute('src', placeholderImage);
      expect(img).toHaveAttribute('alt', sdgPageContent.intro.image.alt);
    });
  });

  describe('section 2: cards, modal and filter', () => {
    it('shows 9 cards grouped by level', () => {
      renderPage();
      expect(
        screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent),
      ).toEqual([
        'Contribución directa',
        'Contribución complementaria',
        'Contribución indirecta o de largo plazo',
      ]);
      expect(cardButtons()).toHaveLength(9);
      const direct = screen.getByRole('group', { name: 'Contribución directa' });
      expect(
        within(direct)
          .getAllByRole('button')
          .map((b) => b.textContent),
      ).toEqual([
        'ODS 2: Hambre cero',
        'ODS 8: Trabajo decente y crecimiento económico',
        'ODS 12: Producción y consumo responsables',
      ]);
    });

    it('opens the modal, traps focus and returns it to the card on close', async () => {
      const user = userEvent.setup();
      renderPage();
      const card = screen.getByRole('button', {
        name: 'ODS 8: Trabajo decente y crecimiento económico',
      });
      await user.click(card);
      const dialog = screen.getByRole('dialog', {
        name: 'ODS 8: Trabajo decente y crecimiento económico',
      });
      for (let i = 0; i < 5; i += 1) {
        await user.tab();
        expect(dialog).toContainElement(document.activeElement as HTMLElement);
      }
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(card).toHaveFocus();
    });

    it('opens with Enter and closes with a click on the backdrop', async () => {
      const user = userEvent.setup();
      renderPage();
      const card = screen.getByRole('button', { name: 'ODS 2: Hambre cero' });
      card.focus();
      await user.keyboard('{Enter}');
      expect(screen.getByRole('dialog', { name: 'ODS 2: Hambre cero' })).toBeInTheDocument();
      await user.click(screen.getByTestId('modal-backdrop'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(card).toHaveFocus();
    });

    it.each([
      ['Directa', 3, 'Contribución directa'],
      ['Complementaria', 4, 'Contribución complementaria'],
      ['Indirecta', 2, 'Contribución indirecta o de largo plazo'],
      ['Todos', 9, null],
    ])('filters by %s', async (label, count, heading) => {
      const user = userEvent.setup();
      renderPage();
      expect(screen.getByRole('radio', { name: 'Todos' })).toHaveAttribute('aria-checked', 'true');
      if (label === 'Todos') await user.click(screen.getByRole('radio', { name: 'Directa' }));
      await user.click(screen.getByRole('radio', { name: label }));

      expect(cardButtons()).toHaveLength(count);
      expect(screen.getByText(`Mostrando ${count} ODS`)).toHaveAttribute('aria-live', 'polite');
      const headings = screen.getAllByRole('heading', { level: 3 });
      if (heading) expect(headings.map((h) => h.textContent)).toEqual([heading]);
      else expect(headings).toHaveLength(3);
    });

    it('keeps the filter after opening and closing a modal', async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole('radio', { name: 'Directa' }));
      const card = screen.getByRole('button', { name: 'ODS 2: Hambre cero' });
      await user.click(card);
      await user.click(screen.getByRole('button', { name: 'Cerrar' }));
      expect(screen.getByRole('radio', { name: 'Directa' })).toHaveAttribute(
        'aria-checked',
        'true',
      );
      expect(cardButtons()).toHaveLength(3);
      expect(card).toHaveFocus();
    });
  });

  describe('section 3: de la actividad al ODS', () => {
    it('shows the summary table and a call to action to Actividades', () => {
      const { container } = renderPage();
      const section = within(container.querySelector('#de-la-actividad-al-ods') as HTMLElement);
      expect(section.getByRole('table')).toBeInTheDocument();
      expect(section.getAllByRole('rowheader')).toHaveLength(4);
      expect(section.getByRole('link', { name: 'Ver las actividades' })).toHaveAttribute(
        'href',
        '/actividades',
      );
    });

    it('is consistent with the activities listed in every modal (FR-025)', () => {
      const rows = getActivitySdgRows();
      for (const sdg of sdgs) {
        for (const activity of resolveSdgActivities(sdg)) {
          const row = rows.find((item) => item.activity.id === activity.id);
          expect(row?.sdgs.map((item) => item.id)).toContain(sdg.id);
        }
      }
      for (const row of rows) {
        for (const sdg of row.sdgs) expect(sdg.activityIds).toContain(row.activity.id);
      }
    });
  });
});
