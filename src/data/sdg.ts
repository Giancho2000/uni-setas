// DRAFT: pending team review
import type { Sdg, SdgLevelInfo, SdgPageContent } from '../types';

/**
 * Sustainable Development Goals (ODS) the project contributes to, at a local scale.
 * Wording rule: the project "contribuye/aporta/promueve/fortalece"; it never claims to fulfil an SDG.
 * Images: base names inside `src/assets/images/sdg/` (e.g. `ods-2`); missing files show the placeholder.
 * Colors are not stored here: they come from the `--sdg-<id>` tokens in `src/styles/tokens.css`.
 */

export const sdgLevels: SdgLevelInfo[] = [
  {
    id: 'directa',
    title: 'Contribución directa',
    filterLabel: 'Directa',
    badge: 'Contribución directa',
    description:
      'El proyecto aporta a estos ODS con resultados que se evidencian en el plan de trabajo.',
  },
  {
    id: 'complementaria',
    title: 'Contribución complementaria',
    filterLabel: 'Complementaria',
    badge: 'Contribución complementaria',
    description:
      'Aportes que acompañan a los directos y fortalecen el trabajo con el grupo comunitario.',
  },
  {
    id: 'indirecta',
    title: 'Contribución indirecta o de largo plazo',
    filterLabel: 'Indirecta',
    badge: 'Contribución indirecta',
    description: 'Aportes posibles a largo plazo. No se miden en el plan actual de cuatro semanas.',
  },
];

export const sdgs: Sdg[] = [
  // Direct contribution
  {
    id: 2,
    name: 'Hambre cero',
    level: 'directa',
    summary:
      'Producción de un alimento nutritivo en un espacio pequeño y de bajo costo, que diversifica la producción de las familias.',
    detail: [
      'El cultivo de setas orellanas permite producir un alimento nutritivo en un espacio pequeño y con una inversión baja, aprovechando un lugar que antes no se usaba.',
      'Así el proyecto contribuye, a nivel local, a diversificar la producción de las familias del grupo comunitario.',
    ],
    targets: [
      {
        code: '2.3',
        text: 'Aumentar la productividad agrícola y los ingresos de los productores de alimentos en pequeña escala, incluidos los agricultores familiares.',
      },
      {
        code: '2.4',
        text: 'Asegurar la sostenibilidad de los sistemas de producción de alimentos y aplicar prácticas agrícolas resilientes.',
      },
    ],
    image: 'ods-2',
    imageAlt: 'Huerta comunitaria del proyecto con el espacio adecuado para el cultivo de setas',
    activityIds: ['garden-structure', 'sowing'],
    indicatorIds: ['infrastructure', 'income'],
  },
  {
    id: 8,
    name: 'Trabajo decente y crecimiento económico',
    level: 'directa',
    summary: 'Alternativa de ingresos y fortalecimiento del emprendimiento comunitario.',
    detail: [
      'La producción y venta de setas abre una alternativa de ingresos para las familias vinculadas al proyecto.',
      'La capacitación y el trabajo en grupo fortalecen el emprendimiento comunitario, que puede continuar después del primer ciclo de cosecha.',
    ],
    targets: [
      {
        code: '8.3',
        text: 'Promover políticas que apoyen las actividades productivas, la creación de empleo decente, el emprendimiento, la creatividad y la innovación.',
      },
    ],
    image: 'ods-8',
    imageAlt: 'Integrantes del grupo comunitario trabajando juntos en el proyecto',
    activityIds: ['product-training', 'sowing'],
    indicatorIds: ['income', 'participation'],
  },
  {
    id: 12,
    name: 'Producción y consumo responsables',
    level: 'directa',
    summary:
      'Los residuos agrícolas se reutilizan como sustrato en lugar de quemarse, y el sustrato agotado vuelve como abono.',
    detail: [
      'Los residuos agrícolas de la zona (pulpa de café, cascarilla y paja) se reutilizan como sustrato para las setas en lugar de quemarse.',
      'Después de la cosecha, el sustrato agotado vuelve al suelo como abono orgánico. Así el proyecto promueve un uso más eficiente de los recursos disponibles.',
    ],
    targets: [
      {
        code: '12.2',
        text: 'Lograr la gestión sostenible y el uso eficiente de los recursos naturales.',
      },
      {
        code: '12.5',
        text: 'Reducir considerablemente la generación de desechos mediante la prevención, reducción, reciclado y reutilización.',
      },
    ],
    image: 'ods-12',
    imageAlt: 'Residuos agrícolas reunidos para preparar el sustrato de las setas',
    activityIds: ['sustainable-awareness', 'sowing'],
    indicatorIds: ['sustainability'],
  },
  // Complementary contribution
  {
    id: 1,
    name: 'Fin de la pobreza',
    level: 'complementaria',
    summary: 'Ingresos adicionales para familias rurales con una economía poco diversificada.',
    detail: [
      'Las familias rurales del corregimiento dependen de pocas fuentes de ingreso. Las primeras ventas de setas aportan ingresos adicionales a esa economía poco diversificada.',
    ],
    targets: [
      {
        code: '1.4',
        text: 'Garantizar que las personas, en particular las pobres y vulnerables, tengan los mismos derechos a los recursos económicos y acceso a los servicios básicos.',
      },
    ],
    image: 'ods-1',
    imageAlt: 'Familias del corregimiento participando en las actividades del proyecto',
    activityIds: ['sowing'],
    indicatorIds: ['income'],
  },
  {
    id: 4,
    name: 'Educación de calidad',
    level: 'complementaria',
    summary: 'Capacitación técnica y concientización sobre producción sostenible.',
    detail: [
      'El grupo comunitario recibe capacitación técnica sobre el cultivo de la seta orellana y su valor en el mercado.',
      'Además, la concientización sobre producción sostenible fortalece los conocimientos prácticos para cuidar los recursos del territorio.',
    ],
    targets: [
      {
        code: '4.4',
        text: 'Aumentar el número de jóvenes y adultos con competencias técnicas para acceder al empleo, el trabajo decente y el emprendimiento.',
      },
      {
        code: '4.7',
        text: 'Asegurar que los estudiantes adquieran los conocimientos teóricos y prácticos necesarios para promover el desarrollo sostenible.',
      },
    ],
    image: 'ods-4',
    imageAlt: 'Integrantes del grupo comunitario durante una jornada de capacitación en campo',
    activityIds: ['product-training', 'sustainable-awareness'],
    indicatorIds: ['participation', 'learning'],
  },
  {
    id: 13,
    name: 'Acción por el clima',
    level: 'complementaria',
    summary: 'Menos quema de residuos agrícolas y sensibilización ambiental.',
    detail: [
      'Al usar los residuos agrícolas como sustrato, se reduce su quema en la zona.',
      'Las actividades de concientización promueven la sensibilización ambiental del grupo comunitario.',
    ],
    targets: [
      {
        code: '13.3',
        text: 'Mejorar la educación, la sensibilización y la capacidad humana respecto de la mitigación del cambio climático y la adaptación a él.',
      },
    ],
    image: 'ods-13',
    imageAlt: 'Residuos agrícolas aprovechados en lugar de quemarse',
    activityIds: ['sustainable-awareness'],
    indicatorIds: ['sustainability'],
  },
  {
    id: 17,
    name: 'Alianzas para lograr los objetivos',
    level: 'complementaria',
    summary: 'Trabajo conjunto entre UNIMINUTO, el grupo comunitario y su líder.',
    detail: [
      'El proyecto se desarrolla en conjunto entre UNIMINUTO, el grupo comunitario del corregimiento y su líder.',
      'Esta alianza local fortalece la continuidad del trabajo más allá de las cuatro semanas del plan.',
    ],
    targets: [
      {
        code: '17.17',
        text: 'Fomentar y promover alianzas eficaces en las esferas pública, público-privada y de la sociedad civil.',
      },
    ],
    image: 'ods-17',
    imageAlt: 'Estudiante de UNIMINUTO junto a una integrante del grupo comunitario',
    activityIds: ['product-training'],
    indicatorIds: ['participation', 'compliance'],
  },
  // Indirect or long-term contribution
  {
    id: 3,
    name: 'Salud y bienestar',
    level: 'indirecta',
    summary: 'Acceso a un alimento rico en proteína y fibra.',
    detail: [
      'La seta orellana es un alimento rico en proteína y fibra. Tenerla a la mano puede aportar, a largo plazo, a una alimentación más variada en las familias.',
      'Es una contribución indirecta: no se mide en el plan actual de cuatro semanas.',
    ],
    targets: [
      {
        code: '3.4',
        text: 'Reducir la mortalidad prematura por enfermedades no transmisibles mediante su prevención y promover la salud y el bienestar.',
      },
    ],
    image: 'ods-3',
    imageAlt: 'Setas orellanas como alimento para las familias',
    activityIds: ['sowing'],
    indicatorIds: [],
  },
  {
    id: 15,
    name: 'Vida de ecosistemas terrestres',
    level: 'indirecta',
    summary: 'El abono orgánico devuelve materia orgánica al suelo.',
    detail: [
      'El sustrato agotado se convierte en abono orgánico que devuelve materia orgánica al suelo.',
      'Es una contribución indirecta y de largo plazo: no se mide en el plan actual de cuatro semanas.',
    ],
    targets: [
      {
        code: '15.3',
        text: 'Luchar contra la desertificación y rehabilitar las tierras y los suelos degradados.',
      },
    ],
    image: 'ods-15',
    imageAlt: 'Material orgánico preparado para volver al suelo como abono',
    activityIds: ['sustainable-awareness'],
    indicatorIds: [],
  },
];

export const sdgPageContent: SdgPageContent = {
  title: 'Objetivos de Desarrollo Sostenible (ODS)',
  subtitle:
    'Cómo la huerta de setas orellanas contribuye, a nivel local, a la Agenda 2030 de las Naciones Unidas.',
  intro: {
    eyebrow: 'Agenda 2030',
    title: 'Qué son los ODS y por qué importan en el proyecto',
    paragraphs: [
      'Los Objetivos de Desarrollo Sostenible (ODS) son 17 metas globales que los Estados miembros de las Naciones Unidas adoptaron en 2015 como parte de la Agenda 2030, para poner fin a la pobreza, proteger el planeta y mejorar la vida de las personas.',
      'Cada objetivo tiene metas concretas, y las acciones locales, por pequeñas que sean, pueden aportar a ellas.',
    ],
    localMessage:
      'La huerta de setas orellanas contribuye a nivel local a algunos ODS. Es una intervención pequeña, de cuatro semanas, con un grupo comunitario de un corregimiento: no pretende resolverlos, sino aportar desde el territorio.',
    unLink: {
      label: 'Conoce los ODS en el sitio oficial de la ONU',
      href: 'https://www.un.org/sustainabledevelopment/es/',
    },
    image: {
      folder: 'sdg',
      image: 'intro',
      alt: 'Integrantes del grupo comunitario en la huerta del proyecto',
    },
  },
  catalog: {
    eyebrow: 'Contribución',
    title: 'ODS a los que contribuye el proyecto',
    intro:
      'Nueve ODS en tres niveles de contribución. Selecciona una tarjeta para ver cómo se relaciona con el proyecto.',
  },
  summary: {
    eyebrow: 'Plan de trabajo',
    title: 'De la actividad al ODS',
    intro: 'Cada actividad del plan de trabajo aporta a uno o varios ODS.',
    caption: 'Relación entre las actividades del plan de trabajo y los ODS',
    cta: { label: 'Ver las actividades', routeId: 'activities' },
  },
};
