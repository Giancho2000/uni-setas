# Data Model: Rediseño y ampliación del Inicio

Todo el contenido vive en `src/data/` y sus tipos en `src/types/` (principio II). Los nombres de
campos están en inglés; los valores visibles, en español.

## Slide (`src/types/slide.ts`, datos en `src/data/slides.ts`)

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | `string` | Único, kebab-case (`huerta`, `sustrato`, …). |
| `image` | `string \| null` | Nombre de archivo dentro de `src/assets/images/slider/` (p. ej. `slide-1.webp`); `null` → placeholder. |
| `alt` | `string` | Obligatorio; describe la foto. Se usa solo cuando hay foto real. |
| `title` | `string` | Corto: ≤ 40 caracteres. |
| `caption` | `string` | Una frase: ≤ 120 caracteres. |

- `slides: Slide[]` con 5 elementos iniciales (borrador `// DRAFT`). Orden de visualización = orden
  del arreglo. Con 1 elemento no hay controles ni autoplay; con 0 el slider no se renderiza y el
  `<h1>` se muestra sobre el fondo placeholder.

## ProjectInfo ampliado (`src/types/project.ts`, datos en `src/data/project.ts`)

Se conservan `name`, `scientificName`, `institution`, `objective` y `pillars`. Se agregan:

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `shortObjective` | `string` | Una frase ≤ 160 caracteres mostrada sobre el slider. |
| `why` | `{ paragraphs: string[]; originProblems: string[] }` | `paragraphs` ≥ 1; `originProblems` exactamente 2, en el orden de la especificación. |
| `author` | `{ name: string; role: string; institution: string }` | `name`: "Giancarlo Reina"; `role`: práctica de Responsabilidad Social vinculada al Proyecto Social de Formación; `institution`: "UNIMINUTO". |
| `community` | `string` | Grupo comunitario del corregimiento y su líder comunitario. |
| `workLine` | `{ name: string; methodology: string }` | "Huertas caseras con alimentos" · Teoría del Cambio Social "Líderes Sostenibles en Acción". |
| `generalObjective` | `{ summary: string; ideas: ObjectiveIdea[] }` | `ideas` exactamente 4, una por etiqueta, en orden Qué es → Para quién → Cómo → Para qué. |
| `specificObjectives` | `string[]` | Exactamente 6; el número se deriva del orden (no se guarda). |
| `indicators` | `SuccessIndicator[]` | Exactamente 8, `id` único. |
| `resources` | `ResourceGroup[]` | Exactamente 5 categorías, cada una con ≥ 1 ítem. |
| `sectionImages` | `Record<HomeSectionId, SupportImageRef>` | Una entrada por sección del Inicio. |

`objective` (texto largo actual) queda disponible pero ya no se muestra en el slider; se usa
`generalObjective.summary` en "El proyecto".

### ObjectiveIdea

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `label` | `'Qué es' \| 'Para quién' \| 'Cómo' \| 'Para qué'` | Unión cerrada. |
| `icon` | `IconKey` | Ej.: `sprout`, `users`, `handshake`, `target`. |
| `text` | `string` | Texto de la especificación. |

### SuccessIndicator

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | `IndicatorId` | `'compliance' \| 'participation' \| 'infrastructure' \| 'planting' \| 'learning' \| 'sustainability' \| 'income' \| 'satisfaction'`. |
| `label` | `string` | Nombre visible: Cumplimiento, Participación, … |
| `criterion` | `EvaluationCriterion` | `'Cumplimiento' \| 'Participación' \| 'Resultados' \| 'Impactos' \| 'Dificultades'` (ver research R9). |
| `description` | `string` | Qué se mide, en una frase. |
| `target` | `IndicatorTarget \| null` | `null` → se muestra `ui.home.targetPending` ("Por definir con el grupo"). |

`IndicatorTarget = { value: string; detail?: string }` — `value` es lo que se muestra en grande
(`"4 de 4"`, `"15 · 10"`, `"20 m²"`, `"80 %"`); `detail` lo explica (`"actividades en 4 semanas
(100 %)"`, `"personas capacitadas · familias vinculadas"`). Metas iniciales: Cumplimiento,
Participación, Infraestructura y Aprendizaje con valor; Siembra, Sostenibilidad, Ingresos y
Satisfacción con `null`.

### ResourceGroup

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `id` | `'human' \| 'production' \| 'space' \| 'teaching' \| 'records'` | Único. |
| `category` | `string` | Humanos · Materiales de producción · Espacio · Didácticos y logísticos · Registro y comunicación. |
| `icon` | `IconKey` | `users`, `package`, `map-pin`, `presentation`, `camera`. |
| `items` | `string[]` | ≥ 1; texto de la especificación. |

### SupportImageRef y HomeSectionId

- `HomeSectionId = 'proyecto' | 'logros' | 'recursos'` (también son los `id` de ancla).
- `SupportImageRef = { image: string | null; alt: string }` — archivo dentro de
  `src/assets/images/home/` (`proyecto.webp`, `logros.webp`, `recursos.webp`); inicialmente `null`.

## IconKey (`src/types/icon.ts`)

Unión cerrada que amplía `PillarIcon`: `'leaf' | 'coins' | 'sprout' | 'recycle' | 'users' |
'handshake' | 'target' | 'package' | 'map-pin' | 'presentation' | 'camera' | 'badge'`. El mapa a
componentes de lucide vive en `components/AppIcon/`. `PillarIcon` pasa a ser un alias de un
subconjunto de `IconKey`.

## ImageFolder (`src/utils/getImage.ts`)

`ImageFolder = 'activities' | 'slider' | 'home'`; `getImage(folder, name)` →
`ResolvedImage { src: string; isPlaceholder: boolean }`.

## Estado del Slider (no persistido)

| Estado | Inicial | Cambia con |
| --- | --- | --- |
| `index` | 0 | flechas, indicadores, teclado, swipe, temporizador (módulo `length`) |
| `userPaused` | `prefersReducedMotion` | botón Pausar/Reproducir |
| `hovered` | false | `mouseenter` / `mouseleave` |
| `focusWithin` | false | `focusin` / `focusout` (si el foco sale de la región) |
| `documentHidden` | `document.hidden` | `visibilitychange` |
| `visited` | `{0, 1}` | se agrega el índice activo y el siguiente |

`isPlaying = !userPaused && !hovered && !focusWithin && !documentHidden && length > 1`;
`aria-live = isPlaying ? 'off' : 'polite'`.

## Validación (pruebas de datos en `src/data/__tests__/`)

- `slides`: 5 elementos, `id` únicos, `title`/`caption` no vacíos y dentro de sus límites, `alt`
  no vacío.
- `project`: 4 ideas con las 4 etiquetas en orden; 6 objetivos; 8 indicadores con `id` únicos;
  5 grupos de recursos no vacíos; 2 problemáticas de origen; `sectionImages` con las 3 secciones;
  se mantiene la prueba existente de 4 pilares.
