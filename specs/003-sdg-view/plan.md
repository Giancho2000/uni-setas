# Implementation Plan: Vista ODS e imágenes reales del proyecto

**Branch**: `spec/ods` (feature dir `003-sdg-view`) | **Date**: 2026-11-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/003-sdg-view/spec.md`

## Summary

Se agrega la vista "ODS" (`/ods`) como cuarta entrada de la configuración central de rutas, cargada
de forma diferida. La vista tiene 3 secciones: (1) qué son los ODS y el mensaje de contribución
local con enlace a la ONU, (2) filtro por nivel + 9 tarjetas interactivas agrupadas por nivel que
abren una modal (reutilizando el `Modal` accesible existente), y (3) el cuadro "De la actividad al
ODS" con un llamado a la acción hacia Actividades. Todo el contenido vive en `src/data/sdg.ts`
tipado en `src/types/sdg.ts`; actividades e indicadores se referencian por id desde
`activities.ts` y `project.ts`. Además se generaliza `getImage` (carpeta `sdg`, resolución
insensible a la extensión) y se conectan las fotos reales de slider, Inicio, actividades y ODS sin
cambiar ningún texto.

## Technical Context

**Language/Version**: TypeScript ~5.7 (`strict: true`), React 18.3

**Primary Dependencies**: Vite 6, React Router 6.30, lucide-react (ya instalada). **Sin
dependencias nuevas.**

**Storage**: N/A (contenido en archivos de datos versionados en `src/data`)

**Testing**: Vitest 3 + Testing Library + user-event + jsdom; ESLint (jsx-a11y), Prettier,
`tsc -b --noEmit`; Lighthouse manual sobre `vite preview`.

**Target Platform**: navegadores modernos (evergreen) en celular, tableta y escritorio; hosting
estático (Netlify `_redirects` / GitHub Pages con `404.html`).

**Project Type**: SPA estática (frontend único).

**Performance Goals**: Lighthouse ≥ 90 en Rendimiento y 100 en Accesibilidad en la vista ODS; CLS
≈ 0 en tarjetas (dimensiones reservadas); la vista ODS no añade peso al chunk inicial del Inicio.

**Constraints**: sin backend; colores solo vía tokens; WCAG 2.1 AA; `prefers-reduced-motion`
respetado; nombres de archivo de imagen en minúscula sin espacios ni tildes (el despliegue
distingue mayúsculas).

**Scale/Scope**: 1 vista nueva, 9 ODS, 4 actividades, 5 componentes nuevos, ~22 espacios de
imagen.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Cómo se cumple | Estado |
|-----------|----------------|--------|
| I. Solo frontend | Vista estática; enlace externo a la ONU es un `<a>` simple. | ✅ |
| II. Contenido separado | ODS, metas, textos de la vista en `src/data/sdg.ts`; textos de interfaz en `src/data/ui.ts`; títulos/semanas/indicadores se resuelven por id, sin duplicar. | ✅ |
| III. Configuración central | Solo se agrega un objeto a `appRoutes` en `src/config/routes.tsx`; Navbar y router no cambian de lógica. | ✅ |
| IV. Imágenes con placeholder | Imágenes en `src/assets/images/<carpeta>`, referenciadas desde datos; `getImage` cae al placeholder; `alt` en datos. | ✅ |
| V. Tokens | Colores ODS como `--sdg-N` / `--sdg-N-on` en `tokens.css`; el componente referencia la variable por id, sin hex en datos ni componentes (ver R3). | ✅ |
| VI. Accesibilidad | Modal existente (foco atrapado, Escape, `aria-modal`), filtro `radiogroup` con flechas, tabla con `th scope`, contraste AA verificado (R3), color nunca único identificador. | ✅ |
| VII. Código simple | Sin dependencias nuevas; 5 componentes pequeños; se generalizan `Section`, `SupportImage` e `ImageWithFallback` con props opcionales. | ✅ |
| VIII. Calidad verificable | Pruebas para Navbar, SdgFilter, SdgCard+Modal, ODS sin indicador, tabla e integridad de datos/imágenes. | ✅ |
| IX. Idioma | Contenido es-CO; código en inglés (`Sdg*`). | ✅ |

**Re-check post-diseño**: ✅ sin violaciones. No hay entradas en Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/003-sdg-view/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/
│   └── ui-components.md # Phase 1 (props y comportamiento de componentes)
├── checklists/requirements.md
└── tasks.md             # Phase 2 (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── assets/images/
│   ├── placeholder.svg
│   ├── slider/      slide-1 … slide-5           (.webp|.jpg|.jpeg|.png)
│   ├── home/        proyecto, logros, recursos
│   ├── activities/  semana-1 … semana-4
│   └── sdg/         intro, ods-1, ods-2, ods-3, ods-4, ods-8, ods-12, ods-13, ods-15, ods-17   [NUEVA]
├── config/routes.tsx                  # + entrada { id: 'sdg', path: '/ods', label: 'ODS' } (lazy)
├── types/sdg.ts                       # NUEVO: Sdg, SdgLevel, SdgTarget, SdgPageContent
├── types/index.ts                     # + export sdg
├── types/project.ts                   # SupportImageRef + folder opcional
├── data/sdg.ts                        # NUEVO: 9 ODS, niveles, textos de la vista
├── data/ui.ts                         # + ui.sdg (etiquetas de interfaz)
├── data/slides.ts | activities.ts | project.ts   # solo campo image → nombres reales
├── utils/getImage.ts                  # + carpeta 'sdg', resolución sin extensión
├── utils/sdg.ts                       # NUEVO: selectores (por nivel, actividad→ODS, resolver ids)
├── styles/tokens.css                  # + --sdg-N y --sdg-N-on
├── components/
│   ├── SdgBadge/        SdgBadge.tsx, .module.css
│   ├── SdgCard/         SdgCard.tsx, .module.css, SdgCard.test.tsx
│   ├── SdgModal/        SdgModal.tsx, .module.css, SdgModal.test.tsx
│   ├── SdgFilter/       SdgFilter.tsx, .module.css, SdgFilter.test.tsx
│   ├── ActivitySdgTable/ ActivitySdgTable.tsx, .module.css, ActivitySdgTable.test.tsx
│   ├── Section/         id: string (antes HomeSectionId)
│   ├── SupportImage/    + prop folder (default 'home')
│   ├── ImageWithFallback/ + props width/height opcionales
│   ├── Layout/          <Suspense> alrededor de <Outlet>
│   └── Navbar/          CSS: flex-wrap para opciones futuras
├── pages/Sdg/           SdgPage.tsx, SdgPage.module.css, SdgPage.test.tsx
└── data/__tests__/      sdg.test.ts, images.test.ts
```

**Structure Decision**: se respeta la convención existente `src/pages/<Nombre>/<Nombre>Page.tsx`
(en lugar de `src/pages/Sdg.tsx`) y el archivo real de rutas `src/config/routes.tsx` (no `.ts`,
porque contiene JSX). Ver research R1.

## Phase notes

- **Phase 0** → [research.md](./research.md): R1–R10 resuelven ubicación de archivos, carga
  diferida, contraste de colores, patrón de tarjeta, filtro, tabla responsive, resolución de
  imágenes, estado real de las fotos, contenido de metas y navbar extensible.
- **Phase 1** → [data-model.md](./data-model.md), [contracts/ui-components.md](./contracts/ui-components.md),
  [quickstart.md](./quickstart.md).

## Riesgos y dependencias

- **Fotos no presentes** (R8): hoy solo existen 7 fotos con nombres de WhatsApp en `activities/`;
  `slider/`, `home/` están vacías y `sdg/` no existe. El código queda conectado a los nombres
  definitivos y muestra el placeholder hasta que el equipo copie y renombre las fotos. Elegir qué
  foto corresponde a cada semana es una decisión de contenido (tarea bloqueante para "ver fotos").
- **Relación actividad–ODS e indicadores de ODS 1/13/17**: tomados de los supuestos del spec;
  cambiarlos solo requiere editar `src/data/sdg.ts`.

## Complexity Tracking

Sin violaciones de la constitución; no aplica.
