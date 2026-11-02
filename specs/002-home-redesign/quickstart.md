# Quickstart: validar el rediseño del Inicio

## Requisitos

- Node.js 20+ y dependencias instaladas (`npm install`). Sin variables de entorno ni red en tiempo
  de ejecución (las fuentes de Google ya existían).

## 1. Puertas de calidad

```bash
npm run lint && npm run format:check && npm run typecheck && npm run test && npm run build
```

Esperado: todo en verde. Pruebas nuevas mínimas (ver [contracts/ui-components.md](./contracts/ui-components.md)):

- `Slider.test.tsx`: 5 diapositivas con placeholder cuando `image` es `null`; avanza con la flecha
  siguiente y con la tecla →; se pausa con el botón y con hover (no avanza tras 6 s); no avanza con
  reduced motion; `aria-live` es `polite` en pausa.
- `SupportImage.test.tsx`: archivo inexistente → placeholder + "Imagen de apoyo próximamente".
- `HomePage.test.tsx`: renderiza la región del carrusel y exactamente 3 secciones con título.
- `getImage.test.ts` y la prueba existente de `getActivityImage`.
- Pruebas de datos de `slides` y `project` ([data-model.md](./data-model.md#validación-pruebas-de-datos-en-srcdata__tests__)).
- Las pruebas existentes de Navbar, Modal, ActivityCard y Tabs pasan sin cambios de contenido.

## 2. Revisión manual (`npm run dev`)

| # | Escenario | Resultado esperado |
| --- | --- | --- |
| 1 | Abrir `/` sin fotos | Slider a todo el ancho con 5 diapositivas en fondo placeholder, h1 y objetivo corto legibles. |
| 2 | Esperar 6 s | Fundido a la diapositiva 2; tras la 5 vuelve a la 1. |
| 3 | Pasar el mouse / tabular dentro del slider | No avanza; al salir reanuda. |
| 4 | Pulsar Pausar, salir con el mouse | Sigue en pausa; el botón dice "Reproducir". |
| 5 | Tab hasta los controles, usar ← → y Enter en un indicador | Cambia de diapositiva; foco visible en ocre. |
| 6 | DevTools → emular `prefers-reduced-motion: reduce` y recargar | Slider en pausa, sin fundido; secciones sin animación de aparición. |
| 7 | Modo dispositivo (touch), deslizar horizontal y vertical | Horizontal cambia de diapositiva; vertical hace scroll. |
| 8 | Lector de pantalla (NVDA/VoiceOver), usar "siguiente" | Anuncia "Diapositiva 2 de 5: <título>"; en reproducción no anuncia. |
| 9 | Bajar por el Inicio | 3 secciones: El proyecto (crema), Qué queremos lograr (verde claro), Con qué lo haremos (crema), cada una con su imagen de apoyo placeholder y pie. |
| 10 | Revisar contenido | Por qué, quién, 4 ideas, 4 pilares, insignia, 6 objetivos numerados, 8 indicadores con meta o "Por definir con el grupo", 5 categorías de recursos, 2 CTA funcionales. |
| 11 | Anchos 320 / 375 / 768 / 1024 / 1440 px | Sin scroll horizontal; en móvil todo en una columna y texto del slider legible. |
| 12 | Problemáticas y Actividades | Mismo contenido y comportamiento; navbar translúcida, footer y tarjetas con el nuevo estilo. |
| 13 | Copiar `slide-1.webp` a `src/assets/images/slider/` y poner `image: 'slide-1.webp'` | La foto aparece sin saltos de diseño; texto con contraste suficiente. |
| 14 | Nombre de archivo erróneo | Placeholder + advertencia en consola (solo DEV). |

## 3. Auditorías sobre el build

```bash
npm run build && npm run preview
```

- Lighthouse (móvil) en `/`: Accesibilidad ≥ 95, Rendimiento ≥ 90, CLS < 0.1, LCP < 2.5 s.
- axe DevTools: 0 errores críticos o serios; contraste del texto sobre el overlay ≥ 4.5:1
  (valores esperados en [research.md](./research.md#r2-tokens-ampliados-y-contraste-verificado)).
- Registrar resultados en `checklists/validation.md`.
