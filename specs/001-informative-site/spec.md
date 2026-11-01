# Feature Specification: Sitio informativo de la Huerta comunitaria de setas orellanas

**Feature Branch**: `001-informative-site`

**Created**: 2026-11-01

**Status**: Draft

**Input**: User description: "Sitio web informativo del proyecto 'Huerta comunitaria de setas orellanas
(Pleurotus ostreatus)': navegación fija con Inicio, Problemáticas y Actividades; portada con objetivo y
cuatro pilares; dos problemáticas con cinco apartados cada una; cuatro actividades semanales en tarjetas
con modal de detalle; imágenes con placeholder; estilo agrícola, responsive, accesible y en español."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Entender el proyecto desde el Inicio y navegar (Priority: P1)

Un docente, un miembro de la comunidad o cualquier visitante entra al sitio y, desde la portada,
entiende de qué trata el proyecto: su nombre, el objetivo central y los cuatro pilares
(sostenibilidad, generación de ingresos, aprovechamiento de espacios y aporte orgánico). Una barra de
navegación fija le permite ir a cualquier sección en un clic, y la portada le invita a conocer las
problemáticas y las actividades.

**Why this priority**: es la puerta de entrada al sitio y la estructura sobre la que se apoyan las
demás secciones; por sí sola ya comunica el propósito del proyecto.

**Independent Test**: abrir el sitio, leer la portada completa y usar la barra de navegación y los
llamados a la acción para llegar a cada sección.

**Acceptance Scenarios**:

1. **Given** un visitante en cualquier página, **When** observa la parte superior de la pantalla,
   **Then** ve la barra de navegación con al menos los enlaces Inicio, Problemáticas y Actividades,
   incluso después de desplazarse hacia abajo.
2. **Given** un visitante en la página Actividades, **When** mira la barra de navegación,
   **Then** el enlace Actividades aparece resaltado como sección activa y los demás no.
3. **Given** un visitante en un celular, **When** carga cualquier página, **Then** la navegación
   aparece contraída tras un botón de menú; al activarlo se despliegan los enlaces y al elegir uno
   se navega y el menú se cierra.
4. **Given** un visitante en el Inicio, **When** lee la portada, **Then** ve el nombre del proyecto,
   el objetivo central, los cuatro pilares y dos llamados a la acción que llevan a Problemáticas y a
   Actividades.
5. **Given** un visitante que usa solo teclado, **When** recorre la página con Tab, **Then** alcanza
   todos los enlaces y botones en un orden lógico y siempre ve dónde está el foco.

---

### User Story 2 - Explorar las actividades del plan de trabajo (Priority: P2)

El visitante entra a Actividades y ve cuatro tarjetas ordenadas por semana. Cada una muestra imagen,
número de semana, título y una descripción corta. Al hacer clic en una tarjeta se abre una ventana
modal con el detalle completo: duración, estrategia, canales, responsable, recursos e indicadores de
la comunidad.

**Why this priority**: muestra el trabajo concreto que se hace con la comunidad y es la sección que
más crecerá a medida que avance el proyecto.

**Independent Test**: entrar a Actividades, abrir y cerrar la modal de cada una de las cuatro
tarjetas por los tres medios de cierre y verificar que todos los campos se muestran.

**Acceptance Scenarios**:

1. **Given** la página Actividades, **When** carga, **Then** se muestran cuatro tarjetas en este
   orden: Semana 1 "Capacitación sobre el producto", Semana 2 "Concientización sobre la producción
   sostenible del producto", Semana 3 "Creación de la estructuración de la huerta" y Semana 4
   "Siembra del producto".
2. **Given** una tarjeta, **When** el visitante hace clic sobre ella o la activa con Enter o Espacio,
   **Then** se abre una modal con el título de la actividad y los seis campos de detalle.
3. **Given** una modal abierta, **When** el visitante pulsa el botón de cerrar, pulsa Escape o hace
   clic fuera de la ventana, **Then** la modal se cierra y el foco vuelve a la tarjeta que la abrió.
4. **Given** una modal abierta, **When** el visitante navega con Tab o Shift+Tab, **Then** el foco
   permanece dentro de la modal y el contenido de fondo no se puede desplazar ni activar.
5. **Given** una actividad sin imagen asignada, **When** se muestra su tarjeta, **Then** aparece una
   imagen neutra por defecto con las mismas dimensiones que tendría la imagen real.

---

### User Story 3 - Leer las problemáticas (Priority: P3)

El visitante entra a Problemáticas y puede alternar entre las dos problemáticas planteadas y, dentro
de cada una, entre sus cinco apartados (análisis local, nacional y global; causas; efectos), sin salir
de la página. El texto largo se presenta de forma cómoda de leer.

**Why this priority**: es el sustento académico del proyecto, especialmente relevante para docentes,
pero el sitio comunica su propósito aun sin esta sección.

**Independent Test**: entrar a Problemáticas, seleccionar cada problemática y cada uno de sus cinco
apartados y leer el texto completo.

**Acceptance Scenarios**:

1. **Given** la página Problemáticas, **When** carga, **Then** se muestra seleccionada la primera
   problemática ("Desempleo y falta de oportunidades de generación de ingresos dignos en comunidades
   rurales de corregimientos") con su primer apartado visible.
2. **Given** la página Problemáticas, **When** el visitante elige la segunda problemática
   ("Subutilización de espacios productivos y bajo aprovechamiento de residuos orgánicos agrícolas en
   zonas rurales"), **Then** se muestra su contenido sin recargar ni cambiar de página.
3. **Given** una problemática seleccionada, **When** el visitante elige cualquiera de los apartados
   Local, Nacional, Global, Causas o Efectos, **Then** se muestra el texto completo de ese apartado y
   el selector indica cuál está activo.
4. **Given** el apartado Causas, **When** se muestra, **Then** el texto está organizado en
   históricas, socioculturales, políticas y económicas; **and** el apartado Efectos, en sociales,
   culturales, ambientales y políticos.
5. **Given** un visitante con teclado, **When** usa los selectores de problemática y de apartado,
   **Then** puede cambiar de opción sin ratón y el estado seleccionado se anuncia a tecnologías de
   asistencia.

---

### Edge Cases

- Una actividad no tiene imagen asignada o el nombre de archivo escrito no corresponde a ninguna
  imagen: se muestra la imagen neutra por defecto sin alterar el tamaño de la tarjeta.
- Un campo de detalle de una actividad está vacío: la modal lo muestra con un texto indicativo
  (p. ej., "Por definir") en lugar de dejar un hueco o romper la estructura.
- Un visitante entra directamente a una dirección de sección (p. ej., compartida por enlace) o
  recarga la página: llega a esa sección con la navegación correcta resaltada.
- Un visitante entra a una dirección que no existe: ve un mensaje amable de página no encontrada con
  enlace al Inicio, sin perder la barra de navegación.
- Texto muy largo en un apartado de problemática: se puede leer completo con desplazamiento normal,
  sin cortes ni superposición con la barra fija.
- La modal tiene más contenido que la altura de la pantalla (p. ej., en celular): su contenido se
  desplaza dentro de la ventana y el botón de cerrar sigue accesible.
- El menú móvil está abierto y el visitante pulsa Escape o amplía la ventana a escritorio: el menú se
  cierra o se adapta sin quedar en un estado inconsistente.
- Pantallas muy estrechas (320 px de ancho): no aparece desplazamiento horizontal.

## Requirements *(mandatory)*

### Functional Requirements

**Navegación**

- **FR-001**: El sitio MUST mostrar una barra de navegación fija, visible en la parte superior de
  todas las páginas durante el desplazamiento.
- **FR-002**: La navegación MUST incluir al menos los enlaces Inicio, Problemáticas y Actividades.
- **FR-003**: La navegación MUST indicar visualmente y de forma accesible cuál es la sección activa.
- **FR-004**: En pantallas pequeñas, la navegación MUST contraerse en un menú desplegable que se abre
  y cierra con un botón, y que se cierra al elegir un enlace o pulsar Escape.
- **FR-005**: Agregar una sección nueva MUST requerir únicamente registrarla en un único listado de
  secciones; el enlace en la navegación y la dirección de la página se derivan de ese registro.
- **FR-006**: Cada sección MUST tener su propia dirección, de modo que se pueda enlazar, recargar y
  usar los botones atrás/adelante del navegador.
- **FR-007**: El sitio MUST mostrar una página de "no encontrada" con enlace al Inicio ante
  direcciones inexistentes.

**Inicio**

- **FR-008**: El Inicio MUST mostrar una portada con el nombre del proyecto "Huerta comunitaria de
  setas orellanas (Pleurotus ostreatus)" y su objetivo central.
- **FR-009**: El Inicio MUST destacar cuatro pilares: sostenibilidad, generación de ingresos,
  aprovechamiento de espacios y aporte orgánico, cada uno con título y una breve explicación.
- **FR-010**: El Inicio MUST ofrecer llamados a la acción que lleven a Problemáticas y a Actividades.

**Problemáticas**

- **FR-011**: La sección Problemáticas MUST presentar las dos problemáticas definidas, permitiendo
  alternar entre ellas sin salir de la página.
- **FR-012**: Cada problemática MUST presentarse en cinco apartados: análisis local, análisis
  nacional, análisis global, causas y efectos, permitiendo alternar entre ellos sin salir de la
  página.
- **FR-013**: El apartado de causas MUST organizarse en causas históricas, socioculturales, políticas
  y económicas; el de efectos, en efectos sociales, culturales, ambientales y políticos.
- **FR-014**: El texto largo MUST presentarse con un ancho de línea limitado, tamaño de letra y
  espaciado que faciliten la lectura, y dividido en párrafos.

**Actividades**

- **FR-015**: La sección Actividades MUST mostrar las cuatro actividades del plan de trabajo como
  tarjetas, ordenadas por número de semana.
- **FR-016**: Cada tarjeta MUST mostrar imagen, número de semana, título y descripción corta.
- **FR-017**: Activar una tarjeta (clic, Enter o Espacio) MUST abrir una ventana modal con el título
  de la actividad y su duración, estrategia, canales, responsable, recursos e indicadores de la
  comunidad.
- **FR-018**: La modal MUST cerrarse con un botón visible de cerrar, con la tecla Escape y con un clic
  fuera de la ventana.
- **FR-019**: Mientras la modal esté abierta, el foco MUST permanecer atrapado dentro de ella y el
  contenido de fondo no MUST ser desplazable ni interactivo; al cerrarse, el foco MUST volver al
  elemento que la abrió.

**Imágenes**

- **FR-020**: Toda tarjeta o bloque con imagen MUST mostrar una imagen neutra por defecto cuando no
  se haya asignado imagen o la asignada no esté disponible, conservando las dimensiones del diseño.
- **FR-021**: Asignar la imagen real de una actividad MUST consistir únicamente en colocar el archivo
  en la carpeta de imágenes del proyecto y escribir su nombre en los datos de esa actividad.
- **FR-022**: Toda imagen informativa MUST tener un texto alternativo descriptivo en español.

**Contenido, estilo y accesibilidad**

- **FR-023**: Todo el contenido y los textos de interfaz MUST estar en español de Colombia.
- **FR-024**: El contenido (textos de portada, pilares, problemáticas y actividades) MUST poder
  editarse sin modificar la estructura ni el comportamiento de las páginas.
- **FR-025**: El estilo visual MUST seguir una temática agrícola: tonos verdes y tierra, fondos
  crema, tipografía legible y amigable, sin saturación de adornos, aplicado de forma consistente.
- **FR-026**: El sitio MUST adaptarse a celular, tableta y escritorio sin desplazamiento horizontal
  a partir de 320 px de ancho.
- **FR-027**: Toda la funcionalidad MUST ser operable con teclado, con indicador de foco visible.
- **FR-028**: Los pares de color de texto y fondo MUST cumplir el contraste mínimo WCAG 2.1 AA.
- **FR-029**: El contenido textual completo de las dos problemáticas y el detalle de las cuatro
  actividades MUST provenir de
  [NEEDS CLARIFICATION: ¿El equipo ya tiene redactados los textos de las problemáticas (cinco
  apartados cada una) y el detalle de las actividades (duración, estrategia, canales, responsable,
  recursos, indicadores), o se debe redactar un borrador inicial para que el equipo lo revise?]

### Key Entities *(include if feature involves data)*

- **Sección del sitio**: página navegable. Atributos: nombre visible en la navegación, dirección,
  orden en el menú.
- **Pilar**: eje destacado del proyecto en el Inicio. Atributos: título, breve explicación, ícono o
  imagen opcional.
- **Problemática**: problema social que justifica el proyecto. Atributos: título; análisis local,
  nacional y global; causas (históricas, socioculturales, políticas, económicas); efectos (sociales,
  culturales, ambientales, políticos).
- **Actividad**: acción del plan de trabajo. Atributos: número de semana, título, descripción corta,
  imagen (opcional) con texto alternativo, duración, estrategia, canales, responsable, recursos,
  indicadores de la comunidad.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Desde cualquier página, un visitante llega a cualquiera de las secciones en un solo clic
  o toque desde la barra de navegación (100 % de las secciones).
- **SC-002**: En las cuatro actividades, la modal se abre y se cierra correctamente por los tres
  medios (botón, Escape, clic fuera) y muestra los seis campos de detalle (12 de 12 combinaciones de
  cierre verificadas).
- **SC-003**: Un visitante puede leer el contenido completo de las dos problemáticas, en sus cinco
  apartados cada una (10 de 10 apartados accesibles), sin salir de la página Problemáticas.
- **SC-004**: Con ninguna imagen real asignada, todas las tarjetas y bloques muestran la imagen por
  defecto, sin espacios vacíos, iconos de imagen rota ni cambios de tamaño (0 elementos rotos).
- **SC-005**: Todas las páginas se ven y funcionan sin desplazamiento horizontal en anchos de 320 px,
  768 px y 1280 px.
- **SC-006**: Todas las tareas anteriores pueden completarse usando solo el teclado.
- **SC-007**: Una revisión automática de accesibilidad no reporta errores de contraste, nombres
  accesibles faltantes ni roles incorrectos en ninguna página.
- **SC-008**: Una persona del equipo sin experiencia en programación puede agregar una imagen real a
  una actividad en menos de 5 minutos siguiendo una instrucción breve.
- **SC-009**: En una conexión móvil típica, la portada muestra su contenido principal en menos de
  3 segundos.

## Assumptions

- Los visitantes son docentes, miembros de la comunidad y público general; muchos acceden desde
  celulares con conectividad limitada.
- El sitio es solo informativo: sin cuentas, formularios, backend ni panel de administración; el
  contenido lo actualiza el equipo editando los datos del proyecto.
- El objetivo central y las breves explicaciones de los pilares se redactan a partir de la
  descripción del proyecto (generar ingresos, aprovechar espacios subutilizados, aportar materia
  orgánica reutilizando residuos agrícolas) y el equipo puede ajustarlos.
- Las cuatro actividades corresponden a las semanas 1 a 4; si se agregan más, siguen el mismo formato
  de tarjeta y modal.
- Fuera de alcance en esta versión: backend, formularios de contacto, inicio de sesión, panel de
  administración, buscador, blog, galería de fotos, multi-idioma y modo oscuro.
- Solo existe una presentación de colores (tema claro); no se requiere modo oscuro.
- Se da soporte a las dos últimas versiones de los navegadores principales en móvil y escritorio.
