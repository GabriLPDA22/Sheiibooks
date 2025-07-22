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
      <!-- Título de la sección con nota de Sheila -->
      <section class="hero-section">
        <div class="genre-badge">
          <span class="genre-emoji">{{ genreData.emoji }}</span>
        </div>
        <h1 class="page-title">Mis recomendaciones de {{ genreData.name }}</h1>

        <!-- Nota personal de Sheila -->
        <div class="sheila-intro-note">
          <div class="sheila-avatar-circle">👩‍🦰</div>
          <div class="note-content">
            <p class="note-text">{{ getPersonalNote() }}</p>
            <span class="note-signature">- Sheila ♡</span>
          </div>
        </div>
      </section>

      <!-- Grid de recomendaciones -->
      <section class="recommendations-grid">
        <article
          v-for="(book, index) in recommendations"
          :key="book.id"
          class="book-recommendation"
          @mouseenter="showSheilaNote(book.id)"
          @mouseleave="hideSheilaNote()"
        >
          <!-- Nota flotante de Sheila -->
          <transition name="note-float">
            <div v-if="activeNote === book.id" class="sheila-floating-note">
              <p class="floating-note-text">{{ book.sheilaNote }}</p>
              <span class="note-emoji">💭</span>
            </div>
          </transition>

          <!-- Badge de match -->
          <div class="match-badge" v-if="book.matchPercentage >= 90">
            <span class="match-icon">⭐</span>
            <span class="match-text">{{ book.matchPercentage }}% match</span>
          </div>

          <!-- Contenedor principal del libro -->
          <div class="book-main-content">
            <!-- Portada del libro -->
            <div class="book-cover-section">
              <div class="book-cover-wrapper">
                <img :src="book.cover" :alt="book.title" class="book-cover">
                <div class="book-spine"></div>
                <div class="book-shadow"></div>
              </div>
            </div>

            <!-- Información del libro -->
            <div class="book-info-section">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">por {{ book.author }}</p>

              <!-- Rating con estrellas -->
              <div class="book-rating">
                <div class="stars">
                  <span v-for="star in 5" :key="star"
                        class="star"
                        :class="{ 'filled': star <= book.rating }">
                    ★
                  </span>
                </div>
                <span class="rating-value">{{ book.rating }}/5</span>
              </div>

              <!-- Por qué lo recomiendo -->
              <div class="recommendation-box">
                <h4 class="rec-title">¿Por qué te encantará?</h4>
                <p class="rec-text">{{ book.reason }}</p>
              </div>

              <!-- Tags del libro -->
              <div class="book-tags">
                <span v-for="(tag, tagIndex) in book.tags"
                      :key="tag"
                      class="book-tag"
                      :style="{ animationDelay: `${tagIndex * 0.1}s` }">
                  #{{ tag }}
                </span>
              </div>

              <!-- Botones de acción -->
              <div class="action-buttons">
                <a :href="book.amazonLink"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="buy-button amazon">
                  <span class="store-icon">🛒</span>
                  <span>Comprar en Amazon</span>
                  <span class="price">{{ book.price }}</span>
                </a>

                <a :href="book.casaDelLibroLink"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="buy-button casa-libro">
                  <span class="store-icon">📚</span>
                  <span>Casa del Libro</span>
                  <span class="price">{{ book.price }}</span>
                </a>
              </div>

              <!-- Link a reseña completa si existe -->
              <router-link v-if="book.hasReview"
                          :to="`/review/${book.id}`"
                          class="full-review-link">
                <span class="review-icon">📖</span>
                <span>Leer mi reseña completa</span>
                <span class="arrow">→</span>
              </router-link>
            </div>
          </div>
        </article>
      </section>

      <!-- Sección especial: Géneros relacionados -->
      <section class="related-section">
        <h2 class="section-title">También podrían gustarte...</h2>
        <div class="related-genres">
          <div v-for="genre in relatedGenres"
               :key="genre.name"
               class="related-genre"
               @click="exploreGenre(genre)">
            <span class="genre-emoji">{{ genre.emoji }}</span>
            <span class="genre-name">{{ genre.name }}</span>
            <span class="explore-arrow">→</span>
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

// Estado
const activeNote = ref(null)

// Datos del género desde la ruta
const genreData = ref({
  name: route.query.nombre || 'Fantasía',
  level: parseInt(route.query.nivel) || 5,
  emoji: route.query.emoji || '📚'
})

// Recomendaciones basadas en el género
const recommendations = ref([])

// Base de datos de libros por género (actualizada con links y notas de Sheila)
const bookDatabase = {
  'fantasia-epica': [
    {
      id: 1,
      title: 'El Imperio Final',
      author: 'Brandon Sanderson',
      cover: 'https://m.media-amazon.com/images/I/91FZ41RwZzL._SY466_.jpg',
      rating: 5,
      matchPercentage: 95,
      reason: 'Si te gustó El Nombre del Viento, la magia única de Sanderson y su worldbuilding te fascinarán. Es imposible no enamorarse de Vin.',
      tags: ['Magia única', 'Worldbuilding', 'Épico'],
      price: '9,99€',
      amazonLink: 'https://www.amazon.es/Imperio-Final-Nacidos-Bruma-Mistborn/dp/8417347038',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-el-imperio-final-nacidos-de-la-bruma-mistborn-1/9788417347031/6173543',
      hasReview: true,
      sheilaNote: '¡Este libro me voló la cabeza! La escena del baile es de mis favoritas en toda la fantasía 💃'
    },
    {
      id: 2,
      title: 'El Nombre del Viento',
      author: 'Patrick Rothfuss',
      cover: 'https://m.media-amazon.com/images/I/91YyNXhSxbL._SY466_.jpg',
      rating: 5,
      matchPercentage: 98,
      reason: 'La prosa poética de Rothfuss es pura magia. Kvothe es un protagonista que amarás y odiarás a partes iguales.',
      tags: ['Magia', 'Universidad', 'Música'],
      price: '10,95€',
      amazonLink: 'https://www.amazon.es/nombre-del-viento-Crónica-asesino/dp/8499082475',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-el-nombre-del-viento-cronicas-del-asesino-de-reyes-1/9788499082479/1653194',
      hasReview: true,
      sheilaNote: 'Lo he releído 4 veces y siempre descubro algo nuevo. ¡Rothfuss, por favor, el tercer libro! 😭'
    },
    {
      id: 3,
      title: 'El Camino de los Reyes',
      author: 'Brandon Sanderson',
      cover: 'https://m.media-amazon.com/images/I/91RQ8kC6SQL._SY466_.jpg',
      rating: 5,
      matchPercentage: 92,
      reason: 'Épica en su máxima expresión. Las tormentas, los spren, los ideales... Todo en este libro es grandioso.',
      tags: ['High Fantasy', 'Épico', 'Tormentas'],
      price: '12,99€',
      amazonLink: 'https://www.amazon.es/camino-reyes-El-Archivo-Tormentas/dp/8417347259',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-el-camino-de-los-reyes-el-archivo-de-las-tormentas-1/9788417347253/6591356',
      hasReview: false,
      sheilaNote: 'Kaladin es mi bebé protegido. Si le pasa algo malo, yo lloro. Punto. 🥺'
    }
  ],
  'romance-contemporaneo': [
    {
      id: 4,
      title: 'Los 7 maridos de Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      cover: 'https://m.media-amazon.com/images/I/719BZ5RLJVL._SY466_.jpg',
      rating: 5,
      matchPercentage: 96,
      reason: 'Una historia de amor épica que trasciende décadas. Te romperá el corazón de las mejores maneras posibles.',
      tags: ['LGBTQ+', 'Hollywood', 'Drama'],
      price: '9,45€',
      amazonLink: 'https://www.amazon.es/Los-siete-maridos-Evelyn-Hugo/dp/8418483113',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-los-siete-maridos-de-evelyn-hugo/9788418483110/12383170',
      hasReview: true,
      sheilaNote: 'Lloré tanto con este libro que tuve que rehacerme el maquillaje. Twice. 😭💄'
    },
    {
      id: 5,
      title: 'People We Meet on Vacation',
      author: 'Emily Henry',
      cover: 'https://m.media-amazon.com/images/I/81z+n7LtgFL._SY466_.jpg',
      rating: 4,
      matchPercentage: 91,
      reason: 'Friends to lovers hecho a la perfección. La química entre Poppy y Alex es *chef\'s kiss*',
      tags: ['Friends to lovers', 'Humor', 'Viajes'],
      price: '10,99€',
      amazonLink: 'https://www.amazon.es/People-We-Meet-Vacation/dp/1984806750',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-people-we-meet-on-vacation/9781984806758/12089423',
      hasReview: false,
      sheilaNote: 'Este libro me dio ganas de hacer un viaje con mi mejor amigo... y también de besarlo 🫣'
    }
  ],
  'misterio-and-thriller': [
    {
      id: 6,
      title: 'La asistenta',
      author: 'Freida McFadden',
      cover: 'https://m.media-amazon.com/images/I/81IUH8cIbCL._SY466_.jpg',
      rating: 5,
      matchPercentage: 93,
      reason: 'Thriller psicológico adictivo. Los giros te dejarán con la boca abierta. No confíes en nadie.',
      tags: ['Psicológico', 'Giros', 'Doméstico'],
      price: '8,99€',
      amazonLink: 'https://www.amazon.es/asistenta-Freida-McFadden/dp/8419743534',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-la-asistenta/9788419743534/13565871',
      hasReview: true,
      sheilaNote: 'Lo leí en una noche. No pude dormir. No sé si odio o amo a Freida por esto 😅'
    },
    {
      id: 7,
      title: 'Verity',
      author: 'Colleen Hoover',
      cover: 'https://m.media-amazon.com/images/I/81MJPxhz7ML._SY466_.jpg',
      rating: 5,
      matchPercentage: 90,
      reason: 'Oscuro, retorcido y absolutamente imposible de soltar. El final te perseguirá durante días.',
      tags: ['Oscuro', 'Romance', 'Suspense'],
      price: '9,95€',
      amazonLink: 'https://www.amazon.es/Verity-Planeta-Internacional-Colleen-Hoover/dp/8408267736',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-verity/9788408267737/13297917',
      hasReview: false,
      sheilaNote: 'Todavía no supero el final. Necesito terapia. Colleen Hoover pagará mi psicólogo 🤯'
    }
  ],
  'ficcion-historica': [
    {
      id: 8,
      title: 'Circe',
      author: 'Madeline Miller',
      cover: 'https://m.media-amazon.com/images/I/81T2wb05CqL._SY466_.jpg',
      rating: 5,
      matchPercentage: 97,
      reason: 'Mitología griega contada desde una perspectiva feminista única. La prosa de Miller es pura poesía.',
      tags: ['Mitología', 'Feminista', 'Poético'],
      price: '10,95€',
      amazonLink: 'https://www.amazon.es/Circe-AdN-Madeline-Miller/dp/8491819304',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-circe/9788491819301/8672719',
      hasReview: true,
      sheilaNote: 'Este libro me hizo querer ser una bruja en una isla griega. Still waiting for my powers... 🧙‍♀️'
    },
    {
      id: 9,
      title: 'El Ruiseñor',
      author: 'Kristin Hannah',
      cover: 'https://m.media-amazon.com/images/I/91oUn1JijML._SY466_.jpg',
      rating: 5,
      matchPercentage: 94,
      reason: 'Una historia desgarradora sobre dos hermanas en la Francia ocupada. Ten pañuelos a mano.',
      tags: ['WWII', 'Hermanas', 'Emotivo'],
      price: '9,99€',
      amazonLink: 'https://www.amazon.es/ruiseñor-SUMA-Kristin-Hannah/dp/8491291571',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-el-ruisenor/9788491291572/2982425',
      hasReview: false,
      sheilaNote: 'Advertencia: NO leer en público a menos que quieras explicar por qué lloras como Magdalena 😢'
    }
  ],
  'young-adult': [
    {
      id: 10,
      title: 'Una corte de rosas y espinas',
      author: 'Sarah J. Maas',
      cover: 'https://m.media-amazon.com/images/I/81XyrNBGMWL._SY466_.jpg',
      rating: 5,
      matchPercentage: 96,
      reason: 'Fantasía romántica que te obsesionará. Feyre y Rhysand vivirán rent-free en tu cabeza para siempre.',
      tags: ['Romantasy', 'Fae', 'Spicy'],
      price: '11,95€',
      amazonLink: 'https://www.amazon.es/corte-rosas-espinas-Sarah-Maas/dp/8408268449',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-una-corte-de-rosas-y-espinas/9788408268444/13455213',
      hasReview: true,
      sheilaNote: 'Rhysand es el book boyfriend supremo. No acepto críticas. Night Court forever 🌙✨'
    }
  ],
  'ciencia-ficcion': [
    {
      id: 11,
      title: 'Klara y el Sol',
      author: 'Kazuo Ishiguro',
      cover: 'https://m.media-amazon.com/images/I/71sgtO0ORAL._SY466_.jpg',
      rating: 4,
      matchPercentage: 88,
      reason: 'Una reflexión conmovedora sobre la humanidad vista desde los ojos de una IA. Ishiguro en su mejor forma.',
      tags: ['IA', 'Emotivo', 'Filosófico'],
      price: '10,45€',
      amazonLink: 'https://www.amazon.es/Klara-Sol-Kazuo-Ishiguro/dp/8433980696',
      casaDelLibroLink: 'https://www.casadellibro.com/libro-klara-y-el-sol/9788433980694/12086833',
      hasReview: true,
      sheilaNote: 'Me hizo llorar por un robot. UN ROBOT. Ishiguro, eres un genio malvado 🤖💔'
    }
  ]
}

// Confesiones literarias de Sheila - ELIMINADO
const bookConfessions = ref([])

// Géneros relacionados
const relatedGenres = ref([])

// Notas personales por género
const personalNotes = {
  'fantasia-epica': '¡Prepárate para perderte en mundos increíbles! Estos son los libros que me han hecho soñar despierta y desear tener poderes mágicos.',
  'romance-contemporaneo': 'Aquí están las historias que me han hecho suspirar, llorar y creer en el amor. Ten pañuelos cerca, los necesitarás.',
  'misterio-and-thriller': 'Estos libros son los culpables de mis ojeras. Una vez que empiezas, es imposible parar. You\'ve been warned!',
  'ficcion-historica': 'Viajar en el tiempo nunca fue tan fácil. Estos libros te transportarán a otras épocas sin moverte del sofá.',
  'young-adult': 'Porque nunca eres demasiado mayor para una buena historia YA. Estos libros despiertan mi yo adolescente interior.',
  'ciencia-ficcion': 'El futuro es fascinante y estos libros lo demuestran. Prepárate para cuestionar todo lo que sabes sobre la realidad.'
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
})

// Funciones
const goBack = () => {
  router.go(-1)
}

const getPersonalNote = () => {
  const genreSlug = route.params.genero
  return personalNotes[genreSlug] || personalNotes['fantasia-epica']
}

const showSheilaNote = (bookId) => {
  activeNote.value = bookId
}

const hideSheilaNote = () => {
  activeNote.value = null
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
  font-size: clamp(2.5rem, 8vw, 3.5rem);
  color: #8B4513;
  margin-bottom: 2rem;
  font-weight: 700;
}

/* Nota de introducción de Sheila */
.sheila-intro-note {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.15);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 2px solid rgba(139, 69, 19, 0.1);
}

.sheila-avatar-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFB6C1, #FFC0CB);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 3px solid #D4AF37;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  flex-shrink: 0;
}

.note-content {
  flex: 1;
  text-align: left;
}

.note-text {
  font-family: 'Kalam', cursive;
  font-size: 1.1rem;
  color: #654321;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.note-signature {
  font-family: 'Dancing Script', cursive;
  font-size: 1.2rem;
  color: #8B4513;
  font-weight: 700;
}

/* Grid de recomendaciones */
.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

/* Tarjeta de libro individual */
.book-recommendation {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.15);
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
}

.book-recommendation:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(139, 69, 19, 0.2);
  border-color: rgba(139, 69, 19, 0.1);
}

/* Nota flotante de Sheila - MEJORADA */
.sheila-floating-note {
  position: absolute;
  top: 20px;
  right: -260px;
  background: #FFF9E6;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #FFD700;
  z-index: 20;
  width: 240px;
  font-family: 'Kalam', cursive;
  transform: rotate(2deg);
}

.sheila-floating-note::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 30px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #FFD700;
}

.sheila-floating-note::after {
  content: '';
  position: absolute;
  left: -8px;
  top: 30px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #FFF9E6;
}

.floating-note-text {
  font-size: 0.95rem;
  color: #654321;
  margin: 0;
  font-style: italic;
  line-height: 1.5;
}

.note-emoji {
  position: absolute;
  top: -15px;
  right: 10px;
  font-size: 1.8rem;
  background: #FFF9E6;
  padding: 0 5px;
  animation: bounce-gentle 2s ease-in-out infinite;
}

@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Transición de la nota - MEJORADA */
.note-float-enter-active,
.note-float-leave-active {
  transition: all 0.3s ease;
}

.note-float-enter-from {
  opacity: 0;
  transform: translateX(20px) rotate(2deg);
}

.note-float-leave-to {
  opacity: 0;
  transform: translateX(20px) rotate(2deg);
}

/* Badge de match */
.match-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
  z-index: 5;
  font-family: 'Kalam', cursive;
}

/* Contenido principal del libro */
.book-main-content {
  padding: 2rem;
}

/* Sección de portada */
.book-cover-section {
  text-align: center;
  margin-bottom: 2rem;
}

.book-cover-wrapper {
  position: relative;
  display: inline-block;
}

.book-cover {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.book-recommendation:hover .book-cover {
  transform: rotateY(-5deg) translateZ(20px);
}

.book-spine {
  position: absolute;
  left: -3px;
  top: 0;
  bottom: 0;
  width: 20px;
  background: linear-gradient(90deg, #333 0%, #666 50%, #333 100%);
  border-radius: 10px 0 0 10px;
  transform: rotateY(90deg) translateZ(10px);
  z-index: 1;
}

.book-shadow {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 25px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.4), transparent);
  border-radius: 50%;
  filter: blur(10px);
}

/* Información del libro */
.book-info-section {
  text-align: center;
}

.book-title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.book-author {
  font-family: 'Kalam', cursive;
  color: #A0522D;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Rating */
.book-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  font-size: 1.2rem;
  color: #ddd;
  transition: all 0.3s ease;
}

.star.filled {
  color: #FFD700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}

.rating-value {
  font-family: 'Kalam', cursive;
  font-size: 1rem;
  color: #666;
  font-weight: 600;
}

/* Caja de recomendación */
.recommendation-box {
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.1), rgba(255, 192, 203, 0.05));
  border-radius: 15px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  border: 2px solid rgba(255, 182, 193, 0.3);
  position: relative;
}

.rec-title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.3rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.rec-text {
  font-family: 'Kalam', cursive;
  font-size: 1rem;
  color: #654321;
  line-height: 1.6;
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

.book-tag {
  background: linear-gradient(45deg, #E6D3B7, #F5F0E8);
  color: #654321;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Kalam', cursive;
  border: 1px solid rgba(139, 69, 19, 0.2);
  transition: all 0.3s ease;
  animation: tag-appear 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes tag-appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

.book-tag:hover {
  background: linear-gradient(45deg, #D8A384, #E6D3B7);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(139, 69, 19, 0.2);
}

/* Botones de compra */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.buy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.buy-button.amazon {
  background: #FF9900;
  color: #232F3E;
  box-shadow: 0 4px 15px rgba(255, 153, 0, 0.3);
}

.buy-button.amazon:hover {
  background: #FF7700;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 153, 0, 0.4);
}

.buy-button.casa-libro {
  background: #0066CC;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 102, 204, 0.3);
}

.buy-button.casa-libro:hover {
  background: #0052A3;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 102, 204, 0.4);
}

.store-icon {
  font-size: 1.2rem;
}

.price {
  font-weight: 700;
  font-size: 1.1rem;
}

/* Link a reseña completa */
.full-review-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #8B4513;
  text-decoration: none;
  font-family: 'Kalam', cursive;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  background: rgba(139, 69, 19, 0.05);
  border-radius: 25px;
  border: 2px solid rgba(139, 69, 19, 0.2);
  transition: all 0.3s ease;
}

.full-review-link:hover {
  background: rgba(139, 69, 19, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.15);
}

.review-icon {
  font-size: 1.2rem;
}

.arrow {
  transition: transform 0.3s ease;
}

.full-review-link:hover .arrow {
  transform: translateX(5px);
}

/* Eliminar estilos de confesiones */

/* Géneros relacionados */
.related-section {
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

.related-genres {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.related-genre {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 182, 193, 0.1));
  border: 2px solid rgba(139, 69, 19, 0.1);
  border-radius: 25px;
  padding: 1rem 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.related-genre:hover {
  transform: translateY(-3px);
  border-color: rgba(139, 69, 19, 0.3);
  box-shadow: 0 8px 20px rgba(139, 69, 19, 0.15);
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 182, 193, 0.2));
}

.genre-emoji {
  font-size: 1.5rem;
}

.genre-name {
  font-family: 'Kalam', cursive;
  font-size: 1.1rem;
  color: #8B4513;
  font-weight: 600;
}

.explore-arrow {
  font-size: 1.2rem;
  color: #A0522D;
  transition: transform 0.3s ease;
}

.related-genre:hover .explore-arrow {
  transform: translateX(5px);
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
    gap: 2rem;
  }

  /* Hacer que las notas aparezcan debajo en móvil */
  .sheila-floating-note {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 1rem;
    width: 100%;
    transform: rotate(0);
  }

  .sheila-floating-note::before,
  .sheila-floating-note::after {
    display: none;
  }

  .page-title {
    font-size: 2rem;
  }

  .sheila-intro-note {
    flex-direction: column;
    text-align: center;
  }

  .action-buttons {
    gap: 0.6rem;
  }

  .buy-button {
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
  }

  .confession-cards {
    grid-template-columns: 1fr;
  }

  .related-genres {
    flex-direction: column;
  }

  .related-genre {
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

  .book-recommendation:hover {
    transform: none;
  }
}
</style>
