# Data Model: Sitio informativo de la Huerta comunitaria de setas orellanas

**Feature**: `001-informative-site` | **Date**: 2026-11-01

Todo el modelo vive en archivos TypeScript estáticos: tipos en `src/types/`, datos en `src/data/` y
la configuración de rutas en `src/config/routes.ts`. No hay persistencia ni estados de servidor.
Los identificadores y claves están en inglés; los valores visibles, en español de Colombia.

## AppRoute — `src/types/route.ts`

Una sección navegable del sitio. Fuente: `src/config/routes.ts` (ver
[contracts/routes-config.md](./contracts/routes-config.md)).

| Campo | Tipo | Regla |
|-------|------|-------|
| `id` | `string` | Único, kebab-case (`home`, `problems`, `activities`). |
| `path` | `string` | Único; empieza con `/`; en español (`/`, `/problematicas`, `/actividades`). |
| `label` | `string` | Texto del enlace en la navbar. No vacío. |
| `element` | `ReactNode` | Página a renderizar. |
| `showInNav` | `boolean` | `true` para aparecer en la navbar, en el orden del arreglo. |
| `end` | `boolean?` | `true` para `/` (activo solo en coincidencia exacta). |

## ProjectInfo y Pillar — `src/types/project.ts`, datos en `src/data/project.ts`

| Campo (`ProjectInfo`) | Tipo | Regla |
|-----------------------|------|-------|
| `name` | `string` | "Huerta comunitaria de setas orellanas". |
| `scientificName` | `string` | "Pleurotus ostreatus" (se muestra en cursiva). |
| `objective` | `string` | Objetivo central, 1–3 oraciones. |
| `pillars` | `Pillar[]` | Exactamente 4, en orden de presentación. |
| `institution` | `string` | "UNIMINUTO" (pie de página). |

| Campo (`Pillar`) | Tipo | Regla |
|------------------|------|-------|
| `id` | `'sustainability' \| 'income' \| 'space-use' \| 'organic-input'` | Único. |
| `title` | `string` | Sostenibilidad / Generación de ingresos / Aprovechamiento de espacios / Aporte orgánico. |
| `description` | `string` | 1–2 oraciones. |
| `icon` | `PillarIcon` | Clave de un conjunto cerrado mapeado a íconos en un solo archivo. |

## Problem — `src/types/problem.ts`, datos en `src/data/problems.ts`

| Campo | Tipo | Regla |
|-------|------|-------|
| `id` | `string` | Único (`unemployment`, `underused-spaces`). |
| `title` | `string` | Título completo de la problemática. |
| `shortTitle` | `string` | Etiqueta corta para la pestaña principal (p. ej., "Desempleo rural"). |
| `sections` | `Record<ProblemSectionKey, ProblemSection>` | Las 5 claves obligatorias (el tipo lo exige). |

`ProblemSectionKey = 'local' | 'national' | 'global' | 'causes' | 'effects'`.
El orden de pestañas y sus etiquetas ("Local", "Nacional", "Global", "Causas", "Efectos") se definen
una sola vez en `PROBLEM_SECTION_ORDER` / `PROBLEM_SECTION_LABELS` en `src/data/problems.ts`.

| Campo (`ProblemSection`) | Tipo | Regla |
|--------------------------|------|-------|
| `blocks` | `ContentBlock[]` | ≥ 1 bloque. |

| Campo (`ContentBlock`) | Tipo | Regla |
|------------------------|------|-------|
| `heading` | `string?` | Obligatorio en `causes` (Históricas, Socioculturales, Políticas, Económicas) y `effects` (Sociales, Culturales, Ambientales, Políticos); opcional en los análisis. |
| `paragraphs` | `string[]` | ≥ 1 párrafo no vacío. |

> Ajuste respecto al input del plan (`sections` con `párrafos[]`): se agrega `blocks` con
> `heading` opcional para cumplir FR-013 (subdivisión de causas y efectos) sin un tipo distinto por
> apartado.

## Activity — `src/types/activity.ts`, datos en `src/data/activities.ts`

| Campo | Tipo | Regla |
|-------|------|-------|
| `id` | `string` | Único, kebab-case. |
| `week` | `number` | Entero ≥ 1, único; las tarjetas se ordenan por este campo. |
| `title` | `string` | No vacío. |
| `summary` | `string` | Descripción corta para la tarjeta (≤ 160 caracteres recomendado). |
| `image` | `string \| null` | Nombre de archivo dentro de `src/assets/images/activities/` (p. ej., `capacitacion.jpg`) o `null`. Inicialmente `null` en las cuatro. |
| `imageAlt` | `string` | Texto alternativo en español; obligatorio aunque `image` sea `null` (se usa cuando se asigne). |
| `duration` | `string` | P. ej., "1 semana (4 horas)". |
| `strategy` | `string` | Párrafo. |
| `channels` | `string[]` | Medios usados (presencial, WhatsApp, etc.). |
| `responsible` | `string` | Persona o equipo responsable. |
| `resources` | `string[]` | Lista de recursos. |
| `indicators` | `string[]` | Indicadores de la comunidad. |

Reglas de presentación: un `string` vacío o un arreglo vacío se muestra como "Por definir" (texto
centralizado en `src/data/ui.ts`).

Datos iniciales (orden por `week`):

| week | title |
|------|-------|
| 1 | Capacitación sobre el producto |
| 2 | Concientización sobre la producción sostenible del producto |
| 3 | Creación de la estructuración de la huerta |
| 4 | Siembra del producto |

## UiText — `src/data/ui.ts`

Textos de interfaz reutilizables: nombre corto del sitio, etiqueta del botón de menú ("Abrir menú" /
"Cerrar menú"), "Cerrar", "Ver detalle", "Semana", "Por definir", etiquetas de los campos de la modal
(Duración, Estrategia, Canales, Responsable, Recursos, Indicadores de la comunidad), textos de la
página no encontrada y llamados a la acción del Inicio.

## Estado de UI (no persistente)

| Estado | Dueño | Transiciones |
|--------|-------|--------------|
| Menú móvil abierto | `Navbar` | cerrado → abierto (botón); abierto → cerrado (botón, Escape, elegir enlace, cambio de ruta, ancho ≥ breakpoint de escritorio). |
| Problemática seleccionada | `ProblemTabs` | inicial = primera; al cambiar, apartado vuelve a `local`. |
| Apartado seleccionado | `ProblemTabs` | inicial = `local`. |
| Actividad abierta | `ActivitiesPage` | `null` → `Activity` (activar tarjeta); → `null` (botón cerrar, Escape, clic en backdrop). |

## Validaciones automatizadas

Un test de datos (`src/data/__tests__/content.test.ts`) verifica: 4 actividades con `week` únicos y
consecutivos; 2 problemáticas; cada apartado con ≥ 1 párrafo no vacío; `causes` y `effects` con los
encabezados esperados; 4 pilares con `id` únicos; `path` y `id` únicos en `appRoutes`.
