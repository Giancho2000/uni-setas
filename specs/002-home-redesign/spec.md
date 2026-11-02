# Feature Specification: Rediseño y ampliación del Inicio

**Feature Branch**: `002-home-redesign`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Rediseño y ampliación de la página de Inicio del sitio del proyecto
'Huerta comunitaria de setas orellanas (Pleurotus ostreatus)': slider principal de unas 5
diapositivas con el nombre y el objetivo corto encima; máximo 3 secciones ('El proyecto', 'Qué
queremos lograr', 'Con qué lo haremos'), cada una con un espacio de imagen de apoyo; contenido real
del proyecto (por qué, quién, objetivo general en cuatro ideas, pilares, objetivos específicos,
indicadores con meta y recursos agrupados); aspecto visual renovado y aplicado a todo el sitio sin
cambiar el contenido de Problemáticas y Actividades; responsive, accesible, rápido y en español."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver el slider principal al abrir el sitio (Priority: P1)

Un visitante (docente, integrante de la comunidad o público general) abre el sitio y ve, ocupando el
ancho de la pantalla, un slider con 5 diapositivas. Sobre el slider aparecen el nombre del proyecto
y su objetivo corto. Cada diapositiva tiene un título corto y una frase. El slider avanza solo y el
visitante puede pausarlo, ir a la diapositiva anterior o siguiente con flechas, saltar a una
diapositiva con los indicadores de posición, usar el teclado o deslizar con el dedo. Si una
diapositiva aún no tiene foto, muestra un fondo neutro con los tonos del sitio, de modo que el slider
siempre se ve completo.

**Why this priority**: es lo primero que ve cualquier visitante y define la impresión del proyecto;
sin él, el rediseño del Inicio no existe.

**Independent Test**: abrir el Inicio sin ninguna foto cargada y comprobar que hay 5 diapositivas
visibles con título y frase, que el nombre y el objetivo corto se leen sobre ellas y que se puede
pasar entre diapositivas con mouse, teclado y gesto táctil.

**Acceptance Scenarios**:

1. **Given** el visitante abre el Inicio, **When** la página carga, **Then** ve la primera
   diapositiva a todo el ancho con su título y frase, y sobre el slider el nombre del proyecto y el
   objetivo corto.
2. **Given** el slider está en reproducción automática, **When** pasan unos segundos sin
   interacción, **Then** avanza a la siguiente diapositiva y, tras la última, vuelve a la primera.
3. **Given** el slider está en reproducción, **When** el visitante pulsa el botón de pausa,
   **Then** el slider se detiene y el botón cambia a "reproducir"; al pulsarlo de nuevo, se reanuda.
4. **Given** el visitante usa el teclado, **When** enfoca los controles del slider y usa las flechas
   izquierda/derecha o activa las flechas o un indicador con Enter o Espacio, **Then** cambia a la
   diapositiva correspondiente.
5. **Given** el visitante está en un celular, **When** desliza el dedo horizontalmente sobre el
   slider, **Then** pasa a la diapositiva anterior o siguiente según la dirección.
6. **Given** el visitante pasa el mouse sobre el slider o enfoca uno de sus controles, **When** el
   slider estaba en reproducción automática, **Then** se detiene mientras dure el hover o el foco.
7. **Given** el visitante tiene activada la preferencia de reducir animaciones, **When** abre el
   Inicio, **Then** el slider no avanza solo y los cambios de diapositiva ocurren sin animación.
8. **Given** una diapositiva no tiene foto asignada o la foto no carga, **When** se muestra,
   **Then** aparece un fondo neutro con los tonos del sitio y el texto se sigue leyendo bien.
9. **Given** un visitante usa un lector de pantalla, **When** cambia de diapositiva con los
   controles, **Then** el lector anuncia la diapositiva actual (por ejemplo, "Diapositiva 2 de 5") y
   su título.

---

### User Story 2 - Entender el proyecto en el Inicio (Priority: P1)

Debajo del slider, el visitante lee la sección "El proyecto", que explica por qué existe (la
situación de los corregimientos y las dos problemáticas de origen), quién lo desarrolla (Giancarlo
Reina, estudiante de UNIMINUTO, con el grupo comunitario y su líder), el objetivo general en cuatro
ideas cortas (qué es, para quién, cómo y para qué) y los cuatro pilares. Una insignia indica la
línea de trabajo "Huertas caseras con alimentos" de la metodología "Líderes Sostenibles en Acción".

**Why this priority**: es el propósito central del Inicio: que cualquier visitante entienda en
pocos minutos qué es el proyecto y por qué importa.

**Independent Test**: leer solo la sección "El proyecto" y responder sin ayuda por qué se hace,
quién lo hace, qué es, para quién, cómo y para qué, y cuáles son los cuatro pilares.

**Acceptance Scenarios**:

1. **Given** el visitante baja desde el slider, **When** llega a "El proyecto", **Then** ve un
   bloque "Por qué" con la situación rural y las dos problemáticas de origen, y un bloque "Quién"
   con el estudiante, la universidad, la práctica de Responsabilidad Social y el grupo comunitario.
2. **Given** el visitante está en "El proyecto", **When** busca el objetivo general, **Then** lo ve
   dividido en cuatro ideas con su etiqueta: Qué es, Para quién, Cómo y Para qué.
3. **Given** el visitante está en "El proyecto", **When** revisa los pilares, **Then** ve cuatro
   tarjetas: sostenibilidad, generación de ingresos, aprovechamiento de espacios y aporte orgánico.
4. **Given** el visitante está en "El proyecto", **When** observa el encabezado o el bloque "Por
   qué", **Then** ve una insignia con la línea de trabajo "Huertas caseras con alimentos".
5. **Given** la sección no tiene foto de apoyo, **When** se muestra, **Then** el espacio de imagen
   conserva su tamaño con el placeholder y el diseño no se descuadra.

---

### User Story 3 - Revisar objetivos e indicadores de éxito (Priority: P2)

En la sección "Qué queremos lograr", el visitante (en especial el docente evaluador) ve los seis
objetivos específicos numerados y los ocho indicadores de éxito, cada uno con su criterio (por
ejemplo, Cumplimiento o Participación) y su meta, presentados de forma visual y fácil de escanear.

**Why this priority**: es lo que permite evaluar el proyecto, pero depende de que el visitante ya
haya entendido de qué se trata (historia 2).

**Independent Test**: abrir la sección y, en menos de un minuto, encontrar la meta del indicador de
Participación y el texto del objetivo específico 3.

**Acceptance Scenarios**:

1. **Given** el visitante llega a "Qué queremos lograr", **When** revisa los objetivos específicos,
   **Then** ve los seis en orden, numerados del 1 al 6.
2. **Given** el visitante revisa los indicadores, **When** recorre la lista, **Then** cada uno
   muestra su nombre, una descripción breve y su meta destacada visualmente.
3. **Given** un indicador aún no tiene meta numérica (por ejemplo, Siembra o Satisfacción),
   **When** se muestra, **Then** aparece la meta como "Por definir con el grupo" o con el texto
   descriptivo correspondiente, sin dejar espacios vacíos.
4. **Given** el equipo cambia una meta en los datos del sitio, **When** se publica de nuevo,
   **Then** la nueva meta aparece sin modificar la presentación.

---

### User Story 4 - Conocer los recursos y continuar la visita (Priority: P2)

En la sección "Con qué lo haremos", el visitante ve los recursos necesarios agrupados en cinco
categorías (Humanos, Materiales de producción, Espacio, Didácticos y logísticos, Registro y
comunicación). Al final encuentra dos llamados a la acción que lo llevan a Problemáticas y a
Actividades.

**Why this priority**: completa la explicación del proyecto y conecta con el resto del sitio; sin
ella el Inicio sigue siendo útil, pero menos completo.

**Independent Test**: abrir la sección, identificar en qué categoría está "guantes" y llegar a
Actividades con un clic desde el llamado a la acción.

**Acceptance Scenarios**:

1. **Given** el visitante llega a "Con qué lo haremos", **When** revisa los recursos, **Then** los
   ve agrupados en cinco categorías, cada una con su título, un ícono y su lista de elementos.
2. **Given** el visitante termina de leer los recursos, **When** pulsa "Conoce las problemáticas" o
   "Ver las actividades", **Then** llega a la página correspondiente.

---

### User Story 5 - Percibir un sitio actual y coherente en todas las páginas (Priority: P3)

El visitante recorre Inicio, Problemáticas y Actividades y percibe un diseño cuidado y uniforme:
más espacio entre elementos, jerarquía tipográfica clara, tarjetas con bordes redondeados,
transiciones suaves al aparecer las secciones durante el scroll y estados de foco y hover visibles.
La navbar conserva sus enlaces y su comportamiento, y junto con el footer adopta el nuevo aspecto.
Problemáticas y Actividades conservan exactamente su contenido.

**Why this priority**: mejora la percepción general, pero el valor principal ya lo dan las
historias 1 a 4.

**Independent Test**: comparar las tres páginas y comprobar que usan los mismos tonos, tipografía,
radios y estados de foco, y que el contenido de Problemáticas y Actividades es idéntico al anterior.

**Acceptance Scenarios**:

1. **Given** el visitante navega entre páginas, **When** compara navbar, footer, títulos y
   tarjetas, **Then** todos comparten el mismo estilo renovado y la paleta agrícola (verdes, tierra,
   crema, ocre).
2. **Given** el visitante usa el teclado, **When** recorre cualquier página con Tab, **Then** cada
   elemento interactivo muestra un indicador de foco claramente visible.
3. **Given** el visitante hace scroll en el Inicio, **When** una sección entra en pantalla,
   **Then** aparece con una transición suave; si prefiere reducir animaciones, aparece sin ella.
4. **Given** el visitante abre Problemáticas y Actividades, **When** compara con la versión
   anterior, **Then** los textos, pestañas, tarjetas y modales tienen el mismo contenido y
   funcionamiento.

---

### Edge Cases

- **Ninguna foto cargada**: las 5 diapositivas y las 3 imágenes de apoyo muestran el fondo neutro o
  el placeholder, con el mismo tamaño que tendría la foto; el Inicio se ve completo.
- **Foto con nombre mal escrito o que no carga**: se muestra el fondo neutro, sin icono de imagen
  rota; en modo desarrollo se advierte del archivo no encontrado.
- **Foto muy clara detrás del texto**: el título y la frase de la diapositiva conservan contraste
  suficiente gracias a un velo o degradado entre la foto y el texto.
- **Fotos de proporciones distintas**: se recortan para ocupar el espacio reservado sin deformarse y
  sin cambiar la altura del slider ni de la sección.
- **Pantalla muy estrecha (320 px)**: el nombre, el objetivo corto y el texto de la diapositiva se
  leen sin desbordarse; los controles siguen siendo tocables y no hay scroll horizontal.
- **Deslizamiento vertical en celular**: un gesto principalmente vertical hace scroll de la página
  y no cambia de diapositiva.
- **Pestaña del navegador en segundo plano**: el slider no acumula avances; al volver, continúa
  desde la diapositiva en que estaba.
- **El visitante pausa y luego pasa el mouse o enfoca**: el slider permanece en pausa; retirar el
  mouse o el foco no lo reanuda si la pausa fue explícita.
- **Cantidad de diapositivas distinta de 5**: si el equipo agrega o quita diapositivas en los
  datos, el slider y sus indicadores se ajustan solos; con una sola diapositiva no se muestran
  flechas, indicadores ni reproducción automática.
- **Texto largo en un indicador o recurso**: el contenido se ajusta en varias líneas sin romper la
  grilla.

## Requirements *(mandatory)*

### Functional Requirements

**Slider principal**

- **FR-001**: El Inicio MUST mostrar en la parte superior un slider que ocupe el ancho completo de
  la ventana, con 5 diapositivas iniciales.
- **FR-002**: Cada diapositiva MUST tener un título corto, una frase y una imagen opcional con su
  texto alternativo.
- **FR-003**: Sobre el slider MUST mostrarse el nombre del proyecto y su objetivo corto, visibles
  en todas las diapositivas.
- **FR-004**: El slider MUST avanzar automáticamente cada 6 segundos y volver a la primera
  diapositiva después de la última.
- **FR-005**: El slider MUST ofrecer un botón visible para pausar y reanudar la reproducción
  automática, con su estado indicado de forma accesible.
- **FR-006**: El slider MUST ofrecer flechas de anterior y siguiente, e indicadores de posición que
  muestren la diapositiva actual y permitan saltar a cualquier diapositiva.
- **FR-007**: Todos los controles del slider MUST poder operarse con teclado (Tab, Enter, Espacio)
  y, con el foco en el slider, las flechas izquierda y derecha MUST cambiar de diapositiva.
- **FR-008**: El slider MUST permitir cambiar de diapositiva con un deslizamiento táctil
  horizontal, sin bloquear el scroll vertical de la página.
- **FR-009**: La reproducción automática MUST detenerse mientras el puntero esté sobre el slider o
  el foco esté dentro de él, y reanudarse al salir solo si el visitante no la pausó explícitamente.
- **FR-010**: Si el visitante prefiere reducir animaciones, el slider MUST iniciar en pausa y los
  cambios de diapositiva MUST ocurrir sin animación.
- **FR-011**: Al cambiar de diapositiva por acción del visitante, los lectores de pantalla MUST
  anunciar la posición y el título de la diapositiva actual; durante el avance automático MUST NOT
  interrumpir al lector con anuncios.
- **FR-012**: Cada diapositiva sin imagen, o cuya imagen no cargue, MUST mostrar un fondo neutro con
  los tonos del sitio, del mismo tamaño que la imagen.
- **FR-013**: El texto sobre las diapositivas MUST cumplir un contraste mínimo de 4.5:1 con
  cualquier fondo, con o sin foto.
- **FR-014**: La imagen de la primera diapositiva MUST cargarse de inmediato y las demás MUST
  cargarse de forma diferida.

**Secciones del Inicio**

- **FR-015**: Debajo del slider, el Inicio MUST organizarse en exactamente 3 secciones, en este
  orden: "El proyecto", "Qué queremos lograr" y "Con qué lo haremos".
- **FR-016**: Cada una de las 3 secciones MUST tener un espacio reservado para una imagen de apoyo
  que muestre el placeholder mientras no haya foto, sin cambiar sus dimensiones al cargar la foto.
- **FR-017**: "El proyecto" MUST incluir: (a) por qué se desarrolla, con la situación de los
  corregimientos y las dos problemáticas de origen; (b) quién lo desarrolla; (c) el objetivo general
  dividido en cuatro ideas etiquetadas Qué es, Para quién, Cómo y Para qué; (d) los cuatro pilares
  (sostenibilidad, generación de ingresos, aprovechamiento de espacios y aporte orgánico); y (e) una
  insignia con la línea de trabajo "Huertas caseras con alimentos" y la metodología "Líderes
  Sostenibles en Acción".
- **FR-018**: "Qué queremos lograr" MUST mostrar los seis objetivos específicos numerados en orden.
- **FR-019**: "Qué queremos lograr" MUST mostrar los ocho indicadores de éxito (Cumplimiento,
  Participación, Infraestructura, Siembra, Aprendizaje, Sostenibilidad, Ingresos y Satisfacción),
  cada uno con su nombre, una descripción breve y su meta destacada visualmente.
- **FR-020**: Cada meta de indicador MUST poder editarse en los datos del sitio; si no tiene valor
  definido, MUST mostrarse "Por definir con el grupo".
- **FR-021**: "Con qué lo haremos" MUST mostrar los recursos agrupados en cinco categorías
  (Humanos, Materiales de producción, Espacio, Didácticos y logísticos, Registro y comunicación),
  cada una con título, ícono decorativo y lista de elementos.
- **FR-022**: Al final de "Con qué lo haremos" MUST haber dos llamados a la acción que lleven a
  Problemáticas y a Actividades.
- **FR-023**: Todo el contenido del Inicio (diapositivas, textos, objetivos, indicadores, recursos
  y nombres de imágenes) MUST definirse en los archivos de datos del sitio, no en la presentación.
- **FR-024**: Agregar la foto de una diapositiva o de una sección MUST consistir en colocar el
  archivo en la carpeta de imágenes y escribir su nombre en los datos correspondientes.

**Diseño y coherencia del sitio**

- **FR-025**: El sitio MUST aplicar un aspecto renovado con más espacio entre elementos, jerarquía
  tipográfica clara, tarjetas con bordes redondeados y estados de hover y foco visibles,
  conservando la paleta agrícola (verdes, tierra, crema y ocre).
- **FR-026**: Las secciones del Inicio MUST aparecer con una transición suave al entrar en pantalla
  durante el scroll; con la preferencia de reducir animaciones MUST aparecer sin transición.
- **FR-027**: La navbar MUST conservar sus enlaces (Inicio, Problemáticas, Actividades), su posición
  fija, el menú desplegable en celular y el resaltado de la sección activa, y adoptar el nuevo
  aspecto.
- **FR-028**: El footer, Problemáticas y Actividades MUST adoptar el nuevo aspecto sin cambiar su
  contenido ni su funcionamiento (pestañas, tarjetas y modal).
- **FR-029**: Todo elemento interactivo del sitio MUST mostrar un indicador de foco visible con
  contraste mínimo de 3:1 frente a su fondo.
- **FR-030**: Todos los textos del sitio MUST cumplir contraste mínimo de 4.5:1 (3:1 para texto
  grande).
- **FR-031**: El Inicio MUST verse correctamente en celular, tableta y escritorio; en celular las
  secciones y sus columnas se apilan en una sola columna y no hay scroll horizontal desde 320 px.
- **FR-032**: Las imágenes del slider y de las secciones MUST tener un espacio reservado con
  proporción fija, de modo que su carga no produzca saltos en el diseño.
- **FR-033**: Todo el contenido visible MUST estar en español (Colombia).

### Key Entities *(include if feature involves data)*

- **Diapositiva (Slide)**: título corto, frase, nombre de imagen opcional y texto alternativo. Se
  muestran en el orden en que están definidas.
- **Información del proyecto (ProjectInfo, ampliada)**: nombre, objetivo corto, por qué (contexto y
  problemáticas de origen), quién (responsable, institución, práctica, comunidad), objetivo general
  en cuatro ideas, línea de trabajo y metodología, pilares, y la imagen de apoyo de cada sección.
- **Idea del objetivo general (ObjectiveFacet)**: etiqueta (Qué es, Para quién, Cómo, Para qué) y
  texto.
- **Objetivo específico (SpecificObjective)**: número de orden y texto.
- **Indicador de éxito (SuccessIndicator)**: nombre o criterio, descripción breve y meta editable
  (puede estar sin definir).
- **Categoría de recursos (ResourceGroup)**: título, ícono decorativo y lista de elementos.
- **Pilar (Pillar)**: entidad existente; se conserva con título, descripción e ícono.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Al abrir el Inicio, el visitante ve el slider con 5 diapositivas (con foto o fondo
  neutro) y puede recorrerlas todas con mouse, con teclado y con gesto táctil, en el 100 % de las
  pruebas en celular, tableta y escritorio.
- **SC-002**: Un visitante nuevo puede responder, tras leer solo el Inicio y en menos de 3 minutos,
  por qué existe el proyecto, quién lo lleva, qué busca, con qué recursos y cómo se medirá su éxito.
- **SC-003**: El Inicio tiene como máximo 3 secciones debajo del slider, y cada una muestra su
  espacio de imagen de apoyo sin descuadrar el diseño cuando está vacío.
- **SC-004**: Con el slider en reproducción, pausar requiere una sola acción y se puede hacer con
  teclado; con la preferencia de reducir animaciones activa, no hay ningún movimiento automático.
- **SC-005**: Todos los textos, incluidos los que están sobre fotos, alcanzan contraste de 4.5:1 o
  superior en la auditoría de accesibilidad, y la auditoría no reporta errores críticos.
- **SC-006**: La carga de imágenes no produce desplazamientos visibles del diseño (puntuación de
  estabilidad visual "buena" en una auditoría estándar de rendimiento).
- **SC-007**: En una conexión móvil típica, el contenido principal del Inicio se muestra en menos de
  2,5 segundos.
- **SC-008**: Inicio, Problemáticas y Actividades comparten el mismo estilo de navbar, footer,
  títulos, tarjetas y foco, y el contenido de Problemáticas y Actividades no presenta ningún cambio.
- **SC-009**: Cambiar una meta de indicador o asignar la foto de una diapositiva requiere editar una
  sola línea en los datos del sitio.

## Assumptions

- **Contenido real**: los textos de "por qué", "quién", objetivo general, objetivos específicos,
  indicadores y recursos son los entregados en la descripción y reemplazan el borrador actual del
  Inicio. Se pueden ajustar levemente para su lectura en pantalla sin cambiar su sentido.
- **Objetivo corto**: el objetivo que aparece sobre el slider es una síntesis de una frase derivada
  de las cuatro ideas del objetivo general (por ejemplo, "Una huerta comunitaria de setas orellanas
  para generar ingresos, aprovechar espacios y devolverle materia orgánica a la tierra").
- **Textos de las diapositivas**: los títulos y frases de las 5 diapositivas no fueron entregados;
  se redactan como borrador a partir del contexto del proyecto (por ejemplo, la huerta, el residuo
  que se vuelve sustrato, la capacitación, el trabajo en comunidad y la primera cosecha) y quedan
  marcados para revisión del equipo.
- **Metas sin valor**: Siembra y Satisfacción no tienen meta numérica; se muestran como "Por definir
  con el grupo" o con su texto descriptivo hasta que el equipo las fije.
- **Ritmo del slider**: 6 segundos por diapositiva, suficiente para leer un título y una frase.
- **Fotos**: al inicio ninguna diapositiva ni sección tiene foto; todas usan el fondo neutro o el
  placeholder existente. Las fotos se agregarán en la carpeta de imágenes del sitio.
- **Pilares**: se conservan los cuatro pilares actuales y sus descripciones.
- **"La navbar se conserva"**: se mantienen sus enlaces, estructura y comportamiento; solo cambia su
  aspecto visual.
- **Actividades**: la mención "4 de 4 actividades en las 4 semanas" del indicador de Cumplimiento
  no cambia el contenido de la página Actividades.
- **Tipografía y paleta**: se conservan las familias tipográficas y los colores base del sitio; el
  rediseño ajusta tamaños, espaciados, radios, sombras y estados, y puede agregar tonos derivados de
  la misma paleta.
- **Dependencias**: el rediseño se apoya en el sitio existente (navbar, rutas centralizadas,
  manejo de imágenes con placeholder y tokens de diseño) y respeta la constitución del proyecto;
  si el plan requiere alguna excepción, se justificará allí.
- **Fuera de alcance**: backend, formularios, buscador, blog, galería completa, multi-idioma, modo
  oscuro y cualquier cambio en el contenido de Problemáticas y Actividades.
