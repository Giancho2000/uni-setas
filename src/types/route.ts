import type { ReactNode } from 'react';

/** A navigable section of the site. Declared only in `src/config/routes.tsx`. */
export interface AppRoute {
  /** Unique kebab-case id, e.g. `home`. */
  id: string;
  /** Unique path starting with `/`, e.g. `/actividades`. */
  path: string;
  /** Link text shown in the navbar (es-CO). */
  label: string;
  /** Page element rendered for this path. */
  element: ReactNode;
  /** Whether the route appears in the navbar, in array order. */
  showInNav: boolean;
  /** Match only the exact path (used for `/`). */
  end?: boolean;
}
