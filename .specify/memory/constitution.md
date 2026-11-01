<!--
Sync Impact Report
==================
Version change: (template sin completar) → 1.0.0
Bump rationale: ratificación inicial; se reemplazan todos los placeholders de la plantilla.

Modified principles (template placeholder → new title):
  - [PRINCIPLE_1_NAME] → I. Solo frontend (SPA estática)
  - [PRINCIPLE_2_NAME] → II. Contenido separado de la presentación
  - [PRINCIPLE_3_NAME] → III. Crecimiento incremental con configuración central
  - [PRINCIPLE_4_NAME] → IV. Imágenes desacopladas con placeholder
  - [PRINCIPLE_5_NAME] → V. Identidad visual agrícola mediante tokens de diseño

Added sections:
  - VI. Accesibilidad y responsive primero
  - VII. Código simple y legible
  - VIII. Calidad verificable
  - IX. Idioma
  - Restricciones técnicas (antes [SECTION_2_NAME])
  - Flujo de desarrollo y puertas de calidad (antes [SECTION_3_NAME])
  - Gobernanza (contenido definido)

Removed sections: ninguna.

Templates: no se modifican en este comando; los leen la constitución en tiempo de ejecución.
  ⚠ Revisar al ejecutar /speckit-plan que el "Constitution Check" refleje los principios I–IX.

Follow-up TODOs: ninguno.
-->

# Constitución de Huerta de Setas Orellanas

Sitio web informativo que documenta el proyecto de responsabilidad social universitaria
(UNIMINUTO) de cultivo de setas orellanas en un corregimiento rural.

## Principios fundamentales

### I. Solo frontend (SPA estática)

- El sitio DEBE ser una aplicación de una sola página (SPA) estática, desplegable como archivos
  estáticos en cualquier hosting sin servidor de aplicación.
- NO DEBE existir backend, base de datos, API propia ni autenticación de usuarios.
- Todo el contenido DEBE vivir en archivos de datos versionados dentro del repositorio.
- Cualquier funcionalidad que requiera servidor (formularios con envío, comentarios, cuentas,
  analítica propia, CMS) queda fuera de alcance salvo enmienda formal de esta constitución.

**Justificación**: un sitio estático es gratuito o casi gratuito de alojar, no requiere
mantenimiento operativo y puede ser sostenido por estudiantes y la comunidad a largo plazo.

### II. Contenido separado de la presentación

- Textos, actividades, problemáticas y cualquier otro contenido editorial DEBEN definirse en
  archivos de datos tipados con TypeScript dentro de `src/data`.
- Los componentes NO DEBEN contener contenido editorial incrustado; solo pueden contener textos
  de interfaz genéricos, y estos también DEBEN centralizarse cuando se reutilicen.
- Agregar una actividad, problemática o sección nueva DEBE requerir únicamente añadir o editar
  datos, sin modificar la lógica de ningún componente.
- Los tipos de los datos DEBEN declararse explícitamente para que el compilador detecte
  contenido incompleto o mal formado.

**Justificación**: el contenido cambia con el avance del proyecto y puede ser editado por
personas sin experiencia en React; separarlo reduce errores y acelera las actualizaciones.

### III. Crecimiento incremental con configuración central

- La navegación (menú) y las rutas DEBEN derivarse de una única configuración central.
- Agregar una página nueva DEBE consistir en agregar un elemento a esa configuración y su
  componente o datos de página; NO DEBE requerir editar la barra de navegación ni el enrutador
  por separado.
- No DEBEN existir rutas o enlaces de menú declarados fuera de esa configuración.

**Justificación**: el sitio crecerá por etapas; una fuente única evita enlaces rotos y menús
desincronizados.

### IV. Imágenes desacopladas con placeholder

- Todas las imágenes del sitio DEBEN almacenarse en `src/assets/images` y referenciarse desde
  los archivos de datos, no desde los componentes.
- Toda tarjeta o bloque que muestre una imagen DEBE mostrar un placeholder por defecto cuando
  la imagen no esté definida o no cargue, sin alterar dimensiones ni romper el diseño.
- Toda imagen con contenido informativo DEBE tener texto alternativo (`alt`) definido en los
  datos; las decorativas DEBEN usar `alt=""`.

**Justificación**: las fotos del proyecto llegarán de forma progresiva; el sitio debe verse
completo y estable mientras tanto.

### V. Identidad visual agrícola mediante tokens de diseño

- La paleta (verdes, tierras y crema), la tipografía, los espaciados, radios y sombras DEBEN
  definirse como tokens de diseño (variables CSS) en un único archivo.
- Los componentes NO DEBEN contener valores de color ni de espaciado escritos a mano; DEBEN
  consumir exclusivamente los tokens.
- Cambiar un color o espaciado global DEBE poder hacerse editando solo el archivo de tokens.

**Justificación**: garantiza una identidad visual coherente con el carácter agrícola del
proyecto y facilita ajustes de marca o contraste sin recorrer todo el código.

### VI. Accesibilidad y responsive primero

- El diseño DEBE ser mobile-first: los estilos base apuntan a pantallas pequeñas y se amplían
  con media queries progresivas.
- El marcado DEBE usar HTML semántico (`header`, `nav`, `main`, `section`, `article`,
  `footer`, encabezados en orden jerárquico).
- Los pares de color texto/fondo DEBEN cumplir al menos el contraste WCAG 2.1 AA.
- Toda funcionalidad DEBE ser operable completamente con teclado, con foco visible.
- Los modales DEBEN atrapar el foco mientras están abiertos, devolverlo al elemento que los
  abrió al cerrarse, cerrarse con la tecla Escape y usar `role="dialog"`, `aria-modal="true"`
  y un título asociado mediante `aria-labelledby`.
- Los controles interactivos (por ejemplo, el menú móvil) DEBEN exponer su estado con atributos
  ARIA correctos (`aria-expanded`, `aria-controls`, `aria-current`, etc.).

**Justificación**: buena parte de la comunidad accede desde celulares y con conectividad
limitada; la accesibilidad es parte del compromiso social del proyecto.

### VII. Código simple y legible

- El código DEBE escribirse en React con TypeScript en modo estricto (`strict: true`).
- Los componentes DEBEN ser pequeños, con una sola responsabilidad, y reutilizables.
- NO DEBEN agregarse dependencias que no sean necesarias. Toda dependencia nueva DEBE
  justificarse por escrito en el plan de la funcionalidad que la introduce (qué resuelve, por
  qué no basta con la plataforma o el código existente, y su impacto en el tamaño del bundle).
- Se DEBE evitar `any`; su uso excepcional DEBE documentarse en el código.

**Justificación**: el proyecto será mantenido por distintos equipos de estudiantes; el código
simple reduce la curva de entrada.

### VIII. Calidad verificable

- Lint y formateo automáticos son obligatorios; el código DEBE pasar ambos sin errores antes de
  integrarse.
- Los componentes interactivos (modal, barra de navegación, tarjetas y cualquier otro con
  estado o eventos) DEBEN tener pruebas con Vitest y Testing Library que cubran su
  comportamiento y sus requisitos de accesibilidad (foco, Escape, atributos ARIA).
- La verificación de tipos de TypeScript DEBE pasar sin errores.
- Una funcionalidad no se considera terminada si lint, formateo, tipos o pruebas fallan.

**Justificación**: comprobaciones automáticas permiten que cambios de distintas personas no
degraden el sitio.

### IX. Idioma

- Todo el contenido visible para el usuario y los textos de interfaz (incluidos `alt`,
  `aria-label` y mensajes) DEBEN estar en español de Colombia.
- El código, los identificadores (variables, funciones, componentes, archivos), los comentarios
  técnicos y los mensajes de commit DEBEN estar en inglés.
- El atributo `lang` del documento DEBE ser `es-CO`.

**Justificación**: el público es la comunidad colombiana; el inglés en el código sigue las
convenciones del ecosistema y facilita el uso de herramientas.

## Restricciones técnicas

- Stack: React + TypeScript (modo estricto); pruebas con Vitest y Testing Library.
- Salida de compilación: archivos estáticos (HTML, CSS, JS, imágenes) servibles desde cualquier
  hosting estático.
- Estructura obligatoria:
  - `src/data`: contenido tipado (textos, actividades, problemáticas, configuración de rutas).
  - `src/assets/images`: todas las imágenes.
  - Un único archivo de tokens de diseño (variables CSS).
- Sin llamadas a servicios propios en tiempo de ejecución; recursos externos (fuentes, mapas
  embebidos) solo si no comprometen los principios I y VI y están justificados en el plan.

## Flujo de desarrollo y puertas de calidad

- Cada funcionalidad sigue el flujo Spec Kit: especificación → plan → tareas → implementación.
- Todo plan DEBE incluir una verificación explícita de cumplimiento de los principios I–IX
  ("Constitution Check") y justificar por escrito cualquier desviación.
- Antes de integrar cambios DEBEN pasar: lint, formateo, verificación de tipos y pruebas.
- Las revisiones de código DEBEN comprobar: ausencia de contenido incrustado en componentes,
  ausencia de colores/espaciados literales, rutas declaradas solo en la configuración central,
  placeholders de imagen y requisitos de accesibilidad.

## Gobernanza

- Esta constitución prevalece sobre cualquier otra práctica o preferencia del proyecto.
- Toda enmienda DEBE justificarse por escrito en el plan correspondiente (`plan.md` de la
  funcionalidad que la motiva), indicando el principio afectado, el motivo y el impacto.
- Versionado semántico de la constitución:
  - MAJOR: eliminación o redefinición incompatible de un principio o de la gobernanza.
  - MINOR: nuevo principio o sección, o ampliación material de una guía existente.
  - PATCH: aclaraciones, redacción o correcciones sin cambio semántico.
- Cada enmienda DEBE actualizar la versión y la fecha de última enmienda.
- El cumplimiento se revisa en cada plan (Constitution Check) y en cada revisión de código.

**Version**: 1.0.0 | **Ratified**: 2026-11-01 | **Last Amended**: 2026-11-01
