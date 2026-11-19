# UI Contracts: Vista ODS

Textos de interfaz nuevos en `ui.sdg` (`src/data/ui.ts`): `viewRelation: 'Ver cómo se relaciona'`,
`notMeasured: 'No se mide en el plan actual'`, `filterLabel: 'Filtrar por nivel de contribución'`,
`filterAll: 'Todos'`, `showing: (n) => \`Mostrando ${n} ODS\``, `newTab: '(abre en una pestaña nueva)'`,
`modal: { explanation: 'Cómo se relaciona con el proyecto', targets: 'Metas relacionadas',
activities: 'Actividades del plan que lo sustentan', indicators: 'Cómo se evidencia' }`,
`longTerm: 'Contribución de largo plazo'`, `sdgPrefix: 'ODS'`.

## `SdgBadge`

```ts
interface SdgBadgeProps { sdg: Pick<Sdg, 'id' | 'name'>; showName?: boolean /* default true */; size?: 'sm' | 'md' }
```
- Renderiza número (`ODS 2` con "ODS" visible pequeño) sobre `var(--sdg-N)` con texto
  `var(--sdg-N-on)`, seguido del nombre cuando `showName`. Si `showName=false`, el nombre va en
  `sr-only` (el color nunca es el único identificador).

## `SdgCard`

```ts
interface SdgCardProps { sdg: Sdg; levelLabel: string; onSelect: (sdg: Sdg, trigger: HTMLButtonElement) => void }
```
- `<article>` > imagen (`ImageWithFallback`, `getImage('sdg', sdg.image)`, ratio 3/2,
  `object-fit: cover`, `width=900 height=600`, `loading="lazy"`), `SdgBadge`, etiqueta de nivel en
  texto, `<h3><button aria-haspopup="dialog">` con nombre accesible "ODS N: Nombre", `summary`,
  indicador visible `aria-hidden` "Ver cómo se relaciona →".
- Botón estirado cubre la tarjeta; hover y `:focus-within` → `translateY(-4px)` + `--shadow-lg`,
  200 ms; `focus-visible` con anillo `--color-focus`. Con `prefers-reduced-motion` sin transform.
- Indirectos: etiqueta "Contribución de largo plazo".

## `SdgModal`

```ts
interface SdgModalProps { sdg: Sdg | null; onClose: () => void }
```
- Usa `Modal` existente con `title="ODS N: Nombre"` y `eyebrow=<SdgBadge showName={false}/>` +
  nivel. Contenido en orden: imagen, explicación (`detail`), metas (`<dl>`/lista "2.3 — texto"),
  actividades (lista "Semana N · título", resueltas por id), indicadores (label, descripción y
  meta o "Por definir con el grupo"). Si `indicatorIds` está vacío: párrafo "No se mide en el plan
  actual" y la marca de largo plazo.
- Cierre: botón, Escape, clic en el fondo; el foco vuelve a la tarjeta (comportamiento heredado de
  `Modal`, que restaura `document.activeElement` previo).

## `SdgFilter`

```ts
type SdgFilterValue = SdgLevel | 'todos';
interface SdgFilterProps { value: SdgFilterValue; onChange: (v: SdgFilterValue) => void; options: { value: SdgFilterValue; label: string }[]; controlsId: string }
```
- `role="radiogroup"` + `aria-label`; botones `role="radio"`, `aria-checked`, tabindex itinerante,
  flechas/Inicio/Fin seleccionan y mueven foco; `aria-controls={controlsId}`. Seleccionado: fondo
  `--color-primary`, texto `--color-on-primary` e ícono check.

## `ActivitySdgTable`

```ts
interface ActivitySdgTableProps { rows: { activity: Activity; sdgs: Sdg[] }[]; caption: string }
```
- `<table>` con `<caption>`, `<thead>` (`th scope="col"`: "Actividad", "ODS a los que aporta"),
  filas con `<th scope="row">Semana N · título</th>` y celda con lista de `SdgBadge size="sm"`.
- < 40rem: filas apiladas (`display:block`), encabezado de columnas oculto visualmente pero
  presente para lectores; sin scroll horizontal.

## `SdgPage` (`/ods`)

1. `<Section id="que-son" tone="cream" image={content.intro.image}>`: párrafos, mensaje local
   destacado, enlace ONU (`target="_blank" rel="noopener noreferrer"`, ícono `ExternalLink`, texto
   `sr-only` de pestaña nueva).
2. `<Section id="ods" tone="mint">`: `SdgFilter`, región `aria-live="polite"` con
   `ui.sdg.showing(n)`, contenedor `id` controlado; por cada grupo visible, un `<h3>` con el título
   del nivel y sus tarjetas con título `<h4>` (prop `headingLevel={4}`) para mantener la jerarquía.
   Grilla: 1 col / 2 col ≥ 40rem / 3 col ≥ 64rem.
3. `<Section id="de-la-actividad-al-ods" tone="cream">`: `ActivitySdgTable` + `Link` con estilo de
   botón a `getRoutePath('activities')`.
- Estado: `filter` (`'todos'` inicial) y `selected: Sdg | null`. Cambiar filtro no cierra ni
  afecta una modal abierta; cerrar la modal no reinicia el filtro.

Ajuste a `SdgCard`: prop opcional `headingLevel?: 3 | 4` (default 3).

## Pruebas requeridas

| Archivo | Verifica |
|---------|----------|
| `Navbar.test.tsx` | "ODS" aparece después de "Actividades"; `aria-current="page"` en `/ods`; presente en menú móvil |
| `SdgFilter.test.tsx` | `aria-checked` cambia; flechas mueven selección; `onChange` |
| `SdgCard.test.tsx` + `SdgModal.test.tsx` | abre con clic y Enter (y Espacio); muestra metas, actividad con semana e indicador; Escape cierra y devuelve foco; ODS 3 muestra "No se mide en el plan actual" |
| `ActivitySdgTable.test.tsx` | 4 filas; cada actividad con sus ODS según `data-model.md` |
| `SdgPage.test.tsx` | 3 secciones; 9 tarjetas; filtro muestra 3/4/2; anuncio "Mostrando N ODS"; enlace ONU con `target` y `rel`; CTA a `/actividades` |
| `data/__tests__/sdg.test.ts`, `images.test.ts` | reglas de `data-model.md` §Validación; imágenes resuelven o caen al placeholder |
| `utils/getImage.test.ts` | resolución sin extensión y prioridad de formato |
