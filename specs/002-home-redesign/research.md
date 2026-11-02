# Research: Rediseño y ampliación del Inicio

**Feature**: `002-home-redesign` · **Date**: 2026-11-02 · **Spec**: [spec.md](./spec.md)

No quedan `NEEDS CLARIFICATION` en el contexto técnico; las decisiones siguientes resuelven los
puntos abiertos del plan y documentan cómo se aplicaron las recomendaciones de la skill
`ui-ux-pro-max`.

## R1. Dirección visual (consulta a ui-ux-pro-max)

- **Decision**: estilo **Organic Biophilic** con diales *variance 4 · motion 3 · density 3*
  (equilibrado, movimiento sutil, espacioso). Se toman de la skill: radios de 16–24 px, sombras
  naturales de baja opacidad, mucho espacio, aparición sutil al hacer scroll (opacidad + 12 px de
  desplazamiento), patrón de página "Feature-Rich Showcase" (hero → tarjetas → beneficios → CTA),
  breakpoints de referencia 375/768/1024/1440 y la lista previa a la entrega (íconos SVG, cursor
  pointer, hover 150–300 ms, contraste 4.5:1, foco visible, reduced motion).
- **Rationale**: es el estilo que la skill asocia a sostenibilidad, productos orgánicos y bienestar;
  coincide con la dirección pedida (cálido, orgánico, sin recargar).
- **Descartado de la recomendación**: la paleta (#15803D, #22C55E…) y la pareja Lora/Raleway que
  propuso la skill. La paleta y las fuentes del sitio son restricciones del usuario y se conservan
  (Fraunces + Nunito; bosque, hoja, tierra, crema, ocre, tinta). Tampoco se usa GSAP: la animación
  se hace con CSS + IntersectionObserver (sin dependencias, principio VII).
- **Glassmorphism para la navbar**: se adopta solo la parte compatible: fondo crema translúcido
  (~88 %), `backdrop-filter: blur(12px) saturate(140%)` y borde inferior sutil. Con
  `@supports not (backdrop-filter: …)` el fondo pasa a crema opaco.

## R2. Tokens ampliados y contraste verificado

Contrastes calculados (WCAG 2.x) con los colores reales:

| Par (texto / fondo) | Ratio | Uso |
| --- | --- | --- |
| Crema sobre overlay `#16301F` al 75 % encima de una foto blanca (peor caso) | 5.64 | Texto del slider |
| Crema sobre overlay al 75 % encima de crema (placeholder) | 5.98 | Texto del slider sin foto |
| Crema sobre overlay al 60 % encima de blanco | 3.55 | ✗ insuficiente: el texto nunca se coloca en esa zona |
| Tinta / bosque / tierra sobre superficie verde clara `#EEF3E6` | 12.60 / 6.77 / 5.15 | Secciones alternas |
| Bosque / tierra / tinta sobre blanco | 7.64 / 5.82 / 14.23 | Tarjetas |
| Tinta sobre ocre suave `#F1E3BD` | 11.15 | Insignia de línea de trabajo |
| Ocre oscuro `#7A5C16` sobre crema | 5.53 | Eyebrows y números de objetivos (texto ocre) |
| Ocre `#C9A24B` sobre overlay | 5.93 | Anillo de foco y detalles dentro del slider |
| Crema sobre bosque | 6.78 | Botones primarios |

- **Decision**: se agregan a `tokens.css`: `--color-mint` (#EEF3E6, superficie verde muy clara),
  `--color-surface-raised` (blanco), `--color-border-soft`, `--color-ochre-ink` (#7A5C16),
  `--color-overlay` (#16301F) con `--overlay-strong: 0.8` y `--overlay-weak: 0`, el gradiente
  `--gradient-slide`, `--color-focus-on-dark` (ocre), `--color-navbar-glass`, radios
  `--radius-xl: 1.5rem`, `--radius-card: 1.25rem`, sombras `--shadow-soft`/`--shadow-hover`,
  escala tipográfica fluida (`--fs-4xl`, `--fs-display` con `clamp()`), duraciones
  `--duration-fast: 200ms`, `--duration-base: 300ms`, `--ease-out`, `--reveal-distance: 12px`,
  `--slider-ratio: 12 / 5`, `--slider-min-h: 26.25rem` (420 px), `--support-ratio: 3 / 2` y
  `--section-space` fluido.
- **Regla del overlay**: el texto del slider vive en el tercio inferior, donde el gradiente alcanza
  ≥ 75 % de opacidad; en móvil el overlay es uniforme al 78 % (todo el texto ocupa casi la altura).
  Se añade `text-shadow` suave como respaldo, no como sustituto del contraste.
- **Ocre**: sigue siendo decorativo sobre fondos claros (2.13); para texto ocre se usa
  `--color-ochre-ink`.

## R3. Slider propio: estructura y accesibilidad

- **Decision**: patrón WAI-ARIA APG *Carousel* (con controles de rotación, flechas e indicadores):
  - `<section role="region" aria-roledescription="carrusel" aria-label="Galería del proyecto">`.
  - Cada diapositiva: `role="group" aria-roledescription="diapositiva"
    aria-label="2 de 5: <título>"`; las inactivas llevan `aria-hidden="true"` e `inert`.
  - Orden de foco: botón Pausar/Reproducir primero (exigido por APG), luego flechas e indicadores.
  - Indicadores como botones con `aria-label="Ir a la diapositiva 3: <título>"` y
    `aria-current="true"` en el activo (no `role="tablist"`, para que el teclado sea simple).
  - Contenedor de diapositivas con `aria-live="off"` mientras rota y `aria-live="polite"` cuando
    está detenido (pausa, hover, foco o reduced motion). Así solo se anuncian cambios manuales.
  - Flechas ←/→ funcionan con el foco en cualquier control del slider (`onKeyDown` en la región).
- **Encabezados**: el nombre del proyecto es el `<h1>` de la página (fijo sobre el slider, fuera
  de las diapositivas); los títulos de diapositiva son `<p>` estilizados para no ensuciar el
  esquema de encabezados con cinco h2.
- **Alternatives considered**: librerías (Swiper, Embla) → rechazadas por el principio VII y porque
  el comportamiento requerido es pequeño; `role="tablist"` en los indicadores → APG lo permite pero
  obliga a roving tabindex y complica el modelo para usuarios de teclado.

## R4. Reproducción automática, pausa y reduced motion

- **Decision**: estado derivado
  `isPlaying = !userPaused && !hovered && !focusWithin && !documentHidden && slides.length > 1`.
  - `userPaused` inicia en `true` si `prefers-reduced-motion: reduce`; el visitante puede pulsar
    "Reproducir" si lo desea (es una acción explícita, no movimiento automático).
  - Un `setTimeout` de 6000 ms se programa solo cuando `isPlaying`, y se reinicia con cada cambio
    de índice: un cambio manual da 6 s completos a la nueva diapositiva.
  - `visibilitychange` detiene el temporizador con la pestaña en segundo plano (no se acumulan
    avances).
  - Hover/foco no cambian `userPaused`: al salir se reanuda solo si el visitante no pausó.
- **Hook `useReducedMotion`**: `matchMedia('(prefers-reduced-motion: reduce)')` con listener de
  cambio; devuelve `false` si `matchMedia` no existe (jsdom, navegadores antiguos).
- **Transición**: fundido por `opacity` (`--duration-base`, 300 ms) con todas las diapositivas
  apiladas en la misma celda de grid; con reduced motion la duración es 0.

## R5. Gesto táctil

- **Decision**: Pointer Events sobre el área de diapositivas. Se registra `pointerdown`
  (solo `pointerType` `touch` o `pen`), se evalúa en `pointerup`: si |dx| ≥ 48 px y |dx| > 1.5·|dy|
  cambia de diapositiva; si no, no hace nada. `touch-action: pan-y` deja el scroll vertical al
  navegador. Sin arrastre visual en vivo (el fundido no lo necesita).
- **Rationale**: umbral y dominancia horizontal evitan cambios accidentales (`drag-threshold`,
  `gesture-conflicts` de la skill); las flechas visibles cubren `gesture-alternative`.

## R6. Carga de imágenes y CLS

- **Decision**:
  - Diapositiva 1: `<img loading="eager" decoding="async" fetchpriority="high">`.
  - Demás diapositivas: `loading="lazy"` **y** montaje diferido: el `<img>` de la diapositiva *i*
    se monta cuando *i* es la activa, la siguiente o ya fue visitada. Motivo: las diapositivas
    apiladas con `opacity: 0` están dentro del viewport y el navegador las cargaría igual pese a
    `loading="lazy"`. Mientras no se monta, se ve el fondo placeholder.
  - `width`/`height` declarados (1920×800 en el slider, 1200×800 en apoyo) y contenedores con
    `aspect-ratio` reservado (`--slider-ratio` con `min-height` en móvil, `--support-ratio`), con
    `object-fit: cover; object-position: center`.
  - `fetchpriority`: React 18.3 no reconoce `fetchPriority` en camelCase y avisa; se pasa en
    minúsculas como atributo (`{...{ fetchpriority: 'high' }}`), que React 18 reenvía al DOM.
- **Imágenes de apoyo**: siempre `loading="lazy"` (están debajo del pliegue).

## R7. Helper `getImage(folder, name)`

- **Decision**: un único `import.meta.glob('../assets/images/{activities,slider,home}/*.{png,jpg,jpeg,webp,avif,svg}', { eager: true, query: '?url', import: 'default' })`
  (Vite exige patrones literales) indexado por `"<carpeta>/<archivo>"`. `getImage(folder, name)`
  reutiliza el resolvedor puro existente (`resolveImage`) y devuelve `{ src, isPlaceholder }`.
  `ImageFolder = 'activities' | 'slider' | 'home'` es un tipo cerrado.
- `getActivityImage(name)` se conserva como envoltorio de `getImage('activities', name)` con la
  misma firma y la misma advertencia en DEV; su prueba actual sigue pasando sin cambios.
- **Placeholder**: se actualiza `src/assets/images/placeholder.svg` a un SVG crema/verde claro con
  un patrón sutil (puntos o esporas en `--color-leaf-soft` a baja opacidad), con
  `preserveAspectRatio="xMidYMid slice"` para servir a las tres proporciones (16:10, 12:5, 3:2).
  Las tarjetas de Actividades heredan el nuevo placeholder; su contenido no cambia.

## R8. Aparición al hacer scroll (`useReveal`)

- **Decision**: hook que recibe un ref y devuelve `isRevealed`. Usa un `IntersectionObserver`
  compartido por instancia (`threshold: 0.15`, `rootMargin: '0px 0px -10% 0px'`), se desconecta
  tras la primera aparición (no re-anima). Si no existe `IntersectionObserver` o hay reduced
  motion, devuelve `true` desde el inicio (el contenido nunca queda oculto). La clase CSS anima
  `opacity` y `transform: translateY(var(--reveal-distance))` en `--duration-base`.
- Solo se anima el bloque de cada sección (1–2 elementos por vista, regla `excessive-motion`);
  las tarjetas internas no se escalonan.

## R9. Contenido y datos

- **Decision**: el contenido entregado en la especificación reemplaza el borrador del Inicio en
  `src/data/project.ts`. Los textos del slider van en `src/data/slides.ts` marcados `// DRAFT`. Los
  textos de interfaz nuevos (Pausar, Reproducir, etiquetas de diapositiva, "Imagen de apoyo
  próximamente", "Por definir con el grupo", títulos y eyebrows de sección) van a `src/data/ui.ts`.
- **Criterio de cada indicador**: la especificación pide alinearlos con cumplimiento,
  participación, resultados, impactos y dificultades. Asignación propuesta (editable):
  Cumplimiento → Cumplimiento; Participación y Satisfacción → Participación; Infraestructura,
  Siembra y Aprendizaje → Resultados; Sostenibilidad e Ingresos → Impactos. "Dificultades" no tiene
  indicador propio en el contenido entregado; queda disponible en el tipo.
- **Íconos**: `lucide-react` (ya instalado) con un mapa cerrado de claves. Verificados en la
  versión instalada: `Users`, `Package`, `MapPin`, `Presentation`, `Camera`, `Sprout`, `Target`,
  `Handshake`, `HeartHandshake`, `Hammer`, `Pause`, `Play`, `ChevronLeft`, `ChevronRight`, `Leaf`,
  `Coins`, `Recycle`, `BadgeCheck`.

## R10. Pruebas en jsdom

- **Decision**: en `src/test/setup.ts` se agrega un stub de `window.matchMedia` controlable
  (por defecto `matches: false`) y se deja `IntersectionObserver` ausente (el hook cae a
  "revelado"). El Slider se prueba con `vi.useFakeTimers()` y `act(() => vi.advanceTimersByTime(6000))`;
  hover con `fireEvent.mouseEnter/mouseLeave`; teclado con `fireEvent.keyDown` (con fake timers,
  `userEvent` requiere `advanceTimers`).

## R11. Ruta del Inicio

- **Decision**: se conserva `src/pages/Home/HomePage.tsx` (convención existente de carpetas por
  página) en lugar de `src/pages/Home.tsx` mencionado en la entrada; no cambia el comportamiento ni
  la configuración de rutas.
