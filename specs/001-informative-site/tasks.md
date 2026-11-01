---

description: "Task list for the Huerta de setas orellanas informative site"
---

# Tasks: Sitio informativo de la Huerta comunitaria de setas orellanas

**Input**: Design documents from `/specs/001-informative-site/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: INCLUDED. Required by constitution principle VIII and by
[contracts/ui-components.md](./contracts/ui-components.md) ("Pruebas obligatorias"). Write each
story's tests first and confirm they fail before implementing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 = Inicio y navegación (P1), US2 = Actividades (P2), US3 = Problemáticas (P3)

## Global conventions (apply to every task)

- Single frontend project at repository root (`src/`). Tests colocated as `*.test.ts(x)`.
- Code, identifiers, comments and commits in English; every user-visible string in Spanish (es-CO).
- Components consume only CSS variables from `src/styles/tokens.css`: no literal colors, spacing,
  radii or shadows in `*.module.css` or inline styles (constitution V).
- No editorial content inside components: text comes from `src/data/*` via props or imports
  (constitution II). Reusable interface strings come from `src/data/ui.ts`.
- Contrast rule (research R4): `--color-leaf` (#6B9A4D) and `--color-ochre` (#C9A24B) are
  decorative only — never text, focus rings or state indicators; text on ochre uses `--color-text`.
- Content files `src/data/project.ts`, `problems.ts`, `activities.ts` start with the comment
  `// DRAFT: pending team review` (FR-029).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling

- [ ] T001 Create the Vite React + TypeScript project files at the repository root without touching `.specify/`, `.claude/` or `specs/`: `package.json` (name `huerta-setas-orellanas`, `"type": "module"`, `"private": true`), `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `src/main.tsx`, `src/vite-env.d.ts`; remove any Vite boilerplate (counter, `App.css`, `assets/react.svg`)
- [ ] T002 Install dependencies in `package.json`: runtime `react@18`, `react-dom@18`, `react-router-dom@6`, `lucide-react`; dev `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-jsx-a11y`, `eslint-config-prettier`, `globals`, `prettier`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`
- [ ] T003 Configure `tsconfig.app.json` with `"strict": true`, `"noUncheckedIndexedAccess": true`, `"noImplicitOverride": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`, `"jsx": "react-jsx"`, `"types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"]`, and include `src`
- [ ] T004 [P] Create `eslint.config.js` (flat config) with `@eslint/js` recommended, `typescript-eslint` recommended-type-checked, `react-hooks`, `react-refresh`, `jsx-a11y` recommended, and `eslint-config-prettier` last; ignore `dist`
- [ ] T005 [P] Create `.prettierrc` (`singleQuote: true`, `semi: true`, `trailingComma: "all"`, `printWidth: 100`) and `.prettierignore` (`dist`, `coverage`, `specs`, `.specify`)
- [ ] T006 Configure Vitest in `vite.config.ts` (`test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts', css: { modules: { classNameStrategy: 'non-scoped' } } }`) and create `src/test/setup.ts` importing `@testing-library/jest-dom/vitest` and running `cleanup` after each test
- [ ] T007 Add scripts to `package.json`: `dev` (`vite`), `build` (`tsc -b && vite build`), `preview` (`vite preview`), `lint` (`eslint .`), `format` (`prettier --write .`), `format:check` (`prettier --check .`), `typecheck` (`tsc -b --noEmit`), `test` (`vitest run`), `test:watch` (`vitest`)
- [ ] T008 [P] Write `index.html`: `<html lang="es-CO">`, meta charset/viewport, `<meta name="description">` in Spanish, `<title>Huerta comunitaria de setas orellanas</title>`, `<link rel="preconnect">` to `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin), Google Fonts stylesheet for Fraunces (600;700) and Nunito (400;600;700) with `display=swap`, favicon link `/favicon.svg`, `<div id="root"></div>`
- [ ] T009 [P] Create `.gitignore` (`node_modules`, `dist`, `coverage`, `*.local`) and the empty folder skeleton from plan.md: `src/config/`, `src/types/`, `src/data/`, `src/assets/images/activities/.gitkeep`, `src/styles/`, `src/utils/`, `src/components/`, `src/pages/`

**Checkpoint**: `npm run lint`, `npm run typecheck` and `npm run dev` run without errors on an empty app.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tokens, types, routing skeleton and layout shell that every story needs

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 [P] Create `src/styles/tokens.css` with `:root` variables: palette `--color-forest: #2F5D3A`, `--color-leaf: #6B9A4D`, `--color-earth: #8A5A3C`, `--color-cream: #F6F1E4`, `--color-ochre: #C9A24B`, `--color-ink: #2B2B26`, `--color-white: #FFFFFF`; semantic tokens `--color-bg` (cream), `--color-surface` (white), `--color-text` (ink), `--color-text-muted` (earth), `--color-heading` (forest), `--color-link` (forest), `--color-focus` (forest), `--color-primary` (forest), `--color-on-primary` (cream), `--color-accent-decor` (leaf), `--color-badge-bg` (ochre), `--color-border`, `--color-backdrop` (ink at ~60% via `rgb(43 43 38 / 0.6)`); fonts `--font-heading: 'Fraunces', Georgia, serif`, `--font-body: 'Nunito', system-ui, sans-serif`; a type scale (`--fs-sm` … `--fs-3xl` using `clamp()`), `--lh-body: 1.7`, `--lh-heading: 1.2`; spacing scale `--space-1` … `--space-10`; radii `--radius-sm/md/lg/pill`; shadows `--shadow-sm/md/lg`; `--measure: 70ch`; `--navbar-height`; `--z-navbar`, `--z-modal`; a comment documenting breakpoints 40rem (tablet) and 64rem (desktop) and the R4 contrast table
- [ ] T011 [P] Create `src/styles/global.css`: modern reset, `box-sizing: border-box`, `body` background `--color-bg`, color `--color-text`, `--font-body`, `--lh-body`; headings with `--font-heading` and `--color-heading`; `html { scroll-padding-top: var(--navbar-height); }`; `:focus-visible` outline 3px `--color-focus` with offset; `img { max-width: 100%; display: block; }`; `.sr-only` utility; `body.scroll-locked { overflow: hidden; }`; `@media (prefers-reduced-motion: reduce)` disabling transitions; `overflow-x` safety for 320px
- [ ] T012 [P] Create `src/types/route.ts` exporting `AppRoute { id: string; path: string; label: string; element: ReactNode; showInNav: boolean; end?: boolean }` per data-model.md
- [ ] T013 [P] Create `src/types/project.ts` exporting `PillarId = 'sustainability' | 'income' | 'space-use' | 'organic-input'`, `PillarIcon = 'leaf' | 'coins' | 'sprout' | 'recycle'`, `Pillar { id: PillarId; title: string; description: string; icon: PillarIcon }`, `ProjectInfo { name: string; scientificName: string; objective: string; pillars: Pillar[]; institution: string }`
- [ ] T014 [P] Create `src/types/problem.ts` exporting `ProblemSectionKey = 'local' | 'national' | 'global' | 'causes' | 'effects'`, `ContentBlock { heading?: string; paragraphs: string[] }`, `ProblemSection { blocks: ContentBlock[] }`, `Problem { id: string; title: string; shortTitle: string; sections: Record<ProblemSectionKey, ProblemSection> }`
- [ ] T015 [P] Create `src/types/activity.ts` exporting `Activity { id: string; week: number; title: string; summary: string; image: string | null; imageAlt: string; duration: string; strategy: string; channels: string[]; responsible: string; resources: string[]; indicators: string[] }` with JSDoc: `image` = "file name inside src/assets/images/activities/ or null", `summary` "≤ 160 characters recommended"
- [ ] T016 [P] Create `src/types/index.ts` re-exporting all types from `route.ts`, `project.ts`, `problem.ts`, `activity.ts`
- [ ] T017 [P] Create `src/data/ui.ts` exporting a typed `ui` object (`as const`) with Spanish strings: `siteShortName` ("Huerta de Setas"), `skipToContent` ("Saltar al contenido"), `navAriaLabel` ("Navegación principal"), `openMenu` ("Abrir menú"), `closeMenu` ("Cerrar menú"), `close` ("Cerrar"), `viewDetail` ("Ver detalle"), `week` ("Semana"), `notDefined` ("Por definir"), `activityFields` (`duration` "Duración", `strategy` "Estrategia", `channels` "Canales", `responsible` "Responsable", `resources` "Recursos", `indicators` "Indicadores de la comunidad"), `pages` titles/intros for Inicio, Problemáticas, Actividades, `notFound` (title "Página no encontrada", text, link "Volver al inicio"), `home.ctaProblems` ("Conocer las problemáticas"), `home.ctaActivities` ("Ver las actividades"), `problemsTabsLabel` ("Problemáticas"), `sectionsTabsLabel` ("Apartados de la problemática"), `footer` text mentioning UNIMINUTO
- [ ] T018 [P] Create `src/components/SectionTitle/SectionTitle.tsx` + `SectionTitle.module.css`: props `{ as?: 'h1' | 'h2'; title: string; subtitle?: string; id?: string }`, decorative leaf-colored underline via `--color-accent-decor`
- [ ] T019 Create minimal page components rendering only `<SectionTitle as="h1">` with titles from `ui.pages`: `src/pages/Home/HomePage.tsx`, `src/pages/Problems/ProblemsPage.tsx`, `src/pages/Activities/ActivitiesPage.tsx`; and `src/pages/NotFound/NotFoundPage.tsx` with `ui.notFound` title, text and a `<Link to="/">` (FR-007)
- [ ] T020 Create `src/config/routes.tsx` exporting `appRoutes: AppRoute[]` in this order: `{ id: 'home', path: '/', label: 'Inicio', element: <HomePage />, showInNav: true, end: true }`, `{ id: 'problems', path: '/problematicas', label: 'Problemáticas', element: <ProblemsPage />, showInNav: true }`, `{ id: 'activities', path: '/actividades', label: 'Actividades', element: <ActivitiesPage />, showInNav: true }`, per contracts/routes-config.md. It is `.tsx` (not `.ts`) because `element` holds JSX; imports use `config/routes` without extension. Add `/* eslint-disable react-refresh/only-export-components */` at the top
- [ ] T021 [P] Create `src/components/Footer/Footer.tsx` + `Footer.module.css`: semantic `<footer>` with project name, `ui.footer` text and current year; colors via tokens
- [ ] T022 Create `src/components/Layout/Layout.tsx` + `Layout.module.css`: skip link (`ui.skipToContent`, targets `#main`), a `navbar` slot (render `null` for now), `<main id="main" tabIndex={-1}>` with `<Outlet />`, `<Footer />`; on route change scroll to top
- [ ] T023 Create `src/App.tsx`: `createBrowserRouter([{ path: '/', element: <Layout />, children: [...appRoutes.map(r => r.path === '/' ? { index: true, element: r.element } : { path: r.path.slice(1), element: r.element }), { path: '*', element: <NotFoundPage /> }] }], { basename: import.meta.env.BASE_URL })` and render `<RouterProvider router={router} />`; no route declared outside `appRoutes` except `*`
- [ ] T024 Update `src/main.tsx` to import `./styles/tokens.css` then `./styles/global.css` and render `<App />` inside `<StrictMode>` into `#root`

**Checkpoint**: `npm run dev` shows the three stub pages at `/`, `/problematicas`, `/actividades` and the NotFound page at any other path, with footer and skip link.

---

## Phase 3: User Story 1 - Entender el proyecto desde el Inicio y navegar (Priority: P1) 🎯 MVP

**Goal**: Sticky responsive navbar generated from `appRoutes`, and a Home with name, objective,
four pillars and two calls to action.

**Independent Test**: open `/`, read the full hero, use the navbar (desktop and 320px menu) and the
two CTAs to reach every section; active link highlighted; fully keyboard-operable (quickstart 1–5).

### Tests for User Story 1 ⚠️ (write first, must fail)

- [ ] T025 [P] [US1] Write `src/components/Navbar/Navbar.test.tsx` (MemoryRouter): renders one link per `appRoutes` entry with `showInNav`, in order, with labels Inicio/Problemáticas/Actividades; with `initialEntries={['/actividades']}` only "Actividades" has `aria-current="page"`; with `['/']` only "Inicio" is current (`end`); menu button toggles `aria-expanded` false→true→false and its accessible name switches "Abrir menú"/"Cerrar menú"; pressing Escape with the menu open closes it and focuses the button; clicking a link closes the menu; accepts an injected `routes` prop
- [ ] T026 [P] [US1] Write `src/config/routes.test.ts`: `id` and `path` unique; every `path` starts with `/`; every `label` non-empty; exactly one entry has `end: true` and it is `/`
- [ ] T027 [P] [US1] Write `src/data/__tests__/project.test.ts`: `pillars` has exactly 4 items with unique `id`s equal to `['sustainability','income','space-use','organic-input']` in order; `name`, `objective`, `scientificName` non-empty; every pillar `title` and `description` non-empty

### Implementation for User Story 1

- [ ] T028 [P] [US1] Create `src/data/project.ts` (starts with `// DRAFT: pending team review`) exporting `project: ProjectInfo`: `name` "Huerta comunitaria de setas orellanas", `scientificName` "Pleurotus ostreatus", `institution` "UNIMINUTO", an `objective` of 1–3 sentences (generate income for the community group of the rural corregimiento, use underused spaces and contribute organic matter by reusing agricultural residues), and 4 pillars in order: Sostenibilidad (`leaf`), Generación de ingresos (`coins`), Aprovechamiento de espacios (`sprout`), Aporte orgánico (`recycle`), each with a 1–2 sentence Spanish description
- [ ] T029 [P] [US1] Create `src/components/PillarIcon/PillarIcon.tsx`: single map `Record<PillarIcon, LucideIcon>` (`leaf`→`Leaf`, `coins`→`Coins`, `sprout`→`Sprout`, `recycle`→`Recycle`), renders the icon with `aria-hidden="true"` and `size` prop
- [ ] T030 [P] [US1] Create `src/components/PillarCard/PillarCard.tsx` + `PillarCard.module.css`: props `{ pillar: Pillar }`, `<article>` with icon in a decorative leaf-tinted circle, `<h3>` title, description; surface background, `--radius-lg`, `--shadow-sm`
- [ ] T031 [US1] Implement `src/components/Navbar/Navbar.tsx` + `Navbar.module.css` per contracts/ui-components.md: props `{ routes?: AppRoute[] }` defaulting to `appRoutes`; `<header>` sticky top with `--z-navbar`, height `--navbar-height`; brand (`ui.siteShortName`, `<Link to="/">`) left; `<nav aria-label={ui.navAriaLabel}>` with `<ul id="main-menu">` of `NavLink`s (`end` from route) right; active link styled with underline/border plus color (not color alone); below 40rem a `<button aria-expanded aria-controls="main-menu">` with lucide `Menu`/`X` icons (`aria-hidden`) and accessible name from `ui.openMenu`/`ui.closeMenu`; menu closes on link click, on `useLocation` change, on Escape (returning focus to the button) and when `matchMedia('(min-width: 40rem)')` becomes true; mobile-first CSS
- [ ] T032 [US1] Render `<Navbar />` in the navbar slot of `src/components/Layout/Layout.tsx` (before `<main>`, after the skip link)
- [ ] T033 [US1] Implement `src/pages/Home/HomePage.tsx` + `HomePage.module.css`: hero `<section aria-labelledby>` with `<h1>` = `project.name`, `<em lang="la">` scientific name, objective paragraph; pillars `<section>` with `<SectionTitle as="h2">` and a grid of 4 `PillarCard` (1 column → 2 at 40rem → 4 at 64rem); CTA group with two `<Link>`s styled as buttons to `/problematicas` (`ui.home.ctaProblems`, primary: `--color-primary` bg / `--color-on-primary` text) and `/actividades` (`ui.home.ctaActivities`, secondary: earth border/text); paths read from `appRoutes` by `id`, not hard-coded
- [ ] T034 [P] [US1] Add `public/favicon.svg`: simple mushroom silhouette in `#2F5D3A` on transparent background

**Checkpoint**: US1 tests pass; quickstart scenarios 1, 2, 3, 4, 5 pass. MVP deployable.

---

## Phase 4: User Story 2 - Explorar las actividades del plan de trabajo (Priority: P2)

**Goal**: Four activity cards ordered by week with image or placeholder, opening an accessible modal
with all six detail fields.

**Independent Test**: on `/actividades`, open and close each of the 4 modals by button, Escape and
backdrop (12/12), see all 6 fields, focus returns to the card; all cards show the placeholder
(quickstart 6–8).

### Tests for User Story 2 ⚠️ (write first, must fail)

- [ ] T035 [P] [US2] Write `src/components/Modal/Modal.test.tsx`: with `isOpen={false}` nothing renders; with `isOpen` a `dialog` with accessible name = `title` and `aria-modal="true"` is in `document.body`; close button is focused on open; Escape calls `onClose`; clicking the backdrop calls `onClose` while clicking inside the panel does not; Tab/Shift+Tab from the last/first focusable element wraps inside the dialog; after reopening→closing via a harness component with a trigger button, focus returns to the trigger; `document.body` has class `scroll-locked` while open and not after close
- [ ] T036 [P] [US2] Write `src/components/ActivityCard/ActivityCard.test.tsx`: with `image: null` the `<img>` `src` equals the placeholder URL and `alt=""`; with `image: 'missing.jpg'` it also uses the placeholder; firing `error` on the image switches to the placeholder; shows "Semana N", the title as heading and the summary; clicking the button and pressing Enter call `onSelect` with the activity; button accessible name contains week and title
- [ ] T037 [P] [US2] Write `src/utils/getActivityImage.test.ts`: returns placeholder for `null`, `''` and an unknown name; (mock `import.meta.glob` result via the exported pure `resolveImage(name, map, fallback)` helper) returns the mapped URL for a known name
- [ ] T038 [P] [US2] Write `src/data/__tests__/activities.test.ts`: exactly 4 activities; `week` values are `[1,2,3,4]` after sorting and unique; titles equal, in week order, "Capacitación sobre el producto", "Concientización sobre la producción sostenible del producto", "Creación de la estructuración de la huerta", "Siembra del producto"; all `image` are `null`; `imageAlt`, `summary`, `title` non-empty; `summary.length <= 160`; `id`s unique

### Implementation for User Story 2

- [ ] T039 [P] [US2] Create `src/assets/images/placeholder.svg`: neutral 1600×1000 (16:10) SVG, cream `#F6F1E4` background with a subtle lighter-ochre/leaf outline of a mushroom or image glyph in the center, no text
- [ ] T040 [US2] Implement `src/utils/getActivityImage.ts`: `const images = import.meta.glob('../assets/images/activities/*.{png,jpg,jpeg,webp,avif,svg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>`; build a map keyed by bare file name; export pure `resolveImage(name, map, fallback)` and `getActivityImage(name: string | null): { src: string; isPlaceholder: boolean }`; in `import.meta.env.DEV` `console.warn` when a non-null name is not found; export `placeholderImage` URL
- [ ] T041 [P] [US2] Create `src/components/ImageWithFallback/ImageWithFallback.tsx` + `ImageWithFallback.module.css`: props `{ src: string; alt: string; fallbackSrc: string; className?: string }`; swaps to `fallbackSrc` on `onError` (once); wrapper with `aspect-ratio: 16 / 10`, `object-fit: cover`, background `--color-bg`; `loading="lazy"`, `decoding="async"`
- [ ] T042 [P] [US2] Create `src/data/activities.ts` (starts with `// DRAFT: pending team review`) exporting `activities: Activity[]` with the 4 activities (weeks 1–4, titles exactly as in T038), `image: null`, Spanish `imageAlt`, `summary` ≤ 160 characters, and draft values for `duration`, `strategy`, `channels[]`, `responsible`, `resources[]`, `indicators[]` coherent with each week (training on Pleurotus ostreatus; sustainable-production awareness and residue reuse; building the growing structure in underused space; sowing/inoculating substrate)
- [ ] T043 [US2] Implement `src/components/Modal/useFocusTrap.ts` + `src/components/Modal/Modal.tsx` + `Modal.module.css` per contracts/ui-components.md and research R6: props `{ isOpen; onClose; title; children }`; `createPortal` to `document.body`; backdrop (`--color-backdrop`, `--z-modal`) closes only when both `mousedown` and `click` target the backdrop; panel `role="dialog"` `aria-modal="true"` `aria-labelledby` (`useId`) with `<h2>` title and close button (lucide `X`, accessible name `ui.close`); on open store `document.activeElement`, focus the close button, add `scroll-locked` to body (compensating scrollbar width with `padding-right`), set `inert` on `#root`; Escape → `onClose`; Tab trap; on close restore everything and refocus the stored element; panel `max-height: calc(100dvh - var(--space-8))` with internal scroll; full-width sheet on mobile, centered max-width on tablet+
- [ ] T044 [US2] Implement `src/components/ActivityCard/ActivityCard.tsx` + `ActivityCard.module.css` per contract: props `{ activity; onSelect }`; `<article>` containing a full-card `<button type="button">` whose accessible name is "`${ui.week} ${week}: ${title}`" (via `aria-label` or visible text order); `ImageWithFallback` using `getActivityImage(activity.image)` with `alt` = `isPlaceholder ? '' : activity.imageAlt`; week badge ("Semana N", `--color-badge-bg` with `--color-text`); `<h3>` title; summary; "Ver detalle" hint; hover/focus elevation via `--shadow-md`
- [ ] T045 [US2] Implement `src/components/ActivityModal/ActivityModal.tsx` + `ActivityModal.module.css`: props `{ activity: Activity | null; onClose }`; uses `Modal` with `isOpen={activity !== null}` and `title={activity.title}`; shows week badge and a `<dl>` with labels from `ui.activityFields`: Duración, Estrategia (paragraph), Canales, Responsable, Recursos, Indicadores de la comunidad (arrays as `<ul>`); empty string or empty array renders `ui.notDefined`
- [ ] T046 [US2] Implement `src/pages/Activities/ActivitiesPage.tsx` + `ActivitiesPage.module.css`: `SectionTitle as="h1"` with `ui.pages.activities`; activities sorted by `week` (copy, not mutating data) rendered in a `<ul role="list">` grid (1 column, 2 at 40rem, 4 at 64rem) of `ActivityCard`; state `selected: Activity | null`; renders `<ActivityModal activity={selected} onClose={() => setSelected(null)} />`

**Checkpoint**: US2 tests pass; quickstart scenarios 6, 7, 8 pass; replacing a stub keeps US1 working.

---

## Phase 5: User Story 3 - Leer las problemáticas (Priority: P3)

**Goal**: Two problems switchable by tabs, each with five sub-tabs (Local, Nacional, Global,
Causas, Efectos), readable long text.

**Independent Test**: on `/problematicas`, go through 2 × 5 tabs with mouse and with arrow keys;
10/10 panels show full text; Causas and Efectos show their four sub-headings (quickstart 9).

### Tests for User Story 3 ⚠️ (write first, must fail)

- [ ] T047 [P] [US3] Write `src/components/Tabs/Tabs.test.tsx`: renders `tablist` with accessible name = `ariaLabel` and one `tab` per item; selected tab has `aria-selected="true"`, `tabindex="0"`, others `tabindex="-1"`; each tab `aria-controls` its `tabpanel`, which is `aria-labelledby` the tab; ArrowRight/ArrowLeft move focus and selection with wrap-around; Home/End jump to first/last; clicking a tab calls `onChange` with its id
- [ ] T048 [P] [US3] Write `src/data/__tests__/problems.test.ts`: exactly 2 problems with titles "Desempleo y falta de oportunidades de generación de ingresos dignos en comunidades rurales de corregimientos" and "Subutilización de espacios productivos y bajo aprovechamiento de residuos orgánicos agrícolas en zonas rurales"; each has the 5 keys of `PROBLEM_SECTION_ORDER`; every section has ≥ 1 block and every block ≥ 1 non-empty paragraph; `causes` block headings equal `['Históricas','Socioculturales','Políticas','Económicas']`; `effects` headings equal `['Sociales','Culturales','Ambientales','Políticos']`; `PROBLEM_SECTION_LABELS` maps to Local/Nacional/Global/Causas/Efectos

### Implementation for User Story 3

- [ ] T049 [P] [US3] Create `src/data/problems.ts` (starts with `// DRAFT: pending team review`) exporting `PROBLEM_SECTION_ORDER: ProblemSectionKey[] = ['local','national','global','causes','effects']`, `PROBLEM_SECTION_LABELS: Record<ProblemSectionKey, string>` (Local, Nacional, Global, Causas, Efectos) and `problems: Problem[]` with ids `unemployment` (shortTitle "Desempleo rural") and `underused-spaces` (shortTitle "Espacios y residuos"), full titles as in T048; draft Spanish content: local/national/global analyses of 2–4 paragraphs each (Colombian rural corregimiento context, national rural labor/informality, global rural poverty and circular economy); `causes` with 4 headed blocks (Históricas, Socioculturales, Políticas, Económicas) and `effects` with 4 headed blocks (Sociales, Culturales, Ambientales, Políticos), 1–2 paragraphs each; avoid invented precise statistics (use qualitative statements)
- [ ] T050 [US3] Implement `src/components/Tabs/Tabs.tsx` + `Tabs.module.css` per contract and research R7: props `{ items: { id: string; label: string; content: ReactNode }[]; ariaLabel: string; selectedId: string; onChange: (id: string) => void; variant?: 'primary' | 'secondary'; idPrefix: string }`; roving `tabindex`, automatic activation, ArrowLeft/ArrowRight (wrap), Home, End; only the selected panel rendered (`role="tabpanel"`, `tabIndex={0}`); `secondary` tablist scrolls horizontally inside its container on small screens without page overflow; selected state shown by border/background plus color
- [ ] T051 [US3] Implement `src/components/ProblemTabs/ProblemTabs.tsx` + `ProblemTabs.module.css`: props `{ problems: Problem[] }`; state `problemId` (initial first) and `sectionKey` (initial `'local'`, reset to `'local'` when problem changes); outer `Tabs` (`variant="primary"`, `ariaLabel={ui.problemsTabsLabel}`, labels = `shortTitle`) whose panel shows `<h2>` full title and inner `Tabs` (`variant="secondary"`, `ariaLabel={ui.sectionsTabsLabel}`, labels from `PROBLEM_SECTION_LABELS` in `PROBLEM_SECTION_ORDER`); section panel renders blocks with `<h3>` for `heading` and `<p>` per paragraph; reading column `max-width: var(--measure)`, `--lh-body`, `--fs-md`
- [ ] T052 [US3] Implement `src/pages/Problems/ProblemsPage.tsx` + `ProblemsPage.module.css`: `SectionTitle as="h1"` with `ui.pages.problems` title/intro and `<ProblemTabs problems={problems} />`

**Checkpoint**: US3 tests pass; quickstart scenario 9 passes; US1 and US2 still pass.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Deployment, documentation and final verification

- [ ] T053 [P] Add SPA fallbacks: `public/_redirects` with `/*  /index.html  200` and `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` (research R3)
- [ ] T054 [P] Add GitHub Pages build: `scripts/copy-404.mjs` (copies `dist/index.html` to `dist/404.html` with `node:fs`) and `package.json` script `build:gh-pages` = `tsc -b && vite build --base=/<repo-name>/ && node scripts/copy-404.mjs` with a comment in README to replace `<repo-name>`
- [ ] T055 [P] Write `README.md` (Spanish, for the team): what the project is, commands from quickstart.md, how to edit content in `src/data/`, how to connect an activity image (copy file to `src/assets/images/activities/` + set `image: 'archivo.jpg'` and review `imageAlt`), how to add a section (contracts/routes-config.md procedure), how to change colors (`src/styles/tokens.css` only), deployment options, and a note that content files are DRAFT pending review
- [ ] T056 Audit constitution V/II: search `src/**/*.module.css` and `src/**/*.tsx` for literal colors (`#[0-9a-fA-F]{3,8}`, `rgb(`, `hsl(`) and px/rem spacing values outside `src/styles/tokens.css`; replace any with tokens; confirm no editorial strings hard-coded in components
- [ ] T057 Run `npm run format`, then `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run test`, `npm run build`; fix every error until all pass (constitution VIII)
- [ ] T058 Run quickstart.md manual scenarios 1–13 on `npm run preview` (including 320/768/1280px, keyboard-only, Lighthouse/axe accessibility with 0 errors, Lighthouse mobile < 3 s) and record results and any fixes in `specs/001-informative-site/checklists/validation.md`
- [ ] T059 Check initial JS bundle size from `npm run build` output is < 100 KB gzip (plan Performance Goals); if exceeded, inspect imports (e.g., lucide named imports) and fix

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies. T001 → T002 → T003; T004–T009 after T002.
- **Foundational (Phase 2)**: depends on Setup. T010–T018 and T021 parallel; T019 needs T017–T018;
  T020 needs T019 and T012; T022 needs T021; T023 needs T020, T022; T024 needs T010, T011, T023.
- **User Stories (Phase 3–5)**: each depends only on Foundational; they touch disjoint files except
  `Layout.tsx` (US1 only) and their own page file.
- **Polish (Phase 6)**: after all desired stories.

### User Story Dependencies

- **US1 (P1)**: after Phase 2. No dependency on other stories.
- **US2 (P2)**: after Phase 2. Independent of US1 (its page is reachable by URL even without the
  navbar); demo is best after US1.
- **US3 (P3)**: after Phase 2. Independent of US1 and US2.

### Within Each User Story

- Tests first (must fail) → data → leaf components → composite components → page.
- US1: T028–T030 → T031 → T032 → T033.
- US2: T039–T042 parallel (T041 independent; T040 needs T039) → T043 → T044 (needs T040, T041) →
  T045 (needs T043) → T046.
- US3: T049 → T050 → T051 → T052.

### Parallel Opportunities

- Setup: T004, T005, T008, T009.
- Foundational: T010–T018, T021.
- Each story's test tasks are all [P].
- After Phase 2, US1, US2 and US3 can be developed in parallel by different people.
- Polish: T053, T054, T055.

---

## Parallel Example: User Story 2

```bash
# Tests first, together:
Task: "Write src/components/Modal/Modal.test.tsx"
Task: "Write src/components/ActivityCard/ActivityCard.test.tsx"
Task: "Write src/utils/getActivityImage.test.ts"
Task: "Write src/data/__tests__/activities.test.ts"

# Then independent building blocks, together:
Task: "Create src/assets/images/placeholder.svg"
Task: "Create src/components/ImageWithFallback/ImageWithFallback.tsx"
Task: "Create src/data/activities.ts"
```

## Parallel Example: User Story 1

```bash
Task: "Write src/components/Navbar/Navbar.test.tsx"
Task: "Write src/config/routes.test.ts"
Task: "Write src/data/__tests__/project.test.ts"
Task: "Create src/data/project.ts"
Task: "Create src/components/PillarIcon/PillarIcon.tsx"
Task: "Create src/components/PillarCard/PillarCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup → Phase 2: Foundational.
2. Phase 3: US1 (navbar + Home).
3. **STOP and VALIDATE**: quickstart scenarios 1–5; deploy if ready (Problemáticas and Actividades
   show their titles as stubs).

### Incremental Delivery

1. Setup + Foundational → skeleton with routes.
2. US1 → validate → deploy (MVP).
3. US2 → validate scenarios 6–8 → deploy.
4. US3 → validate scenario 9 → deploy.
5. Polish → full quickstart validation.

### Parallel Team Strategy

After Phase 2: developer A on US1, developer B on US2, developer C on US3; merge per story.

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks.
- Commit after each task or logical group, with English messages (e.g., `feat(activities): add accessible modal`).
- Data-model test file `content.test.ts` is split per entity (`project`, `activities`, `problems`,
  `routes`) so each story owns its test file.
- Stop at any checkpoint to validate a story independently.
