# Research: Vista ODS e imágenes reales del proyecto

Todas las incógnitas del Technical Context quedan resueltas. No se agregan dependencias.

## R1. Ubicación de archivos frente a la indicación del usuario

- **Decision**: la ruta se agrega en `src/config/routes.tsx` y la página vive en
  `src/pages/Sdg/SdgPage.tsx`. La entrada de ruta usa el tipo `AppRoute` completo:
  `{ id: 'sdg', path: '/ods', label: 'ODS', element: <SdgPage />, showInNav: true }`.
- **Rationale**: el archivo real es `.tsx` (contiene JSX) y todas las páginas siguen la convención
  `pages/<Nombre>/<Nombre>Page.tsx` con su CSS Module al lado. `App.tsx` ya genera el router desde
  `appRoutes`, así que "registrar en el router" no requiere tocar `App.tsx` (principio III).
- **Alternatives**: `src/pages/Sdg.tsx` suelto — rompe la convención y separa el CSS del componente.

## R2. Carga diferida de la vista

- **Decision**: `const SdgPage = lazy(() => import('../pages/Sdg/SdgPage').then(m => ({ default: m.SdgPage })))`
  en `routes.tsx`, y un único `<Suspense fallback={<PageFallback/>}>` alrededor de `<Outlet />` en
  `Layout.tsx` (fallback: contenedor vacío con altura mínima y `aria-busy="true"`).
- **Rationale**: aísla los datos e imágenes de ODS en su propio chunk; el Suspense en el Layout
  sirve para futuras páginas diferidas sin repetir código. Las pruebas que rendericen rutas usan
  `findBy*` para esperar el chunk.
- **Alternatives**: Suspense en cada `element` — repetitivo; no diferir — suma peso al Inicio.

## R3. Colores de ODS y contraste

- **Decision**: tokens `--sdg-N` (fondo) y `--sdg-N-on` (texto) en `tokens.css`. El badge muestra
  el número en texto **grande y en negrita** (≥ 1.25rem, 700) y siempre junto al nombre. Para
  cumplir AA incluso como texto normal (4.5:1) se elige el texto por color:

  | ODS | Color | Blanco | Tinta `#2B2B26` | `--sdg-N-on` |
  |-----|-------|--------|-----------------|--------------|
  | 1  | #E5243B | 4.52 | 3.15 | blanco |
  | 2  | #DDA63A | 2.19 | 6.50 | `--color-sdg-ink` |
  | 3  | #4C9F38 | 3.32 | 4.28 | `--color-sdg-ink` (#1A1A17 → 5.26) |
  | 4  | #C5192D | 5.91 | 2.41 | blanco |
  | 8  | #A21942 | 7.63 | 1.87 | blanco |
  | 12 | #BF8B2E | 3.02 | 4.71 | `--color-sdg-ink` |
  | 13 | #3F7E44 | 4.91 | 2.90 | blanco |
  | 15 | #56C02B | 2.34 | 6.08 | `--color-sdg-ink` |
  | 17 | #19486A | 9.65 | 1.47 | blanco |

  Se define `--color-sdg-ink: #1a1a17` (más oscuro que la tinta del sitio) para que ODS 3 pase
  4.5:1. Todos los pares quedan ≥ 4.5:1.
- **Color en datos**: el tipo `Sdg` **no** guarda el hex (el usuario proponía `color: string`). El
  componente asigna `style={{ '--badge-bg': `var(--sdg-${id})`, '--badge-fg': `var(--sdg-${id}-on)` }}`.
  Así no hay valores de color en datos ni componentes (principio V) y la prueba de integridad
  verifica que existe un token para cada `id`.
- **Alternatives**: hex en datos — viola el principio V; texto blanco para todos — falla en 2, 3,
  12 y 15.

## R4. Patrón de tarjeta interactiva

- **Decision**: igual que `ActivityCard`: `<article>` con `<h3>` que contiene un `<button>`
  "estirado" (pseudo-elemento que cubre la tarjeta) con `aria-haspopup="dialog"`. Nombre
  accesible: "ODS 2: Hambre cero" (número en `sr-only`); el texto "Ver cómo se relaciona" es
  visible y `aria-hidden`. Hover y `:focus-within` aplican `transform: translateY(-4px)` + sombra
  elevada en 200 ms; con `prefers-reduced-motion: reduce` solo cambia la sombra/borde, sin
  transform ni transición.
- **Rationale**: un `<button>` nativo da clic, toque, Enter y Espacio sin JS adicional; un `<h3>`
  no puede ir dentro de un botón (modelo de contenido "phrasing"), por eso se usa el botón
  estirado y se conserva la jerarquía de encabezados.
- **Alternatives**: tarjeta completa como `<button>` — HTML inválido con encabezados dentro;
  `div role="button" tabIndex=0` — reimplementa teclado.

## R5. Filtro por nivel

- **Decision**: `role="radiogroup"` con `aria-label="Filtrar por nivel de contribución"` y 4
  `<button role="radio" aria-checked>`; tabindex itinerante (solo el seleccionado es tabulable),
  flechas izquierda/derecha/arriba/abajo, Inicio y Fin mueven y seleccionan. El seleccionado se
  distingue con fondo sólido + ícono de check (no solo color). Una región `aria-live="polite"`
  anuncia "Mostrando N ODS". Estado en `useState` de la página (no en la URL).
- **Rationale**: es una selección única excluyente; el patrón radio de APG es el que pide
  "navegación con flechas". `Tabs` existente no aplica (no hay paneles distintos).
- **Alternatives**: botones `aria-pressed` — no expresan exclusividad; `<select>` — menos visible.

## R6. Cuadro "De la actividad al ODS" responsive

- **Decision**: `<table>` semántica con `<caption>`, columnas "Actividad" y "ODS a los que aporta";
  cada fila tiene `<th scope="row">` con "Semana N · título" y una celda con la lista de
  `SdgBadge` (número + nombre). Por debajo de 40rem, CSS convierte filas en bloques apilados
  (`display: block`) manteniendo el `th` como encabezado de cada bloque; sin scroll horizontal.
  Las filas se generan invirtiendo `Sdg.activityIds`, por lo que modal y tabla no pueden
  contradecirse (FR-025).
- **Alternatives**: matriz 4×9 con marcas — ilegible en celular y depende de símbolos; scroll
  horizontal — el spec pide leer sin desplazamiento horizontal.

## R7. Resolución de imágenes insensible a la extensión

- **Decision**: `import.meta.glob('../assets/images/{activities,slider,home,sdg}/*.{png,jpg,jpeg,webp,avif,svg}', { eager: true, query: '?url', import: 'default' })`.
  El mapa se indexa por `carpeta/nombre-sin-extensión` en minúsculas. `getImage(folder, name)`
  normaliza `name` (trim, minúsculas, quita extensión) de modo que `'ods-2'`, `'ods-2.webp'` y
  `'ods-2.jpg'` resuelven igual. Si hay dos archivos con el mismo nombre base, prioridad
  `webp > avif > jpg > jpeg > png > svg` y advertencia en DEV. `getActivityImage` sigue delegando
  en `getImage('activities', …)`. Se agrega `ImageFolder = … | 'sdg'`.
- **Datos**: se guardan nombres base sin extensión (`'slide-1'`, `'proyecto'`, `'semana-1'`,
  `'ods-2'`) para no depender del formato que se exporte.
- **Rationale**: el equipo puede exportar en jpg o webp sin tocar datos; el glob `eager` produce
  URLs con hash y deja fuera del bundle los archivos no referenciados por carpeta.
- **Alternatives**: imports estáticos por archivo — se rompe la compilación si falta una foto.

## R8. Estado real de las fotos en el repositorio

- **Hallazgo** (2026-11-18): `activities/` contiene 7 archivos `WhatsApp Image 2026-11-18 at … .jpeg`
  (con espacios y paréntesis); `slider/` y `home/` solo tienen `.gitkeep`; `sdg/` no existe.
- **Decision**: (a) crear `src/assets/images/sdg/.gitkeep`; (b) apuntar los datos a los nombres
  definitivos; (c) tarea de contenido: elegir 4 de las 7 fotos de actividades, renombrarlas a
  `semana-1 … semana-4` (minúsculas, sin espacios) y retirar las sobrantes o dejarlas fuera de
  uso; (d) mientras falten, el placeholder cubre cada espacio (FR-029). La prueba de integridad
  (R10) falla si un archivo de imagen tiene mayúsculas, espacios o tildes.
- **Rationale**: no se puede adivinar qué foto corresponde a qué semana; el código no debe esperar
  a las fotos.

## R9. Contenido de metas y explicaciones

- **Decision**: cada meta se guarda como `{ code: '2.3', text: '…' }` con una descripción breve
  parafraseada del texto oficial de la ONU en español (sin cifras de alcance nacional que el
  proyecto no aborde). `summary` y `detail` se redactan **solo** con las ideas del spec, más el
  matiz de escala ("a nivel local", "con el grupo comunitario"); no se inventan cifras. Verbos
  permitidos: contribuye, aporta, promueve, fortalece. Prueba: ningún texto de `sdg.ts` contiene
  "cumple" ni "logra" (SC-010).
- **Indicadores**: `indicatorIds` referencian `SuccessIndicator.id` existentes:
  ODS 2 → `infrastructure`, `income`; ODS 8 → `income`, `participation`; ODS 12 →
  `sustainability`; ODS 1 → `income`; ODS 4 → `participation`, `learning`; ODS 13 →
  `sustainability`; ODS 17 → `participation`, `compliance`; ODS 3 y 15 → `[]` ("No se mide en el
  plan actual").
- **Enlace ONU**: `https://www.un.org/sustainabledevelopment/es/` con `target="_blank"`,
  `rel="noopener noreferrer"` y texto `sr-only` "(abre en una pestaña nueva)" + ícono externo.

## R10. Navbar extensible y pruebas de integridad

- **Navbar**: en ≥ 40rem el menú pasa a `flex-wrap: wrap; justify-content: flex-end; row-gap`
  y `.inner` permite que el menú baje bajo la marca si no cabe; `min-width: 0` evita desbordes.
  Con 4 opciones entra en una línea desde 640 px; con más, envuelve sin scroll horizontal.
  La lógica no cambia.
- **Integridad** (`src/data/__tests__/sdg.test.ts`, `images.test.ts`): 9 ODS con ids únicos
  {1,2,3,4,8,12,13,15,17}; niveles 3/4/2; cada `activityId` e `indicatorId` existe; cada actividad
  aparece en ≥ 1 ODS; indirectos sin indicadores; cada `id` tiene token `--sdg-N` y `--sdg-N-on`
  en `tokens.css` (lectura del archivo con `fs` en la prueba); todo `image` de slides, home,
  activities y sdg resuelve a un archivo o al placeholder sin lanzar errores; los nombres de
  archivo en `src/assets/images/**` cumplen `^[a-z0-9-]+\.(webp|jpg|jpeg|png|avif|svg)$`.
