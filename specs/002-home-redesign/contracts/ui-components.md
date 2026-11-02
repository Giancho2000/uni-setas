# UI Contracts: Rediseño del Inicio

Contratos públicos (props, DOM accesible y comportamiento) de los componentes y hooks nuevos o
modificados. Los textos de interfaz salen de `src/data/ui.ts`; ningún componente contiene contenido
editorial (principio II). Todos los valores visuales salen de `tokens.css` (principio V).

## Slider — `src/components/Slider/Slider.tsx`

```ts
interface SliderProps {
  slides: Slide[];
  label: string;            // aria-label de la región, p. ej. ui.slider.label
  intervalMs?: number;      // por defecto 6000
  overlay?: React.ReactNode; // contenido fijo sobre las diapositivas (h1 + objetivo corto)
}
```

DOM y accesibilidad:

- Raíz `<section role="region" aria-roledescription="carrusel" aria-label={label}>`.
- Contenedor de diapositivas con `aria-live` = `"off"` mientras reproduce, `"polite"` si no.
- Cada diapositiva: `role="group" aria-roledescription="diapositiva"
  aria-label="{n} de {total}: {title}"`; inactivas con `aria-hidden="true"` e `inert`.
- Controles (solo si `slides.length > 1`), en este orden de foco:
  1. Botón Pausar/Reproducir: `aria-label` = `ui.slider.pause` | `ui.slider.play`, ícono `Pause`/`Play`.
  2. Botones anterior/siguiente: `aria-label` = `ui.slider.previous` / `ui.slider.next`.
  3. Indicadores: un `<button>` por diapositiva, `aria-label="Ir a la diapositiva {n}: {title}"`,
     `aria-current="true"` en el activo.
- Objetivos táctiles ≥ 44×44 px; anillo de foco `--color-focus-on-dark`.

Comportamiento:

| Entrada | Resultado |
| --- | --- |
| Montaje sin reduced motion | Reproduce; avanza cada `intervalMs`; tras la última vuelve a la primera. |
| Montaje con reduced motion | En pausa (botón muestra "Reproducir"); sin fundido. |
| Botón Pausar | Detiene; el botón pasa a "Reproducir". Otro clic reanuda. |
| `mouseenter` / foco dentro | Detiene mientras dure; al salir reanuda solo si no hay pausa explícita. |
| ← / → con foco en la región | Anterior / siguiente (cíclico). |
| Flechas o indicador | Va a esa diapositiva y reinicia el intervalo. |
| Swipe horizontal (≥ 48 px, dominante) | Anterior / siguiente; gestos verticales hacen scroll. |
| Pestaña oculta | No avanza hasta volver. |
| `image` null o error de carga | Fondo placeholder del mismo tamaño; `alt=""` en el placeholder. |

Carga: diapositiva 1 `loading="eager"` + `fetchpriority="high"`; resto `loading="lazy"` y
montaje diferido (activa, siguiente o visitada). `width=1920 height=800`.

## Section — `src/components/Section/Section.tsx`

```ts
interface SectionProps {
  id: HomeSectionId;               // también ancla (#proyecto, #logros, #recursos)
  title: string;
  eyebrow?: string;
  intro?: string;
  tone?: 'cream' | 'mint';         // fondo alterno; por defecto 'cream'
  image?: SupportImageRef;         // se muestra junto al contenido
  imagePosition?: 'start' | 'end'; // por defecto 'end'
  children: React.ReactNode;
}
```

- Renderiza `<section id={id} aria-labelledby="{id}-title">` con `SectionTitle` (`h2`), un bloque
  de contenido y, si hay `image`, un `SupportImage`.
- Escritorio (≥ 64rem): dos columnas (contenido ~7/12, imagen ~5/12, imagen pegajosa opcional).
  Móvil: una columna, imagen después del encabezado.
- Aparece con `useReveal` (sin animación con reduced motion).

## SupportImage — `src/components/SupportImage/SupportImage.tsx`

```ts
interface SupportImageProps {
  name: string | null;   // archivo en src/assets/images/home/
  alt: string;
  ratio?: string;        // por defecto '3 / 2'
}
```

- `<figure>` con marco de proporción fija (`aspect-ratio: ratio`), `img` con `width=1200
  height=800`, `loading="lazy"`, `object-fit: cover`, radio `--radius-xl`.
- Si `getImage('home', name).isPlaceholder` o la imagen falla: muestra el placeholder con
  `alt=""` y un `<figcaption>` discreto con `ui.home.supportImagePending` ("Imagen de apoyo
  próximamente"). Con foto real no hay pie.

## IndicatorCard — `src/components/IndicatorCard/IndicatorCard.tsx`

```ts
interface IndicatorCardProps { indicator: SuccessIndicator }
```

- `<article>` con: etiqueta de criterio (chip ocre suave, texto tinta), `h3` con `label`, meta en
  tipografía grande (`--fs-display`, Fraunces, `font-variant-numeric: tabular-nums`) más `detail`,
  y `description`. Sin meta: muestra `ui.home.targetPending` en tamaño menor.
- La meta no depende solo del color (texto explícito).

## ObjectiveList — `src/components/ObjectiveList/ObjectiveList.tsx`

```ts
interface ObjectiveListProps { objectives: string[]; label: string }
```

- `<ol aria-label={label}>` (numeración semántica); el número visible es decorativo
  (`aria-hidden`) en un círculo con `--color-ochre-ink` sobre `--color-ochre-soft`.

## ResourceGroup — `src/components/ResourceGroup/ResourceGroup.tsx`

```ts
interface ResourceGroupProps { group: ResourceGroup }
```

- `<article>` con ícono decorativo (`aria-hidden`), `h3` con `category` y `<ul>` de `items`.

## ObjectiveIdeas (dentro de Home) y PillarCard (actualizado)

- Las 4 ideas del objetivo se muestran como `<dl>`: `<dt>` con ícono + etiqueta y `<dd>` con el
  texto.
- `PillarCard` conserva sus props (`{ pillar }`); solo cambia su estilo (radio, sombra suave,
  hover con elevación de 2 px, ícono en círculo `--color-mint`). Su encabezado pasa a `h3` dentro
  de la sección "El proyecto".

## AppIcon — `src/components/AppIcon/AppIcon.tsx`

```ts
interface AppIconProps { name: IconKey; className?: string }
```

- Mapa cerrado `IconKey → componente lucide`; siempre `aria-hidden="true"`. `PillarIcon` delega en
  él.

## Hooks

- `useReducedMotion(): boolean` — `src/hooks/useReducedMotion.ts`. Escucha cambios del media query;
  `false` si `matchMedia` no existe.
- `useReveal<T extends Element>(): { ref: RefObject<T>; isRevealed: boolean }` —
  `src/hooks/useReveal.ts`. `true` inmediato sin `IntersectionObserver` o con reduced motion; se
  desconecta tras revelar.

## Utilidad

- `getImage(folder: ImageFolder, name: string | null): ResolvedImage` — `src/utils/getImage.ts`.
- `getActivityImage(name)` — sin cambios de firma ni comportamiento (envoltorio).

## Componentes existentes que solo cambian de estilo

`Layout`, `Navbar` (translúcida, misma estructura y comportamiento; su prueba actual debe seguir
pasando), `Footer`, `SectionTitle` (acepta `eyebrow` opcional), `ActivityCard`, `ActivityModal`,
`Modal`, `Tabs`, `ProblemTabs`, `WeekBadge`, `ImageWithFallback`. Ninguno cambia su contenido ni
sus props existentes.

## HomePage — `src/pages/Home/HomePage.tsx`

Estructura obligatoria dentro de `<main>`:

1. `Slider` con `overlay` = `<h1>{project.name}</h1>` + `<p>{project.shortObjective}</p>`.
2. `Section id="proyecto" tone="cream"`: Por qué (párrafos + 2 problemáticas de origen + insignia
   de línea de trabajo), Quién, Objetivo general (resumen + 4 ideas), 4 `PillarCard`.
3. `Section id="logros" tone="mint"`: `ObjectiveList` + grilla de 8 `IndicatorCard`
   (1 → 2 → 4 columnas).
4. `Section id="recursos" tone="cream"`: grilla de 5 `ResourceGroup` (1 → 2 → 3 columnas) + dos
   enlaces CTA a `getRoutePath('problems')` y `getRoutePath('activities')` (primario y secundario).

Exactamente 3 elementos `<section>` con `aria-labelledby` además de la región del slider.
