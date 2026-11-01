# Quickstart & Validation: Sitio informativo de la Huerta de setas orellanas

**Feature**: `001-informative-site`

## Prerrequisitos

- Node.js 20 LTS o superior y npm.
- Navegador actualizado (Chrome, Firefox, Safari o Edge).

## Comandos

```bash
npm install
npm run dev          # servidor de desarrollo
npm run lint         # ESLint (incluye reglas jsx-a11y)
npm run format:check # Prettier en modo verificación
npm run typecheck    # tsc sin emitir
npm run test         # Vitest (una pasada)
npm run build        # genera dist/
npm run preview      # sirve dist/ para validar el build
```

**Puerta de calidad**: `lint`, `format:check`, `typecheck` y `test` terminan sin errores
(principio VIII).

## Escenarios de validación manual

Ejecutar sobre `npm run preview`. Cada escenario remite a la spec.

| # | Escenario | Resultado esperado | Cubre |
|---|-----------|--------------------|-------|
| 1 | Abrir `/`, desplazarse hasta el final | Navbar visible siempre; nombre, objetivo, 4 pilares y 2 botones de acción | US1, FR-001, FR-008–010 |
| 2 | Clic en cada enlace de la navbar | Llega en un clic; el enlace actual queda resaltado | SC-001, FR-003 |
| 3 | Recargar en `/actividades` y `/problematicas`; usar atrás/adelante | La página carga y se resalta la sección correcta | FR-006 |
| 4 | Abrir `/no-existe` | Página "no encontrada" con navbar y enlace al Inicio | FR-007 |
| 5 | Ancho 320 px: abrir menú, elegir enlace; reabrir y pulsar Escape | Menú se abre/cierra; no hay scroll horizontal | FR-004, FR-026 |
| 6 | `/actividades`: verificar orden Semana 1–4 y que todas muestran placeholder | Tarjetas completas, sin imágenes rotas | US2, SC-004 |
| 7 | Para cada tarjeta: abrir y cerrar con botón, Escape y clic fuera | 12/12 cierres correctos; los 6 campos visibles; foco vuelve a la tarjeta | SC-002, FR-017–019 |
| 8 | Con la modal abierta, Tab repetido | El foco no sale de la modal; el fondo no se desplaza | FR-019 |
| 9 | `/problematicas`: recorrer 2 problemáticas × 5 apartados con flechas del teclado | 10/10 apartados con texto; Causas y Efectos con subtítulos | US3, SC-003, FR-013 |
| 10 | Repetir 1–9 solo con teclado | Todo es operable; foco siempre visible | SC-006 |
| 11 | Auditoría de accesibilidad (Lighthouse o axe DevTools) en las 3 páginas y la modal | 0 errores de contraste, nombres o roles | SC-007 |
| 12 | Anchos 320, 768 y 1280 px | Grilla de actividades 1 / 2 / 4 columnas; sin scroll horizontal | SC-005 |
| 13 | Lighthouse móvil (throttling 4G) en `/` | Contenido principal visible < 3 s | SC-009 |

## Escenario: conectar una imagen real (SC-008)

1. Copiar el archivo (p. ej., `capacitacion.jpg`) a `src/assets/images/activities/`.
2. En `src/data/activities.ts`, cambiar `image: null` por `image: 'capacitacion.jpg'` en la
   actividad correspondiente y revisar su `imageAlt`.
3. `npm run dev`: la tarjeta muestra la foto. Si el nombre está mal escrito, se ve el placeholder y
   la consola muestra una advertencia.

## Despliegue

- **Netlify / Vercel**: comando `npm run build`, directorio `dist`. Los archivos `public/_redirects`
  y `vercel.json` resuelven la recarga de rutas.
- **GitHub Pages**: `npm run build:gh-pages` (define `base` con el nombre del repositorio y copia
  `index.html` a `404.html`).
