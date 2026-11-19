import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getActivitySdgRows } from '../../utils/sdg';
import { ActivitySdgTable } from './ActivitySdgTable';

const EXPECTED: [string, number[]][] = [
  ['Semana 1 · Capacitación sobre el producto', [4, 8, 17]],
  ['Semana 2 · Concientización sobre la producción sostenible del producto', [4, 12, 13, 15]],
  ['Semana 3 · Creación de la estructuración de la huerta', [2]],
  ['Semana 4 · Siembra del producto', [1, 2, 3, 8, 12]],
];

describe('ActivitySdgTable', () => {
  it('relates each activity with its SDGs by number and name', () => {
    render(<ActivitySdgTable rows={getActivitySdgRows()} caption="Relación actividad ODS" />);
    const table = screen.getByRole('table', { name: 'Relación actividad ODS' });
    const columns = within(table).getAllByRole('columnheader');
    expect(columns.map((cell) => cell.textContent)).toEqual(['Actividad', 'ODS a los que aporta']);
    for (const column of columns) expect(column).toHaveAttribute('scope', 'col');

    const rowHeaders = within(table).getAllByRole('rowheader');
    expect(rowHeaders.map((cell) => cell.textContent)).toEqual(EXPECTED.map(([name]) => name));

    for (const [index, [, ids]] of EXPECTED.entries()) {
      const header = rowHeaders[index] as HTMLElement;
      expect(header).toHaveAttribute('scope', 'row');
      const row = header.closest('tr') as HTMLElement;
      const badges = within(row).getAllByRole('listitem');
      expect(badges.map((item) => Number(item.textContent?.match(/ODS\s*(\d+)/)?.[1]))).toEqual(
        ids,
      );
      for (const item of badges) expect(item.textContent).toMatch(/ODS \d+\D+/);
    }
  });
});
