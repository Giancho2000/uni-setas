# Implementation Plan: Sitio informativo de la Huerta comunitaria de setas orellanas

**Branch**: `001-informative-site` | **Date**: 2026-11-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-informative-site/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

SPA estática en español que presenta el proyecto de la huerta de setas orellanas con tres secciones
(Inicio, Problemáticas, Actividades) generadas desde una configuración central de rutas. El contenido
vive en archivos TypeScript tipados en `src/data`; las imágenes se resuelven por nombre con
`import.meta.glob` y caen a un placeholder neutro. La interacción (menú móvil, pestañas ARIA, modal
con trampa de foco) se implementa con componentes propios, sin librerías de UI, sobre tokens de
diseño CSS con contraste AA verificado. Detalle de decisiones en [research.md](./research.md).

## Technical Context

**Language/Version**: TypeScript 5.x (`strict`), React 18, Node.js 20 LTS para tooling

**Primary Dependencies**: react, react-dom, react-router-dom v6, lucide-react. Dev: vite,
@vitejs/plugin-react, typescript, eslint + typescript-eslint + react-hooks + react-refresh + jsx-a11y,
prettier + eslint-config-prettier, vitest, jsdom, @testing-library/react, @testing-library/user-event,
@testing-library/jest-dom

**Storage**: N/A — contenido en archivos `.ts` versionados en `src/data`

**Testing**: Vitest + React Testing Library (jsdom), pruebas colocadas junto al componente
(`*.test.tsx`) y test de integridad de datos

**Target Platform**: navegadores modernos (dos últimas versiones de Chrome, Firefox, Safari, Edge;
móvil y escritorio); hosting estático (Netlify, Vercel o GitHub Pages)

**Project Type**: web application — solo frontend (SPA estática)

**Performance Goals**: contenido principal de la portada visible < 3 s en 4G móvil; JS inicial
< 100 KB gzip

**Constraints**: sin backend, sin variables de entorno propias, sin llamadas de red en tiempo de
ejecución salvo Google Fonts; WCAG 2.1 AA; sin scroll horizontal desde 320 px; mobile-first

**Scale/Scope**: 3 páginas + página no encontrada, ~10 componentes, 2 problemáticas × 5 apartados,
4 actividades; crecimiento por nuevas secciones

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Cómo se cumple | Estado |
|-----------|----------------|--------|
| I. Solo frontend | Vite genera `dist/` estático; sin API, BD ni auth; fallback de rutas por archivo de hosting (R3). | ✅ |
| II. Contenido separado | `project.ts`, `problems.ts`, `activities.ts`, `ui.ts` en `src/data` con tipos en `src/types`; componentes solo reciben datos por props. | ✅ |
| III. Configuración central | `src/config/routes.tsx` alimenta router y navbar ([contrato](./contracts/routes-config.md)). | ✅ |
| IV. Imágenes desacopladas | `src/assets/images/activities/` + `getActivityImage` + `ImageWithFallback` con placeholder y `aspect-ratio` (R8). | ✅ |
| V. Tokens de diseño | `src/styles/tokens.css` único; regla de revisión: sin hex/px de color o espaciado en CSS Modules (salvo `0` y `1px` de bordes vía token). | ✅ |
| VI. Accesibilidad y responsive | Mobile-first, HTML semántico, contraste calculado (R4: verde hoja y ocre solo decorativos), tabs ARIA, modal con foco atrapado/devuelto y Escape (R6, R7), `lang="es-CO"`. | ✅ |
| VII. Código simple | Componentes propios pequeños; dependencias de runtime justificadas abajo. | ✅ con justificación |
| VIII. Calidad verificable | ESLint + Prettier + `tsc` + Vitest; pruebas de Navbar, Modal, ActivityCard (+ Tabs y datos). | ✅ |
| IX. Idioma | UI en es-CO; código, identificadores y commits en inglés. Rutas públicas en español (`/problematicas`) por ser texto visible en la URL. | ✅ |

**Justificación de dependencias (principio VII)**:

- `react-router-dom`: rutas con URL propia, recarga y atrás/adelante (FR-006) y `NavLink` con
  `aria-current`; reimplementarlo es más código y menos robusto.
- `lucide-react`: íconos accesibles con tree-shaking (~1 KB por ícono); pedido explícito como única
  dependencia visual.
- Google Fonts (recurso externo, no dependencia npm): identidad tipográfica; `display=swap` y pilas de
  respaldo (R5).
- Dependencias de desarrollo: todas exigidas por el principio VIII o por el build.

**Resultado del gate (pre-Phase 0)**: PASA. **Re-check post-Phase 1**: PASA — el diseño de datos
y los contratos no introducen servidor, contenido en componentes ni rutas fuera de la configuración.

**Enmiendas a la constitución**: ninguna.

## Project Structure

### Documentation (this feature)

```text
specs/001-informative-site/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── routes-config.md
│   └── ui-components.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
index.html                     # lang="es-CO", preconnect + Google Fonts
public/
├── _redirects                 # Netlify SPA fallback
└── favicon.svg
vercel.json                    # Vercel SPA fallback
vite.config.ts                 # React plugin + Vitest config (jsdom, setup file)
tsconfig.json / tsconfig.app.json / tsconfig.node.json
eslint.config.js
.prettierrc
src/
├── main.tsx                   # monta RouterProvider, importa styles
├── App.tsx                    # createBrowserRouter a partir de appRoutes + ruta '*'
├── config/
│   └── routes.tsx             # appRoutes: única fuente de rutas y navbar
├── types/
│   ├── route.ts
│   ├── project.ts
│   ├── problem.ts
│   └── activity.ts
├── data/
│   ├── project.ts             # nombre, objetivo, 4 pilares
│   ├── problems.ts            # 2 problemáticas, orden y etiquetas de apartados
│   ├── activities.ts          # 4 actividades (image: null)
│   ├── ui.ts                  # textos de interfaz reutilizables
│   └── __tests__/content.test.ts
├── assets/images/
│   ├── placeholder.svg        # neutro crema/blanco
│   └── activities/            # fotos reales (inicialmente solo .gitkeep)
├── styles/
│   ├── tokens.css             # paleta, tipografía, espaciado, radios, sombras, medidas
│   └── global.css             # reset, base tipográfica, foco visible, utilidades sr-only
├── utils/
│   ├── getActivityImage.ts
│   └── getActivityImage.test.ts
├── components/
│   ├── Layout/                # Navbar + <main id="main"> + Footer + skip link
│   ├── Navbar/                # Navbar.tsx, Navbar.module.css, Navbar.test.tsx
│   ├── Footer/
│   ├── Modal/                 # Modal.tsx, useFocusTrap.ts, Modal.module.css, Modal.test.tsx
│   ├── ActivityCard/          # + ActivityCard.test.tsx
│   ├── ActivityModal/
│   ├── ImageWithFallback/
│   ├── Tabs/                  # Tabs genérico WAI-ARIA + Tabs.test.tsx
│   ├── ProblemTabs/
│   ├── PillarCard/
│   ├── PillarIcon/            # mapa PillarIcon → ícono lucide
│   └── SectionTitle/
├── pages/
│   ├── Home/
│   ├── Problems/
│   ├── Activities/
│   └── NotFound/
└── test/
    └── setup.ts               # jest-dom matchers
```

**Structure Decision**: proyecto único de frontend en la raíz del repositorio, siguiendo la
estructura de carpetas pedida. Se añaden, respecto al input: `Layout` (estructura común y skip
link), `Tabs` (lógica ARIA reutilizable por `ProblemTabs`), `ImageWithFallback` (placeholder ante
`onError`), `PillarIcon`, la página `NotFound` (FR-007), `src/data/ui.ts` (textos de interfaz
centralizados, principio II) y `src/test/setup.ts`. Cada componente tiene su carpeta con `.tsx`,
`.module.css` y, si es interactivo, `.test.tsx`.

## Complexity Tracking

Sin violaciones de la constitución. Las dependencias de runtime se justifican en la sección
Constitution Check.
