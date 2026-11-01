# Contract: Configuración central de rutas

**Archivo**: `src/config/routes.tsx` | **Consumidores**: `App.tsx` (router), `Navbar`, tests.

## Forma

```ts
export interface AppRoute {
  id: string;
  path: string;        // '/', '/problematicas', '/actividades'
  label: string;       // texto del enlace en la navbar (es-CO)
  element: ReactNode;
  showInNav: boolean;
  end?: boolean;       // true solo para '/'
}

export const appRoutes: AppRoute[];
```

## Garantías

1. El orden del arreglo es el orden de la navbar.
2. `id` y `path` son únicos (verificado por test).
3. El router registra cada entrada como hija del `Layout`; además existe una ruta `*`
   (no encontrada) que no forma parte de `appRoutes`.
4. Ningún otro archivo declara rutas ni enlaces de navegación principal.

## Cómo agregar una sección (procedimiento contractual)

1. Crear la página en `src/pages/<Name>/` y, si tiene contenido, su archivo en `src/data/`.
2. Agregar un objeto a `appRoutes`.
3. No se modifica `Navbar`, `Layout` ni `App.tsx`.
