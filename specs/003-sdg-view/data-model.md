# Data Model: Vista ODS e imágenes reales del proyecto

## Tipos nuevos (`src/types/sdg.ts`)

```ts
export type SdgId = 1 | 2 | 3 | 4 | 8 | 12 | 13 | 15 | 17;
export type SdgLevel = 'directa' | 'complementaria' | 'indirecta';

export interface SdgTarget {
  /** Official target code, e.g. "2.3". Must start with `${sdg.id}.` */
  code: string;
  /** Short Spanish paraphrase of the official UN target. */
  text: string;
}

export interface Sdg {
  id: SdgId;
  /** Official Spanish name, e.g. "Hambre cero". */
  name: string;
  level: SdgLevel;
  /** One sentence for the card (<= 140 chars). */
  summary: string;
  /** Full explanation for the modal (1–3 short paragraphs). */
  detail: string[];
  /** At least one. */
  targets: SdgTarget[];
  /** Base file name in `src/assets/images/sdg/` (e.g. `ods-2`) or `null`. */
  image: string | null;
  imageAlt: string;
  /** Ids from `activities.ts`; at least one. */
  activityIds: string[];
  /** Ids from `project.indicators`; empty only when level === 'indirecta'. */
  indicatorIds: IndicatorId[];
}

export interface SdgLevelInfo {
  id: SdgLevel;
  /** Group heading, e.g. "Contribución directa". */
  title: string;
  /** Filter label, e.g. "Directa". */
  filterLabel: string;
  /** Badge text on cards, e.g. "Contribución directa". */
  badge: string;
  description: string;
}

export interface SdgPageContent {
  title: string;
  intro: { title: string; paragraphs: string[]; localMessage: string; unLink: { label: string; href: string }; image: SupportImageRef };
  catalog: { title: string; intro: string };
  summary: { title: string; intro: string; caption: string; cta: { label: string; routeId: 'activities' } };
}
```

Diferencias con la propuesta del usuario (ver research): `color` se elimina del dato y se deriva de
`id` vía tokens (R3); `targets` pasa de `string[]` a `SdgTarget[]` para validar el código de meta;
`detail` es `string[]` (párrafos); `id` usa una unión literal para que el compilador rechace ODS
fuera de alcance.

## Cambios en tipos existentes

- `ImageFolder` (`utils/getImage.ts`): `'activities' | 'slider' | 'home' | 'sdg'`.
- `SupportImageRef` (`types/project.ts`): + `folder?: ImageFolder` (default `'home'`).
- `Section` props: `id: string` (antes `HomeSectionId`).
- Datos existentes: solo cambia el valor de `image` (nombres base). **Ningún texto cambia.**

## Contenido (`src/data/sdg.ts`)

`sdgLevels: SdgLevelInfo[]` en orden directa → complementaria → indirecta.
`sdgs: Sdg[]` ordenados por nivel y luego por id.

| id | Nombre | Nivel | Metas | Actividades | Indicadores | Imagen |
|----|--------|-------|-------|-------------|-------------|--------|
| 2  | Hambre cero | directa | 2.3, 2.4 | garden-structure, sowing | infrastructure, income | ods-2 |
| 8  | Trabajo decente y crecimiento económico | directa | 8.3 | product-training, sowing | income, participation | ods-8 |
| 12 | Producción y consumo responsables | directa | 12.2, 12.5 | sustainable-awareness, sowing | sustainability | ods-12 |
| 1  | Fin de la pobreza | complementaria | 1.4 | sowing | income | ods-1 |
| 4  | Educación de calidad | complementaria | 4.4, 4.7 | product-training, sustainable-awareness | participation, learning | ods-4 |
| 13 | Acción por el clima | complementaria | 13.3 | sustainable-awareness | sustainability | ods-13 |
| 17 | Alianzas para lograr los objetivos | complementaria | 17.17 | product-training | participation, compliance | ods-17 |
| 3  | Salud y bienestar | indirecta | 3.4 | sowing | — | ods-3 |
| 15 | Vida de ecosistemas terrestres | indirecta | 15.3 | sustainable-awareness | — | ods-15 |

Relación derivada actividad → ODS (cuadro resumen):

| Actividad | ODS |
|-----------|-----|
| Semana 1 – product-training | 4, 8, 17 |
| Semana 2 – sustainable-awareness | 4, 12, 13, 15 |
| Semana 3 – garden-structure | 2 |
| Semana 4 – sowing | 1, 2, 3, 8, 12 |

Metas (texto breve, parafraseado del oficial en español):

- **1.4**: Garantizar que las personas, en particular las pobres y vulnerables, tengan los mismos derechos a los recursos económicos y acceso a los servicios básicos.
- **2.3**: Aumentar la productividad agrícola y los ingresos de los productores de alimentos en pequeña escala, incluidos los agricultores familiares.
- **2.4**: Asegurar la sostenibilidad de los sistemas de producción de alimentos y aplicar prácticas agrícolas resilientes.
- **3.4**: Reducir la mortalidad prematura por enfermedades no transmisibles mediante su prevención y promover la salud y el bienestar.
- **4.4**: Aumentar el número de jóvenes y adultos con competencias técnicas para acceder al empleo, el trabajo decente y el emprendimiento.
- **4.7**: Asegurar que los estudiantes adquieran los conocimientos teóricos y prácticos necesarios para promover el desarrollo sostenible.
- **8.3**: Promover políticas que apoyen las actividades productivas, la creación de empleo decente, el emprendimiento, la creatividad y la innovación.
- **12.2**: Lograr la gestión sostenible y el uso eficiente de los recursos naturales.
- **12.5**: Reducir considerablemente la generación de desechos mediante la prevención, reducción, reciclado y reutilización.
- **13.3**: Mejorar la educación, la sensibilización y la capacidad humana respecto de la mitigación del cambio climático y la adaptación a él.
- **15.3**: Luchar contra la desertificación y rehabilitar las tierras y los suelos degradados.
- **17.17**: Fomentar y promover alianzas eficaces en las esferas pública, público-privada y de la sociedad civil.

## Imágenes conectadas (solo campo `image`)

| Archivo de datos | Campo | Valor |
|------------------|-------|-------|
| `slides.ts` | `image` (huerta, sustrato, capacitacion, comunidad, cosecha) | `slide-1` … `slide-5` |
| `project.ts` | `sectionImages.{proyecto,logros,recursos}.image` | `proyecto`, `logros`, `recursos` |
| `activities.ts` | `image` (semana 1–4) | `semana-1` … `semana-4` |
| `sdg.ts` | `image` | `ods-N`; `intro.image` → `{ folder: 'sdg', image: 'intro' }` |

## Selectores (`src/utils/sdg.ts`)

- `getSdgsByLevel(level: SdgLevel | 'todos'): { level: SdgLevelInfo; items: Sdg[] }[]`
- `getActivitySdgRows(): { activity: Activity; sdgs: Sdg[] }[]` — ordenado por semana; ODS por id.
- `resolveSdgActivities(sdg): Activity[]` y `resolveSdgIndicators(sdg): SuccessIndicator[]` —
  lanzan error en DEV/pruebas si un id no existe.

## Reglas de validación (pruebas)

1. Exactamente 9 ODS con ids {1,2,3,4,8,12,13,15,17}, únicos; niveles 3/4/2.
2. Cada `targets[i].code` empieza por `${id}.`; códigos coinciden con la tabla anterior.
3. Cada `activityId`/`indicatorId` existe; cada una de las 4 actividades aparece en ≥ 1 ODS.
4. `indicatorIds.length === 0` ⇔ `level === 'indirecta'`.
5. Ningún texto de `sdg.ts` contiene `/\b(cumple|cumplir|logra|lograr)\b/i` (SC-010).
6. Existen tokens `--sdg-N` y `--sdg-N-on` en `tokens.css` para cada id.
7. Nombres de archivo de imagen en minúscula, sin espacios ni tildes.
