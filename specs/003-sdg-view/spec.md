# Feature Specification: Vista ODS e imágenes reales del proyecto

**Feature Branch**: `spec/ods`

**Created**: 2026-11-18

**Status**: Draft

**Input**: User description: "Tercera especificación del sitio 'Huerta comunitaria de setas orellanas
(Pleurotus ostreatus)': nueva vista 'ODS' que explica cómo el proyecto contribuye a nivel local a 9
Objetivos de Desarrollo Sostenible de la Agenda 2030, en tres niveles de contribución (directa,
complementaria, indirecta), con tarjetas interactivas que abren una modal, filtro por nivel, cuadro
resumen 'De la actividad al ODS' y llamado a la acción hacia Actividades; opción 'ODS' en la navbar
después de 'Actividades'; conexión de las imágenes reales del proyecto (slider, secciones del Inicio,
actividades y ODS) con placeholder cuando falten; sin cambios de contenido en las demás páginas."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Conocer a qué ODS contribuye el proyecto mediante tarjetas interactivas (Priority: P1)

Un visitante (docente evaluador, integrante de la comunidad o público general) entra a la vista
"ODS" y, en la sección "ODS a los que contribuye el proyecto", ve 9 tarjetas agrupadas en tres
niveles: contribución directa (ODS 2, 8 y 12), contribución complementaria (ODS 1, 4, 13 y 17) y
contribución indirecta o de largo plazo (ODS 3 y 15). Cada tarjeta muestra una imagen del ODS, el
número del ODS con su color identificador, el nombre, el nivel de contribución, una frase corta de
cómo se relaciona con el proyecto y la indicación "Ver cómo se relaciona". Al pasar el mouse o
enfocar la tarjeta con el teclado, la tarjeta se eleva o realza de forma suave. Al hacer clic,
tocarla o pulsar Enter o Espacio, se abre una ventana modal con la explicación completa, las metas
oficiales asociadas, la actividad o actividades del plan de trabajo (Semana 1 a 4) que la sustentan
y el indicador de éxito con el que se evidencia.

**Why this priority**: es el requisito principal de la vista; sin las tarjetas y su detalle no
existe la explicación de la contribución a los ODS.

**Independent Test**: abrir la vista ODS, comprobar que hay 9 tarjetas agrupadas en tres niveles
con todos sus elementos visibles, y abrir y cerrar la modal de cada tarjeta con mouse, toque y
teclado verificando su contenido y el retorno del foco.

**Acceptance Scenarios**:

1. **Given** el visitante abre la vista ODS, **When** llega a la sección de tarjetas, **Then** ve 9
   tarjetas agrupadas bajo tres encabezados de nivel: "Contribución directa" (ODS 2, 8, 12),
   "Contribución complementaria" (ODS 1, 4, 13, 17) y "Contribución indirecta o de largo plazo"
   (ODS 3, 15), cada grupo ordenado por número de ODS.
2. **Given** una tarjeta visible, **When** el visitante la observa, **Then** ve la imagen del ODS,
   el número con el color del ODS, el nombre oficial en español, el nivel de contribución en texto,
   una frase de relación con el proyecto y la indicación "Ver cómo se relaciona".
3. **Given** el visitante usa mouse, **When** pasa el cursor sobre una tarjeta, **Then** la tarjeta
   cambia de forma suave y visible (elevación o realce) y el cursor indica que es accionable.
4. **Given** el visitante usa teclado, **When** llega a una tarjeta con Tab, **Then** la tarjeta
   muestra un foco visible y el mismo realce que con el mouse.
5. **Given** una tarjeta enfocada o visible, **When** el visitante hace clic, la toca o pulsa Enter
   o Espacio, **Then** se abre una modal titulada con el número y nombre del ODS que contiene: la
   explicación completa de la relación con el proyecto, las metas oficiales (número y descripción
   breve), la actividad o actividades del plan que la sustentan con su semana, y el indicador de
   éxito con el que se evidencia.
6. **Given** la modal abierta, **When** el visitante pulsa Tab o Mayús+Tab repetidamente, **Then**
   el foco se mantiene dentro de la modal.
7. **Given** la modal abierta, **When** el visitante pulsa el botón de cerrar, la tecla Escape o
   hace clic fuera de la ventana, **Then** la modal se cierra y el foco vuelve a la tarjeta que la
   abrió.
8. **Given** la modal de un ODS de contribución indirecta (ODS 3 o 15), **When** se abre, **Then**
   indica claramente que es una contribución de largo plazo que no se mide en el plan actual.
9. **Given** la imagen de un ODS no está disponible o no carga, **When** se muestra su tarjeta,
   **Then** aparece el placeholder neutro del sitio con las mismas dimensiones y la tarjeta conserva
   su diseño.

---

### User Story 2 - Acceder a la vista ODS desde la barra de navegación (Priority: P1)

El visitante encuentra la opción "ODS" en la barra de navegación, justo después de "Actividades",
en cualquier página del sitio. La opción se ve y se comporta igual que las demás: queda resaltada
cuando el visitante está en la vista ODS, aparece en el menú desplegable del celular y se puede
alcanzar y activar con el teclado.

**Why this priority**: sin la entrada en la navbar la vista no es descubrible; es la puerta de
acceso a la historia principal.

**Independent Test**: desde cualquier página, en escritorio y en celular, activar "ODS" con mouse,
toque y teclado y comprobar que lleva a la vista y queda resaltada como activa.

**Acceptance Scenarios**:

1. **Given** cualquier página del sitio en escritorio, **When** el visitante mira la navbar,
   **Then** ve las opciones en este orden: Inicio, Problemáticas, Actividades, ODS.
2. **Given** el visitante activa "ODS", **When** carga la vista, **Then** la opción "ODS" aparece
   resaltada como activa y se anuncia como página actual para tecnologías de asistencia.
3. **Given** el visitante está en un celular, **When** abre el menú desplegable, **Then** ve la
   opción "ODS" después de "Actividades"; al activarla navega a la vista y el menú se cierra.
4. **Given** el visitante usa teclado, **When** recorre la navbar con Tab, **Then** llega a "ODS"
   con foco visible y la activa con Enter.
5. **Given** el visitante entra directamente a la dirección de la vista ODS (o recarga la página),
   **When** carga, **Then** se muestra la vista ODS sin error.
6. **Given** que en el futuro se agregan más opciones al menú, **When** se ve la navbar en
   cualquier ancho de pantalla, **Then** las opciones no se superponen, no se cortan ni generan
   desplazamiento horizontal de la página.

---

### User Story 3 - Entender qué son los ODS y el mensaje de contribución local (Priority: P2)

Al entrar a la vista, en la primera sección ("Qué son los ODS y por qué importan en el proyecto"),
el visitante lee en pocas líneas qué son los Objetivos de Desarrollo Sostenible y la Agenda 2030 de
Naciones Unidas, y un mensaje claro y prudente: el proyecto contribuye a nivel local a algunos ODS
mediante una intervención pequeña, de cuatro semanas, con un grupo de un corregimiento; no afirma
cumplirlos. Un enlace discreto lleva al sitio oficial de la ONU sobre los ODS.

**Why this priority**: da el contexto necesario para interpretar las tarjetas y fija el tono
prudente que evita exagerar el alcance del proyecto.

**Independent Test**: abrir la vista y comprobar que la primera sección explica ODS y Agenda 2030,
presenta el mensaje de contribución local y contiene el enlace al sitio oficial de la ONU.

**Acceptance Scenarios**:

1. **Given** el visitante abre la vista ODS, **When** lee la parte superior, **Then** encuentra una
   explicación breve (no más de 2 párrafos cortos) de qué son los ODS y la Agenda 2030.
2. **Given** la primera sección, **When** el visitante la lee, **Then** ve el mensaje de que el
   proyecto *contribuye a nivel local* a los ODS, mencionando que es una intervención de cuatro
   semanas con un grupo comunitario de un corregimiento, sin afirmar que los cumple.
3. **Given** el enlace al sitio oficial de la ONU, **When** el visitante lo activa, **Then** se abre
   el sitio oficial en una pestaña nueva y el enlace advierte (visual o textualmente para lectores
   de pantalla) que abre en una pestaña nueva.

---

### User Story 4 - Filtrar las tarjetas por nivel de contribución (Priority: P2)

Encima de las tarjetas, el visitante ve un filtro con cuatro opciones: Todos, Directa,
Complementaria e Indirecta. Al elegir una, solo quedan visibles las tarjetas de ese nivel, sin
recargar ni salir de la página. "Todos" está seleccionado al llegar.

**Why this priority**: mejora la exploración, pero las tarjetas ya son comprensibles sin filtrar.

**Independent Test**: seleccionar cada opción del filtro con mouse y teclado y contar las tarjetas
visibles (9, 3, 4 y 2 respectivamente).

**Acceptance Scenarios**:

1. **Given** el visitante llega a la vista, **When** observa el filtro, **Then** "Todos" aparece
   seleccionado y se ven las 9 tarjetas agrupadas por nivel.
2. **Given** el filtro, **When** el visitante elige "Directa", "Complementaria" o "Indirecta",
   **Then** solo se muestran 3, 4 o 2 tarjetas respectivamente (con su encabezado de nivel), sin
   recargar la página.
3. **Given** el visitante usa teclado, **When** recorre y activa las opciones del filtro, **Then**
   puede seleccionar cualquiera con foco visible, y la opción seleccionada se distingue por algo más
   que el color y se anuncia como seleccionada para tecnologías de asistencia.
4. **Given** el visitante cambia el filtro, **When** se actualizan las tarjetas, **Then** las
   tecnologías de asistencia anuncian cuántos ODS se muestran (por ejemplo, "Mostrando 3 ODS").
5. **Given** un filtro aplicado, **When** el visitante abre y cierra la modal de una tarjeta,
   **Then** el filtro se mantiene y el foco vuelve a esa tarjeta.

---

### User Story 5 - Relacionar actividades con ODS y continuar hacia Actividades (Priority: P3)

En la tercera sección ("De la actividad al ODS"), el visitante ve un cuadro resumen que relaciona
cada una de las cuatro actividades del plan de trabajo (Semana 1 a Semana 4) con los ODS a los que
aporta, identificados por número y nombre. Al final hay un llamado a la acción que lo lleva a la
página de Actividades.

**Why this priority**: sintetiza la relación entre el plan de trabajo y los ODS y guía la
navegación, pero depende de que ya existan las tarjetas.

**Independent Test**: comprobar que el cuadro tiene 4 filas (una por semana) con sus ODS, que es
coherente con lo que dicen las modales y que el llamado a la acción lleva a Actividades.

**Acceptance Scenarios**:

1. **Given** la tercera sección, **When** el visitante la lee, **Then** ve un cuadro con las 4
   actividades (semana y título) y, para cada una, los ODS a los que aporta con número y nombre.
2. **Given** el cuadro resumen, **When** se compara con las modales, **Then** cada ODS que una
   modal asocia a una actividad aparece en la fila de esa actividad, y viceversa.
3. **Given** el visitante está en un celular, **When** ve el cuadro, **Then** se lee completo sin
   desplazamiento horizontal de la página (puede reorganizarse en bloques apilados).
4. **Given** el llamado a la acción, **When** el visitante lo activa con mouse, toque o teclado,
   **Then** navega a la página de Actividades.

---

### User Story 6 - Ver las fotos reales del proyecto en todo el sitio (Priority: P2)

Las fotos reales del proyecto, organizadas en el repositorio por uso (slider, home, activities y
sdg), aparecen en su lugar: las diapositivas del slider del Inicio, la imagen de apoyo de cada
sección del Inicio, la tarjeta y la modal de cada actividad, y la tarjeta de cada ODS. Donde una
foto falte o no cargue, se ve el placeholder neutro del sitio sin romper el diseño. Ningún texto de
esas secciones cambia.

**Why this priority**: las fotos reales dan credibilidad al proyecto, pero el sitio ya funciona con
placeholders.

**Independent Test**: recorrer Inicio, Actividades y ODS comprobando que cada espacio de imagen
muestra su foto asignada o el placeholder, con dimensiones estables y texto alternativo descriptivo,
y que los textos son idénticos a los de la versión anterior.

**Acceptance Scenarios**:

1. **Given** existen fotos en la carpeta del slider, **When** se abre el Inicio, **Then** las 5
   diapositivas muestran su foto asignada; las que no tengan foto muestran el fondo neutro.
2. **Given** existen fotos en la carpeta home, **When** se recorren las secciones del Inicio,
   **Then** cada sección muestra su imagen de apoyo asignada o el placeholder.
3. **Given** existen fotos en la carpeta activities, **When** se abre Actividades, **Then** cada una
   de las 4 actividades muestra la foto de su semana en la tarjeta y en la modal, o el placeholder.
4. **Given** existen fotos en la carpeta sdg, **When** se abre la vista ODS, **Then** cada tarjeta
   muestra la foto de su ODS o el placeholder.
5. **Given** una foto asignada no existe o falla al cargar, **When** se muestra su espacio, **Then**
   aparece el placeholder con las mismas proporciones y el diseño no se desplaza ni se rompe.
6. **Given** cualquier foto mostrada, **When** se inspecciona con un lector de pantalla, **Then**
   tiene un texto alternativo descriptivo en español.
7. **Given** se conectaron las fotos, **When** se comparan los textos de Inicio, Problemáticas y
   Actividades con la versión anterior, **Then** no hay ningún cambio de texto.

---

### Edge Cases

- **Faltan fotos en una carpeta**: cualquier espacio sin foto (incluida la carpeta sdg completa, si
  aún no existe) muestra el placeholder neutro y la página se ve completa.
- **Hay más fotos de las necesarias en una carpeta** (por ejemplo, más de 4 en activities): solo se
  usa una foto asignada por espacio; las demás no aparecen ni rompen nada.
- **Fotos con proporciones distintas** (verticales, cuadradas o panorámicas): se recortan o ajustan
  al espacio sin deformarse ni cambiar la altura de la tarjeta o sección.
- **Fotos pesadas**: la vista no debe bloquearse mientras cargan; las imágenes fuera de pantalla no
  retrasan la carga inicial.
- **Clic dentro de la modal** (no en el fondo): la modal no se cierra.
- **Abrir una modal en celular con contenido largo**: la modal se puede desplazar internamente y el
  botón de cerrar sigue accesible.
- **Navbar con nombres largos o más opciones en pantallas intermedias (tableta)**: las opciones se
  ajustan (o pasan al menú desplegable) sin superponerse ni causar desplazamiento horizontal.
- **Preferencia de reducir animaciones**: el realce de las tarjetas y la apertura de la modal
  ocurren sin animación o con animación mínima.
- **Colores de ODS con poco contraste** (por ejemplo, amarillo con texto blanco): el número sigue
  cumpliendo el contraste mínimo, ajustando el color del texto o del fondo.
- **Enlace externo a la ONU sin conexión**: no afecta al resto de la vista.
- **Ruta inexistente** cercana (por ejemplo, con error de escritura): se muestra la página de "no
  encontrado" existente.

## Requirements *(mandatory)*

### Functional Requirements

**Navegación**

- **FR-001**: La barra de navegación MUST incluir la opción "ODS" inmediatamente después de
  "Actividades", con la misma apariencia y comportamiento que las demás opciones (estado activo
  resaltado y anunciado, presente en el menú desplegable del celular, operable con teclado).
- **FR-002**: La vista ODS MUST tener una dirección propia accesible directamente y al recargar.
- **FR-003**: La barra de navegación MUST admitir opciones adicionales futuras sin superponerse,
  cortarse ni generar desplazamiento horizontal en ningún ancho de pantalla.
- **FR-004**: La opción "ODS" MUST agregarse desde la misma configuración central que define las
  demás páginas y su entrada del menú, sin declararse por separado.

**Estructura y contenido de la vista ODS**

- **FR-005**: La vista ODS MUST organizarse en un máximo de 3 secciones, en este orden: (1) "Qué son
  los ODS y por qué importan en el proyecto", (2) "ODS a los que contribuye el proyecto" (filtro y
  tarjetas), (3) "De la actividad al ODS" (cuadro resumen y llamado a la acción).
- **FR-006**: La sección 1 MUST explicar en pocas líneas qué son los ODS y la Agenda 2030 y
  presentar el mensaje de contribución local con redacción prudente (contribuye, no cumple),
  mencionando que es una intervención pequeña de cuatro semanas con un grupo de un corregimiento.
- **FR-007**: La sección 1 MUST incluir un enlace discreto al sitio oficial de la ONU sobre los ODS,
  que abra en una pestaña nueva e indique que lo hace.
- **FR-008**: La vista MUST presentar exactamente 9 ODS clasificados en tres niveles:
  - Directa: ODS 2 Hambre cero (metas 2.3 y 2.4); ODS 8 Trabajo decente y crecimiento económico
    (meta 8.3); ODS 12 Producción y consumo responsables (metas 12.2 y 12.5).
  - Complementaria: ODS 1 Fin de la pobreza (meta 1.4); ODS 4 Educación de calidad (metas 4.4 y
    4.7); ODS 13 Acción por el clima (meta 13.3); ODS 17 Alianzas para lograr los objetivos (meta
    17.17).
  - Indirecta o de largo plazo: ODS 3 Salud y bienestar (meta 3.4); ODS 15 Vida de ecosistemas
    terrestres (meta 15.3).
- **FR-009**: Cada ODS MUST incluir el contenido de relación con el proyecto indicado en la
  descripción de la funcionalidad:
  - ODS 2: producción de un alimento nutritivo en un espacio pequeño y de bajo costo que diversifica
    la producción de las familias; evidencia: kilogramos cosechados y huerta de al menos 20 m².
  - ODS 8: alternativa de ingresos y fortalecimiento del emprendimiento comunitario; evidencia:
    primeras ventas del primer ciclo y familias vinculadas.
  - ODS 12: residuos agrícolas (pulpa de café, cascarilla, paja) reutilizados como sustrato en lugar
    de quemarse y sustrato agotado devuelto como abono; evidencia: kilogramos de residuos
    reutilizados.
  - ODS 1: ingresos adicionales para familias rurales con economía poco diversificada.
  - ODS 4: capacitación técnica y concientización sobre producción sostenible; evidencia: personas
    capacitadas y resultado de la encuesta de apropiación.
  - ODS 13: menos quema de residuos agrícolas y sensibilización ambiental.
  - ODS 17: trabajo conjunto entre UNIMINUTO, el grupo comunitario y su líder.
  - ODS 3: acceso a un alimento rico en proteína y fibra.
  - ODS 15: el abono orgánico devuelve materia orgánica al suelo.
- **FR-010**: Las metas de cada ODS MUST citarse con su número oficial y una descripción breve
  coherente con el texto oficial de Naciones Unidas en español, y la relación con el proyecto MUST
  redactarse sin exagerar su alcance (verbos como "contribuye", "aporta", "promueve").
- **FR-011**: Los ODS de contribución indirecta MUST marcarse explícitamente, en tarjeta y modal,
  como contribución de largo plazo que no se mide en el plan actual.

**Tarjetas interactivas**

- **FR-012**: Cada ODS MUST presentarse en una tarjeta propia que muestre: imagen del ODS, número
  con el color identificador del ODS, nombre, nivel de contribución en texto, una frase de relación
  con el proyecto y la indicación visible "Ver cómo se relaciona".
- **FR-013**: Las tarjetas MUST mostrarse agrupadas por nivel bajo un encabezado por grupo, en el
  orden Directa, Complementaria, Indirecta, y ordenadas por número de ODS dentro de cada grupo.
- **FR-014**: Cada tarjeta MUST reaccionar al paso del mouse y al foco de teclado con un cambio
  suave y visible (elevación o realce), y mostrar un indicador de foco visible.
- **FR-015**: Cada tarjeta MUST abrir su modal al hacer clic, tocarla o pulsar Enter o Espacio
  cuando tiene el foco.
- **FR-016**: La modal MUST mostrar como título el número y nombre del ODS, y como contenido: la
  explicación completa de la relación con el proyecto, las metas oficiales, la actividad o
  actividades del plan de trabajo que la sustentan (semana y título) y el indicador de éxito con el
  que se evidencia (o la indicación de que no se mide en el plan actual, para los indirectos).
- **FR-017**: La modal MUST cerrarse con un botón visible, con la tecla Escape y con un clic fuera
  de la ventana; al cerrarse MUST devolver el foco a la tarjeta que la abrió.
- **FR-018**: Mientras la modal está abierta, el foco MUST permanecer atrapado dentro de ella y el
  contenido de fondo no debe desplazarse.
- **FR-019**: El color del ODS MUST NOT ser nunca el único medio de identificarlo: siempre se acompaña
  del número y el nombre en texto, y el número sobre su color MUST cumplir el contraste mínimo.
- **FR-020**: ~~El sitio MUST NOT usar los íconos oficiales de los ODS ni la rueda de colores
  oficial.~~ **Cambio solicitado por el equipo (2026-11-21)**: las tarjetas y modales usan el ícono
  oficial de cada ODS y la sección "Qué son los ODS" muestra la rueda de la Agenda 2030. El color
  sigue sin ser el único identificador: el número y el nombre se muestran siempre en texto.

**Filtro**

- **FR-021**: La sección 2 MUST incluir un filtro con las opciones Todos, Directa, Complementaria e
  Indirecta; "Todos" seleccionado por defecto.
- **FR-022**: Al seleccionar una opción, MUST mostrarse solo las tarjetas (y el encabezado) del
  nivel elegido, sin recargar ni salir de la página; "Todos" muestra las 9.
- **FR-023**: El filtro MUST ser operable con teclado, indicar la opción seleccionada por un medio
  adicional al color y anunciarla a tecnologías de asistencia, junto con la cantidad de ODS
  visibles tras cada cambio.

**Cuadro resumen y llamado a la acción**

- **FR-024**: La sección 3 MUST incluir el cuadro "De la actividad al ODS" con una fila por cada una
  de las 4 actividades (semana y título, tal como aparecen en Actividades) y los ODS a los que
  aporta cada una, identificados por número y nombre.
- **FR-025**: El cuadro resumen y las modales MUST derivarse de la misma relación actividad–ODS, de
  modo que no puedan contradecirse.
- **FR-026**: El cuadro MUST leerse completo en celular sin desplazamiento horizontal de la página.
- **FR-027**: La sección 3 MUST terminar con un llamado a la acción que lleve a la página de
  Actividades.

**Imágenes**

- **FR-028**: Las fotos reales del proyecto MUST conectarse a sus espacios: las 5 diapositivas del
  slider del Inicio (carpeta slider), la imagen de apoyo de cada sección del Inicio (carpeta home),
  la tarjeta y la modal de cada una de las 4 actividades (carpeta activities) y la tarjeta de cada
  uno de los 9 ODS (carpeta sdg).
- **FR-029**: Cada espacio de imagen MUST mostrar el placeholder neutro del sitio cuando su foto no
  esté asignada, no exista o falle al cargar, conservando las mismas proporciones y sin romper el
  diseño.
- **FR-030**: Las fotos MUST ajustarse a su espacio sin deformarse (recorte proporcional) y sin
  cambiar la altura del contenedor.
- **FR-031**: Toda foto informativa MUST tener texto alternativo descriptivo en español; los textos
  alternativos existentes de slider, Inicio y actividades se mantienen salvo que no describan la
  foto conectada.
- **FR-032**: Conectar las fotos MUST NOT modificar ningún texto visible de Inicio, Problemáticas o
  Actividades.

**Generales**

- **FR-033**: La vista ODS MUST conservar la identidad visual actual del sitio (verdes, tierra, crema
  y ocre); los colores de los ODS solo se usan como acento identificador de cada ODS.
- **FR-034**: La vista MUST ser responsive en celular, tableta y escritorio, sin desplazamiento
  horizontal de la página.
- **FR-035**: Todo el contenido y los textos de interfaz de la vista (incluidos textos alternativos
  y etiquetas accesibles) MUST estar en español.
- **FR-036**: El contenido de los ODS, las metas, las relaciones actividad–ODS y los textos de la
  vista MUST definirse como datos separados de la presentación, de modo que agregar o editar un ODS
  no requiera cambiar la lógica de la vista.

### Key Entities

- **ODS (Objetivo de Desarrollo Sostenible)**: número (1–17), nombre oficial en español, color
  identificador, nivel de contribución, frase corta de relación, explicación completa, metas,
  actividades que lo sustentan, indicador de éxito (o indicación de "no se mide en el plan actual"),
  imagen y texto alternativo.
- **Meta ODS**: número oficial (por ejemplo, 2.3) y descripción breve coherente con el texto
  oficial; pertenece a un ODS.
- **Nivel de contribución**: Directa, Complementaria o Indirecta (largo plazo); con etiqueta, orden
  y descripción breve; agrupa ODS y es la base del filtro.
- **Actividad del plan de trabajo** (existente): semana (1–4), título, imagen y texto alternativo;
  se relaciona con uno o varios ODS.
- **Relación actividad–ODS**: vínculo entre una actividad y un ODS; alimenta tanto las modales como
  el cuadro resumen.
- **Imagen del proyecto**: archivo asignado a un espacio (diapositiva, sección del Inicio,
  actividad u ODS) con su texto alternativo; puede faltar, en cuyo caso se usa el placeholder.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Desde cualquier página, un visitante llega a la vista ODS en 1 clic o toque desde la
  navbar, en escritorio y en celular.
- **SC-002**: El 100 % de las 9 tarjetas muestra los 6 elementos requeridos (imagen o placeholder,
  número con color, nombre, nivel, frase y "Ver cómo se relaciona").
- **SC-003**: El 100 % de las tarjetas abre su modal con mouse, toque, Enter y Espacio, y en el
  100 % de los cierres (botón, Escape, clic fuera) el foco vuelve a la tarjeta de origen.
- **SC-004**: Cada opción del filtro muestra exactamente el número esperado de tarjetas (Todos 9,
  Directa 3, Complementaria 4, Indirecta 2) sin recargar la página.
- **SC-005**: El cuadro resumen tiene 4 filas y no presenta ninguna contradicción con las
  actividades indicadas en las 9 modales.
- **SC-006**: La vista tiene como máximo 3 secciones de contenido.
- **SC-007**: El 100 % de los espacios de imagen de slider, Inicio, actividades y ODS muestra su
  foto asignada o el placeholder, sin cambios de altura de los contenedores al cargar o fallar la
  foto.
- **SC-008**: Toda la vista ODS se puede usar completa solo con teclado, y los pares de texto/fondo
  (incluidos los números sobre el color de cada ODS) cumplen contraste WCAG 2.1 AA.
- **SC-009**: La vista se ve sin desplazamiento horizontal ni elementos superpuestos en anchos de
  360 px, 768 px y 1280 px.
- **SC-010**: Ningún texto de la vista afirma que el proyecto "cumple" o "logra" un ODS; todas las
  afirmaciones se formulan como contribución local.
- **SC-011**: Los textos visibles de Inicio, Problemáticas y Actividades son idénticos a los de la
  versión anterior.
- **SC-012**: Un visitante que lee la vista puede responder, en menos de 2 minutos, a qué ODS
  contribuye directamente el proyecto y con qué actividad se relaciona cada uno.

## Assumptions

- **Estado actual de las fotos**: al momento de escribir esta especificación, solo la carpeta
  `activities` contiene fotos (7 archivos con nombres genéricos de mensajería, sin indicar semana);
  las carpetas `slider` y `home` están vacías y la carpeta `sdg` aún no existe. La especificación
  exige conectar las fotos que existan y mostrar el placeholder en el resto. La asignación de cuál
  foto corresponde a cada semana (y el renombrado descriptivo de los archivos) se decide en el plan
  o la revisión de contenido; las fotos sobrantes no se usan.
- **Relación actividad–ODS propuesta** (a validar en `/speckit-clarify` o con el equipo):
  - Semana 1 – Capacitación sobre el producto: ODS 4, ODS 8, ODS 17.
  - Semana 2 – Concientización sobre la producción sostenible del producto: ODS 4, ODS 12, ODS 13,
    ODS 15.
  - Semana 3 – Creación de la estructuración de la huerta: ODS 2.
  - Semana 4 – Siembra del producto: ODS 1, ODS 2, ODS 3, ODS 8, ODS 12.
- **Indicadores sin evidencia explícita en la descripción**: ODS 1 usa la misma evidencia que el
  ODS 8 (primeras ventas y familias vinculadas); ODS 13 usa los kilogramos de residuos reutilizados
  en lugar de quemarse; ODS 17 usa la participación del grupo comunitario y su líder en las
  actividades (personas capacitadas). ODS 3 y 15 se presentan como "no se mide en el plan actual".
- **Colores de los ODS**: se usan los colores identificadores públicos de cada ODS solo como acento
  (número), ajustando el color del texto para cumplir contraste; se definen junto con los demás
  colores del sitio.
- **Enlace oficial**: el enlace apunta a la página oficial de la ONU sobre los Objetivos de
  Desarrollo Sostenible en español.
- **Filtro**: el filtro seleccionado no se conserva al salir de la vista ni se refleja en la
  dirección de la página.
- **Imágenes de ODS**: las "imágenes del ODS" son fotos del propio proyecto asociadas a cada ODS,
  no material gráfico oficial de Naciones Unidas.
- **Reutilización**: se reutilizan los componentes existentes del sitio (modal accesible, imagen con
  placeholder, secciones, títulos, pestañas) siempre que cumplan los requisitos.
- **Fuera de alcance**: backend, formularios, buscador, cambios de contenido en otras páginas, los
  17 ODS completos y cálculos o mediciones de impacto en tiempo real.
