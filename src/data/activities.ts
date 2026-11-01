// DRAFT: pending team review
import type { Activity } from '../types';

/**
 * Work-plan activities. To add a real photo: copy the file to
 * `src/assets/images/activities/` and set `image: 'file-name.jpg'` (review `imageAlt`).
 */
export const activities: Activity[] = [
  {
    id: 'product-training',
    week: 1,
    title: 'Capacitación sobre el producto',
    summary:
      'Conocemos la seta orellana: sus características, su ciclo de cultivo, sus usos en la cocina y su valor en el mercado local.',
    image: null,
    imageAlt: 'Integrantes del grupo comunitario durante la capacitación sobre setas orellanas',
    duration: '1 semana (dos sesiones presenciales de 3 horas)',
    strategy:
      'Taller teórico-práctico con lenguaje sencillo: presentación ilustrada sobre Pleurotus ostreatus, observación de setas frescas y diálogo de saberes para relacionar el cultivo con la experiencia agrícola de la comunidad.',
    channels: ['Encuentros presenciales en el salón comunal', 'Grupo de WhatsApp del proyecto'],
    responsible: 'Equipo de estudiantes de UNIMINUTO con acompañamiento docente',
    resources: [
      'Presentación ilustrada y cartilla impresa',
      'Muestras de setas orellanas frescas',
      'Tablero, marcadores y hojas de registro',
    ],
    indicators: [
      'Número de integrantes del grupo que asisten a las dos sesiones',
      'Porcentaje de participantes que identifican las etapas del cultivo',
      'Preguntas e inquietudes registradas al cierre del taller',
    ],
  },
  {
    id: 'sustainable-awareness',
    week: 2,
    title: 'Concientización sobre la producción sostenible del producto',
    summary:
      'Reflexionamos sobre cómo producir sin dañar el entorno y cómo los residuos agrícolas pueden convertirse en sustrato y abono.',
    image: null,
    imageAlt: 'Residuos agrícolas reunidos para preparar el sustrato de las setas',
    duration: '1 semana (una sesión de 3 horas y una visita de reconocimiento)',
    strategy:
      'Conversatorio y recorrido por fincas vecinas para identificar residuos disponibles (tamo, cascarilla, bagazo, rastrojo), seguido de un ejercicio grupal sobre buenas prácticas de higiene, manejo del agua y aprovechamiento del sustrato agotado como abono.',
    channels: [
      'Conversatorio presencial',
      'Recorrido de campo por el corregimiento',
      'Grupo de WhatsApp del proyecto',
    ],
    responsible: 'Equipo de estudiantes de UNIMINUTO y líderes del grupo comunitario',
    resources: [
      'Guía de buenas prácticas de producción sostenible',
      'Muestras de residuos agrícolas de la zona',
      'Carteleras y material de apoyo visual',
    ],
    indicators: [
      'Residuos agrícolas locales identificados como posible sustrato',
      'Compromisos de buenas prácticas acordados por el grupo',
      'Número de familias que se ofrecen a aportar residuos',
    ],
  },
  {
    id: 'garden-structure',
    week: 3,
    title: 'Creación de la estructuración de la huerta',
    summary:
      'Adecuamos un espacio subutilizado como área de cultivo, con zonas de preparación, incubación y fructificación.',
    image: null,
    imageAlt: 'Espacio adecuado con estanterías para el cultivo de setas',
    duration: '1 semana (jornadas de trabajo comunitario)',
    strategy:
      'Minga de trabajo para limpiar y adecuar el espacio elegido: control de luz, ventilación y humedad, instalación de estanterías con materiales reutilizados y señalización de las zonas de trabajo.',
    channels: ['Jornadas de trabajo comunitario (minga)', 'Grupo de WhatsApp del proyecto'],
    responsible: 'Grupo comunitario con orientación del equipo de UNIMINUTO',
    resources: [
      'Espacio cubierto cedido por la comunidad',
      'Estanterías o estructuras en madera reutilizada',
      'Plástico negro, polisombra y elementos de limpieza',
      'Termohigrómetro para medir temperatura y humedad',
    ],
    indicators: [
      'Metros cuadrados de espacio subutilizado recuperado',
      'Número de participantes en las jornadas de trabajo',
      'Zonas de incubación y fructificación terminadas',
    ],
  },
  {
    id: 'sowing',
    week: 4,
    title: 'Siembra del producto',
    summary:
      'Preparamos el sustrato, lo inoculamos con semilla de orellana y organizamos los turnos de cuidado hasta la primera cosecha.',
    image: null,
    imageAlt: 'Bolsas de sustrato inoculadas con semilla de setas orellanas',
    duration: '1 semana (siembra y seguimiento inicial)',
    strategy:
      'Práctica guiada paso a paso: picado, hidratación y pasteurización del sustrato, inoculación con semilla certificada, embolsado y traslado a la zona de incubación; se acuerda un calendario de turnos para el seguimiento diario.',
    channels: [
      'Práctica presencial en la huerta',
      'Grupo de WhatsApp para reportes de seguimiento',
    ],
    responsible: 'Grupo comunitario con supervisión del equipo de UNIMINUTO',
    resources: [
      'Sustrato preparado con residuos agrícolas',
      'Semilla (micelio) de Pleurotus ostreatus',
      'Bolsas plásticas, guantes, tapabocas y recipientes para pasteurizar',
      'Planilla de seguimiento de temperatura, humedad y crecimiento',
    ],
    indicators: [
      'Número de bolsas sembradas',
      'Porcentaje de bolsas colonizadas sin contaminación',
      'Cumplimiento del calendario de turnos de cuidado',
    ],
  },
];
