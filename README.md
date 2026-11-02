# Huerta comunitaria de setas orellanas

Sitio web informativo del proyecto de responsabilidad social universitaria (UNIMINUTO)
**Huerta comunitaria de setas orellanas (_Pleurotus ostreatus_)**. Presenta el proyecto, las
problemáticas que lo originan y las actividades del plan de trabajo.

Es una aplicación de una sola página (SPA) estática: no tiene backend, base de datos ni inicio de
sesión. Todo el contenido vive en archivos dentro de `src/data/`.

> ⚠️ Los textos de `src/data/project.ts`, `src/data/problems.ts` y `src/data/activities.ts` son un
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
| Nombre, objetivo y pilares del Inicio                              | `src/data/project.ts`    |
| Problemáticas (análisis local, nacional, global, causas y efectos) | `src/data/problems.ts`   |
| Actividades del plan de trabajo                                    | `src/data/activities.ts` |
| Textos de la interfaz (menú, botones, etiquetas)                   | `src/data/ui.ts`         |

No es necesario tocar los componentes: basta con editar los datos. TypeScript avisará si falta un
campo obligatorio.

## Agregar la foto de una actividad

1. Copia la imagen (por ejemplo `capacitacion.jpg`) en `src/assets/images/activities/`.
2. En `src/data/activities.ts`, busca la actividad y cambia `image: null` por
   `image: 'capacitacion.jpg'`.
3. Revisa que `imageAlt` describa bien la foto.

Si el nombre no coincide con ningún archivo, la tarjeta muestra la imagen neutra por defecto y, en
modo desarrollo, la consola muestra una advertencia. Formatos admitidos: png, jpg, jpeg, webp, avif
y svg.

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

La especificación, el plan técnico y las tareas están en `specs/001-informative-site/`, y los
principios del proyecto en `.specify/memory/constitution.md`.
