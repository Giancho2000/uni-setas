# Validation Log: Sitio informativo de la Huerta de setas orellanas

**Date**: 2026-11-01 | **Build**: `npm run build` + `vite preview` (Chrome, scripted DOM checks)

Las capturas de pantalla del navegador no estuvieron disponibles durante la sesión, así que los
escenarios se verificaron con scripts ejecutados sobre el DOM del build de producción. Falta una
revisión visual humana.

## Puertas automáticas

| Comando | Resultado |
|---------|-----------|
| `npm run lint` | ✅ 0 errores, 0 advertencias |
| `npm run format:check` | ✅ |
| `npm run typecheck` | ✅ |
| `npm run test` | ✅ 9 archivos, 42 pruebas |
| `npm run build` | ✅ JS 81.93 KB gzip (< 100 KB), CSS 3.66 KB gzip |
| `npm run build:gh-pages` | ✅ rutas con `/uni-seta/` y `dist/404.html` generado |

## Escenarios de quickstart.md

| # | Resultado | Evidencia |
|---|-----------|-----------|
| 1 | ✅ | Inicio: h1 con el nombre, 4 pilares, CTA a `/problematicas` y `/actividades` |
| 2 | ✅ | `aria-current="page"` solo en el enlace de la ruta actual |
| 3 | ✅ | Carga directa de `/actividades` y `/problematicas` en `vite preview` |
| 4 | ✅ | `/no-existe` → "Página no encontrada", navbar con 3 enlaces, enlace a `/` |
| 5 | ✅ (parcial) | A 320 px se muestra el botón de menú; apertura/cierre/Escape cubiertos por pruebas |
| 6 | ✅ | 4 tarjetas en orden de semana, las 4 con placeholder cargado (altura 162 px a 1396 px) |
| 7 | ✅ | 12/12 cierres (botón, Escape, backdrop): 6 campos, scroll bloqueado, `#root` inerte, foco devuelto a la tarjeta |
| 8 | ✅ | Trampa de foco cubierta por pruebas; foco dentro del diálogo al abrir en el navegador |
| 9 | ✅ | 10/10 apartados con texto; flechas cambian pestaña; Causas/Efectos con sus 4 subtítulos; ancho de lectura 714 px (≈70ch) |
| 10 | ✅ (parcial) | Teclado verificado en pestañas, menú y modal; falta un recorrido completo manual con Tab |
| 11 | ⏳ Pendiente | Falta auditoría Lighthouse/axe. Revisión propia de contraste: 0 textos < 4.5:1 en Inicio (mínimo 4.59) |
| 12 | ✅ | Sin scroll horizontal a 320/768/1280 px en las 3 páginas; grillas de 1/2/4 columnas |
| 13 | ⏳ Pendiente | Falta medir con Lighthouse móvil; Fraunces y Nunito cargan con `display=swap` |

## Pendiente

- Revisión visual humana en celular, tableta y escritorio.
- Auditoría Lighthouse/axe (escenarios 11 y 13).
- Revisión del contenido borrador (`// DRAFT`) por el equipo.
