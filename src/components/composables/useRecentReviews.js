// RUTA: src/components/composables/useRecentReviews.js

import { ref } from 'vue';

/**
 * @description Composable para gestionar el estado de la sección de reseñas recientes
 * @returns {object} Estado y métodos para la sección de reseñas
 */
export function useRecentReviews() {
  const sectionTitle = ref('Recién salidos del horno');
  const sectionSubtitle = ref('Mis últimas aventuras literarias, aún humeantes de emoción');

  // Datos de ejemplo de libros reseñados (esto vendría de una API o CMS)
  const recentBooks = ref([
    {
      id: 1,
      title: 'El Nombre del Viento',
      author: 'Patrick Rothfuss',
      cover: '/images/books/nombre-del-viento.jpg',
      rating: 5,
      excerpt: 'Una obra maestra de la fantasía épica que te transporta a un mundo lleno de magia, música y misterio. Rothfuss construye un universo tan detallado que puedes oler las hojas de los árboles del bosque de Fae.',
      tags: ['Fantasía', 'Épico', 'Imprescindible'],
      reviewDate: '2024-01-15',
      readTime: 8,
      slug: 'el-nombre-del-viento-resena'
    },
    {
      id: 2,
      title: 'Klara y el Sol',
      author: 'Kazuo Ishiguro',
      cover: '/images/books/klara-y-el-sol.jpg',
      rating: 4,
      excerpt: 'Ishiguro nos regala una reflexión profunda sobre la humanidad a través de los ojos de una amiga artificial. Una lectura que te hará cuestionar qué significa realmente amar y ser amado.',
      tags: ['Ciencia Ficción', 'Drama', 'Reflexivo'],
      reviewDate: '2024-01-08',
      readTime: 6,
      slug: 'klara-y-el-sol-resena'
    },
    {
      id: 3,
      title: 'Los Siete Maridos de Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      cover: '/images/books/evelyn-hugo.jpg',
      rating: 5,
      excerpt: 'Un page-turner absoluto que combina glamour hollywoodiense con una historia de amor profundamente humana. Reid demuestra por qué es una de las voces más importantes de la ficción contemporánea.',
      tags: ['Romance', 'Drama', 'LGBTQ+'],
      reviewDate: '2024-01-01',
      readTime: 7,
      slug: 'siete-maridos-evelyn-hugo-resena'
    },
    {
      id: 4,
      title: 'El Priory del Naranjo',
      author: 'Samantha Shannon',
      cover: '/images/books/priory-naranjo.jpg',
      rating: 4,
      excerpt: 'Fantasía épica con dragones, magia y personajes femeninos extraordinarios. Shannon crea un mundo expansivo que rivals con los grandes clásicos del género, aunque a veces peca de exceso.',
      tags: ['Fantasía', 'Dragones', 'Feminista'],
      reviewDate: '2023-12-28',
      readTime: 10,
      slug: 'priory-del-naranjo-resena'
    },
    {
      id: 5,
      title: 'Circe',
      author: 'Madeline Miller',
      cover: '/images/books/circe.jpg',
      rating: 5,
      excerpt: 'Miller transforma el mito griego en una historia feminista poderosa y poética. Circe emerge como una de las heroínas más memorables de la literatura reciente, compleja y profundamente humana.',
      tags: ['Mitología', 'Feminista', 'Histórico'],
      reviewDate: '2023-12-20',
      readTime: 9,
      slug: 'circe-resena'
    },
    {
      id: 6,
      title: 'Proyecto Hail Mary',
      author: 'Andy Weir',
      cover: '/images/books/hail-mary.jpg',
      rating: 4,
      excerpt: 'Weir vuelve con otra aventura científica llena de humor y corazón. Una space opera que combina ciencia rigurosa con una amistad interestelar que te hará llorar y reír a partes iguales.',
      tags: ['Ciencia Ficción', 'Humor', 'Space Opera'],
      reviewDate: '2023-12-15',
      readTime: 8,
      slug: 'proyecto-hail-mary-resena'
    }
  ]);

  /**
   * Formatea una fecha para mostrar de forma amigable
   * @param {string} dateString - Fecha en formato ISO
   * @returns {string} Fecha formateada
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays <= 7) {
      return `Hace ${diffDays} días`;
    } else if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  /**
   * Navega a la página de todas las reseñas
   */
  const loadMoreReviews = () => {
    console.log('🔍 Navegando a todas las reseñas...');
    // Aquí implementarías la navegación a la página completa de reseñas
    // router.push('/resenas');
  };

  /**
   * Navega a la reseña completa de un libro específico
   * @param {object} book - Datos del libro
   */
  const readFullReview = (book) => {
    console.log(`📖 Abriendo reseña completa de: ${book.title}`);
    // Aquí implementarías la navegación a la reseña específica
    // router.push(`/resenas/${book.slug}`);
  };

  return {
    sectionTitle,
    sectionSubtitle,
    recentBooks,
    formatDate,
    loadMoreReviews,
    readFullReview
  };
}
