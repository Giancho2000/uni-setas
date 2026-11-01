// DRAFT: pending team review
import type { Problem, ProblemSectionKey } from '../types';

/** Order of the section tabs inside each problem. */
export const PROBLEM_SECTION_ORDER: ProblemSectionKey[] = [
  'local',
  'national',
  'global',
  'causes',
  'effects',
];

/** Visible labels of the section tabs. */
export const PROBLEM_SECTION_LABELS: Record<ProblemSectionKey, string> = {
  local: 'Local',
  national: 'Nacional',
  global: 'Global',
  causes: 'Causas',
  effects: 'Efectos',
};

export const problems: Problem[] = [
  {
    id: 'unemployment',
    shortTitle: 'Desempleo rural',
    title:
      'Desempleo y falta de oportunidades de generación de ingresos dignos en comunidades rurales de corregimientos',
    sections: {
      local: {
        blocks: [
          {
            paragraphs: [
              'En el corregimiento, buena parte de las familias depende de trabajos agrícolas temporales, jornales ocasionales y pequeñas ventas informales. Estas actividades no garantizan un ingreso estable durante todo el año y suelen concentrarse en las épocas de siembra y cosecha.',
              'Las mujeres, los jóvenes y las personas mayores encuentran aún menos alternativas: muchas veces deben desplazarse a la cabecera municipal o a la ciudad para conseguir empleo, lo que debilita los lazos familiares y comunitarios.',
              'El grupo comunitario con el que trabaja el proyecto cuenta con conocimiento agrícola, disposición para organizarse y algunos espacios disponibles, pero no ha tenido acceso a una iniciativa productiva propia que le permita generar ingresos de forma conjunta.',
            ],
          },
        ],
      },
      national: {
        blocks: [
          {
            paragraphs: [
              'En Colombia, las zonas rurales presentan niveles de informalidad laboral y de pobreza más altos que las ciudades. La mayoría de quienes trabajan en el campo lo hacen sin contrato, sin seguridad social y con ingresos por debajo de lo necesario para cubrir sus necesidades básicas.',
              'La brecha entre lo urbano y lo rural se expresa también en el acceso a crédito, asistencia técnica, conectividad y educación, factores que limitan la creación de emprendimientos en los corregimientos y veredas.',
              'Diversas políticas públicas reconocen la necesidad de una reforma rural integral y de fortalecer la economía campesina y solidaria, pero su implementación todavía no alcanza de manera suficiente a las comunidades más apartadas.',
            ],
          },
        ],
      },
      global: {
        blocks: [
          {
            paragraphs: [
              'A nivel mundial, la pobreza extrema se concentra principalmente en zonas rurales, donde el empleo agrícola es estacional, poco remunerado y vulnerable a los cambios del clima y de los precios.',
              'Organismos internacionales y la Agenda 2030 para el Desarrollo Sostenible —en particular el Objetivo 8, trabajo decente y crecimiento económico— señalan que diversificar las actividades productivas rurales es clave para reducir la pobreza y la migración forzada hacia las ciudades.',
              'Experiencias en distintos países muestran que los cultivos de ciclo corto y bajo costo inicial, como el de las setas comestibles, pueden convertirse en una fuente complementaria de ingresos para grupos comunitarios.',
            ],
          },
        ],
      },
      causes: {
        blocks: [
          {
            heading: 'Históricas',
            paragraphs: [
              'La concentración de la tierra, el conflicto armado y el desplazamiento afectaron durante décadas la vida productiva del campo colombiano, debilitando las economías campesinas y la permanencia de las familias en sus territorios.',
            ],
          },
          {
            heading: 'Socioculturales',
            paragraphs: [
              'Persiste la idea de que las oportunidades están en la ciudad, lo que impulsa la salida de los jóvenes. A esto se suma un acceso limitado a formación técnica y la ausencia de referentes de emprendimientos comunitarios exitosos en la zona.',
            ],
          },
          {
            heading: 'Políticas',
            paragraphs: [
              'La presencia institucional en los corregimientos es limitada y los programas de apoyo al emprendimiento rural suelen tener requisitos difíciles de cumplir para grupos pequeños y poco formalizados.',
            ],
          },
          {
            heading: 'Económicas',
            paragraphs: [
              'La dependencia de pocos cultivos, la intermediación en la venta de productos, los altos costos de transporte y la falta de capital inicial reducen las ganancias y dificultan emprender nuevas actividades.',
            ],
          },
        ],
      },
      effects: {
        blocks: [
          {
            heading: 'Sociales',
            paragraphs: [
              'Ingresos inestables que afectan la alimentación, la salud y la educación de las familias, así como migración de jóvenes y adultos en busca de empleo.',
            ],
          },
          {
            heading: 'Culturales',
            paragraphs: [
              'Pérdida del relevo generacional en el campo y debilitamiento de saberes, tradiciones y formas de trabajo colectivo propias de la comunidad.',
            ],
          },
          {
            heading: 'Ambientales',
            paragraphs: [
              'La necesidad de ingresos rápidos puede llevar a prácticas que presionan los recursos naturales, mientras se desaprovechan alternativas productivas de bajo impacto ambiental.',
            ],
          },
          {
            heading: 'Políticos',
            paragraphs: [
              'Menor participación en los espacios de decisión local y una relación de desconfianza con las instituciones, que reduce la capacidad de la comunidad para gestionar proyectos propios.',
            ],
          },
        ],
      },
    },
  },
  {
    id: 'underused-spaces',
    shortTitle: 'Espacios y residuos',
    title:
      'Subutilización de espacios productivos y bajo aprovechamiento de residuos orgánicos agrícolas en zonas rurales',
    sections: {
      local: {
        blocks: [
          {
            paragraphs: [
              'En el corregimiento existen patios, bodegas, salones y lotes pequeños que permanecen sin uso o con un uso mínimo, aunque podrían adecuarse para actividades productivas que no requieren grandes extensiones de tierra.',
              'Al mismo tiempo, las cosechas dejan residuos como tamo, cascarilla, bagazo, rastrojo y pulpa, que con frecuencia se queman, se acumulan a cielo abierto o se desechan sin aprovechamiento.',
              'Estos residuos son precisamente el tipo de material que sirve como sustrato para cultivar setas orellanas, y una vez agotado puede transformarse en abono para los cultivos de la comunidad.',
            ],
          },
        ],
      },
      national: {
        blocks: [
          {
            paragraphs: [
              'Colombia genera grandes cantidades de biomasa residual agrícola cada año, proveniente de cultivos como el café, el arroz, la caña y el plátano. Una parte importante de esta biomasa no se reincorpora a ningún proceso productivo.',
              'La quema y la disposición inadecuada de residuos contribuyen a la contaminación del aire, del suelo y de las fuentes de agua, y desaprovechan nutrientes que podrían regresar a la tierra.',
              'Políticas nacionales como la Estrategia Nacional de Economía Circular promueven el aprovechamiento de residuos orgánicos, aunque su aplicación en los territorios rurales es todavía incipiente.',
            ],
          },
        ],
      },
      global: {
        blocks: [
          {
            paragraphs: [
              'En el mundo, los residuos agrícolas representan una de las mayores fuentes de biomasa desaprovechada. Su quema es una práctica extendida que afecta la calidad del aire y aporta gases de efecto invernadero.',
              'La economía circular y la agricultura sostenible —asociadas a los Objetivos de Desarrollo Sostenible 2, 12 y 13— proponen cerrar los ciclos productivos: transformar los residuos de una actividad en insumos para otra.',
              'El cultivo de hongos comestibles es reconocido internacionalmente como una forma eficiente de convertir residuos lignocelulósicos en alimento de alto valor nutricional y en abono orgánico.',
            ],
          },
        ],
      },
      causes: {
        blocks: [
          {
            heading: 'Históricas',
            paragraphs: [
              'Los modelos agrícolas tradicionales se enfocaron en el producto principal de cada cosecha, y la quema o el abandono de los residuos se volvieron costumbres heredadas durante generaciones.',
            ],
          },
          {
            heading: 'Socioculturales',
            paragraphs: [
              'Existe poco conocimiento sobre el valor de los residuos orgánicos y sobre cultivos alternativos como las setas, que no hacen parte de la dieta ni de las prácticas habituales de la zona.',
            ],
          },
          {
            heading: 'Políticas',
            paragraphs: [
              'Faltan programas locales de asistencia técnica y de gestión de residuos orgánicos en las zonas rurales, así como incentivos para los proyectos de aprovechamiento.',
            ],
          },
          {
            heading: 'Económicas',
            paragraphs: [
              'Adecuar espacios y transformar residuos requiere una inversión inicial y conocimientos técnicos que las familias no siempre tienen, y no se percibe un beneficio económico inmediato.',
            ],
          },
        ],
      },
      effects: {
        blocks: [
          {
            heading: 'Sociales',
            paragraphs: [
              'Se pierden oportunidades de trabajo y de ingresos que podrían surgir del uso productivo de espacios y residuos disponibles en la propia comunidad.',
            ],
          },
          {
            heading: 'Culturales',
            paragraphs: [
              'Se mantiene una relación con los residuos como basura y no como recurso, lo que limita la adopción de prácticas sostenibles y de nuevos saberes productivos.',
            ],
          },
          {
            heading: 'Ambientales',
            paragraphs: [
              'La quema y la acumulación de residuos contaminan el aire, el suelo y el agua, mientras los suelos pierden materia orgánica que podría devolverse mediante el abono.',
            ],
          },
          {
            heading: 'Políticos',
            paragraphs: [
              'La comunidad tiene pocas herramientas para incidir en la gestión ambiental de su territorio y para acceder a programas públicos de economía circular.',
            ],
          },
        ],
      },
    },
  },
];
