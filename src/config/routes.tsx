import type { AppRoute } from '../types';
import { HomePage } from '../pages/Home/HomePage';
import { ProblemsPage } from '../pages/Problems/ProblemsPage';
import { ActivitiesPage } from '../pages/Activities/ActivitiesPage';

/**
 * Single source of truth for routes and navbar links (constitution III).
 * To add a section: create its page (and data file) and append one object here.
 */
export const appRoutes: AppRoute[] = [
  { id: 'home', path: '/', label: 'Inicio', element: <HomePage />, showInNav: true, end: true },
  {
    id: 'problems',
    path: '/problematicas',
    label: 'Problemáticas',
    element: <ProblemsPage />,
    showInNav: true,
  },
  {
    id: 'activities',
    path: '/actividades',
    label: 'Actividades',
    element: <ActivitiesPage />,
    showInNav: true,
  },
];

/** Returns the path of a route by id, so pages never hard-code URLs. */
export function getRoutePath(id: string): string {
  return appRoutes.find((route) => route.id === id)?.path ?? '/';
}
