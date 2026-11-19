import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { appRoutes } from '../../config/routes';
import type { AppRoute } from '../../types';
import { Navbar } from './Navbar';

function renderNavbar(path = '/', routes?: AppRoute[]) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar routes={routes} />
    </MemoryRouter>,
  );
}

function getNav() {
  return screen.getByRole('navigation', { name: 'Navegación principal' });
}

describe('Navbar', () => {
  it('renders one link per navigable route, in order', () => {
    renderNavbar();
    const links = within(getNav()).getAllByRole('link');
    const expected = appRoutes.filter((route) => route.showInNav).map((route) => route.label);
    expect(links.map((link) => link.textContent)).toEqual(expected);
    expect(expected).toEqual(['Inicio', 'Problemáticas', 'Actividades', 'ODS']);
  });

  it('marks only the current route as active', () => {
    renderNavbar('/actividades');
    const nav = within(getNav());
    expect(nav.getByRole('link', { name: 'Actividades' })).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('link', { name: 'Inicio' })).not.toHaveAttribute('aria-current');
    expect(nav.getByRole('link', { name: 'Problemáticas' })).not.toHaveAttribute('aria-current');
  });

  it('marks Inicio as active only on the exact home path', () => {
    renderNavbar('/');
    const nav = within(getNav());
    expect(nav.getByRole('link', { name: 'Inicio' })).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('link', { name: 'Actividades' })).not.toHaveAttribute('aria-current');
  });

  it('toggles the mobile menu and updates its accessible name', async () => {
    const user = userEvent.setup();
    renderNavbar();
    const button = screen.getByRole('button', { name: 'Abrir menú' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'main-menu');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAccessibleName('Cerrar menú');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the menu with Escape and returns focus to the button', async () => {
    const user = userEvent.setup();
    renderNavbar();
    const button = screen.getByRole('button', { name: 'Abrir menú' });
    await user.click(button);
    await user.tab();
    await user.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });

  it('closes the menu when a link is chosen', async () => {
    const user = userEvent.setup();
    renderNavbar();
    const button = screen.getByRole('button', { name: 'Abrir menú' });
    await user.click(button);
    await user.click(within(getNav()).getByRole('link', { name: 'Problemáticas' }));
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(within(getNav()).getByRole('link', { name: 'Problemáticas' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('marks ODS as the current page on /ods', () => {
    renderNavbar('/ods');
    const nav = within(getNav());
    expect(nav.getByRole('link', { name: 'ODS' })).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('link', { name: 'Actividades' })).not.toHaveAttribute('aria-current');
  });

  it('lists ODS in the mobile menu, reachable by keyboard, and closes the menu on choose', async () => {
    const user = userEvent.setup();
    renderNavbar('/');
    const button = screen.getByRole('button', { name: 'Abrir menú' });
    await user.click(button);
    for (let i = 0; i < 4; i += 1) await user.tab();
    const odsLink = within(getNav()).getByRole('link', { name: 'ODS' });
    expect(odsLink).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(within(getNav()).getByRole('link', { name: 'ODS' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('renders every link when more routes are added', () => {
    const routes: AppRoute[] = Array.from({ length: 8 }, (_, index) => ({
      id: `r${index}`,
      path: index === 0 ? '/' : `/r${index}`,
      label: `Opción ${index + 1}`,
      element: null,
      showInNav: true,
      end: index === 0,
    }));
    renderNavbar('/', routes);
    expect(within(getNav()).getAllByRole('link')).toHaveLength(8);
  });

  it('accepts injected routes and hides those with showInNav false', () => {
    const routes: AppRoute[] = [
      { id: 'a', path: '/', label: 'Uno', element: null, showInNav: true, end: true },
      { id: 'b', path: '/dos', label: 'Dos', element: null, showInNav: false },
      { id: 'c', path: '/tres', label: 'Tres', element: null, showInNav: true },
    ];
    renderNavbar('/', routes);
    const links = within(getNav()).getAllByRole('link');
    expect(links.map((link) => link.textContent)).toEqual(['Uno', 'Tres']);
  });
});
