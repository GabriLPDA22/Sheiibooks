// RUTA: src/components/composables/useHeroState.js

import { ref } from 'vue';

/**
 * @description Composable para gestionar el estado reactivo de la Hero Section.
 * Centraliza todos los datos como textos, listas y configuraciones.
 * @returns {object} Un objeto con todas las propiedades reactivas.
 */
export function useHeroState() {
  const mainTitleText = ref('Sheiibooks');
  const subtitleText = ref('Por Sheila');
  const fullTypedText = 'Descubriendo historias. Compartiendo pasiones.';
  const descriptionText = ref('Bienvenido a mi rincón literario, donde cada libro es una ventana a nuevos mundos y cada reseña una invitación a la aventura.');
  const ctaText = ref('Explorar mi biblioteca');
  const scrollHint = ref('Descubre más contenido');

  const skills = ref([
    { icon: '📚', text: 'Lectora Voraz' },
    { icon: '✍️', text: 'Reviews Sinceras' },
    { icon: '🌟', text: 'Cazadora de Joyas' },
    { icon: '💭', text: 'Soñadora de Historias' },
    { icon: '🎨', text: 'Amante de la Belleza' }
  ]);

  const backgroundQuotes = ref([
    "En un lugar de la Mancha...",
    "Muchos años después, frente al pelotón de fusilamiento...",
    "Era el mejor de los tiempos, era el peor de los tiempos...",
    "Llamadme Ismael.",
    "Andábamos sin buscarnos pero sabiendo que andábamos para encontrarnos.",
    "La vida es sueño, y los sueños, sueños son.",
    "Todas las familias felices se parecen unas a otras.",
    "El amor es eterno mientras dura.",
    "No era la oscuridad lo que me asustaba, sino el no poder ver.",
  ]);

  return {
    mainTitleText,
    subtitleText,
    fullTypedText,
    descriptionText,
    ctaText,
    scrollHint,
    skills,
    backgroundQuotes
  };
}
