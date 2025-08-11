<template>
  <div class="cute-notebook">
    <!-- Fondo de papel rayado -->
    <div class="notebook-paper">
      <div class="paper-margin"></div>
      <div class="paper-holes">
        <div class="hole" v-for="n in 18" :key="n"></div>
      </div>
    </div>

    <!-- Contenedor principal -->
    <div class="notebook-content">
      <!-- Header con fecha y título -->
      <header class="notebook-header">
        <div class="header-main">
          <!-- Foto de Sheila a la izquierda -->
          <div class="author-photo-section">
            <div class="photo-polaroid">
              <img src="/images/avatar.jpg" alt="Sheila" class="author-photo">
              <div class="polaroid-caption">Sheila ♡</div>
              <div class="photo-tape"></div>
            </div>
          </div>

          <!-- Título y contenido a la derecha -->
          <div class="title-content">
            <!-- Fecha en la esquina -->
            <div class="date-corner">
              <span class="date-label">Fecha:</span>
              <span class="date-value">{{ currentDate }}</span>
              <div class="date-underline"></div>
            </div>

            <!-- Título principal -->
            <h1 class="main-title">
              <span class="title-text">Mi Diario de Lecturas</span>
              <div class="title-doodles">
                <span class="doodle-heart">♡</span>
                <span class="doodle-star">✦</span>
                <span class="doodle-heart">♡</span>
              </div>
            </h1>

            <!-- Subtítulo con flecha -->
            <div class="subtitle-section">
              <p class="subtitle-text">Los libros que me han robado el corazón últimamente...</p>
              <svg class="arrow-doodle" viewBox="0 0 150 30">
                <path d="M10,15 Q40,8 75,15 Q110,22 140,15" stroke="#ff6b9d" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M135,12 L142,15 L135,18" stroke="#ff6b9d" fill="none" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <!-- Grid de notas de libros -->
      <main class="books-grid">
        <article
          v-for="(book, index) in books"
          :key="book.id"
          class="book-note"
          :class="`note-${index + 1}`"
          @click="openBook(book)"
        >
          <!-- Post-it o washi tape decorativo -->
          <div class="note-decoration" :class="`deco-${(index % 4) + 1}`">
            <div class="washi-tape"></div>
          </div>

          <!-- NEW badge para el primer libro -->
          <div v-if="index === 0" class="new-badge">
            <img src="/images/New.png" alt="NEW!" class="new-image">
          </div>

          <!-- Contenido de la nota -->
          <div class="note-content">
            <!-- Título del libro -->
            <h3 class="book-title">{{ book.title }}</h3>
            <div class="title-underline"></div>

            <!-- Autor -->
            <p class="book-author">
              <span class="author-label">Autor:</span>
              <span class="author-name">{{ book.author }}</span>
            </p>

            <!-- Rating con estrellas dibujadas -->
            <div class="book-rating">
              <span class="rating-label">Mi nota:</span>
              <div class="stars-rating">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{ 'star-filled': star <= book.rating }"
                >
                  ⭐
                </span>
              </div>
            </div>

            <!-- Extracto manuscrito -->
            <div class="book-excerpt">
              <div class="quote-mark">"</div>
              <p class="excerpt-text">{{ book.excerpt }}</p>
              <div class="quote-mark quote-end">"</div>
              <div class="highlight-marker"></div>
            </div>

            <!-- Tags como etiquetas adhesivas -->
            <div class="book-tags">
              <span
                v-for="(tag, tagIndex) in book.tags.slice(0, 3)"
                :key="tag"
                class="tag-sticker"
                :class="`sticker-${(tagIndex % 3) + 1}`"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Fecha y flecha "leer más" -->
            <div class="note-footer">
              <time class="review-date">{{ formatDate(book.date) }}</time>
              <div class="read-more">
                <span class="read-text">leer completa</span>
                <svg class="read-arrow" viewBox="0 0 25 15">
                  <path d="M3,7.5 L18,7.5 M15,4 L18,7.5 L15,11" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Decoraciones adicionales -->
          <div class="note-extras">
            <div class="corner-fold"></div>
            <div class="doodle-corner">
              <span class="mini-doodle">{{ ['✨', '💕', '⭐', '🌸', '☀️'][index % 5] }}</span>
            </div>
          </div>
        </article>
      </main>

      <!-- Botón para ver más -->
      <footer class="notebook-footer">
        <button class="see-more-btn" @click="seeAllReviews">
          <span class="btn-text">Ver todas mis reseñas</span>
          <span class="btn-doodle">→ ♡</span>
        </button>
      </footer>
    </div>

    <!-- Sección fija de Sheila a la izquierda -->
    <!-- <div class="fixed-sheila-section">
      <div class="sheila-image">
        <img src="/images/sheila-with-book.png" alt="Sheila con libro" class="sheila-photo">
      </div>
      <div class="sheila-text-content">
        <h2 class="sheila-title">Rincón de mis lecturas</h2>
        <div class="sheila-underline">
          <img src="/images/Underline_10.png" alt="Underline" class="underline-image">
        </div>
        <div class="sheila-arrow">
          <img src="/images/arrow.png" alt="Arrow" class="arrow-image">
        </div>
      </div>
    </div> -->

    <!-- Doodles flotantes -->
    <div class="floating-doodles">
      <div class="float-doodle doodle-1">✨</div>
      <div class="float-doodle doodle-2">♡</div>
      <div class="float-doodle doodle-3">📚</div>
      <div class="float-doodle doodle-4">☕</div>
      <div class="float-doodle doodle-5">🌸</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Usar el router
const router = useRouter()

const currentDate = computed(() => {
  return new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})

const books = ref([
  {
    id: 1,
    title: 'La asistenta',
    author: 'Freida McFadden',
    rating: 5,
    excerpt: 'Thriller psicológico adictivo lleno de secretos, giros inesperados y tensión domestica. Aquí nada ni nadie es lo que parece.',
    tags: ['Thriller psicológico', 'Suspense', 'Novela negra'],
    date: '2024-09-17'
  },
  {
    id: 2,
    title: 'No confies en Asher Hall',
    author: 'Myriam M. Lejardi',
    rating: 5,
    excerpt: 'Un Reality Show que promete engancharte desde la primera página y mantenerte envuelta en la misma casa con los protagonistas, con ese aura de misterio por las pruebas que solo va a más.',
    tags: ['Reality Show', 'Misterio', 'Secretos'],
    date: '2024-01-07'
  },
  {
    id: 3,
    title: 'En las nubes',
    author: 'Hannah Grace',
    rating: 5,
    excerpt: 'Un Sport romance super tierno, con unos personajes que nos ofrecen una historia dulce, con momentos cómplices y momentos muy divertidos.',
    tags: ['Sport romance', 'Hockey', 'BookClub'],
    date: '2024-11-14'
  }
])

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

const openBook = (book) => {
  console.log(`Abriendo reseña de: ${book.title}`)
  // Navegar a la página de review usando el router
  router.push(`/review/${book.id}`)
}

const seeAllReviews = () => {
  console.log('Ver todas las reseñas')
  // Navegar a página completa de reseñas
  router.push('/biblioteca')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Dancing+Script:wght@700&display=swap');

.cute-notebook {
  min-height: 100vh;
  background: #f8f6f0;
  position: relative;
  font-family: 'Kalam', cursive;
  padding: 2rem 1rem;
}

/* Fondo de papel rayado */
.notebook-paper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 1;
  background-image:
    repeating-linear-gradient(
      transparent,
      transparent 24px,
      #e8f4fd 24px,
      #e8f4fd 25px
    ),
    repeating-linear-gradient(
      transparent,
      transparent 12px,
      #f0f8ff 12px,
      #f0f8ff 12.5px
    );
}

.paper-margin {
  position: absolute;
  left: 80px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ff9999;
  opacity: 0.6;
}

.paper-holes {
  position: absolute;
  left: 20px;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.hole {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #f0f0f0;
  border: 2px solid #ddd;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

/* Contenido principal */
.notebook-content {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 100px;
}

/* Header */
.notebook-header {
  margin-bottom: 3rem;
}

.header-main {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

/* Foto de Sheila estilo polaroid */
.author-photo-section {
  flex-shrink: 0;
}

.photo-polaroid {
  background: white;
  padding: 1rem 1rem 2rem 1rem;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: rotate(-3deg);
  position: relative;
  border: 1px solid #eee;
}

.author-photo {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  display: block;
}

.polaroid-caption {
  text-align: center;
  font-family: 'Kalam', cursive;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  font-weight: 600;
}

.photo-tape {
  position: absolute;
  top: -8px;
  right: 10px;
  width: 30px;
  height: 16px;
  background: linear-gradient(45deg, #ffd93d, #ffec8b);
  opacity: 0.8;
  border-radius: 2px;
  transform: rotate(15deg);
}

/* Contenido del título */
.title-content {
  flex: 1;
}

.date-corner {
  text-align: right;
  margin-bottom: 2rem;
  font-family: 'Kalam', cursive;
  color: #666;
}

.date-label {
  font-size: 0.9rem;
  margin-right: 10px;
}

.date-value {
  font-size: 1rem;
  font-weight: 600;
}

.date-underline {
  width: 120px;
  height: 2px;
  background: #ff6b9d;
  margin: 5px 0 0 auto;
  border-radius: 2px;
}

.main-title {
  text-align: center;
  margin-bottom: 1rem;
}

.title-text {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: #2d3748;
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

.title-doodles {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 1.5rem;
}

.doodle-heart {
  color: #ff6b9d;
  animation: bounce 2s infinite;
}

.doodle-star {
  color: #ffd93d;
  animation: twinkle 1.5s infinite;
}

.subtitle-section {
  text-align: center;
  margin-bottom: 2rem;
}

.subtitle-text {
  font-family: 'Kalam', cursive;
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
  font-style: italic;
}

.arrow-doodle {
  width: 150px;
  height: 30px;
  margin: 0 auto;
  display: block;
}

/* Grid de libros */
.books-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Notas de libros */
.book-note {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid transparent;
  will-change: transform;
}

.book-note:hover {
  transform: translateY(-3px) rotate(0.5deg);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.note-decoration {
  position: absolute;
  top: -5px;
  right: 10px;
  width: 40px;
  height: 20px;
}

.washi-tape {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  opacity: 0.8;
}

.deco-1 .washi-tape { background: linear-gradient(45deg, #ff6b9d, #ff8fab); }
.deco-2 .washi-tape { background: linear-gradient(45deg, #c77dff, #e0aaff); }
.deco-3 .washi-tape { background: linear-gradient(45deg, #06ffa5, #96f7d2); }
.deco-4 .washi-tape { background: linear-gradient(45deg, #ffd93d, #ffec8b); }

/* NEW badge */
.new-badge {
  position: absolute;
  top: -15px;
  left: -15px;
  z-index: 10;
}

.new-image {
  width: 60px;
  height: auto;
  transform: rotate(-15deg);
}

.book-title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.title-underline {
  width: 60%;
  height: 3px;
  background: #ff6b9d;
  margin-bottom: 1rem;
  border-radius: 2px;
}

.book-author {
  margin-bottom: 1rem;
  font-family: 'Kalam', cursive;
}

.author-label {
  color: #666;
  font-size: 0.9rem;
}

.author-name {
  color: #2d3748;
  font-weight: 600;
  margin-left: 0.5rem;
}

.book-rating {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.rating-label {
  font-family: 'Kalam', cursive;
  color: #666;
  font-size: 0.9rem;
}

.stars-rating {
  display: flex;
  gap: 0.2rem;
}

.star {
  font-size: 1.2rem;
  opacity: 0.3;
  transition: opacity 0.2s;
  filter: grayscale(100%);
}

.star-filled {
  opacity: 1;
  filter: grayscale(0%);
}

.book-excerpt {
  position: relative;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
}

.quote-mark {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: #c77dff;
  position: absolute;
}

.quote-mark:first-child {
  top: -10px;
  left: -5px;
}

.quote-end {
  bottom: -15px;
  right: 5px;
}

.excerpt-text {
  font-family: 'Kalam', cursive;
  font-size: 1rem;
  line-height: 1.5;
  color: #4a5568;
  padding: 0 1rem;
  font-style: italic;
}

.highlight-marker {
  position: absolute;
  bottom: 5px;
  left: 10px;
  right: 10px;
  height: 8px;
  background: linear-gradient(45deg, rgba(255, 255, 0, 0.3), rgba(255, 255, 0, 0.1));
  border-radius: 4px;
}

.book-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tag-sticker {
  font-family: 'Kalam', cursive;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  transform: rotate(-2deg);
}

.sticker-1 { background: #ff6b9d; }
.sticker-2 { background: #c77dff; }
.sticker-3 { background: #06ffa5; }

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Kalam', cursive;
}

.review-date {
  color: #666;
  font-size: 0.9rem;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ff6b9d;
  font-size: 0.9rem;
  font-weight: 600;
}

.read-arrow {
  width: 20px;
  height: 15px;
}

.corner-fold {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, transparent 50%, #f0f0f0 50%);
}

.doodle-corner {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 1.2rem;
  opacity: 0.6;
}

/* Botón ver más */
.notebook-footer {
  text-align: center;
  margin-top: 3rem;
}

.see-more-btn {
  background: linear-gradient(45deg, #ff6b9d, #c77dff);
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  color: white;
  font-family: 'Kalam', cursive;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
  transition: transform 0.3s ease;
}

.see-more-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
}

.btn-doodle {
  margin-left: 0.5rem;
}

/* Sección fija de Sheila BIEN CUADRADA */
.fixed-sheila-section {
  position: absolute;
  left: 300px;
  top: 375px;
  z-index: 9999;
  width: 500px;
  pointer-events: none;
}

.sheila-image {
  /* 1) Negro puro para el interior (100%×100%)
     2) Degradado de izquierda: transparente→negro (20% ancho)
     3) Degradado de abajo:  transparente→negro (20% alto) */
  -webkit-mask-image:
    linear-gradient(black, black),
    linear-gradient(to right, transparent, black 20%),
    linear-gradient(to top,   transparent, black 20%);
  -webkit-mask-size:      100% 100%,  20% 100%, 100% 20%;
  -webkit-mask-position:  center,       left,     bottom;
  -webkit-mask-repeat:    no-repeat;

  mask-image:
    linear-gradient(black, black),
    linear-gradient(to right, transparent, black 20%),
    linear-gradient(to top,   transparent, black 20%);
  mask-size:      100% 100%,  20% 100%, 100% 20%;
  mask-position:  center,       left,     bottom;
  mask-repeat:    no-repeat;

  margin-bottom: 15px;
}
.sheila-photo {
  width: 350px;
  display: block;
  /* usa transform en lugar de rotate: */
  transform: rotate(-5deg);
}

.sheila-text-content {
  text-align: center;
}

.sheila-title {
  font-family: 'Dancing Script', cursive;
  font-size: 40px;
  color: #d4a574;
  font-weight: 700;
  margin: 0 0 10px 0;
  transform: rotate(-5deg);
  display: block;
}

.sheila-underline {
  margin-bottom: 20px;
  text-align: center;
}

.underline-image {
  width: 150px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.sheila-arrow {
  text-align: right;
  margin-left: 130px;
}

.arrow-image {
  width: 275px;
  height: auto;
  transform: rotate(15deg);
  display: block;
}

/* Doodles flotantes */
.floating-doodles {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 5;
}

.float-doodle {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
  will-change: transform;
}

.doodle-1 { top: 10%; left: 10%; animation-delay: 0s; }
.doodle-2 { top: 20%; right: 15%; animation-delay: 2s; }
.doodle-3 { top: 60%; left: 5%; animation-delay: 4s; }
.doodle-4 { bottom: 30%; right: 10%; animation-delay: 6s; }
.doodle-5 { bottom: 20%; left: 20%; animation-delay: 8s; }

/* Animaciones */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
  60% { transform: translateY(-2px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .notebook-content {
    padding-left: 20px;
  }

  .paper-margin {
    left: 40px;
  }

  .paper-holes {
    left: 10px;
  }

  .header-main {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .date-corner {
    text-align: center;
  }

  .date-underline {
    margin: 5px auto 0;
  }

  /* Ocultar sección fija de Sheila en móviles */
  .fixed-sheila-section {
    display: none;
  }
}
</style>
