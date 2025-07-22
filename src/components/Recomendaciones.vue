<template>
  <div class="recomendaciones-page">
    <!-- Fondo con textura de papel -->
    <div class="paper-background">
      <div class="paper-texture"></div>
    </div>

    <!-- Header con navegación -->
    <header class="page-header">
      <button @click="goBack" class="back-button">
        <svg class="back-arrow" viewBox="0 0 24 24">
          <path d="M15 18L9 12L15 6" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Volver a géneros</span>
      </button>
    </header>

    <!-- Contenido principal -->
    <main class="content-container">
      <!-- Título de la sección -->
      <section class="hero-section">
        <div class="genre-badge">
          <span class="genre-emoji">{{ genreData.emoji }}</span>
        </div>
        <h1 class="page-title">Recomendaciones de {{ genreData.name }}</h1>
        <p class="page-subtitle">
          Basadas en tu nivel de amor:
          <span class="love-hearts">
            <span v-for="n in 5" :key="n" class="heart" :class="{ 'filled': n <= genreData.level }">♡</span>
          </span>
        </p>
      </section>

      <!-- Grid de recomendaciones -->
      <section class="recommendations-grid">
        <article
          v-for="(book, index) in recommendations"
          :key="book.id"
          class="book-card"
          :class="`card-style-${(index % 4) + 1}`"
          @click="viewBookDetails(book)"
          @mouseenter="animateCard"
          @mouseleave="resetCard"
        >
          <!-- Etiqueta de match -->
          <div class="match-badge" v-if="book.matchPercentage >= 90">
            <span class="match-text">{{ book.matchPercentage }}% match</span>
            <span class="match-icon">✨</span>
          </div>

          <!-- Portada del libro -->
          <div class="book-cover-container">
            <img :src="book.cover" :alt="book.title" class="book-cover">
            <div class="book-shadow"></div>
          </div>

          <!-- Información del libro -->
          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>

            <!-- Rating -->
            <div class="book-rating">
              <div class="stars">
                <span v-for="star in 5" :key="star"
                      class="star"
                      :class="{ 'filled': star <= book.rating }">
                  ⭐
                </span>
              </div>
              <span class="rating-text">{{ book.rating }}/5</span>
            </div>

            <!-- Por qué lo recomiendo -->
            <div class="recommendation-reason">
              <p class="reason-title">¿Por qué te gustará?</p>
              <p class="reason-text">{{ book.reason }}</p>
            </div>

            <!-- Tags -->
            <div class="book-tags">
              <span v-for="tag in book.tags"
                    :key="tag"
                    class="tag"
                    :class="`tag-${getTagStyle(tag)}`">
                {{ tag }}
              </span>
            </div>

            <!-- CTA -->
            <button class="read-more-btn">
              <span>Ver reseña completa</span>
              <span class="arrow-icon">→</span>
            </button>
          </div>
        </article>
      </section>

      <!-- Sección de más géneros relacionados -->
      <section class="related-genres">
        <h2 class="section-title">También podrían gustarte estos géneros</h2>
        <div class="genres-list">
          <div v-for="genre in relatedGenres"
               :key="genre.name"
               class="related-genre-card"
               @click="exploreGenre(genre)">
            <span class="genre-icon">{{ genre.emoji }}</span>
            <span class="genre-name">{{ genre.name }}</span>
          </div>
        </div>
      </section>
    </main>

    <!-- Decoraciones flotantes -->
    <div class="floating-decorations">
      <span class="float-deco deco-1">📚</span>
      <span class="float-deco deco-2">✨</span>
      <span class="float-deco deco-3">{{ genreData.emoji }}</span>
      <span class="float-deco deco-4">💕</span>
      <span class="float-deco deco-5">🌟</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Datos del género desde la ruta
const genreData = ref({
  name: route.query.nombre || 'Fantasía',
  level: parseInt(route.query.nivel) || 5,
  emoji: route.query.emoji || '📚'
})

// Recomendaciones basadas en el género
const recommendations = ref([])

// Géneros relacionados
const relatedGenres = ref([])

// Base de datos de libros por género
const bookDatabase = {
  'fantasia-epica': [
    {
      id: 1,
      title: 'El Imperio Final',
      author: 'Brandon Sanderson',
      cover: '/images/books/imperio-final.jpg',
      rating: 5,
      matchPercentage: 95,
      reason: 'Si te gustó El Nombre del Viento, la magia única de Sanderson y su worldbuilding te fascinarán',
      tags: ['Magia única', 'Worldbuilding', 'Épico']
    },
    {
      id: 2,
      title: 'La Primera Ley',
      author: 'Joe Abercrombie',
      cover: '/images/books/primera-ley.jpg',
      rating: 4,
      matchPercentage: 88,
      reason: 'Fantasía oscura con personajes complejos y giros inesperados',
      tags: ['Grimdark', 'Personajes grises', 'Acción']
    },
    {
      id: 3,
      title: 'El Archivo de las Tormentas',
      author: 'Brandon Sanderson',
      cover: '/images/books/archivo-tormentas.jpg',
      rating: 5,
      matchPercentage: 92,
      reason: 'Épica en su máxima expresión con un sistema de magia innovador',
      tags: ['High Fantasy', 'Épico', 'Magia']
    }
  ],
  'romance-contemporaneo': [
    {
      id: 4,
      title: 'People We Meet on Vacation',
      author: 'Emily Henry',
      cover: '/images/books/people-we-meet.jpg',
      rating: 4,
      matchPercentage: 91,
      reason: 'Romance con humor, química perfecta y personajes adorables',
      tags: ['Friends to lovers', 'Humor', 'Viajes']
    },
    {
      id: 5,
      title: 'It Ends with Us',
      author: 'Colleen Hoover',
      cover: '/images/books/it-ends-with-us.jpg',
      rating: 5,
      matchPercentage: 87,
      reason: 'Emotivo y profundo, te hará reír y llorar',
      tags: ['Emotivo', 'Drama', 'Bestseller']
    }
  ],
  'misterio-and-thriller': [
    {
      id: 6,
      title: 'Verity',
      author: 'Colleen Hoover',
      cover: '/images/books/verity.jpg',
      rating: 5,
      matchPercentage: 93,
      reason: 'Thriller psicológico que te dejará sin aliento hasta la última página',
      tags: ['Psicológico', 'Giros', 'Adictivo']
    },
    {
      id: 7,
      title: 'El Psicoanalista',
      author: 'John Katzenbach',
      cover: '/images/books/psicoanalista.jpg',
      rating: 4,
      matchPercentage: 85,
      reason: 'Tensión constante y un juego mental fascinante',
      tags: ['Suspense', 'Mental', 'Clásico']
    }
  ],
  'ficcion-historica': [
    {
      id: 8,
      title: 'El Ruiseñor',
      author: 'Kristin Hannah',
      cover: '/images/books/ruisenor.jpg',
      rating: 5,
      matchPercentage: 94,
      reason: 'Historia emotiva sobre hermanas en la Segunda Guerra Mundial',
      tags: ['WWII', 'Emotivo', 'Familia']
    },
    {
      id: 9,
      title: 'La Catedral del Mar',
      author: 'Ildefonso Falcones',
      cover: '/images/books/catedral-mar.jpg',
      rating: 4,
      matchPercentage: 89,
      reason: 'Barcelona medieval cobra vida en esta épica historia',
      tags: ['Medieval', 'España', 'Épico']
    }
  ],
  'young-adult': [
    {
      id: 10,
      title: 'Una Corte de Rosas y Espinas',
      author: 'Sarah J. Maas',
      cover: '/images/books/acotar.jpg',
      rating: 5,
      matchPercentage: 96,
      reason: 'Fantasía romántica con personajes inolvidables y worldbuilding fascinante',
      tags: ['Romantasy', 'Fae', 'Bestseller']
    },
    {
      id: 11,
      title: 'Caraval',
      author: 'Stephanie Garber',
      cover: '/images/books/caraval.jpg',
      rating: 4,
      matchPercentage: 88,
      reason: 'Mágico, misterioso y absolutamente encantador',
      tags: ['Magia', 'Romance', 'Misterio']
    }
  ],
  'ciencia-ficcion': [
    {
      id: 12,
      title: 'Proyecto Hail Mary',
      author: 'Andy Weir',
      cover: '/images/books/hail-mary.jpg',
      rating: 5,
      matchPercentage: 92,
      reason: 'Ciencia accesible mezclada con humor y una historia conmovedora',
      tags: ['Space Opera', 'Humor', 'Ciencia']
    },
    {
      id: 13,
      title: 'Los Propios Dioses',
      author: 'Isaac Asimov',
      cover: '/images/books/propios-dioses.jpg',
      rating: 4,
      matchPercentage: 84,
      reason: 'Ciencia ficción clásica que te hará pensar',
      tags: ['Clásico', 'Física', 'Filosófico']
    }
  ]
}

// Géneros relacionados por tipo
const genreRelations = {
  'fantasia-epica': [
    { name: 'Young Adult', emoji: '🌟' },
    { name: 'Ciencia Ficción', emoji: '🚀' }
  ],
  'romance-contemporaneo': [
    { name: 'Young Adult', emoji: '🌟' },
    { name: 'Ficción Histórica', emoji: '🏛️' }
  ],
  'misterio-and-thriller': [
    { name: 'Ciencia Ficción', emoji: '🚀' },
    { name: 'Ficción Histórica', emoji: '🏛️' }
  ],
  'ficcion-historica': [
    { name: 'Romance Contemporáneo', emoji: '💕' },
    { name: 'Misterio & Thriller', emoji: '🔍' }
  ],
  'young-adult': [
    { name: 'Fantasía Épica', emoji: '🐉' },
    { name: 'Romance Contemporáneo', emoji: '💕' }
  ],
  'ciencia-ficcion': [
    { name: 'Fantasía Épica', emoji: '🐉' },
    { name: 'Misterio & Thriller', emoji: '🔍' }
  ]
}

// Cargar recomendaciones basadas en el género
onMounted(() => {
  const genreSlug = route.params.genero
  recommendations.value = bookDatabase[genreSlug] || bookDatabase['fantasia-epica']
  relatedGenres.value = genreRelations[genreSlug] || genreRelations['fantasia-epica']

  // Añadir algunos libros más genéricos si hay pocos
  if (recommendations.value.length < 6) {
    recommendations.value.push({
      id: 100 + recommendations.value.length,
      title: 'La Sombra del Viento',
      author: 'Carlos Ruiz Zafón',
      cover: '/images/books/sombra-viento.jpg',
      rating: 5,
      matchPercentage: 82,
      reason: 'Una historia que mezcla misterio, romance y amor por los libros',
      tags: ['Misterio', 'Barcelona', 'Libros']
    })
  }
})

// Funciones
const goBack = () => {
  router.go(-1)
}

const viewBookDetails = (book) => {
  console.log('Ver detalles de:', book.title)
  // Aquí podrías navegar a la reseña del libro
  // router.push(`/review/${book.id}`)
}

const exploreGenre = (genre) => {
  const genreSlug = genre.name.toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/ /g, '-')

  router.push({
    name: 'Recomendaciones',
    params: { genero: genreSlug },
    query: {
      nombre: genre.name,
      nivel: 5,
      emoji: genre.emoji
    }
  })
}

const animateCard = (e) => {
  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
}

const resetCard = (e) => {
  e.currentTarget.style.transform = 'translateY(0) scale(1)'
}

const getTagStyle = (tag) => {
  const styles = ['pink', 'purple', 'blue', 'green', 'yellow']
  const index = tag.length % styles.length
  return styles[index]
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Kalam:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');

.recomendaciones-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #FBF8F3 0%, #F5F0E8 50%, #EADDD1 100%);
  font-family: 'Crimson Text', serif;
  position: relative;
  overflow-x: hidden;
}

/* Fondo de papel */
.paper-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFFEF7;
  opacity: 0.95;
}

.paper-texture {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 2px 2px, rgba(139, 69, 19, 0.06) 1px, transparent 0);
  background-size: 25px 25px;
}

/* Header */
.page-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(251, 248, 243, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(139, 69, 19, 0.1);
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #8B4513;
  color: #FBF8F3;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.2);
}

.back-button:hover {
  background: #A0522D;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
}

.back-arrow {
  width: 20px;
  height: 20px;
}

/* Contenido principal */
.content-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Hero section */
.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}

.genre-badge {
  display: inline-block;
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce-in 0.6s ease-out;
}

.page-title {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: #8B4513;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-family: 'Kalam', cursive;
  font-size: 1.3rem;
  color: #A0522D;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.love-hearts {
  display: flex;
  gap: 0.3rem;
}

.heart {
  font-size: 1.5rem;
  color: #ddd;
  transition: all 0.3s ease;
}

.heart.filled {
  color: #FF69B4;
  text-shadow: 0 0 8px rgba(255, 105, 180, 0.4);
}

/* Grid de recomendaciones */
.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Tarjetas de libros */
.book-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
}

.book-card:hover {
  border-color: rgba(139, 69, 19, 0.2);
  box-shadow: 0 15px 40px rgba(139, 69, 19, 0.2);
}

.card-style-1 { border-top: 4px solid #FF6B9D; }
.card-style-2 { border-top: 4px solid #C77DFF; }
.card-style-3 { border-top: 4px solid #06FFA5; }
.card-style-4 { border-top: 4px solid #FFD93D; }

/* Badge de match */
.match-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
  z-index: 5;
}

/* Portada del libro */
.book-cover-container {
  position: relative;
  margin-bottom: 1.5rem;
  text-align: center;
}

.book-cover {
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.book-card:hover .book-cover {
  transform: translateY(-5px);
}

.book-shadow {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 20px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3), transparent);
  border-radius: 50%;
  filter: blur(8px);
}

/* Información del libro */
.book-info {
  text-align: center;
}

.book-title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: #8B4513;
  margin-bottom: 0.3rem;
  font-weight: 700;
}

.book-author {
  font-family: 'Kalam', cursive;
  color: #A0522D;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* Rating */
.book-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  font-size: 1rem;
  opacity: 0.3;
  filter: grayscale(100%);
}

.star.filled {
  opacity: 1;
  filter: grayscale(0%);
}

.rating-text {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

/* Razón de recomendación */
.recommendation-reason {
  background: rgba(255, 182, 193, 0.1);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 3px solid #FFB6C1;
}

.reason-title {
  font-family: 'Kalam', cursive;
  font-size: 0.9rem;
  color: #8B4513;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.reason-text {
  font-size: 0.95rem;
  color: #654321;
  line-height: 1.5;
  font-style: italic;
}

/* Tags */
.book-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
}

.tag-pink { background: #FF6B9D; }
.tag-purple { background: #C77DFF; }
.tag-blue { background: #4ECDC4; }
.tag-green { background: #06FFA5; }
.tag-yellow { background: #FFD93D; }

/* Botón leer más */
.read-more-btn {
  background: linear-gradient(45deg, #8B4513, #A0522D);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
}

.read-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
}

/* Géneros relacionados */
.related-genres {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.1);
}

.section-title {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: #8B4513;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.genres-list {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.related-genre-card {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 182, 193, 0.1));
  border: 2px solid rgba(139, 69, 19, 0.1);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-genre-card:hover {
  transform: translateY(-3px);
  border-color: rgba(139, 69, 19, 0.3);
  box-shadow: 0 8px 20px rgba(139, 69, 19, 0.15);
}

.genre-icon {
  font-size: 1.5rem;
}

.genre-name {
  font-family: 'Kalam', cursive;
  font-size: 1.1rem;
  color: #8B4513;
  font-weight: 600;
}

/* Decoraciones flotantes */
.floating-decorations {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.float-deco {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.3;
  animation: float-gentle 8s ease-in-out infinite;
}

.deco-1 { top: 10%; left: 5%; animation-delay: 0s; }
.deco-2 { top: 20%; right: 10%; animation-delay: 2s; }
.deco-3 { bottom: 30%; left: 8%; animation-delay: 4s; }
.deco-4 { top: 60%; right: 15%; animation-delay: 6s; }
.deco-5 { bottom: 15%; right: 25%; animation-delay: 8s; }

/* Animaciones */
@keyframes bounce-in {
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); opacity: 1; }
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .content-container {
    padding: 1rem;
  }

  .recommendations-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    flex-direction: column;
    gap: 0.5rem;
  }

  .genres-list {
    flex-direction: column;
  }

  .related-genre-card {
    width: 100%;
    justify-content: center;
  }
}

/* Modo reducido de movimiento */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }

  .book-card:hover {
    transform: none;
  }
}
</style>
