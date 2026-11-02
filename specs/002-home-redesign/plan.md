# Implementation Plan: Rediseño y ampliación del Inicio

**Branch**: `002-home-redesign` | **Date**: 2026-11-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-home-redesign/spec.md`

## Summary

Recomponer el Inicio como un slider propio a todo el ancho (5 diapositivas, fundido, autoplay de
6 s con pausa, flechas, indicadores, teclado y swipe, accesible según el patrón APG Carousel) seguido
de exactamente 3 secciones ("El proyecto", "Qué queremos lograr", "Con qué lo haremos") con imagen
de apoyo y placeholder. El contenido real del proyecto pasa a `src/data/project.ts` y
`src/data/slides.ts`. El sitio entero adopta un estilo renovado (estilo *Organic Biophilic*
recomendado por la skill ui-ux-pro-max, adaptado a la paleta y fuentes existentes) mediante tokens
ampliados en `tokens.css`, una navbar translúcida y aparición suave al hacer scroll. Problemáticas y
Actividades no cambian de contenido. Sin dependencias nuevas.

## Technical Context

**Language/Version**: TypeScript 5.7 (strict, `noUncheckedIndexedAccess`), React 18.3

**Primary Dependencies**: Vite 6, react-router-dom 6.30, lucide-react (existentes). Ninguna nueva.

**Storage**: N/A (contenido en archivos de datos del repositorio)

**Testing**: Vitest 3 + jsdom + Testing Library (react, user-event, jest-dom); Lighthouse y axe
manuales sobre el build

**Target Platform**: navegadores modernos (Chrome, Edge, Firefox, Safari de los últimos 2 años) en
celular, tableta y escritorio; despliegue estático (GitHub Pages / Netlify / Vercel)

**Project Type**: SPA estática (frontend único)

**Performance Goals**: LCP < 2.5 s en móvil, CLS < 0.1, Lighthouse rendimiento ≥ 90 y
accesibilidad ≥ 95; JS adicional < 10 KB gzip

**Constraints**: sin backend ni red en tiempo de ejecución, sin librerías de UI ni de carrusel,
tokens únicos en `tokens.css`, contraste AA (4.5:1 texto, 3:1 foco/texto grande),
`prefers-reduced-motion` desactiva todo movimiento, imágenes del slider 1920×800 (12:5, ≤ ~300 KB)
y de apoyo 1200×800 (3:2)

**Scale/Scope**: 3 páginas; 1 página recompuesta, ~7 componentes nuevos, 2 hooks, 1 utilidad
generalizada, ~10 componentes con ajustes solo de estilo

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Cumplimiento en este plan | Estado |
| --- | --- | --- |
| I. Solo frontend | Sin backend, sin red; todo estático. | ✅ |
| II. Contenido separado | Contenido en `data/project.ts` y `data/slides.ts`; textos de interfaz en `data/ui.ts`; tipos en `src/types`. | ✅ |
| III. Configuración central | No se agregan rutas. Las anclas `#proyecto/#logros/#recursos` son internas del Inicio; los CTA usan `getRoutePath`. | ✅ |
| IV. Imágenes desacopladas | Fotos en `src/assets/images/{slider,home}/`, referenciadas por nombre en los datos; placeholder único y fondo neutro con proporción reservada. | ✅ |
| V. Tokens de diseño | Todos los colores, tintes, radios, sombras, duraciones y proporciones nuevos se definen en `tokens.css`; ningún valor literal en módulos CSS. | ✅ |
| VI. Accesibilidad y responsive | Patrón APG Carousel, controles por teclado, `aria-live` condicionado, pausa por hover/foco, reduced motion, contraste verificado (research R2), mobile-first, objetivos ≥ 44 px. | ✅ |
| VII. Código simple, sin dependencias innecesarias | Slider, swipe y reveal propios (~200 líneas en total); `lucide-react` ya existente. | ✅ |
| VIII. Calidad verificable | Pruebas para Slider, SupportImage, HomePage, getImage y datos; lint, formato y tipos obligatorios. | ✅ |
| IX. Idioma | UI en es-CO; código, tipos y commits en inglés (`id` de ancla en español porque son visibles en la URL). | ✅ |

**Resultado**: sin violaciones; no se requiere enmienda ni justificación en Complexity Tracking.

**Re-check post-diseño (Fase 1)**: ✅ Los contratos y el modelo de datos mantienen el contenido
fuera de los componentes, no agregan dependencias ni rutas y documentan los tokens nuevos. Única
desviación de la entrada del usuario (no de la constitución): se conserva
`src/pages/Home/HomePage.tsx` en lugar de `src/pages/Home.tsx` (research R11).

## Project Structure

### Documentation (this feature)

```text
specs/002-home-redesign/
├── plan.md              # Este archivo
├── research.md          # Fase 0: decisiones (diseño, contraste, slider, carga, pruebas)
├── data-model.md        # Fase 1: Slide, ProjectInfo ampliado, indicadores, recursos
├── quickstart.md        # Fase 1: guía de validación
├── contracts/
│   └── ui-components.md # Fase 1: contratos de componentes, hooks y HomePage
├── checklists/
│   └── requirements.md  # Calidad de la especificación
└── tasks.md             # Fase 2 (/speckit-tasks; no lo crea este comando)
```

### Source Code (repository root)

```text
src/
├── assets/images/
│   ├── placeholder.svg          # MOD: crema/verde claro con patrón sutil, slice
│   ├── activities/              # sin cambios
│   ├── slider/                  # NUEVO (.gitkeep; slide-1.webp … slide-5.webp a futuro)
│   └── home/                    # NUEVO (.gitkeep; proyecto/logros/recursos.webp a futuro)
├── components/
│   ├── AppIcon/                 # NUEVO: mapa cerrado IconKey → lucide
│   ├── Slider/                  # NUEVO: Slider.tsx, Slider.module.css, Slider.test.tsx
│   ├── Section/                 # NUEVO
│   ├── SupportImage/            # NUEVO (+ test)
│   ├── IndicatorCard/           # NUEVO
│   ├── ObjectiveList/           # NUEVO
│   ├── ResourceGroup/           # NUEVO
│   ├── PillarCard/, PillarIcon/ # MOD: estilo; PillarIcon delega en AppIcon
│   ├── SectionTitle/            # MOD: eyebrow opcional
│   └── Navbar/, Footer/, Layout/, ActivityCard/, ActivityModal/, Modal/, Tabs/,
│       ProblemTabs/, WeekBadge/, ImageWithFallback/   # MOD: solo estilos
├── data/
│   ├── project.ts               # MOD: contenido real ampliado
│   ├── slides.ts                # NUEVO (DRAFT)
│   ├── ui.ts                    # MOD: textos del slider, secciones y metas pendientes
│   └── __tests__/               # MOD project.test.ts, NUEVO slides.test.ts
├── hooks/                       # NUEVO
│   ├── useReducedMotion.ts
│   └── useReveal.ts
├── pages/Home/                  # MOD: HomePage.tsx recompuesto (+ HomePage.test.tsx)
├── styles/
│   ├── tokens.css               # MOD: tokens ampliados (research R2)
│   └── global.css               # MOD: escala tipográfica, foco, botones, .reveal
├── test/setup.ts                # MOD: stub de matchMedia
├── types/                       # MOD project.ts; NUEVO slide.ts, icon.ts; index.ts reexporta
└── utils/
    ├── getImage.ts              # NUEVO (+ test)
    └── getActivityImage.ts      # MOD: envoltorio de getImage('activities', …)
```

**Structure Decision**: se mantiene la estructura de proyecto único de la feature 001 (carpeta por
componente con su CSS Module y prueba). Los hooks se agrupan en `src/hooks/`, carpeta nueva.

## Design Notes

- **Ritmo vertical**: `--section-space: clamp(4rem, 3rem + 4vw, 7rem)` entre secciones; tarjetas
  con `--space-6`–`--space-7` de padding; contenedor máximo `--container-max` (72rem).
- **Tipografía**: escala fluida `--fs-md` … `--fs-display` con `clamp()`; títulos Fraunces 600/700
  (ya cargados), cuerpo Nunito 400/600/700, `--lh-body: 1.7`, medida máxima 70ch, `text-wrap:
  balance` en títulos.
- **Tarjetas**: `--radius-card` (20 px) y `--radius-xl` (24 px) para imágenes; `--shadow-soft`
  base y `--shadow-hover` con `translateY(-2px)` en hover (solo `transform`/`opacity`/`box-shadow`,
  200 ms).
- **Fondos alternos**: crema (`--color-bg`) → verde muy claro (`--color-mint`) → crema; detalles en
  ocre (líneas de eyebrow, círculos de número, chip de criterio).
- **Navbar**: `--color-navbar-glass` + `backdrop-filter`, borde inferior `--color-border-soft`,
  sombra al hacer scroll opcional vía CSS `:has`/estado; fallback opaco.
- **Slider**: `aspect-ratio: var(--slider-ratio)` desde 64rem; `min-height: var(--slider-min-h)` en
  móvil; overlay `--gradient-slide`; texto en el tercio inferior (research R2).
- **Foco**: `outline: var(--focus-ring-width) solid var(--color-focus)` con offset; dentro del
  slider `--color-focus-on-dark`.

## Implementation Order (para /speckit-tasks)

1. Tokens + global.css + stub de `matchMedia` (fundacional).
2. Tipos y datos (`project`, `slides`, `ui`) con sus pruebas.
3. `getImage` + `AppIcon` + hooks.
4. US1: Slider (+ pruebas).
5. US2–US4: Section, SupportImage, ObjectiveList, IndicatorCard, ResourceGroup, PillarCard; HomePage
   (+ pruebas).
6. US5: estilos de Navbar, Footer, SectionTitle, tarjetas y páginas existentes.
7. Pulido: Lighthouse, axe, revisión de anchos, README (sección "Agregar fotos del slider y del
   Inicio") y `checklists/validation.md`.

## Complexity Tracking

Sin violaciones de la constitución; no aplica.
