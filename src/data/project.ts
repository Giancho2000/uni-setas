// DRAFT: pending team review
import type { ProjectInfo } from '../types';

export const project: ProjectInfo = {
  name: 'Huerta comunitaria de setas orellanas',
  scientificName: 'Pleurotus ostreatus',
  institution: 'UNIMINUTO',
  objective:
    'Fortalecer la sostenibilidad de un grupo comunitario del corregimiento mediante el cultivo de setas orellanas, generando ingresos dignos para sus integrantes, aprovechando espacios subutilizados y aportando materia orgánica a partir de la reutilización de residuos agrícolas.',
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
};
