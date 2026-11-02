---

description: "Task list for the Home redesign and site-wide visual refresh"
---

# Tasks: Rediseño y ampliación del Inicio

**Input**: Design documents from `/specs/002-home-redesign/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-components.md, quickstart.md

**Tests**: INCLUDED. Required by constitution principle VIII and requested explicitly in the plan
input (Slider, SupportImage, Home). Write each story's tests first and confirm they fail before
implementing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 = Slider (P1), US2 = El proyecto (P1), US3 = Objetivos e indicadores (P2),
  US4 = Recursos y CTA (P2), US5 = Estilo coherente en todo el sitio (P3)

## Global conventions (apply to every task)

- Single frontend project at repository root (`src/`). Tests colocated as `*.test.ts(x)`.
- Code, identifiers, comments and commits in English; every user-visible string in Spanish (es-CO).
- Components consume only CSS variables from `src/styles/tokens.css`: no literal colors, spacing,
  radii, shadows, durations or ratios in `*.module.css` or inline styles (constitution V).
- No editorial content inside components: text comes from `src/data/*` (constitution II). Reusable
  interface strings come from `src/data/ui.ts`.
- No new dependencies. Icons only from `lucide-react` through `AppIcon`.
- Every motion (fade, reveal, hover lift) is disabled under `prefers-reduced-motion: reduce`.
- The content of `/problematicas` and `/actividades` (data files, tabs, cards, modal) MUST NOT change.
- Content to use verbatim is in the [Content source](#content-source) appendix at the end of this file.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: folders and test environment for the new work

- [ ] T001 Create image folders with `.gitkeep`: `src/assets/images/slider/.gitkeep` and `src/assets/images/home/.gitkeep`
- [ ] T002 [P] Create `src/hooks/` folder (first file arrives in T012) and add a `matchMedia` stub to `src/test/setup.ts`: define `window.matchMedia` when missing, returning `{ matches, media, addEventListener, removeEventListener, addListener, removeListener, onchange: null, dispatchEvent }`; export a helper `setReducedMotion(value: boolean)` from `src/test/matchMedia.ts` that controls `matches` for `(prefers-reduced-motion: reduce)` and is reset to `false` in `afterEach`; leave `IntersectionObserver` undefined (research R10)

**Checkpoint**: `npm run test` still passes (42 existing tests).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: tokens, types, data, image helper, icons and hooks used by every story

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Extend `src/styles/tokens.css` with the tokens from research R2, keeping every existing token and the contrast comment updated: `--color-mint: #eef3e6`, `--color-surface-raised`, `--color-border-soft`, `--color-ochre-ink: #7a5c16`, `--color-overlay: #16301f`, `--gradient-slide` (overlay from 0 at top to 0.8 at bottom, ≥ 0.75 over the lower third), `--overlay-mobile` (uniform 0.78), `--color-on-overlay` (cream), `--color-focus-on-dark` (ochre), `--color-navbar-glass` (cream at ~88 %), `--blur-glass: 12px`, `--radius-card: 1.25rem`, `--radius-xl: 1.5rem`, `--shadow-soft`, `--shadow-hover`, `--fs-4xl` and `--fs-display` with `clamp()`, `--duration-fast: 200ms`, `--duration-base: 300ms`, `--ease-out`, `--reveal-distance: 12px`, `--slider-ratio: 12 / 5`, `--slider-min-h: 26.25rem`, `--support-ratio: 3 / 2`, `--section-space: clamp(4rem, 3rem + 4vw, 7rem)`, `--target-size: 2.75rem`, and a reduced-motion block that sets durations to `0ms` and `--reveal-distance: 0`
- [ ] T004 Update `src/styles/global.css`: fluid heading scale (h1 `--fs-display`, h2 `--fs-3xl`/`--fs-4xl`, h3 `--fs-xl`), `text-wrap: balance` on headings, global `:focus-visible` ring with `--color-focus`, `.reveal` / `.reveal.isRevealed` classes (opacity + `translateY(var(--reveal-distance))`, `--duration-base`, `--ease-out`), shared `.btn`, `.btnPrimary`, `.btnSecondary` styles (min-height `--target-size`, radius pill, hover/active states, 200 ms) and `@media (prefers-reduced-motion: reduce)` neutralizing transitions
- [ ] T005 [P] Create `src/types/icon.ts` with `IconKey = 'leaf' | 'coins' | 'sprout' | 'recycle' | 'users' | 'handshake' | 'target' | 'package' | 'map-pin' | 'presentation' | 'camera' | 'badge'`; make `PillarIcon` in `src/types/project.ts` an alias of `Extract<IconKey, 'leaf' | 'coins' | 'sprout' | 'recycle'>`
- [ ] T006 [P] Create `src/types/slide.ts` with `Slide { id: string; image: string | null; alt: string; title: string; caption: string }` (doc comments: `title` "≤ 40 caracteres", `caption` "≤ 120 caracteres", `image` is a file name inside `src/assets/images/slider/`, `null` → placeholder)
- [ ] T007 Extend `src/types/project.ts` per data-model.md: `ObjectiveIdeaLabel = 'Qué es' | 'Para quién' | 'Cómo' | 'Para qué'`, `ObjectiveIdea { label; icon: IconKey; text }`, `EvaluationCriterion = 'Cumplimiento' | 'Participación' | 'Resultados' | 'Impactos' | 'Dificultades'`, `IndicatorId = 'compliance' | 'participation' | 'infrastructure' | 'planting' | 'learning' | 'sustainability' | 'income' | 'satisfaction'`, `IndicatorTarget { value: string; detail?: string }`, `SuccessIndicator { id; label; criterion; description; target: IndicatorTarget | null }`, `ResourceGroupId = 'human' | 'production' | 'space' | 'teaching' | 'records'`, `ResourceGroup { id; category; icon: IconKey; items: string[] }`, `HomeSectionId = 'proyecto' | 'logros' | 'recursos'`, `SupportImageRef { image: string | null; alt: string }`; add to `ProjectInfo`: `shortObjective` ("≤ 160 caracteres"), `why { paragraphs: string[]; originProblems: string[] }`, `author { name; role; institution }`, `community`, `workLine { name; methodology }`, `generalObjective { summary; ideas: ObjectiveIdea[] }`, `specificObjectives: string[]`, `indicators`, `resources`, `sectionImages: Record<HomeSectionId, SupportImageRef>`; re-export everything (plus icon and slide types) from `src/types/index.ts`
- [ ] T008 Rewrite `src/data/project.ts` with the content from the [Content source](#content-source) appendix (keep `// DRAFT: pending team review` header, keep the 4 existing pillars unchanged, keep `name`, `scientificName`, `institution`, `objective`): `ideas` exactly 4 in order Qué es → Para quién → Cómo → Para qué with icons `sprout`, `users`, `handshake`, `target`; 6 `specificObjectives`; 8 `indicators` with the criterion mapping of research R9 and targets: compliance `{ value: '4 de 4', detail: 'actividades ejecutadas en las 4 semanas (100 %)' }`, participation `{ value: '15 · 10', detail: 'personas capacitadas · familias vinculadas' }`, infrastructure `{ value: '20 m²', detail: '1 huerta comunitaria construida' }`, learning `{ value: '80 %', detail: 'de los asistentes demuestra apropiación' }`, planting/sustainability/income/satisfaction `null`; 5 `resources` with icons `users`, `package`, `map-pin`, `presentation`, `camera`; `sectionImages` for the 3 sections with `image: null` and descriptive `alt`
- [ ] T009 [P] Create `src/data/slides.ts` (`// DRAFT: pending team review`) exporting `slides: Slide[]` with the 5 draft slides of the appendix, `image: null`, ids `huerta`, `sustrato`, `capacitacion`, `comunidad`, `cosecha`
- [ ] T010 [P] Extend `src/data/ui.ts` (keep every existing key; `ui.home.ctaProblems`/`ctaActivities` stay) with: `slider: { label: 'Galería del proyecto', pause: 'Pausar presentación', play: 'Reproducir presentación', previous: 'Diapositiva anterior', next: 'Diapositiva siguiente', goTo: 'Ir a la diapositiva', of: 'de', roledescription: 'carrusel', slideRoledescription: 'diapositiva' }`; `home.sections`: `proyecto { eyebrow: 'Conócenos', title: 'El proyecto' }`, `logros { eyebrow: 'Metas', title: 'Qué queremos lograr' }`, `recursos { eyebrow: 'Recursos', title: 'Con qué lo haremos' }`; `home.whyTitle: 'Por qué lo hacemos'`, `home.originProblemsTitle: 'Nace de dos problemáticas'`, `home.whoTitle: 'Quién lo desarrolla'`, `home.objectiveTitle: 'Objetivo general'`, `home.pillarsTitle: 'Pilares del proyecto'`, `home.workLineLabel: 'Línea de trabajo'`, `home.specificObjectivesTitle: 'Objetivos específicos'`, `home.indicatorsTitle: 'Indicadores de éxito'`, `home.targetLabel: 'Meta'`, `home.targetPending: 'Por definir con el grupo'`, `home.supportImagePending: 'Imagen de apoyo próximamente'`, `home.ctaTitle: 'Sigue conociendo el proyecto'`
- [ ] T011 [P] Write `src/utils/getImage.test.ts`: `getImage('home', null)` and `getImage('slider', 'no-existe.webp')` return `{ src: placeholderImage, isPlaceholder: true }`; `getImage('activities', null)` equals `getActivityImage(null)`; then create `src/utils/getImage.ts` with `ImageFolder = 'activities' | 'slider' | 'home'`, a single literal `import.meta.glob('../assets/images/{activities,slider,home}/*.{png,jpg,jpeg,webp,avif,svg}', { eager: true, query: '?url', import: 'default' })` indexed by `"<folder>/<file>"`, reusing `resolveImage` and the DEV `console.warn` (message names the folder); move `resolveImage`, `placeholderImage` and `ResolvedImage` into it; rewrite `src/utils/getActivityImage.ts` as a wrapper that re-exports them and calls `getImage('activities', name)` so `src/utils/getActivityImage.test.ts` passes unchanged
- [ ] T012 [P] Create `src/hooks/useReducedMotion.ts`: returns `matchMedia('(prefers-reduced-motion: reduce)').matches`, subscribes to `change` (with `addListener` fallback), returns `false` when `window.matchMedia` is undefined
- [ ] T013 [P] Create `src/hooks/useReveal.ts`: `useReveal<T extends Element>()` → `{ ref, isRevealed }`; `isRevealed` is `true` immediately when `IntersectionObserver` is undefined or `useReducedMotion()` is true; otherwise observes with `threshold: 0.15`, `rootMargin: '0px 0px -10% 0px'` and disconnects after the first intersection
- [ ] T014 [P] Create `src/components/AppIcon/AppIcon.tsx`: closed map `IconKey → lucide` (`leaf: Leaf, coins: Coins, sprout: Sprout, recycle: Recycle, users: Users, handshake: Handshake, target: Target, package: Package, 'map-pin': MapPin, presentation: Presentation, camera: Camera, badge: BadgeCheck`), props `{ name: IconKey; className?: string }`, always `aria-hidden="true"` and `focusable="false"`; make `src/components/PillarIcon/PillarIcon.tsx` delegate to it
- [ ] T015 Replace `src/assets/images/placeholder.svg` with a cream (`#f6f1e4`) / light green (`#eef3e6`) SVG with a subtle low-opacity spore/dot pattern in leaf-soft, `viewBox` 1920×800-friendly and `preserveAspectRatio="xMidYMid slice"`, no text (research R7)
- [ ] T016 Extend `src/data/__tests__/project.test.ts` (keep the 4-pillar test) and create `src/data/__tests__/slides.test.ts` with the validations of data-model.md: slides length 5, unique ids, non-empty `alt`, `title` ≤ 40 and `caption` ≤ 120 characters; project: 4 ideas with labels in order, 6 specific objectives, 8 indicators with unique ids, 5 non-empty resource groups, 2 `originProblems`, `shortObjective` ≤ 160 characters, `sectionImages` with keys `proyecto`, `logros`, `recursos`

**Checkpoint**: `npm run typecheck`, `npm run lint` and `npm run test` pass; the old Home still renders (it only uses the preserved fields).

---

## Phase 3: User Story 1 - Ver el slider principal al abrir el sitio (Priority: P1) 🎯 MVP

**Goal**: full-width accessible carousel with 5 slides, project name and short objective on top.

**Independent Test**: open `/` without photos; 5 slides with title and caption on placeholder
background; navigate with mouse, keyboard and swipe; pause works; reduced motion stops autoplay.

### Tests for User Story 1 ⚠️ (write first, must fail)

- [ ] T017 [US1] Write `src/components/Slider/Slider.test.tsx` with `vi.useFakeTimers()` and the `slides` data: renders a region with `aria-roledescription="carrusel"` and 5 groups labelled `"1 de 5: …"`…`"5 de 5: …"`; each slide shows the placeholder image when `image` is `null`; after `advanceTimersByTime(6000)` slide 2 is active (not `aria-hidden`); clicking "Diapositiva siguiente" and pressing `ArrowRight`/`ArrowLeft` on the region change the active slide cyclically; a dot click activates that slide and has `aria-current="true"`; clicking "Pausar presentación" stops advancing after 12 s, the button becomes "Reproducir presentación" and slides container has `aria-live="polite"`; `mouseEnter` stops advancing and `mouseLeave` resumes; with `setReducedMotion(true)` it does not advance after 12 s and starts showing "Reproducir presentación"; with a single slide no controls render; overlay children render

### Implementation for User Story 1

- [ ] T018 [US1] Implement `src/components/Slider/Slider.tsx` per contracts/ui-components.md and research R3–R6: props `{ slides, label, intervalMs = 6000, overlay }`; state `index`, `userPaused` (initial = `useReducedMotion()`), `hovered`, `focusWithin`, `documentHidden`, `visited`; `isPlaying = !userPaused && !hovered && !focusWithin && !documentHidden && slides.length > 1`; `setTimeout` re-armed on every `index`/`isPlaying` change; `visibilitychange` listener; `onKeyDown` ArrowLeft/ArrowRight on the region; pointer swipe (`pointerType` touch/pen, |dx| ≥ 48 px and |dx| > 1.5·|dy|); focus-out only clears `focusWithin` when `relatedTarget` is outside the region; slides stacked, inactive with `aria-hidden` and `inert`; `aria-live` `off`/`polite`; controls order pause → previous/next → dots; image for slide i mounted only if `visited` (active, next or seen); slide 0 `loading="eager"` + lowercase `fetchpriority="high"` via spread, others `loading="lazy"`; `width={1920} height={800}`; `getImage('slider', slide.image)` with `onError` fallback to placeholder and `alt=""` for placeholders; all strings from `ui.slider`
- [ ] T019 [US1] Create `src/components/Slider/Slider.module.css`: grid stack (`grid-area: 1 / 1`), `aspect-ratio: var(--slider-ratio)` from 64rem and `min-height: var(--slider-min-h)` below, `object-fit: cover; object-position: center`, overlay `--gradient-slide` (mobile `--overlay-mobile`), text block in the lower third (overlay h1 + short objective + slide title/caption) in `--color-on-overlay` with soft `text-shadow`, fade via `opacity` `--duration-base`, controls row with targets `--target-size`, dots with active state (wider pill in ochre), focus ring `--color-focus-on-dark`, `touch-action: pan-y`, no horizontal overflow at 320 px
- [ ] T020 [US1] Render the Slider at the top of `src/pages/Home/HomePage.tsx` with `label={ui.slider.label}` and `overlay` = `<h1>{project.name}</h1>` + `<p lang="la">` scientific name + `<p>{project.shortObjective}</p>`; remove the old hero block and its styles from `src/pages/Home/HomePage.module.css` (keep the pillars block for now)

**Checkpoint**: T017 passes; quickstart scenarios 1–8 pass. MVP deployable.

---

## Phase 4: User Story 2 - Entender el proyecto en el Inicio (Priority: P1)

**Goal**: "El proyecto" section with why, who, 4-idea objective, 4 pillars, work-line badge and support image.

**Independent Test**: reading only `#proyecto` answers why, who, what, for whom, how, what for, and lists the 4 pillars; empty support image keeps its size.

### Tests for User Story 2 ⚠️ (write first, must fail)

- [ ] T021 [P] [US2] Write `src/components/SupportImage/SupportImage.test.tsx`: with `name={null}` and with `name="no-existe.webp"` it renders an image with the placeholder `src` and `alt=""` plus the caption "Imagen de apoyo próximamente"; it sets `width="1200"`, `height="800"` and `loading="lazy"`
- [ ] T022 [P] [US2] Write `src/pages/Home/HomePage.test.tsx` (render inside `MemoryRouter`): the carousel region exists; exactly 3 `section` elements labelled by an `h2` with titles "El proyecto", "Qué queremos lograr", "Con qué lo haremos" in that order; `#proyecto` shows the 4 idea labels, the 4 pillar titles and the text "Huertas caseras con alimentos"; there is a single `h1` (project name)

### Implementation for User Story 2

- [ ] T023 [P] [US2] Implement `src/components/SupportImage/SupportImage.tsx` + `SupportImage.module.css`: props `{ name: string | null; alt: string; ratio?: string }` (default `'3 / 2'`), `<figure>` with frame `aspect-ratio` from prop (set as CSS custom property `--ratio` on the element, defaulting to `var(--support-ratio)`), radius `--radius-xl`, `--shadow-soft`, `object-fit: cover`, `getImage('home', name)`, `onError` → placeholder, discreet `<figcaption>` with `ui.home.supportImagePending` only when showing the placeholder
- [ ] T024 [P] [US2] Add optional `eyebrow` prop to `src/components/SectionTitle/SectionTitle.tsx` (rendered above the title in `--color-ochre-ink`, uppercase, `--tracking-wide`, with a short ochre line) and update `SectionTitle.module.css` to the new scale; existing call sites keep working
- [ ] T025 [US2] Implement `src/components/Section/Section.tsx` + `Section.module.css` per contract: props `{ id, title, eyebrow?, intro?, tone = 'cream', image?, imagePosition = 'end', children }`, `<section id aria-labelledby="{id}-title">`, background `--color-bg` or `--color-mint`, padding `--section-space`, container, two columns from 64rem (content ~7/12, image ~5/12, image `position: sticky` below the navbar), single column on mobile with the image after the title, wrapper with `useReveal` + `.reveal` classes
- [ ] T026 [P] [US2] Restyle `src/components/PillarCard/PillarCard.tsx` / `PillarCard.module.css`: `--radius-card`, `--shadow-soft`, icon in a `--color-mint` circle, hover `translateY(-2px)` + `--shadow-hover` in `--duration-fast`; heading level `h3`; props unchanged
- [ ] T027 [US2] Build the `#proyecto` block in `src/pages/Home/HomePage.tsx` + `HomePage.module.css` using `Section` (`tone="cream"`, `image={project.sectionImages.proyecto}`): work-line badge (`AppIcon name="badge"`, `ui.home.workLineLabel`, `workLine.name` and `workLine.methodology`, ink on `--color-ochre-soft`, pill); "Por qué lo hacemos" with `why.paragraphs` and the 2 `originProblems` as a numbered list; "Quién lo desarrolla" with `author` and `community`; "Objetivo general" with `generalObjective.summary` and a `<dl>` of the 4 ideas (`dt` icon + label, `dd` text) in a 1 → 2 column grid; 4 `PillarCard` in a 1 → 2 → 4 grid under `ui.home.pillarsTitle` (`h3`); remove the old pillars section

**Checkpoint**: T021–T022 (`#proyecto` assertions) pass; quickstart scenarios 9–10 (proyecto part) pass.

---

## Phase 5: User Story 3 - Revisar objetivos e indicadores de éxito (Priority: P2)

**Goal**: "Qué queremos lograr" with 6 numbered objectives and 8 indicator cards with highlighted targets.

**Independent Test**: in `#logros`, find the Participación target and objective 3 in under a minute.

### Tests for User Story 3 ⚠️ (write first, must fail)

- [ ] T028 [P] [US3] Write `src/components/IndicatorCard/IndicatorCard.test.tsx`: an indicator with target shows `label` as `h3`, the criterion chip, `target.value` and `target.detail`; an indicator with `target: null` shows "Por definir con el grupo"
- [ ] T029 [P] [US3] Extend `src/pages/Home/HomePage.test.tsx`: `#logros` contains an ordered list with 6 items and 8 `article` cards, and the text "15 · 10"

### Implementation for User Story 3

- [ ] T030 [P] [US3] Implement `src/components/ObjectiveList/ObjectiveList.tsx` + `ObjectiveList.module.css`: `<ol aria-label={label}>` with `list-style: none`, visible number `aria-hidden` in a circle (`--color-ochre-ink` on `--color-ochre-soft`, Fraunces, tabular numbers) and the text; comfortable spacing; text wraps
- [ ] T031 [P] [US3] Implement `src/components/IndicatorCard/IndicatorCard.tsx` + `IndicatorCard.module.css`: `<article>` with criterion chip (ink on `--color-ochre-soft`), `h3` label, target value in `--fs-display` Fraunces `tabular-nums` `--color-heading`, `detail` in `--fs-sm`, `description`; pending target uses `ui.home.targetPending` in `--fs-lg` `--color-text-muted`; `--radius-card`, `--shadow-soft`, surface white, hover lift
- [ ] T032 [US3] Build the `#logros` block in `src/pages/Home/HomePage.tsx` + `HomePage.module.css` with `Section` (`tone="mint"`, `image={project.sectionImages.logros}`, `imagePosition="start"`): `ui.home.specificObjectivesTitle` (`h3`) + `ObjectiveList`, `ui.home.indicatorsTitle` (`h3`) + indicator grid 1 → 2 (40rem) → 4 (64rem, full width under the two-column header area)

**Checkpoint**: T028–T029 pass; quickstart scenario 10 (logros part) passes.

---

## Phase 6: User Story 4 - Conocer los recursos y continuar la visita (Priority: P2)

**Goal**: "Con qué lo haremos" with 5 resource groups and 2 CTAs.

**Independent Test**: find "guantes" under Materiales de producción and reach Actividades with one click.

### Tests for User Story 4 ⚠️ (write first, must fail)

- [ ] T033 [US4] Extend `src/pages/Home/HomePage.test.tsx`: `#recursos` shows 5 `h3` category titles; the text "Guantes" (case-insensitive) is inside the "Materiales de producción" group; links "Conocer las problemáticas" → `/problematicas` and "Ver las actividades" → `/actividades`

### Implementation for User Story 4

- [ ] T034 [P] [US4] Implement `src/components/ResourceGroup/ResourceGroup.tsx` + `ResourceGroup.module.css`: `<article>` with `AppIcon` in a `--color-mint` circle, `h3` category, `<ul>` items with a small leaf-colored decorative bullet; `--radius-card`, `--shadow-soft`
- [ ] T035 [US4] Build the `#recursos` block in `src/pages/Home/HomePage.tsx` + `HomePage.module.css` with `Section` (`tone="cream"`, `image={project.sectionImages.recursos}`): resource grid 1 → 2 → 3 columns, then a CTA band (`ui.home.ctaTitle`) with `Link` to `getRoutePath('problems')` (`.btnPrimary`) and `getRoutePath('activities')` (`.btnSecondary`) with `ArrowRight` icons; delete unused rules from `HomePage.module.css`

**Checkpoint**: T033 passes; the full HomePage test passes; quickstart scenario 10 fully passes.

---

## Phase 7: User Story 5 - Percibir un sitio actual y coherente (Priority: P3)

**Goal**: navbar, footer and existing pages adopt the new look without content changes.

**Independent Test**: compare the 3 pages: same tokens, radii and focus; Problemáticas and Actividades content identical; existing tests unchanged and green.

### Tests for User Story 5

- [ ] T036 [US5] Run the existing suites `src/components/Navbar/Navbar.test.tsx`, `src/components/ActivityCard/ActivityCard.test.tsx`, `src/components/Modal/Modal.test.tsx`, `src/components/Tabs/Tabs.test.tsx` and `src/data/__tests__/activities.test.ts`/`problems.test.ts` after each task below; they MUST pass without editing their assertions

### Implementation for User Story 5

- [ ] T037 [P] [US5] Restyle `src/components/Navbar/Navbar.module.css`: `--color-navbar-glass` + `backdrop-filter: blur(var(--blur-glass)) saturate(140%)` with `@supports not` opaque fallback, bottom border `--color-border-soft`, active link indicator (ochre underline pill), hover/focus states 200 ms, mobile menu panel with `--radius-card` and `--shadow-soft`; no JSX or behavior change
- [ ] T038 [P] [US5] Restyle `src/components/Footer/Footer.module.css` (forest background, cream text, more spacing, rounded top or ochre top line) without content changes
- [ ] T039 [P] [US5] Restyle `src/components/ActivityCard/ActivityCard.module.css`, `src/components/WeekBadge/WeekBadge.module.css` and `src/components/ImageWithFallback/ImageWithFallback.module.css` with `--radius-card`, `--shadow-soft`, hover lift and visible focus
- [ ] T040 [P] [US5] Restyle `src/components/Modal/Modal.module.css` and `src/components/ActivityModal/ActivityModal.module.css` (`--radius-xl`, softer shadow, spacing scale); behavior unchanged
- [ ] T041 [P] [US5] Restyle `src/components/Tabs/Tabs.module.css` and `src/components/ProblemTabs/ProblemTabs.module.css` (pill tabs, `--color-mint` surface panel, focus ring, `--radius-card`)
- [ ] T042 [US5] Update `src/pages/Problems/` and `src/pages/Activities/ActivitiesPage.module.css` and `src/pages/NotFound/` styles to the new page rhythm (`--section-space` top/bottom padding, eyebrow-free titles) without touching content
- [ ] T043 [US5] Add the `.reveal` animation of `useReveal` only to Home sections (already in `Section`); verify no other page animates on scroll and that `html { scroll-behavior: smooth }` is disabled under reduced motion in `src/styles/global.css`

**Checkpoint**: T036 suites pass; quickstart scenarios 11–12 pass.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: verification, documentation and audits

- [ ] T044 Grep `src/**/*.module.css` for literal colors (`#`, `rgb(`), `px` spacing and durations outside `tokens.css`; replace any with tokens (constitution V)
- [ ] T045 [P] Update `README.md`: table row "Inicio (por qué, quién, objetivos, indicadores, recursos)" → `src/data/project.ts`, row "Diapositivas del slider" → `src/data/slides.ts`; new section "Agregar fotos del slider y del Inicio" (1920 × 800 px 12:5 WebP/JPG ≤ ~300 KB in `src/assets/images/slider/`; 1200 × 800 px 3:2 in `src/assets/images/home/`; set the file name in the data); how to edit indicator targets
- [ ] T046 Run `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run test` and `npm run build`; fix any failure; report JS gzip size delta (< 10 KB)
- [ ] T047 Browser validation of quickstart scenarios 1–14 at 320/375/768/1024/1440 px (including reduced-motion emulation and a temporary test image for scenario 13, removed afterwards) and measure text-over-overlay contrast in the DOM
- [ ] T048 Run Lighthouse (mobile) and axe on `npm run preview` for `/`, `/problematicas` and `/actividades`; record results in `specs/002-home-redesign/checklists/validation.md` (targets: accessibility ≥ 95, performance ≥ 90, CLS < 0.1, LCP < 2.5 s, 0 critical/serious axe issues); mark items that need a human (screen reader, real devices) as pending

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on Setup; blocks all stories. T007 → T008; T005/T006 → T007/T009; T011 before any image component.
- **US1 (Phase 3)**: depends on Phase 2.
- **US2 (Phase 4)**: depends on Phase 2; T020 and T027 both edit `HomePage.tsx`, so run US1's T020 first or merge carefully.
- **US3, US4 (Phases 5–6)**: depend on Phase 2 and on `Section`/`SupportImage` (T023, T025) from US2.
- **US5 (Phase 7)**: depends on Phase 2 (tokens); independent of US1–US4 otherwise.
- **Polish (Phase 8)**: after the desired stories are complete.

### User Story Dependencies

- US1: independent (MVP).
- US2: independent of US1 except for the shared `HomePage.tsx` file.
- US3 and US4: reuse `Section` and `SupportImage` from US2.
- US5: independent; can run in parallel with US1–US4 (different files).

### Within Each User Story

- Tests first (must fail) → components → page integration → checkpoint.
- Same-file tasks (`HomePage.tsx`, `HomePage.test.tsx`, `HomePage.module.css`) are sequential.

### Parallel Opportunities

- Phase 2: T005, T006, T009, T010, T011, T012, T013, T014 in parallel after T003/T004.
- US2: T021, T022, T023, T024, T026 in parallel.
- US3: T028–T031 in parallel; US4: T034 in parallel with US3 work.
- US5: T037–T041 all in parallel (distinct CSS files), and in parallel with US1–US4.

## Parallel Example: User Story 5

```text
Task: "T037 Restyle Navbar.module.css"
Task: "T038 Restyle Footer.module.css"
Task: "T039 Restyle ActivityCard/WeekBadge/ImageWithFallback CSS"
Task: "T040 Restyle Modal/ActivityModal CSS"
Task: "T041 Restyle Tabs/ProblemTabs CSS"
```

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phases 1–2 → 2. Phase 3 (Slider) → 3. validate quickstart 1–8 → deployable MVP (Home = slider + old pillars).

### Incremental Delivery

1. MVP (US1) → 2. US2 (El proyecto) → 3. US3 + US4 (logros, recursos) → 4. US5 (site-wide look) → 5. Polish and audits. Each step keeps all tests green and is deployable.

---

## Content source

Verbatim content from the feature description (lightly adapted for screen reading only where noted).

**Short objective (≤ 160)**: "Una huerta comunitaria de setas orellanas para generar ingresos,
aprovechar espacios y devolverle materia orgánica a la tierra."

**why.paragraphs**:

1. "En los corregimientos rurales, las familias dependen de pocos cultivos tradicionales, como el
   café y el plátano, cuyos precios son volátiles. Hay desempleo y pocas oportunidades de generar
   ingresos, los patios y lotes están subutilizados y los residuos agrícolas (pulpa de café,
   cascarilla, hojas) suelen quemarse."

**why.originProblems**:

1. "Desempleo y falta de oportunidades de generación de ingresos dignos en comunidades rurales."
2. "Subutilización de espacios productivos y bajo aprovechamiento de residuos orgánicos agrícolas."

**workLine**: name "Huertas caseras con alimentos"; methodology "Teoría del Cambio Social «Líderes
Sostenibles en Acción»".

**author**: name "Giancarlo Reina"; role "Estudiante, práctica de Responsabilidad Social vinculada
al Proyecto Social de Formación"; institution "UNIMINUTO".

**community**: "Un grupo comunitario de un corregimiento rural y su líder comunitario."

**generalObjective.summary**: "Crear una huerta comunitaria de alimentos basada en el cultivo de
setas orellanas, con y para las familias de un corregimiento rural."

**generalObjective.ideas**:

- Qué es: "Una huerta comunitaria de alimentos basada en el cultivo de setas orellanas."
- Para quién: "Un grupo de familias de un corregimiento rural."
- Cómo: "Con capacitación, concientización y trabajo participativo para estructurar la huerta y
  sembrar."
- Para qué: "Impulsar la sostenibilidad generando ingresos, aprovechando espacios subutilizados y
  dejando aporte orgánico: los residuos agrícolas sirven de sustrato y el sustrato agotado vuelve
  como abono."

**specificObjectives**:

1. "Capacitar al grupo comunitario en el cultivo, manejo y valor nutricional y comercial de la seta orellana."
2. "Concientizar a la comunidad sobre la producción sostenible y el aprovechamiento de residuos orgánicos."
3. "Adecuar y estructurar un espacio subutilizado como huerta comunitaria."
4. "Realizar la siembra de las setas con participación de las familias capacitadas."
5. "Sentar las bases de una alternativa de ingresos con el primer ciclo de cosecha."
6. "Documentar y evaluar el proceso con la comunidad para que pueda continuarse y replicarse."

**indicators** (label · criterion · description · target):

| id | label | criterion | description | target |
| --- | --- | --- | --- | --- |
| compliance | Cumplimiento | Cumplimiento | Actividades del plan ejecutadas en las 4 semanas. | 4 de 4 · actividades ejecutadas en las 4 semanas (100 %) |
| participation | Participación | Participación | Personas capacitadas y familias vinculadas al proyecto. | 15 · 10 · personas capacitadas · familias vinculadas |
| infrastructure | Infraestructura | Resultados | Huerta comunitaria construida y espacio adecuado. | 20 m² · 1 huerta comunitaria construida |
| planting | Siembra | Resultados | Número de bolsas sembradas. | null |
| learning | Aprendizaje | Resultados | Asistentes que demuestran apropiación en la encuesta final. | 80 % · de los asistentes demuestra apropiación |
| sustainability | Sostenibilidad | Impactos | Kilogramos de residuos orgánicos reutilizados como sustrato. | null |
| income | Ingresos | Impactos | Kilogramos cosechados y primeras ventas del primer ciclo (4 a 6 semanas después de la siembra). | null |
| satisfaction | Satisfacción | Participación | Satisfacción de la comunidad medida con una encuesta breve. | null |

**resources**:

- Humanos (`users`): Estudiante líder del proyecto; Líder comunitario; Familias participantes; Apoyo técnico (docente o asesor).
- Materiales de producción (`package`): Semilla (micelio) de seta ostra; Sustrato orgánico (pulpa de café, cascarilla, paja); Bolsas; Plástico negro; Guadua o madera para estantería; Guantes; Alcohol antiséptico; Agua; Herramientas agrícolas.
- Espacio (`map-pin`): Lote o patio comunitario de unos 20 m², con sombra y buena ventilación.
- Didácticos y logísticos (`presentation`): Salón comunal; Video beam; Cartillas; Material impreso; Listas de asistencia; Refrigerios.
- Registro y comunicación (`camera`): Celular o cámara para evidencias; Grupo de WhatsApp.

**sectionImages alt**: proyecto "Familias del corregimiento trabajando en la huerta de setas";
logros "Bolsas de sustrato con setas orellanas en crecimiento"; recursos "Materiales y
herramientas para el cultivo de setas".

**slides (DRAFT, title ≤ 40 · caption ≤ 120)**:

1. huerta — "Una huerta que crece en comunidad" · "Familias de un corregimiento rural cultivan setas orellanas en un espacio que antes no se usaba." · alt "Huerta comunitaria de setas orellanas"
2. sustrato — "Del residuo al alimento" · "La pulpa de café, la cascarilla y la paja se convierten en sustrato en lugar de quemarse." · alt "Residuos agrícolas preparados como sustrato"
3. capacitacion — "Aprender haciendo" · "Capacitación sobre el cultivo, el manejo y el valor nutricional y comercial de la seta orellana." · alt "Taller de capacitación con el grupo comunitario"
4. comunidad — "Trabajo participativo" · "Juntos adecuamos el espacio, construimos la estantería y sembramos las primeras bolsas." · alt "Integrantes del grupo construyendo la estantería"
5. cosecha — "Hacia la primera cosecha" · "Un primer ciclo que siembra las bases de nuevos ingresos para las familias." · alt "Setas orellanas listas para cosechar"
