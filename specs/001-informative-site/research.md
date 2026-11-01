# Research: Sitio informativo de la Huerta comunitaria de setas orellanas

**Feature**: `001-informative-site` | **Date**: 2026-11-01

Cada decisión sigue el formato Decision / Rationale / Alternatives considered.

## R1. Build tool y lenguaje

- **Decision**: Vite (plantilla `react-ts`) + React 18 + TypeScript con `strict: true`,
  `noUncheckedIndexedAccess: true` y `noImplicitOverride: true`.
- **Rationale**: salida estática por defecto (`vite build` → `dist/`), arranque rápido, soporte nativo
  de CSS Modules e `import.meta.glob`. Cumple los principios I y VII.
- **Alternatives considered**: Next.js con export estático (añade conceptos de servidor innecesarios);
  Astro (excelente para sitios estáticos, pero el equipo pidió React SPA); Create React App
  (abandonado).

## R2. Enrutamiento desde configuración central

- **Decision**: React Router v6 con `createBrowserRouter`. `src/config/routes.tsx` exporta un arreglo
  `appRoutes: AppRoute[]` (path, label, element, `showInNav`, `end`). `App.tsx` construye el router
  mapeando ese arreglo como hijos de un `Layout` (Navbar + `<main>` + Footer), más una ruta comodín
  `*` para la página "no encontrada". La Navbar recorre el mismo arreglo filtrando `showInNav`.
- **Rationale**: una sola fuente de verdad para rutas y menú (principio III, FR-005). `NavLink`
  aplica `aria-current="page"` automáticamente (FR-003). Para que no cargue el componente de cada
  página en la configuración se usa `lazy` opcional; con tres páginas pequeñas se importan
  directamente (más simple).
- **Alternatives considered**: `HashRouter` (URLs con `#`, funciona en cualquier hosting sin
  configuración pero son menos limpias para compartir); TanStack Router (más tipado, dependencia más
  pesada y menos conocida por estudiantes).

## R3. Despliegue estático con rutas del lado del cliente

- **Decision**: incluir reglas de fallback a `index.html` para cada hosting:
  `public/_redirects` (Netlify: `/* /index.html 200`), `vercel.json` (`rewrites` a `/index.html`).
  Para GitHub Pages: configurar `base` de Vite mediante el script de build y copiar `index.html` a
  `404.html` tras el build; el router recibe `basename` de `import.meta.env.BASE_URL`.
- **Rationale**: sin fallback, recargar `/actividades` devuelve 404 del hosting (caso límite de la
  spec). `BASE_URL` es provisto por Vite, no es una variable de entorno propia.
- **Alternatives considered**: `HashRouter` solo para GitHub Pages (se mantiene como plan B si el
  truco de `404.html` resultara problemático).

## R4. Tokens de diseño y contraste de la paleta

- **Decision**: `src/styles/tokens.css` define en `:root` colores, tipografía, escala de espaciado,
  radios, sombras, anchos (`--measure: 70ch`) y breakpoints de referencia. Ratios WCAG calculados:

  | Par | Ratio | Uso permitido |
  |-----|-------|---------------|
  | texto `#2B2B26` / crema `#F6F1E4` | 12.61 | texto general |
  | verde bosque `#2F5D3A` / crema | 6.78 | títulos, enlaces, botones primarios (crema sobre bosque), anillo de foco |
  | tierra `#8A5A3C` / crema | 5.16 | texto secundario, etiquetas de semana, botón secundario |
  | texto / ocre `#C9A24B` | 5.93 | texto oscuro sobre fondos ocre (insignias) |
  | verde hoja `#6B9A4D` / crema | 2.93 | **solo decorativo** (bordes, fondos de íconos, separadores); nunca texto ni indicadores de estado |
  | ocre / crema | 2.13 | **solo decorativo** o fondo con texto oscuro encima |

  Se agregan tokens semánticos (`--color-text`, `--color-link`, `--color-focus`, `--color-surface`,
  etc.) que apuntan a la paleta; los componentes usan los semánticos.
- **Rationale**: principio V (un solo lugar) y VI / FR-028 (AA). La paleta sugerida tiene dos colores
  que no alcanzan 4.5:1 ni 3:1 sobre crema, por lo que se restringe su uso en lugar de cambiarlos.
- **Alternatives considered**: oscurecer verde hoja (`#4F7A36` da 4.47, aún < 4.5) y ocre; se descartó
  para respetar la paleta y basta con restringir su uso.

## R5. Tipografía

- **Decision**: Google Fonts Fraunces (títulos, pesos 600/700) y Nunito (texto, 400/600/700) con
  `<link rel="preconnect">` y `display=swap` en `index.html`; pilas de respaldo
  `Georgia, serif` y `system-ui, sans-serif` definidas en los tokens.
- **Rationale**: tipografía amigable y legible pedida por la spec. Es un recurso externo estático
  (no un servicio propio), permitido por la sección "Restricciones técnicas" de la constitución con
  esta justificación; `swap` evita texto invisible en conexiones lentas (SC-009).
- **Alternatives considered**: `@fontsource/*` autoalojado (dos dependencias npm más; posible mejora
  futura si se quiere eliminar la petición externa); solo fuentes del sistema (pierde identidad).

## R6. Modal accesible propio

- **Decision**: componente `Modal` con `createPortal` a `document.body`; `role="dialog"`,
  `aria-modal="true"`, `aria-labelledby` (id con `useId`). Al abrir: guarda
  `document.activeElement`, enfoca el primer elemento enfocable (botón cerrar), bloquea el scroll del
  body (`overflow: hidden` + compensación del ancho de la barra), y marca el resto como inerte
  (`inert` en `#root`). Trampa de foco manejando Tab/Shift+Tab sobre la lista de enfocables. Cierra
  con Escape (`keydown` en el diálogo), clic en el backdrop (solo si `mousedown` y `click` ocurren en
  el backdrop, para no cerrar al arrastrar texto) y botón. Al cerrar restaura scroll y devuelve el
  foco al elemento guardado.
- **Rationale**: FR-017 a FR-019 sin dependencias (principio VII). `inert` tiene soporte en los
  navegadores objetivo y evita interacción con el fondo; la trampa manual cubre lectores que lo
  ignoren.
- **Alternatives considered**: `<dialog>` nativo con `showModal()` (foco y Escape incluidos, pero el
  clic en backdrop, la devolución de foco y el bloqueo de scroll siguen siendo manuales y jsdom no lo
  implementa completo, lo que complica las pruebas); Radix Dialog / react-modal (dependencias no
  justificadas).

## R7. Pestañas de problemáticas

- **Decision**: componente genérico `Tabs` reutilizado en dos niveles por `ProblemTabs`: patrón WAI-ARIA
  de pestañas con activación automática (`role="tablist"`, `tab`, `tabpanel`, `aria-selected`,
  `aria-controls`, `tabindex` itinerante; flechas izquierda/derecha, Inicio y Fin). Al cambiar de
  problemática, la pestaña secundaria vuelve a "Local". En móvil la lista de pestañas secundarias se
  desplaza horizontalmente dentro de su contenedor (sin scroll horizontal de página).
- **Rationale**: FR-011 a FR-014 y SC-003; un solo componente evita duplicar la lógica de teclado.
- **Alternatives considered**: acordeones (más largos en móvil, menos claros para alternar);
  sub-rutas por apartado (posible mejora para enlazar un apartado concreto; no se pide).

## R8. Resolución de imágenes con placeholder

- **Decision**: `src/utils/getActivityImage.ts` usa
  `import.meta.glob('../assets/images/activities/*.{png,jpg,jpeg,webp,avif,svg}', { eager: true,
  query: '?url', import: 'default' })` para construir un mapa `nombreDeArchivo → url`. Si `name` es
  `null`, vacío o no está en el mapa, devuelve la URL de `placeholder.svg`. Además el componente
  `ImageWithFallback` cambia a placeholder en `onError`, y reserva el espacio con `aspect-ratio`
  (16/10) y `object-fit: cover`. En desarrollo, un nombre no encontrado emite `console.warn`.
- **Rationale**: FR-020, FR-021 y SC-004/SC-008: conectar una foto es copiar el archivo y escribir
  `image: 'capacitacion.jpg'`. Vite procesa y versiona las imágenes en el build.
- **Alternatives considered**: carpeta `public/` con rutas literales (sin verificación en build ni
  hashing); `import` explícito por actividad en los datos (requiere tocar código TS más allá del
  nombre).

## R9. Iconografía

- **Decision**: `lucide-react` para íconos de pilares, menú hamburguesa, cerrar y campos de la modal.
  Importación por nombre (tree-shaking) y `aria-hidden="true"` en íconos decorativos. Los pilares
  guardan en los datos una clave de ícono de un conjunto cerrado (`PillarIcon` union type) mapeada en
  un único archivo.
- **Rationale**: única dependencia visual permitida por el usuario. Justificación de dependencia
  (principio VII): evita dibujar y mantener SVG propios, impacto en bundle de ~1 KB por ícono usado.
- **Alternatives considered**: SVG inline propios (más mantenimiento); fuentes de íconos (peor
  accesibilidad y peso).

## R10. Calidad: lint, formato y pruebas

- **Decision**: ESLint (flat config) con `typescript-eslint`, `eslint-plugin-react-hooks`,
  `eslint-plugin-react-refresh` y `eslint-plugin-jsx-a11y`; Prettier con
  `eslint-config-prettier`. Vitest con entorno `jsdom`, `@testing-library/react`,
  `@testing-library/user-event` y `@testing-library/jest-dom`. Un test adicional de datos verifica
  que hay 4 actividades ordenadas por semana y 2 problemáticas con los 5 apartados no vacíos.
  Script `typecheck` (`tsc -b --noEmit`) y `format` / `format:check`.
- **Rationale**: principio VIII. `jsx-a11y` detecta errores de ARIA en lint (apoya SC-007).
  `user-event` simula teclado realista para foco y Escape.
- **Alternatives considered**: Jest (más configuración con Vite); Playwright e2e (útil, pero fuera de
  lo mínimo pedido; puede añadirse luego para SC-005).

## R11. Contenido inicial (FR-029)

- **Decision**: los textos de problemáticas y el detalle de actividades se cargan como borrador
  redactado a partir de la descripción del proyecto, con un comentario
  `// DRAFT: pending team review` al inicio de cada archivo de datos (no se muestra en la interfaz).
  Los campos vacíos se muestran como "Por definir".
- **Rationale**: la pregunta de aclaración no fue respondida; el borrador permite cumplir SC-003 y
  revisarlo luego sin tocar componentes (principio II).
- **Alternatives considered**: texto de relleno genérico (el sitio se vería incompleto ante docentes).
