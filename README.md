# Huerta comunitaria de setas orellanas

Sitio web informativo del proyecto de responsabilidad social universitaria (UNIMINUTO)
**Huerta comunitaria de setas orellanas (_Pleurotus ostreatus_)**. Presenta el proyecto, las
problemáticas que lo originan, las actividades del plan de trabajo y su contribución local a los
Objetivos de Desarrollo Sostenible (vista **ODS**, en `/ods`).

Es una aplicación de una sola página (SPA) estática: no tiene backend, base de datos ni inicio de
sesión. Todo el contenido vive en archivos dentro de `src/data/`.

> ⚠️ Los textos de `src/data/project.ts`, `src/data/slides.ts`, `src/data/problems.ts` y
> `src/data/activities.ts` son un
> **borrador pendiente de revisión** por el equipo (cada archivo empieza con `// DRAFT`).

## Requisitos

- Node.js 20 o superior y npm.

## Comandos

```bash
npm install          # instalar dependencias
npm run dev          # servidor de desarrollo (http://localhost:5173)
npm run lint         # revisar el código con ESLint
npm run format       # dar formato con Prettier
npm run format:check # verificar formato
npm run typecheck    # verificar tipos de TypeScript
npm run test         # ejecutar las pruebas (Vitest)
npm run build        # generar el sitio en dist/
npm run preview      # ver el resultado del build
```

Antes de integrar cambios, `lint`, `format:check`, `typecheck` y `test` deben pasar sin errores.

## Editar el contenido

| Qué quieres cambiar                                                | Archivo                  |
| ------------------------------------------------------------------ | ------------------------ |
| Inicio: por qué, quién, objetivos, indicadores, recursos, pilares  | `src/data/project.ts`    |
| Diapositivas del slider del Inicio (título, frase, foto)           | `src/data/slides.ts`     |
| Problemáticas (análisis local, nacional, global, causas y efectos) | `src/data/problems.ts`   |
| Actividades del plan de trabajo                                    | `src/data/activities.ts` |
| ODS: niveles, metas, actividades e indicadores vinculados          | `src/data/sdg.ts`        |
| Textos de la interfaz (menú, botones, etiquetas)                   | `src/data/ui.ts`         |

No es necesario tocar los componentes: basta con editar los datos. TypeScript avisará si falta un
campo obligatorio.

## Agregar o cambiar fotos

Las fotos ya están conectadas a sus espacios: basta con copiar el archivo con el nombre esperado en
su carpeta. Los datos guardan el **nombre base** sin extensión, así que funciona con `.webp`,
`.jpg`, `.jpeg` o `.png`. Los nombres van en minúscula, sin espacios ni tildes (una prueba lo
verifica).

| Dónde                           | Carpeta                         | Nombres                          | Medidas recomendadas |
| ------------------------------- | ------------------------------- | -------------------------------- | -------------------- |
| Slider del Inicio               | `src/assets/images/slider/`     | `slide-1` … `slide-5`            | 1920 × 800 px (12:5) |
| Imagen de apoyo de cada sección | `src/assets/images/home/`       | `proyecto`, `logros`, `recursos` | 1200 × 800 px (3:2)  |
| Actividades (tarjeta y modal)   | `src/assets/images/activities/` | `semana-1` … `semana-4`          | 900 × 600 px (3:2)   |
| Vista ODS                       | `src/assets/images/sdg/`        | `ods-1`, `ods-2`, … (íconos)     | cuadradas, ≥ 320 px  |

Detalle completo en [`src/assets/images/README.md`](src/assets/images/README.md). Al cambiar una
foto, revisa que su texto alternativo (`alt` o `imageAlt`) la describa. Las fotos se recortan
para llenar su espacio (centradas); en el slider el texto va a la izquierda, sobre un velo verde
oscuro que garantiza su contraste. Mientras falte una foto, su espacio muestra el fondo neutro del
sitio sin descuadrar el diseño.

## Editar las metas de los indicadores

En `src/data/project.ts`, cada indicador tiene un campo `target`. Para fijar una meta, cambia
`target: null` por, por ejemplo, `target: { value: '60', detail: 'bolsas sembradas' }`. Mientras
sea `null`, el sitio muestra "Por definir con el grupo".

## Agregar una sección nueva

1. Crea la página en `src/pages/<Nombre>/<Nombre>Page.tsx` (y, si tiene contenido, su archivo en
   `src/data/`).
2. Agrega un objeto al arreglo `appRoutes` en `src/config/routes.tsx`:

   ```ts
   { id: 'gallery', path: '/galeria', label: 'Galería', element: <GalleryPage />, showInNav: true },
   ```

La barra de navegación y el enrutador se actualizan solos; no hay que modificar `Navbar` ni
`App.tsx`.

## Colores, tipografía y espaciados

Todos los valores de diseño están en `src/styles/tokens.css`. Para cambiar un color o un espaciado
en todo el sitio, edita solo ese archivo. Los componentes no deben usar valores escritos a mano.

Por contraste (WCAG AA), el **verde hoja** y el **ocre** se usan solo como decoración; los textos
usan verde bosque, tierra o el color de texto principal.

## Despliegue

- **Netlify**: comando `npm run build`, carpeta `dist`. El archivo `public/_redirects` permite
  recargar cualquier ruta.
- **Vercel**: igual que Netlify; `vercel.json` configura la redirección a `index.html`.
- **GitHub Pages (automático)**: el workflow `.github/workflows/deploy.yml` se ejecuta en cada
  push a `main`: corre lint, formato, tipos y pruebas, construye con la ruta base del repositorio
  (`/uni-setas/`) y publica el sitio en `https://giancho2000.github.io/uni-setas/`. Requiere una
  sola vez: **Settings → Pages → Build and deployment → Source: GitHub Actions**. También puede
  lanzarse a mano desde la pestaña **Actions → Deploy to GitHub Pages → Run workflow**.
- **GitHub Pages (local)**: `npm run build:gh-pages` genera `dist/` con la misma ruta base y un
  `404.html` para que funcionen los enlaces directos.

## Documentación del proyecto

La especificación, el plan técnico y las tareas están en `specs/001-informative-site/` (sitio base)
y `specs/002-home-redesign/` (rediseño del Inicio), y los
principios del proyecto en `.specify/memory/constitution.md`.
