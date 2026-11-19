---

description: "Task list for the SDG (ODS) view and real project images"
---

# Tasks: Vista ODS e imágenes reales del proyecto

**Input**: Design documents from `/specs/003-sdg-view/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-components.md, quickstart.md

**Tests**: INCLUDED. Required by constitution principle VIII and requested explicitly in the plan
input (Navbar, SdgFilter, SdgCard + SdgModal, ODS sin indicador, ActivitySdgTable, integridad de
datos e imágenes). Write each story's tests first and confirm they fail before implementing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 = Tarjetas + modal (P1), US2 = Navbar (P1), US3 = Qué son los ODS (P2),
  US4 = Filtro (P2), US5 = Cuadro actividad→ODS + CTA (P3), US6 = Imágenes reales (P2)

## Global conventions (apply to every task)

- Single frontend project at repository root (`src/`). Tests colocated as `*.test.ts(x)`; data
  tests in `src/data/__tests__/`.
- Code, identifiers, comments and commits in English; every user-visible string in Spanish (es-CO).
- Components consume only CSS variables from `src/styles/tokens.css`: no literal colors, spacing,
  radii, shadows or durations in `*.module.css` or inline styles (constitution V). SDG colors are
  referenced as `var(--sdg-${id})` / `var(--sdg-${id}-on)`; **never store hex values in data**.
- No editorial content inside components: content in `src/data/sdg.ts`, interface strings in
  `src/data/ui.ts` under `ui.sdg` (constitution II).
- **Do not change any visible text** in `src/data/slides.ts`, `src/data/project.ts`,
  `src/data/activities.ts`, `src/data/problems.ts`; only `image` fields may change (FR-032).
- No new dependencies. Icons from `lucide-react` (already installed): `ArrowRight`, `Check`,
  `ExternalLink`.
- Breakpoints: tablet `min-width: 40rem`, desktop `min-width: 64rem` (documented in tokens.css).
- Every task ends with `npm run lint && npm run typecheck` passing for the touched files.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare image folders and confirm a green baseline.

- [X] T001 Run `npm run lint && npm run typecheck && npm test` on the current branch and record that the baseline is green before any change (no file changes)
- [X] T002 [P] Create `src/assets/images/sdg/.gitkeep` so the `sdg` folder exists in git (research R8)
- [X] T003 [P] Add `src/assets/images/README.md` documenting the expected file names per folder — `slider/slide-1…slide-5`, `home/proyecto|logros|recursos`, `activities/semana-1…semana-4`, `sdg/intro|ods-1|ods-2|ods-3|ods-4|ods-8|ods-12|ods-13|ods-15|ods-17` — formats `.webp|.jpg|.jpeg|.png`, names "lowercase, no spaces, no accents" (`^[a-z0-9-]+\.(webp|jpg|jpeg|png|avif|svg)$`), recommended sizes (slider 1920×800, home 1200×800, activities/sdg 900×600) and that missing files fall back to the placeholder

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, tokens, data, image resolver, selectors, generalized shared components and the
lazy `/ods` route shell. **No user story can start until this phase is complete.**

### Tests (write first, must fail)

- [X] T004 [P] Extend `src/utils/getImage.test.ts`: `resolveImage`/`getImage` resolve `'ods-2'`, `'ods-2.webp'`, `'ODS-2.JPG'` and `' ods-2 '` to the same key (folder + base name without extension, lowercase); when two files share a base name the priority is `webp > avif > jpg > jpeg > png > svg`; `null`, `''` and unknown names return `{ src: placeholder, isPlaceholder: true }`; folder `'sdg'` is accepted (research R7)
- [X] T005 [P] Create `src/data/__tests__/sdg.test.ts` with the validation rules of data-model.md: exactly 9 SDGs with ids `{1,2,3,4,8,12,13,15,17}`, unique; levels count directa 3 / complementaria 4 / indirecta 2; target codes per SDG exactly `2:[2.3,2.4] 8:[8.3] 12:[12.2,12.5] 1:[1.4] 4:[4.4,4.7] 13:[13.3] 17:[17.17] 3:[3.4] 15:[15.3]` and each code starts with `${id}.`; every `activityIds` entry exists in `activities` and every `indicatorIds` entry exists in `project.indicators`; each of the 4 activities appears in ≥ 1 SDG; `indicatorIds.length === 0` ⇔ `level === 'indirecta'`; no string in `sdgs`, `sdgLevels` or `sdgPageContent` matches `/\b(cumple|cumplir|cumplen|logra|lograr|logran)\b/i`; `tokens.css` (read with `node:fs`) defines `--sdg-${id}` and `--sdg-${id}-on` for every id
- [X] T006 [P] Create `src/utils/sdg.test.ts`: `getSdgsByLevel('todos')` returns 3 groups in order directa→complementaria→indirecta with items sorted by id; `getSdgsByLevel('directa')` returns 1 group with ids `[2,8,12]`; `getActivitySdgRows()` returns 4 rows sorted by week with SDG ids `product-training:[4,8,17]`, `sustainable-awareness:[4,12,13,15]`, `garden-structure:[2]`, `sowing:[1,2,3,8,12]`; `resolveSdgActivities` / `resolveSdgIndicators` return objects in the order of the ids and throw on an unknown id

### Implementation

- [X] T007 [P] Add SDG color tokens to `src/styles/tokens.css` under a `/* SDG accents (research R3) */` block: `--color-sdg-ink: #1a1a17;` and `--sdg-1: #e5243b; --sdg-2: #dda63a; --sdg-3: #4c9f38; --sdg-4: #c5192d; --sdg-8: #a21942; --sdg-12: #bf8b2e; --sdg-13: #3f7e44; --sdg-15: #56c02b; --sdg-17: #19486a;` with text tokens `--sdg-1-on/--sdg-4-on/--sdg-8-on/--sdg-13-on/--sdg-17-on: var(--color-white)` and `--sdg-2-on/--sdg-3-on/--sdg-12-on/--sdg-15-on: var(--color-sdg-ink)`; add the contrast table of research R3 as a comment (all pairs ≥ 4.5:1). Also add `--card-lift: -4px` and reuse existing duration/shadow tokens (add `--duration-card: 200ms` only if no equivalent exists)
- [X] T008 [P] Create `src/types/sdg.ts` exactly as in data-model.md: `SdgId = 1 | 2 | 3 | 4 | 8 | 12 | 13 | 15 | 17`, `SdgLevel = 'directa' | 'complementaria' | 'indirecta'`, `SdgFilterValue = SdgLevel | 'todos'`, `SdgTarget { code; text }`, `Sdg { id; name; level; summary /* <= 140 chars */; detail: string[]; targets: SdgTarget[] /* at least one */; image: string | null; imageAlt; activityIds: string[] /* at least one */; indicatorIds: IndicatorId[] /* empty only when level === 'indirecta' */ }`, `SdgLevelInfo { id; title; filterLabel; badge; description }`, `SdgPageContent` (intro/catalog/summary with `cta.routeId: 'activities'`); export it from `src/types/index.ts`
- [X] T009 Extend `src/types/project.ts` `SupportImageRef` with `folder?: ImageFolder` (default `'home'`; import the type from `src/utils/getImage.ts` with `import type`), keeping existing fields unchanged
- [X] T010 Rewrite the resolver in `src/utils/getImage.ts` (research R7): `ImageFolder = 'activities' | 'slider' | 'home' | 'sdg'`; glob `'../assets/images/{activities,slider,home,sdg}/*.{png,jpg,jpeg,webp,avif,svg}'` with `{ eager: true, query: '?url', import: 'default' }`; build the map keyed by `folder/base-name` lowercase without extension applying the priority `webp > avif > jpg > jpeg > png > svg` (DEV `console.warn` on duplicates); export a pure `normalizeImageName(name)` (trim, lowercase, strip extension) used by `getImage`; keep `resolveImage`, `placeholderImage`, the DEV warning for missing files and the `ResolvedImage` shape; `src/utils/getActivityImage.ts` must keep working unchanged (makes T004 pass)
- [X] T011 Add interface strings to `src/data/ui.ts` as `ui.sdg`: `pageTitle: 'ODS'`, `sdgPrefix: 'ODS'`, `viewRelation: 'Ver cómo se relaciona'`, `notMeasured: 'No se mide en el plan actual'`, `longTerm: 'Contribución de largo plazo'`, `filterLabel: 'Filtrar por nivel de contribución'`, `filterAll: 'Todos'`, `showing: (count: number) => \`Mostrando ${count} ODS\``, `newTab: '(abre en una pestaña nueva)'`, `modal: { explanation: 'Cómo se relaciona con el proyecto', targets: 'Metas relacionadas', activities: 'Actividades del plan que lo sustentan', indicators: 'Cómo se evidencia' }`, `table: { activity: 'Actividad', sdgs: 'ODS a los que aporta' }`, `loading: 'Cargando…'`; keep `as const` compatibility (function values allowed)
- [X] T012 Create `src/data/sdg.ts` with `sdgLevels: SdgLevelInfo[]` (directa: title/badge "Contribución directa", filterLabel "Directa"; complementaria: "Contribución complementaria" / "Complementaria"; indirecta: "Contribución indirecta o de largo plazo" / "Indirecta", description stating it is not measured in the current plan), `sdgs: Sdg[]` with the 9 rows of the data-model.md table (names, levels, target codes and texts verbatim from data-model.md §Metas, `activityIds`, `indicatorIds`, `image: 'ods-N'`, Spanish `imageAlt` describing a project photo) and `summary`/`detail` written **only** from the ideas in spec FR-009 using "contribuye/aporta/promueve/fortalece", mentioning the local scale; and `sdgPageContent: SdgPageContent` with: intro title "Qué son los ODS y por qué importan en el proyecto", ≤ 2 short paragraphs on the ODS and Agenda 2030 (17 objetivos adoptados en 2015 por los Estados miembros de la ONU), `localMessage` saying the project *contribuye a nivel local* through a four-week intervention with a community group of a corregimiento and does not claim to fulfil them, `unLink: { label: 'Conoce los ODS en el sitio oficial de la ONU', href: 'https://www.un.org/sustainabledevelopment/es/' }`, `image: { folder: 'sdg', image: 'intro', alt: '…' }`; catalog title "ODS a los que contribuye el proyecto" + one-line intro; summary title "De la actividad al ODS", intro, table caption and `cta: { label: 'Ver las actividades', routeId: 'activities' }` (makes T005 pass)
- [X] T013 Create `src/utils/sdg.ts` with `getSdgsByLevel(filter: SdgFilterValue)`, `getActivitySdgRows()`, `resolveSdgActivities(sdg)` and `resolveSdgIndicators(sdg)` as specified in data-model.md §Selectores; the activity→SDG rows MUST be derived by inverting `Sdg.activityIds` (never a second hand-written mapping, FR-025) (makes T006 pass)
- [X] T014 [P] Generalize `src/components/Section/Section.tsx`: `id: string` instead of `HomeSectionId`; pass `image.folder` to `SupportImage`; Home behavior unchanged
- [X] T015 [P] Add `folder?: ImageFolder` prop (default `'home'`) to `src/components/SupportImage/SupportImage.tsx` and use it in `getImage(folder, name)`; update `src/components/SupportImage/SupportImage.test.tsx` with one case for `folder="sdg"` falling back to the placeholder
- [X] T016 [P] Add optional `width`, `height` and `loading` (`'lazy' | 'eager'`, default `'lazy'`) props to `src/components/ImageWithFallback/ImageWithFallback.tsx`, forwarded to `<img>`; existing callers unchanged
- [X] T017 Wrap `<Outlet />` in `src/components/Layout/Layout.tsx` with `<Suspense fallback={<div className={styles.pageFallback} aria-busy="true" aria-label={ui.sdg.loading} />}>` and add `.pageFallback { min-height: 60vh; }` (use a token or `vh` only) to `src/components/Layout/Layout.module.css` (research R2)
- [X] T018 Create the page shell `src/pages/Sdg/SdgPage.tsx` (named export `SdgPage`) and `src/pages/Sdg/SdgPage.module.css` rendering a visually hidden `<h1>{ui.sdg.pageTitle}</h1>` (or visible page header following `ActivitiesPage`) and three empty `<Section>` placeholders with ids `que-son`, `ods`, `de-la-actividad-al-ods` and titles from `sdgPageContent`; set `document.title` the same way other pages do (if they do)
- [X] T019 Register the route in `src/config/routes.tsx` after `activities`: `const SdgPage = lazy(() => import('../pages/Sdg/SdgPage').then((m) => ({ default: m.SdgPage })));` and `{ id: 'sdg', path: '/ods', label: 'ODS', element: <SdgPage />, showInNav: true }`; update `src/config/routes.test.ts` to expect ids `['home','problems','activities','sdg']` in order and unique paths; `App.tsx` must not change

**Checkpoint**: `npm test` green (T004–T006 pass), `/ods` loads an empty 3-section page.

---

## Phase 3: User Story 1 - Tarjetas interactivas y modal (Priority: P1) 🎯 MVP

**Goal**: 9 interactive SDG cards grouped by level that open an accessible modal with explanation,
targets, supporting activities and success indicator.

**Independent Test**: open `/ods`, see 9 cards in 3 groups (3/4/2) with all 6 elements, open and
close each modal with click, tap, Enter and Space, verify content and focus return.

### Tests for User Story 1 (write first, must fail)

- [X] T020 [P] [US1] Create `src/components/SdgBadge/SdgBadge.test.tsx`: renders "ODS" + number and the name; with `showName={false}` the name is present in an `sr-only` element; the root sets inline custom properties `--badge-bg: var(--sdg-2)` and `--badge-fg: var(--sdg-2-on)` (no hex)
- [X] T021 [P] [US1] Create `src/components/SdgCard/SdgCard.test.tsx`: shows image (placeholder with `alt=""` when the file is missing), badge, name, level label, summary and the text "Ver cómo se relaciona"; the button has accessible name "ODS 2: Hambre cero" and `aria-haspopup="dialog"`; `onSelect` fires on click, Enter and Space (user-event); `headingLevel={4}` renders an `h4`; `<img>` has `width="900" height="600" loading="lazy"`
- [X] T022 [P] [US1] Create `src/components/SdgModal/SdgModal.test.tsx`: for ODS 12 shows title "ODS 12: Producción y consumo responsables", the detail paragraphs, targets "12.2" and "12.5" with text, activities "Semana 2 · Concientización sobre la producción sostenible del producto" and "Semana 4 · Siembra del producto", and indicator "Sostenibilidad" with its description; for ODS 3 shows "No se mide en el plan actual" and "Contribución de largo plazo" and no indicator list; `sdg={null}` renders nothing
- [X] T023 [US1] Create `src/pages/Sdg/SdgPage.test.tsx` (render within `MemoryRouter` at `/ods`, use `findBy*`): exactly 3 `<section>` elements; 3 group headings `h3` in order Directa/Complementaria/Indirecta; 9 card buttons; clicking "ODS 8: Trabajo decente y crecimiento económico" opens a `dialog`; Tab stays inside it; Escape closes it and focus returns to that button; clicking the backdrop (`data-testid="modal-backdrop"`) closes it

### Implementation for User Story 1

- [X] T024 [P] [US1] Implement `src/components/SdgBadge/SdgBadge.tsx` + `SdgBadge.module.css` per contracts (`sdg: Pick<Sdg,'id'|'name'>`, `showName` default true, `size: 'sm' | 'md'`): number in bold ≥ `--fs-lg` over `var(--badge-bg)` with `color: var(--badge-fg)`, small "ODS" prefix, name next to it (or `sr-only`), rounded pill using radius tokens (makes T020 pass)
- [X] T025 [P] [US1] Implement `src/components/SdgCard/SdgCard.tsx` + `SdgCard.module.css` per contracts and research R4: `<article>` > `ImageWithFallback` (`getImage('sdg', sdg.image)`, `alt` = placeholder ? `''` : `sdg.imageAlt`, `width={900} height={600}`, ratio 3/2, `object-fit: cover`), `SdgBadge`, level label text (indirect → `ui.sdg.longTerm`), heading (`headingLevel` 3|4, default 3) containing a stretched `<button type="button" aria-haspopup="dialog">` with `sr-only` "ODS N: " + name, `summary`, `aria-hidden` "Ver cómo se relaciona" + `ArrowRight`; `onSelect(sdg)`; hover and `:focus-within` → `transform: translateY(var(--card-lift))` + elevated shadow token over the card duration token; `:focus-visible` ring with `--color-focus`; left/top accent border `var(--sdg-N)` as decoration only; `@media (prefers-reduced-motion: reduce)` removes transform and transition (makes T021 pass)
- [X] T026 [P] [US1] Implement `src/components/SdgModal/SdgModal.tsx` + `SdgModal.module.css` per contracts: wraps existing `src/components/Modal/Modal.tsx` (`isOpen={sdg !== null}`, `title="ODS N: Nombre"`, `eyebrow` = `SdgBadge showName={false}` + level badge); body sections with `h3` headings from `ui.sdg.modal`: image (`ImageWithFallback`), `detail` paragraphs, targets list "code — text", activities from `resolveSdgActivities` as "Semana N · título" (use `ui.week`-style label "Semana"), indicators from `resolveSdgIndicators` (label, description, target value/detail or `ui.home.targetPending`); when `indicatorIds` is empty show `ui.sdg.notMeasured` + `ui.sdg.longTerm` (makes T022 pass)
- [X] T027 [US1] Fill section 2 of `src/pages/Sdg/SdgPage.tsx`: state `selected: Sdg | null`; render `getSdgsByLevel('todos')` groups, each `<div role="group" aria-labelledby>` with an `h3` (`level.title`) + short description and a `<ul>` grid of `SdgCard headingLevel={4}`; grid in `SdgPage.module.css`: 1 column, 2 columns `@media (min-width: 40rem)`, 3 columns `@media (min-width: 64rem)` with gap tokens; render a single `<SdgModal sdg={selected} onClose={() => setSelected(null)} />` (focus return is handled by `Modal`) (makes T023 pass)

**Checkpoint**: US1 fully functional and testable on `/ods` (reachable by URL).

---

## Phase 4: User Story 2 - Opción "ODS" en la navbar (Priority: P1)

**Goal**: "ODS" after "Actividades", same behavior as the others, and a navbar that tolerates more items.

**Independent Test**: from any page in desktop and mobile, activate "ODS" with mouse, tap and
keyboard; it navigates, is highlighted and has `aria-current="page"`.

### Tests for User Story 2 (write first, must fail)

- [X] T028 [US2] Extend `src/components/Navbar/Navbar.test.tsx`: with the real `appRoutes`, links appear in order Inicio, Problemáticas, Actividades, ODS; at `/ods` the "ODS" link has `aria-current="page"` and the active class; after opening the mobile menu (toggle button) "ODS" is listed and clicking it closes the menu (`aria-expanded="false"`); Tab reaches "ODS"; with a `routes` prop of 8 items all links render (smoke test for extensibility)

### Implementation for User Story 2

- [X] T029 [US2] Update `src/components/Navbar/Navbar.module.css` (research R10): inside `@media (min-width: 40rem)` set the menu to `flex-wrap: wrap; justify-content: flex-end; row-gap: var(--space-1);` and allow `.inner` to wrap (`flex-wrap: wrap; min-width: 0` on the nav) so extra items wrap instead of overflowing; verify no horizontal scroll at 640 px, 768 px and 1280 px with 4 items and with 8 test items; no logic changes in `Navbar.tsx` (makes T028 pass together with T019)

**Checkpoint**: US1 + US2 = MVP (view reachable from navbar with cards and modal).

---

## Phase 5: User Story 3 - Qué son los ODS y mensaje local (Priority: P2)

**Goal**: section 1 with a brief ODS/Agenda 2030 explanation, the prudent local-contribution
message and a discreet link to the UN site.

**Independent Test**: first section explains ODS/Agenda 2030 in ≤ 2 short paragraphs, shows the
local message and a link to the UN that opens in a new tab and announces it.

### Tests for User Story 3 (write first, must fail)

- [X] T030 [US3] Add to `src/pages/Sdg/SdgPage.test.tsx`: section `#que-son` contains the intro paragraphs (≤ 2) and `localMessage`; a link with `href="https://www.un.org/sustainabledevelopment/es/"`, `target="_blank"`, `rel` containing `noopener` and `noreferrer`, and accessible name including "(abre en una pestaña nueva)"; the support image falls back to the placeholder when `sdg/intro` is missing

### Implementation for User Story 3

- [X] T031 [US3] Fill section 1 of `src/pages/Sdg/SdgPage.tsx`: `<Section id="que-son" tone="cream" image={sdgPageContent.intro.image}>` with the paragraphs, `localMessage` in a highlighted callout (`SdgPage.module.css`, tokens only: soft ochre/mint background, border-left accent) and the UN link styled discreetly (link color token, underline, `ExternalLink` icon `aria-hidden`, `<span className="sr-only">{ui.sdg.newTab}</span>`) (makes T030 pass)

---

## Phase 6: User Story 4 - Filtro por nivel (Priority: P2)

**Goal**: filter Todos / Directa / Complementaria / Indirecta without leaving the page.

**Independent Test**: select each option with mouse and keyboard; visible cards are 9 / 3 / 4 / 2
and the count is announced.

### Tests for User Story 4 (write first, must fail)

- [X] T032 [P] [US4] Create `src/components/SdgFilter/SdgFilter.test.tsx`: `role="radiogroup"` with `aria-label` "Filtrar por nivel de contribución"; 4 `role="radio"` in order Todos, Directa, Complementaria, Indirecta; only the selected has `aria-checked="true"` and `tabIndex=0` (others `-1`); ArrowRight/ArrowDown move to and select the next (wrapping), ArrowLeft/ArrowUp the previous, Home/End first/last, each calling `onChange` and moving focus; click selects; the selected option renders a `Check` icon (not color-only)
- [X] T033 [US4] Add to `src/pages/Sdg/SdgPage.test.tsx`: "Todos" checked by default with 9 cards; selecting Directa/Complementaria/Indirecta shows 3/4/2 cards and only that group heading; the polite live region reads "Mostrando 3 ODS" etc.; with "Directa" applied, opening and closing ODS 2 keeps the filter and returns focus to its card

### Implementation for User Story 4

- [X] T034 [P] [US4] Implement `src/components/SdgFilter/SdgFilter.tsx` + `SdgFilter.module.css` per contracts and research R5 (`value`, `onChange`, `options`, `controlsId`; roving tabindex; arrow/Home/End handling; `aria-controls`; selected style `--color-primary` bg + `--color-on-primary` text + `Check` icon; min target size token; wraps on small screens) (makes T032 pass)
- [X] T035 [US4] Wire the filter in `src/pages/Sdg/SdgPage.tsx`: state `filter: SdgFilterValue` (`'todos'` initial, not persisted in the URL); options from `ui.sdg.filterAll` + `sdgLevels[].filterLabel`; render `getSdgsByLevel(filter)`; cards container gets the `controlsId`; add `<p className="sr-only" aria-live="polite">{ui.sdg.showing(count)}</p>` updated on change; changing the filter must not affect `selected` (makes T033 pass)

---

## Phase 7: User Story 6 - Imágenes reales en todo el sitio (Priority: P2)

**Goal**: real photos connected to slider, Home sections, activities and SDG cards; placeholder
when missing; no text changes.

**Independent Test**: every image slot shows its photo or the placeholder with stable dimensions
and descriptive `alt`; texts of Inicio, Problemáticas and Actividades are unchanged.

### Tests for User Story 6 (write first, must fail)

- [X] T036 [P] [US6] Create `src/data/__tests__/images.test.ts`: every `image` in `slides` equals `slide-1…slide-5` in order, `project.sectionImages` equals `proyecto/logros/recursos`, `activities` equals `semana-<week>`, `sdgs` equals `ods-<id>` and intro `{ folder: 'sdg', image: 'intro' }`; each resolves via `getImage` without throwing, returning either a real URL or the placeholder; every file under `src/assets/images/**` (except `.gitkeep`, `README.md`) matches `^[a-z0-9-]+\.(webp|jpg|jpeg|png|avif|svg)$` (read with `node:fs`); every `imageAlt`/`alt` is a non-empty Spanish string
- [X] T037 [P] [US6] Update `src/data/__tests__/slides.test.ts`, `activities.test.ts` and `project.test.ts` only where they assert `image: null`, to accept the new base names; keep every text assertion unchanged

### Implementation for User Story 6

- [X] T038 [US6] **Content task (needs the team)**: copy the real photos with the final names into `src/assets/images/slider/`, `home/`, `activities/` and `sdg/` (see `src/assets/images/README.md`); for `activities/`, choose 4 of the 7 existing `WhatsApp Image 2026-11-18 at … .jpeg` files, rename them with `git mv` to `semana-1.jpeg … semana-4.jpeg` according to the week each depicts, and delete or move out the 3 unused ones (they would fail T036's naming rule). If the team has not decided, leave the slots empty (placeholder) and record it in the PR description — do not guess the week
- [X] T039 [P] [US6] Set `image: 'slide-1' … 'slide-5'` in `src/data/slides.ts` (ids huerta, sustrato, capacitacion, comunidad, cosecha in that order) and update the file header comment to say names are base names without extension; no other changes
- [X] T040 [P] [US6] Set `sectionImages.proyecto.image = 'proyecto'`, `logros.image = 'logros'`, `recursos.image = 'recursos'` in `src/data/project.ts`; no other changes
- [X] T041 [P] [US6] Set `image: 'semana-1' … 'semana-4'` by `week` in `src/data/activities.ts` and update the header comment (base name, extension optional); no other changes
- [X] T042 [US6] Verify `src/components/Slider/Slider.tsx`, `SupportImage`, `ActivityCard`, `ActivityModal` and `SdgCard` keep fixed frame ratios with `object-fit: cover` so portrait/landscape photos do not change container height; fix only CSS in their `*.module.css` if a frame lacks `aspect-ratio`; confirm `alt` is used for real photos and `alt=""` for the placeholder (makes T036/T037 pass)

---

## Phase 8: User Story 5 - De la actividad al ODS + CTA (Priority: P3)

**Goal**: summary table relating each of the 4 activities with its SDGs, and a CTA to Actividades.

**Independent Test**: the table has 4 rows (one per week) consistent with the modals; it reads
stacked on mobile; the CTA navigates to `/actividades`.

### Tests for User Story 5 (write first, must fail)

- [X] T043 [P] [US5] Create `src/components/ActivitySdgTable/ActivitySdgTable.test.tsx` using `getActivitySdgRows()`: a `table` with the caption; column headers "Actividad" and "ODS a los que aporta" (`scope="col"`); 4 row headers (`scope="row"`) "Semana 1 · Capacitación sobre el producto" … "Semana 4 · Siembra del producto"; each row lists exactly the SDGs of data-model.md (`1:[4,8,17] 2:[4,12,13,15] 3:[2] 4:[1,2,3,8,12]`) by number and name
- [X] T044 [US5] Add to `src/pages/Sdg/SdgPage.test.tsx`: section `#de-la-actividad-al-ods` contains the table and a link "Ver las actividades" with `href="/actividades"`; for every SDG, each activity listed in its modal appears in the table row of that activity (consistency, FR-025)

### Implementation for User Story 5

- [X] T045 [P] [US5] Implement `src/components/ActivitySdgTable/ActivitySdgTable.tsx` + `ActivitySdgTable.module.css` per contracts and research R6: `<table>` with `<caption>`, `<thead>` headers from `ui.sdg.table`, rows `<th scope="row">Semana N · título</th>` + `<td><ul>` of `SdgBadge size="sm"`; below 40rem rows/cells `display: block` (stacked cards, thead visually hidden with the `sr-only` technique), no horizontal scroll; tokens only (makes T043 pass)
- [X] T046 [US5] Fill section 3 of `src/pages/Sdg/SdgPage.tsx`: `<Section id="de-la-actividad-al-ods">` with intro, `<ActivitySdgTable rows={getActivitySdgRows()} caption={…} />` and a `Link` styled as the existing primary button to `getRoutePath(sdgPageContent.summary.cta.routeId)` with `ArrowRight` icon (makes T044 pass)

---

## Phase 9: Polish & Cross-Cutting Concerns

- [X] T047 [P] Verify the SDG view uses only tokens: `grep -nE "#[0-9a-fA-F]{3,6}|rgb\(" src/components/Sdg* src/components/ActivitySdgTable src/pages/Sdg` returns nothing
- [X] T048 [P] Verify no text changed in other pages: `git diff main -- src/data/slides.ts src/data/activities.ts src/data/project.ts src/data/problems.ts` shows only `image` values and header comments (SC-011)
- [X] T049 Run `npm run lint && npm run format:check && npm run typecheck && npm test && npm run build`; confirm the build output contains a separate chunk for `SdgPage`; fix any failure
- [ ] T050 Run the manual scenarios 1–9 of `specs/003-sdg-view/quickstart.md` at 360, 768 and 1280 px, including keyboard-only navigation and `prefers-reduced-motion`
- [ ] T051 Run Lighthouse (mobile) on `npm run preview` for `/ods` and `/`: Accessibility 100, Performance ≥ 90, CLS ≈ 0; record results in the PR description
- [X] T052 [P] Update `README.md` with the new `/ods` view and the image naming conventions (link to `src/assets/images/README.md`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on Setup; **blocks all stories**. Internal order: T007, T008 → T009 → T010 → T011 → T012 → T013; T014–T016 [P] after T009/T010; T017 → T018 → T019.
- **US1 (Phase 3)**: after Phase 2. T024 → T025/T026 (use SdgBadge) → T027.
- **US2 (Phase 4)**: after Phase 2 (route exists from T019); independent of US1.
- **US3 (Phase 5)**: after Phase 2; touches `SdgPage.tsx` (sequence with other page tasks).
- **US4 (Phase 6)**: after US1 (filters the cards rendered by T027).
- **US6 (Phase 7)**: after Phase 2 (needs T010, T012); T038 can happen anytime and does not block code tasks.
- **US5 (Phase 8)**: after Phase 2 and T024 (SdgBadge).
- **Polish (Phase 9)**: after all desired stories.

### Shared-file sequencing

`src/pages/Sdg/SdgPage.tsx` and `SdgPage.test.tsx` are edited by T018, T023, T027, T030, T031, T033, T035, T044, T046 — run these sequentially.

### Parallel Opportunities

- Phase 1: T002, T003.
- Phase 2: T004, T005, T006 (tests); T007, T008; T014, T015, T016.
- US1: T020, T021, T022 together; then T025 and T026 together.
- US2 can run in parallel with US1 (different files).
- US6: T036, T037; then T039, T040, T041 together.
- US5: T043 and T045 can be developed in parallel with US3/US4 (different files).

---

## Parallel Example: User Story 1

```text
# Tests first, in parallel:
T020 SdgBadge.test.tsx
T021 SdgCard.test.tsx
T022 SdgModal.test.tsx

# After T024 (SdgBadge), in parallel:
T025 SdgCard.tsx + .module.css
T026 SdgModal.tsx + .module.css
```

## Parallel Example: User Story 6

```text
T039 src/data/slides.ts
T040 src/data/project.ts
T041 src/data/activities.ts
```

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Phase 1 → Phase 2 (foundation, route shell).
2. Phase 3 (cards + modal) → validate on `/ods`.
3. Phase 4 (navbar) → **MVP**: view reachable from the menu with the 9 interactive cards.

### Incremental Delivery

4. US3 (intro + UN link) → US4 (filter) → US6 (images, code ready even without photos) → US5 (table + CTA).
5. Polish: gates, quickstart, Lighthouse, README.

### Notes

- T038 is a content decision; code tasks never block on it — slots show the placeholder.
- Commit after each task or logical group, in English.
