// DRAFT: pending team review
import type { Slide } from '../types';

/**
 * Slides of the Home carousel, in display order.
 * Photos: 1920 × 800 px (12:5), WebP or JPG, up to ~300 KB, inside `src/assets/images/slider/`.
 * `image` is the base file name without extension (e.g. `slide-1`); a missing file shows the placeholder.
 */
export const slides: Slide[] = [
  {
    id: 'huerta',
    image: 'slide-1',
    alt: 'Huerta comunitaria de setas orellanas',
    title: 'Una huerta que crece en comunidad',
    caption:
      'Familias de un corregimiento rural cultivan setas orellanas en un espacio que antes no se usaba.',
  },
  {
    id: 'sustrato',
    image: 'slide-2',
    alt: 'Residuos agrícolas preparados como sustrato',
    title: 'Del residuo al alimento',
    caption:
      'La pulpa de café, la cascarilla y la paja se convierten en sustrato en lugar de quemarse.',
  },
  {
    id: 'capacitacion',
    image: 'slide-3',
    alt: 'Taller de capacitación con el grupo comunitario',
    title: 'Aprender haciendo',
    caption:
      'Capacitación sobre el cultivo, el manejo y el valor nutricional y comercial de la seta orellana.',
  },
  {
    id: 'comunidad',
    image: 'slide-4',
    alt: 'Integrantes del grupo construyendo la estantería',
    title: 'Trabajo participativo',
    caption:
      'Juntos adecuamos el espacio, construimos la estantería y sembramos las primeras bolsas.',
  },
  {
    id: 'cosecha',
    image: 'slide-5',
    alt: 'Setas orellanas listas para cosechar',
    title: 'Hacia la primera cosecha',
    caption: 'Un primer ciclo que siembra las bases de nuevos ingresos para las familias.',
  },
];
