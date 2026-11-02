// DRAFT: pending team review
import type { ProjectInfo } from '../types';

export const project: ProjectInfo = {
  name: 'Huerta comunitaria de setas orellanas',
  scientificName: 'Pleurotus ostreatus',
  institution: 'UNIMINUTO',
  objective:
    'Fortalecer la sostenibilidad de un grupo comunitario del corregimiento mediante el cultivo de setas orellanas, generando ingresos dignos para sus integrantes, aprovechando espacios subutilizados y aportando materia orgánica a partir de la reutilización de residuos agrícolas.',
  shortObjective:
    'Una huerta comunitaria de setas orellanas para generar ingresos, aprovechar espacios y devolverle materia orgánica a la tierra.',
  why: {
    paragraphs: [
      'En los corregimientos rurales, las familias dependen de pocos cultivos tradicionales, como el café y el plátano, cuyos precios son volátiles. Hay desempleo y pocas oportunidades de generar ingresos, los patios y lotes están subutilizados y los residuos agrícolas (pulpa de café, cascarilla, hojas) suelen quemarse.',
    ],
    originProblems: [
      'Desempleo y falta de oportunidades de generación de ingresos dignos en comunidades rurales.',
      'Subutilización de espacios productivos y bajo aprovechamiento de residuos orgánicos agrícolas.',
    ],
  },
  author: {
    name: 'Giancarlo Reina',
    role: 'Estudiante, práctica de Responsabilidad Social vinculada al Proyecto Social de Formación',
    institution: 'UNIMINUTO',
  },
  community: 'Un grupo comunitario de un corregimiento rural y su líder comunitario.',
  workLine: {
    name: 'Huertas caseras con alimentos',
    methodology: 'Teoría del Cambio Social «Líderes Sostenibles en Acción»',
  },
  generalObjective: {
    summary:
      'Crear una huerta comunitaria de alimentos basada en el cultivo de setas orellanas, con y para las familias de un corregimiento rural.',
    ideas: [
      {
        label: 'Qué es',
        icon: 'sprout',
        text: 'Una huerta comunitaria de alimentos basada en el cultivo de setas orellanas.',
      },
      {
        label: 'Para quién',
        icon: 'users',
        text: 'Un grupo de familias de un corregimiento rural.',
      },
      {
        label: 'Cómo',
        icon: 'handshake',
        text: 'Con capacitación, concientización y trabajo participativo para estructurar la huerta y sembrar.',
      },
      {
        label: 'Para qué',
        icon: 'target',
        text: 'Impulsar la sostenibilidad generando ingresos, aprovechando espacios subutilizados y dejando aporte orgánico: los residuos agrícolas sirven de sustrato y el sustrato agotado vuelve como abono.',
      },
    ],
  },
  specificObjectives: [
    'Capacitar al grupo comunitario en el cultivo, manejo y valor nutricional y comercial de la seta orellana.',
    'Concientizar a la comunidad sobre la producción sostenible y el aprovechamiento de residuos orgánicos.',
    'Adecuar y estructurar un espacio subutilizado como huerta comunitaria.',
    'Realizar la siembra de las setas con participación de las familias capacitadas.',
    'Sentar las bases de una alternativa de ingresos con el primer ciclo de cosecha.',
    'Documentar y evaluar el proceso con la comunidad para que pueda continuarse y replicarse.',
  ],
  indicators: [
    {
      id: 'compliance',
      label: 'Cumplimiento',
      criterion: 'Cumplimiento',
      description: 'Actividades del plan ejecutadas en las 4 semanas.',
      target: { value: '4 de 4', detail: 'actividades ejecutadas en las 4 semanas (100 %)' },
    },
    {
      id: 'participation',
      label: 'Participación',
      criterion: 'Participación',
      description: 'Personas capacitadas y familias vinculadas al proyecto.',
      target: { value: '15 · 10', detail: 'personas capacitadas · familias vinculadas' },
    },
    {
      id: 'infrastructure',
      label: 'Infraestructura',
      criterion: 'Resultados',
      description: 'Huerta comunitaria construida y espacio adecuado.',
      target: { value: '20 m²', detail: '1 huerta comunitaria construida' },
    },
    {
      id: 'planting',
      label: 'Siembra',
      criterion: 'Resultados',
      description: 'Número de bolsas sembradas.',
      target: null,
    },
    {
      id: 'learning',
      label: 'Aprendizaje',
      criterion: 'Resultados',
      description: 'Asistentes que demuestran apropiación en la encuesta final.',
      target: { value: '80 %', detail: 'de los asistentes demuestra apropiación' },
    },
    {
      id: 'sustainability',
      label: 'Sostenibilidad',
      criterion: 'Impactos',
      description: 'Kilogramos de residuos orgánicos reutilizados como sustrato.',
      target: null,
    },
    {
      id: 'income',
      label: 'Ingresos',
      criterion: 'Impactos',
      description:
        'Kilogramos cosechados y primeras ventas del primer ciclo (4 a 6 semanas después de la siembra).',
      target: null,
    },
    {
      id: 'satisfaction',
      label: 'Satisfacción',
      criterion: 'Participación',
      description: 'Satisfacción de la comunidad medida con una encuesta breve.',
      target: null,
    },
  ],
  resources: [
    {
      id: 'human',
      category: 'Humanos',
      icon: 'users',
      items: [
        'Estudiante líder del proyecto',
        'Líder comunitario',
        'Familias participantes',
        'Apoyo técnico (docente o asesor)',
      ],
    },
    {
      id: 'production',
      category: 'Materiales de producción',
      icon: 'package',
      items: [
        'Semilla (micelio) de seta ostra',
        'Sustrato orgánico (pulpa de café, cascarilla, paja)',
        'Bolsas',
        'Plástico negro',
        'Guadua o madera para estantería',
        'Guantes',
        'Alcohol antiséptico',
        'Agua',
        'Herramientas agrícolas',
      ],
    },
    {
      id: 'space',
      category: 'Espacio',
      icon: 'map-pin',
      items: ['Lote o patio comunitario de unos 20 m², con sombra y buena ventilación'],
    },
    {
      id: 'teaching',
      category: 'Didácticos y logísticos',
      icon: 'presentation',
      items: [
        'Salón comunal',
        'Video beam',
        'Cartillas',
        'Material impreso',
        'Listas de asistencia',
        'Refrigerios',
      ],
    },
    {
      id: 'records',
      category: 'Registro y comunicación',
      icon: 'camera',
      items: ['Celular o cámara para evidencias', 'Grupo de WhatsApp'],
    },
  ],
  pillars: [
    {
      id: 'sustainability',
      title: 'Sostenibilidad',
      description:
        'Un modelo de producción que cuida el ambiente y que el grupo puede mantener en el tiempo con sus propios recursos.',
      icon: 'leaf',
    },
    {
      id: 'income',
      title: 'Generación de ingresos',
      description:
        'La venta de setas frescas y sus derivados abre una fuente de ingresos complementaria para las familias del grupo.',
      icon: 'coins',
    },
    {
      id: 'space-use',
      title: 'Aprovechamiento de espacios',
      description:
        'Patios, bodegas y rincones sin uso se convierten en áreas productivas, porque las orellanas crecen en espacios pequeños y cubiertos.',
      icon: 'sprout',
    },
    {
      id: 'organic-input',
      title: 'Aporte orgánico',
      description:
        'Residuos agrícolas como tamo, cascarilla o bagazo sirven de sustrato y, tras la cosecha, se transforman en abono para la tierra.',
      icon: 'recycle',
    },
  ],
  sectionImages: {
    proyecto: { image: null, alt: 'Familias del corregimiento trabajando en la huerta de setas' },
    logros: { image: null, alt: 'Bolsas de sustrato con setas orellanas en crecimiento' },
    recursos: { image: null, alt: 'Materiales y herramientas para el cultivo de setas' },
  },
};
