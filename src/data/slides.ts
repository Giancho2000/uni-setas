// DRAFT: pending team review
import type { Slide } from '../types';

/**
 * Slides of the Home carousel, in display order.
 * Photos: landscape, ideally 1920 × 800 px (12:5), WebP or JPG, up to ~300 KB, inside
 * `src/assets/images/slider/`. `focus` sets the focal point kept in view when the photo is cropped.
 * `image` is the base file name without extension (e.g. `slide-1`); a missing file shows the placeholder.
 */
export const slides: Slide[] = [
  {
    id: 'huerta',
    image: 'slide-1',
    focus: 'center 25%',
    alt: 'Integrante del grupo trabajando la tierra en la huerta comunitaria',
    title: 'Una huerta que crece en comunidad',
    caption:
      'Familias de un corregimiento rural cultivan setas orellanas en un espacio que antes no se usaba.',
  },
  {
    id: 'sustrato',
    image: 'slide-2',
    focus: 'center 20%',
    alt: 'Integrante del grupo esparciendo residuos agrícolas con cal para preparar el sustrato',
    title: 'Del residuo al alimento',
    caption:
      'La pulpa de café, la cascarilla y la paja se convierten en sustrato en lugar de quemarse.',
  },
  {
    id: 'capacitacion',
    image: 'slide-3',
    focus: 'center 15%',
    alt: 'Dos integrantes del grupo mezclando el sustrato bajo la estructura de guadua',
    title: 'Aprender haciendo',
    caption:
      'Capacitación sobre el cultivo, el manejo y el valor nutricional y comercial de la seta orellana.',
  },
  {
    id: 'comunidad',
    image: 'slide-4',
    focus: 'center 35%',
    alt: 'Bolsas de sustrato colgadas en una estructura de guadua con setas brotando',
    title: 'Trabajo participativo',
    caption:
      'Juntos adecuamos el espacio, construimos la estantería y sembramos las primeras bolsas.',
  },
  {
    id: 'cosecha',
    image: 'slide-5',
    alt: 'Racimos de setas orellanas listas para cosechar',
    title: 'Hacia la primera cosecha',
    caption: 'Un primer ciclo que siembra las bases de nuevos ingresos para las familias.',
  },
];
