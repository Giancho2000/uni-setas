# Contract: Componentes interactivos

Contratos de comportamiento observables (props y accesibilidad) que las pruebas verifican. Los
tipos de datos están en [../data-model.md](../data-model.md).

## Navbar

- **Props**: `routes?: AppRoute[]` (por defecto `appRoutes`; inyectable en pruebas).
- Renderiza `<header>` con `<nav aria-label="Navegación principal">` y un enlace por ruta con
  `showInNav`, en orden.
- El enlace de la ruta actual tiene `aria-current="page"` y estilo activo distinguible sin depender
  solo del color (subrayado/borde).
- Bajo el breakpoint de tableta muestra un `<button aria-expanded aria-controls="main-menu">` con
  nombre accesible "Abrir menú" / "Cerrar menú". Escape, elegir un enlace o cambiar de ruta cierran el
  menú y, si se cerró con Escape, el foco vuelve al botón.
- Posición `sticky` arriba; el contenido principal no queda oculto bajo ella (scroll-padding con
  token de altura).

**Pruebas obligatorias**: renderiza todos los enlaces de `appRoutes` con `showInNav`; marca el
activo según la URL (MemoryRouter); el botón alterna `aria-expanded`.

## Modal

- **Props**: `isOpen: boolean`, `onClose: () => void`, `title: string`, `children: ReactNode`.
- Cuando `isOpen` es `false` no renderiza nada.
- Abierta: portal en `document.body`; contenedor con `role="dialog"`, `aria-modal="true"`,
  `aria-labelledby` → id del `<h2>` del título; botón "Cerrar" con nombre accesible.
- Al abrir enfoca el botón de cerrar; Tab/Shift+Tab ciclan dentro; el body no se desplaza y la raíz
  de la app es inerte.
- Escape → `onClose`; clic en backdrop (no dentro del panel) → `onClose`; botón → `onClose`.
- Al cerrarse, el foco regresa al elemento que estaba enfocado al abrir y se restaura el scroll.
- Contenido más alto que la ventana se desplaza dentro del panel.

**Pruebas obligatorias**: abre con rol `dialog` y nombre = título; Escape llama `onClose`; clic en
backdrop llama `onClose` y clic dentro no; tras cerrar, el foco vuelve al disparador; el foco no
sale del diálogo con Tab.

## ActivityCard

- **Props**: `activity: Activity`, `onSelect: (activity: Activity) => void`.
- Raíz `<article>`; el área activable es un `<button>` cuyo nombre accesible incluye semana y título.
- Muestra imagen (`getActivityImage(activity.image)`) con `alt` = `activity.imageAlt` cuando hay
  imagen real y `alt=""` cuando es el placeholder; texto "Semana N", título (`<h3>`) y `summary`.
- La imagen reserva su espacio con relación de aspecto fija; si falla la carga cambia al placeholder.

**Pruebas obligatorias**: con `image: null` muestra la URL del placeholder; con un nombre
inexistente también; clic y Enter llaman `onSelect` con la actividad.

## ActivityModal

- **Props**: `activity: Activity | null`, `onClose: () => void`. Usa `Modal`.
- Muestra semana, título y, como lista de definiciones (`<dl>`), Duración, Estrategia, Canales,
  Responsable, Recursos e Indicadores de la comunidad; listas como `<ul>`; vacíos → "Por definir".

## ProblemTabs / Tabs

- **Props (`Tabs`)**: `items: { id: string; label: string; content: ReactNode }[]`,
  `ariaLabel: string`, `selectedId`, `onChange`.
- Patrón WAI-ARIA tabs: `tablist` / `tab` / `tabpanel`, `aria-selected`, `aria-controls`,
  `aria-labelledby`, `tabindex` itinerante; flechas izquierda/derecha, Inicio y Fin; activación
  automática.
- `ProblemTabs` anida dos `Tabs`: problemáticas (nivel 1) y apartados (nivel 2). Cambiar de
  problemática reinicia el apartado a "Local". El panel limita el ancho de lectura a `--measure`.
