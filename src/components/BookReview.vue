<template>
  <div class="book-review-page">
    <!-- Header con botón de volver -->
    <header class="review-header">
      <button @click="goBack" class="back-button">
        <svg class="back-arrow" viewBox="0 0 24 24">
          <path d="M15 18L9 12L15 6" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Volver al diario</span>
      </button>
    </header>

    <main class="review-content">
      <!-- Lado izquierdo: Foto integrada con info -->
      <section class="photo-section">
        <div class="photo-container">
          <!-- Foto de Sheila sin fondo, integrada al diseño -->
          <div class="author-photo-area">
            <img :src="bookData.photoWithBook" :alt="`Sheila con ${bookData.title}`" class="author-image">
            <div class="photo-effects">
              <div class="glow-effect"></div>
              <div class="shadow-effect"></div>
            </div>
          </div>

          <!-- Decoraciones alrededor de la foto -->
          <div class="photo-decorations">
            <div class="deco-heart heart-1">♡</div>
            <div class="deco-heart heart-2">♡</div>
            <div class="deco-star star-1">✦</div>
            <div class="deco-star star-2">✦</div>
            <div class="deco-book">📚</div>
          </div>

          <!-- Info del libro integrada -->
          <div class="book-info-integrated">
            <h2 class="book-title-display">{{ bookData.title }}</h2>
            <p class="book-author-display">por {{ bookData.author }}</p>

            <!-- Rating con estrellas -->
            <div class="rating-display">
              <div class="stars-container">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star-rating"
                  :class="{ 'filled': star <= bookData.rating }"
                >
                  ★
                </span>
              </div>
              <span class="rating-text">{{ bookData.rating }}/5 estrellas</span>
            </div>

            <!-- Tags del libro -->
            <div class="book-tags-display">
              <span
                v-for="(tag, index) in bookData.tags"
                :key="tag"
                class="tag-badge"
                :class="`tag-style-${(index % 3) + 1}`"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Fecha de lectura con estilo handwritten -->
            <div class="reading-date">
              <span class="date-decoration">📖</span>
              <span class="date-text">Terminado el {{ formatDateLong(bookData.date) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Lado derecho: Hoja de review -->
      <section class="review-section">
        <div class="notebook-page">
          <!-- Decoraciones de página -->
          <div class="page-decorations">
            <div class="page-holes">
              <div class="hole" v-for="n in 6" :key="n"></div>
            </div>
            <div class="margin-line"></div>
            <div class="spiral-binding">
              <div class="spiral-ring" v-for="n in 8" :key="n"></div>
            </div>
          </div>

          <!-- Esquinas dobladas -->
          <div class="folded-corner top-right"></div>
          <div class="folded-corner bottom-left"></div>

          <!-- Contenido de la review -->
          <div class="review-text-content">
            <!-- Header de la página -->
            <div class="page-header">
              <h1 class="review-title">Reseña Completa</h1>
              <div class="title-underline"></div>
              <div class="cute-doodles">
                <span class="doodle heart">♡</span>
                <span class="doodle star">✦</span>
                <span class="doodle book">📚</span>
              </div>
            </div>

            <!-- Cita del libro (primer recuadro) -->
            <div class="book-quote-box">
              <div class="quote-decoration left">"</div>
              <p class="quote-text">{{ bookData.bookQuote.text }}</p>
              <div class="quote-decoration right">"</div>
              <div class="quote-context">— {{ bookData.bookQuote.context }}</div>
              <div class="highlight-marker gold"></div>
            </div>

            <!-- Review completa con los nuevos apartados -->
            <div class="full-review">
              <!-- Opinión Personal -->
              <h3 class="section-title">Opinión personal</h3>
              <div class="opinion-section">
                <p v-for="paragraph in bookData.personalOpinion" :key="paragraph" class="opinion-paragraph">
                  {{ paragraph }}
                </p>
                <div class="highlight-marker pink"></div>
              </div>

              <!-- Sobre los personajes -->
              <h3 class="section-title">Sobre los personajes...</h3>
              <div class="characters-section">
                <div
                  v-for="character in bookData.charactersOpinion"
                  :key="character.name"
                  class="character-card"
                >
                  <div class="character-name">{{ character.name }}</div>
                  <p class="character-opinion">{{ character.opinion }}</p>
                </div>
              </div>

              <!-- La ambientación -->
              <h3 class="section-title">La ambientación fue...</h3>
              <div class="ambientacion-box">
                <p class="ambientacion-text">{{ bookData.ambientacion }}</p>
                <div class="highlight-marker blue"></div>
              </div>

              <!-- Recomendación -->
              <h3 class="section-title">¿Lo recomendaría?</h3>
              <div class="recommendation-box">
                <div class="recommendation-header">
                  <span class="recommend-icon">{{ bookData.wouldRecommend ? '👍' : '👎' }}</span>
                  <span class="recommend-text">
                    {{ bookData.wouldRecommend ? '¡Absolutamente sí!' : 'Con reservas...' }}
                  </span>
                </div>
                <p class="recommendation-reason">{{ bookData.recommendationReason }}</p>
              </div>

              <!-- Si te gustó este libro -->
              <h3 class="section-title">Si te gustó este libro, podrá gustarte este otro</h3>
              <div class="similar-books">
                <div
                  v-for="book in bookData.similarBooks"
                  :key="book.title"
                  class="similar-book-card"
                >
                  <div class="similar-book-title">{{ book.title }}</div>
                  <div class="similar-book-author">por {{ book.author }}</div>
                  <p class="similar-book-reason">{{ book.reason }}</p>
                </div>
              </div>
            </div>

            <!-- Footer de la página -->
            <div class="page-footer">
              <div class="footer-doodles">
                <span class="footer-doodle">✨</span>
                <span class="footer-doodle">🌸</span>
                <span class="footer-doodle">💕</span>
              </div>
              <div class="signature">
                <span class="signature-text">~ Sheila ♡</span>
                <div class="signature-date">{{ formatDateLong(bookData.date) }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Props que recibiríamos del router o componente padre
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

// Usar router y route
const router = useRouter()
const route = useRoute()

// Datos del libro (normalmente vendrían de una API)
const bookData = ref({
  title: 'La asistenta',
  author: 'Freida McFadden',
  rating: 5,
  tags: ['Thriller psicológico', 'Suspense', 'Novela negra', 'Adictivo'],
  date: '2024-09-17',
  photoWithBook: '/images/Review_la_asistenta.jpg', // Foto de Sheila con el libro

  // Cita del libro (primer recuadro)
  bookQuote: {
    text: '“Al cerrar la puerta, noto marcas en la madera. Líneas largas y delgadas… parecen arañazos. Como si alguien hubiera estado rascando la puerta. Intentando salir.”',
    context: 'La asistenta – Freida McFadden'
  },

  // Opinión personal (varios párrafos)
  personalOpinion: [
    'Es un libro que logra confundirte desde el principio, no confías en los personajes, sus actitudes son complejas y no sabes qué creer.',
    'Me ha chiflado la manera de escribir de Freida, sabe cómo engancharte y dejarte con la intriga para querer seguir leyendo.',
    'No es un libro con el que se pasa gran tensión, pero sí estás expectante a la espera del siguiente paso.'
  ],

  // Sobre los personajes
  charactersOpinion: [
    {
      opinion: 'Freida consigue construir unos personajes llenos de misterio, y absolutamente todos tienen secretos. A medida que avanza la trama, esa familia perfecta se convierte en todo un embrollo psicológico y nadie es quien parece ser.'
    }
  ],

  // La ambientación
  ambientacion: 'Encontrarnos en un lugar doméstico como la casa de la familia Winchester ha sido realmente inquietante, que es precisamente el objetivo de la lectura. Además de sentirte atrapado, ves cosas raras sin poder darles una explicación lógica.',

  // Recomendación
  wouldRecommend: true,
  recommendationReason: 'Si te gusta el thriller doméstico, algo de tensión y un enganche a una lectura ligera, esta es una apuesta segura.',

  // Libros similares
  similarBooks: [
    {
      title: 'No la dejes entrar',
      author: 'Nicola Sanders',
      reason: 'Si te gustó “La asistenta” por su ritmo de lectura, personajes, tensión y los secretos familiares, “No la dejes entrar” va en la misma línea, compartiendo el mismo escenario de thriller doméstico.'
    }
  ]
});


const formatDateLong = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const goBack = () => {
  router.go(-1) // Volver a la página anterior
  // O si prefieres ir a una ruta específica:
  // router.push('/biblioteca')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Special+Elite&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

.book-review-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #FBF8F3 0%, #F5F0E8 50%, #EADDD1 100%);
  font-family: 'Crimson Text', serif;
}

.review-header {
  padding: 2rem;
  position: sticky;
  top: 0;
  background: rgba(251, 248, 243, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
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

.review-content {
  display: grid;
  grid-template-columns: 480px 1fr;
  gap: 3rem;
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
  align-items: start;
}

/* SECCIÓN DE FOTO REDISEÑADA */
.photo-section {
  position: sticky;
  top: 120px;
}

.photo-container {
  background: transparent;
  padding: 2.5rem;
  border-radius: 25px;
  position: relative;
  text-align: center;
}

/* Foto principal sin marco, integrada */
.author-photo-area {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.author-image {
  width: 350px;
  height: 450px;
  object-fit: cover;
  object-position: center;
  border-radius: 50px 20px 50px 20px;
  filter: drop-shadow(0 20px 40px rgba(139, 69, 19, 0.4));
  transition: all 0.4s ease;
  position: relative;
  z-index: 5;
}

.author-image:hover {
  transform: translateY(-8px) scale(1.03);
  filter: drop-shadow(0 25px 50px rgba(139, 69, 19, 0.5));
}

/* Efectos alrededor de la foto */
.photo-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.glow-effect {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(255, 182, 193, 0.2), rgba(144, 238, 144, 0.2));
  border-radius: 30px;
  opacity: 0;
  transition: opacity 0.4s ease;
  animation: glow-pulse 3s ease-in-out infinite;
}

.author-image:hover + .photo-effects .glow-effect {
  opacity: 1;
}

.shadow-effect {
  position: absolute;
  bottom: -30px;
  left: 30px;
  right: 30px;
  height: 40px;
  background: radial-gradient(ellipse, rgba(139, 69, 19, 0.4), transparent 70%);
  border-radius: 50%;
  filter: blur(12px);
}

/* Decoraciones flotantes alrededor */
.photo-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.deco-heart,
.deco-star,
.deco-book {
  position: absolute;
  font-size: 1.8rem;
  opacity: 0.7;
  animation: float-decoration 4s ease-in-out infinite;
}

.heart-1 {
  top: 30px;
  left: 15px;
  color: #FF69B4;
  animation-delay: 0s;
}

.heart-2 {
  bottom: 120px;
  right: 25px;
  color: #FF1493;
  animation-delay: 2s;
}

.star-1 {
  top: 100px;
  right: 40px;
  color: #FFD700;
  animation-delay: 1s;
}

.star-2 {
  bottom: 80px;
  left: 40px;
  color: #FFA500;
  animation-delay: 3s;
}

.deco-book {
  top: 50%;
  left: -15px;
  color: #8B4513;
  animation-delay: 1.5s;
}

/* Info del libro integrada */
.book-info-integrated {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(15px);
  border-radius: 25px;
  padding: 2rem;
  border: 2px solid rgba(139, 69, 19, 0.1);
  box-shadow: 0 15px 35px rgba(139, 69, 19, 0.2);
  margin-top: 1rem;
}

.book-title-display {
  font-family: 'Dancing Script', cursive;
  font-size: 2.2rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.book-author-display {
  font-size: 1.2rem;
  color: #A0522D;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-style: italic;
}

.rating-display {
  margin-bottom: 1.5rem;
}

.stars-container {
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
}

.star-rating {
  font-size: 1.8rem;
  color: #ddd;
  transition: all 0.3s ease;
  cursor: default;
}

.star-rating.filled {
  color: #FFD700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.rating-text {
  font-size: 0.9rem;
  color: #8B4513;
  font-weight: 600;
}

.book-tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tag-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  transform: rotate(-1deg);
  transition: transform 0.3s ease;
}

.tag-badge:hover {
  transform: rotate(0deg) scale(1.05);
}

.tag-style-1 { background: linear-gradient(45deg, #8B4513, #A0522D); }
.tag-style-2 { background: linear-gradient(45deg, #CD853F, #DEB887); }
.tag-style-3 { background: linear-gradient(45deg, #D2691E, #F4A460); }

.reading-date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1rem;
  color: #8B4513;
  background: rgba(139, 69, 19, 0.05);
  padding: 1rem;
  border-radius: 15px;
  border: 1px dashed #D2B48C;
}

.date-decoration {
  font-size: 1.3rem;
  animation: bounce-soft 2s ease-in-out infinite;
}

.date-text {
  font-family: 'Special Elite', monospace;
  font-weight: 600;
}

/* Animaciones */
@keyframes glow-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.02); }
}

@keyframes float-decoration {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(5deg); }
}

@keyframes bounce-soft {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-3px); }
  60% { transform: translateY(-1px); }
}

/* SECCIÓN DE REVIEW */
.review-section {
  position: relative;
}

.notebook-page {
  background: linear-gradient(135deg, #FFFEF7 0%, #FAF8F3 100%);
  border-radius: 12px;
  padding: 3rem 2.5rem;
  box-shadow:
    0 15px 40px rgba(139, 69, 19, 0.2),
    0 5px 15px rgba(139, 69, 19, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(139, 69, 19, 0.05);
  border: 2px solid #E6D3B7;
  position: relative;
  min-height: 80vh;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.08) 1px, transparent 0);
  background-size: 15px 15px;
}

.page-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.page-holes {
  position: absolute;
  left: 15px;
  top: 30px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.hole {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  border: 2px solid #ddd;
  box-shadow:
    inset 0 2px 4px rgba(0,0,0,0.15),
    0 1px 2px rgba(0,0,0,0.1);
}

.margin-line {
  position: absolute;
  left: 60px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #FF6B9D 0%, #FFB6C1 50%, #FF6B9D 100%);
  opacity: 0.7;
  box-shadow: 0 0 2px rgba(255, 107, 157, 0.3);
}

.spiral-binding {
  position: absolute;
  left: -10px;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 45px;
}

.spiral-ring {
  width: 22px;
  height: 22px;
  border: 3px solid #B8860B;
  border-radius: 50%;
  background: linear-gradient(135deg, #f8f8f8 0%, #e0e0e0 50%, #d0d0d0 100%);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.2),
    inset 0 1px 2px rgba(255,255,255,0.8),
    inset 0 -1px 2px rgba(0,0,0,0.1);
}

.folded-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 10;
}

.folded-corner::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 50%, #E6D3B7 50%);
  box-shadow: -2px 2px 5px rgba(139, 69, 19, 0.2);
}

.folded-corner::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  top: 5px;
  left: 5px;
  background: linear-gradient(45deg, #F5F0E8 0%, #E6D3B7 100%);
  box-shadow: inset 1px 1px 3px rgba(139, 69, 19, 0.1);
}

.folded-corner.top-right {
  top: 0;
  right: 0;
  border-radius: 0 12px 0 0;
}

.folded-corner.bottom-left {
  bottom: 0;
  left: 60px;
  border-radius: 0 0 0 12px;
  transform: rotate(180deg);
}

.review-text-content {
  margin-left: 40px;
  position: relative;
  z-index: 5;
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.review-title {
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.title-underline {
  width: 150px;
  height: 3px;
  background: #A0522D;
  margin: 0 auto 1rem;
  border-radius: 2px;
}

.cute-doodles {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 1.2rem;
}

.doodle.heart { color: #FF69B4; }
.doodle.star { color: #FFD700; }
.doodle.book { color: #8B4513; }

/* CITA DEL LIBRO (primer recuadro) */
.book-quote-box {
  position: relative;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 235, 59, 0.05));
  border-radius: 15px;
  border: 2px solid #FFD700;
  border-left: 6px solid #FFA000;
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2);
}

.quote-decoration {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: #B8860B;
  position: absolute;
  font-weight: 700;
  opacity: 0.7;
}

.quote-decoration.left {
  top: -5px;
  left: 10px;
}

.quote-decoration.right {
  bottom: -15px;
  right: 15px;
}

.quote-text {
  font-size: 1.3rem;
  line-height: 1.7;
  color: #654321;
  font-style: italic;
  text-align: center;
  padding: 0 2rem;
  margin-bottom: 1rem;
}

.quote-context {
  text-align: right;
  font-size: 1rem;
  color: #8B4513;
  font-weight: 600;
}

.full-review {
  line-height: 1.8;
}

.section-title {
  font-family: 'Special Elite', monospace;
  font-size: 1.3rem;
  color: #8B4513;
  margin: 2.5rem 0 1.5rem 0;
  border-bottom: 2px dashed #D2B48C;
  padding-bottom: 0.5rem;
}

/* Opinión personal */
.opinion-section {
  position: relative;
  margin-bottom: 2rem;
}

.opinion-paragraph {
  margin-bottom: 1.2rem;
  color: #654321;
  line-height: 1.7;
  padding-left: 1rem;
  border-left: 3px solid #FFB6C1;
}

/* Personajes */
.characters-section {
  margin-bottom: 2rem;
}

.character-card {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #E6D3B7;
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  box-shadow: 0 3px 10px rgba(139, 69, 19, 0.1);
}

.character-name {
  font-family: 'Dancing Script', cursive;
  font-size: 1.3rem;
  color: #8B4513;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.character-opinion {
  color: #654321;
  margin: 0;
  line-height: 1.6;
}

/* Ambientación */
.ambientacion-box {
  position: relative;
  padding: 1.8rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.1), rgba(152, 251, 152, 0.05));
  border-radius: 12px;
  border: 2px solid #90EE90;
  border-left: 6px solid #32CD32;
  box-shadow: 0 6px 20px rgba(144, 238, 144, 0.2);
}

.ambientacion-text {
  color: #2D5016;
  font-weight: 500;
  line-height: 1.7;
  margin: 0;
}

/* Recomendación */
.recommendation-box {
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.15), rgba(255, 192, 203, 0.1));
  border: 2px solid #FFB6C1;
  border-radius: 12px;
  padding: 1.8rem;
  margin: 1.5rem 0;
  box-shadow: 0 6px 20px rgba(255, 182, 193, 0.2);
}

.recommendation-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.recommend-icon {
  font-size: 1.8rem;
}

.recommend-text {
  font-weight: 600;
  color: #8B4513;
  font-size: 1.2rem;
}

.recommendation-reason {
  color: #654321;
  margin: 0;
  line-height: 1.6;
}

/* Libros similares */
.similar-books {
  margin: 1.5rem 0;
}

.similar-book-card {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #E6D3B7;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.2rem;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.similar-book-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.15);
}

.similar-book-title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.4rem;
  color: #8B4513;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.similar-book-author {
  font-size: 0.95rem;
  color: #A0522D;
  font-style: italic;
  margin-bottom: 0.8rem;
}

.similar-book-reason {
  color: #654321;
  margin: 0;
  line-height: 1.6;
}

/* Marcadores de resaltado */
.highlight-marker {
  position: absolute;
  bottom: 8px;
  left: 15px;
  right: 15px;
  height: 8px;
  border-radius: 4px;
  opacity: 0.4;
}

.highlight-marker.gold { background: #FFD700; }
.highlight-marker.pink { background: #FFB6C1; }
.highlight-marker.blue { background: #87CEEB; }
.highlight-marker.green { background: #90EE90; }
.highlight-marker.yellow { background: #FFFF99; }

/* Footer de la página */
.page-footer {
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #D2B48C;
  padding-top: 2rem;
}

.footer-doodles {
  display: flex;
  gap: 1.5rem;
  font-size: 1.5rem;
}

.footer-doodle {
  opacity: 0.6;
  animation: gentle-float 3s ease-in-out infinite;
}

.footer-doodle:nth-child(1) { animation-delay: 0s; }
.footer-doodle:nth-child(2) { animation-delay: 1s; }
.footer-doodle:nth-child(3) { animation-delay: 2s; }

.signature {
  text-align: right;
}

.signature-text {
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: #8B4513;
  font-weight: 700;
}

.signature-date {
  font-size: 0.9rem;
  color: #A0522D;
  margin-top: 0.3rem;
  font-family: 'Special Elite', monospace;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(2deg); }
}

/* Responsive */
@media (max-width: 1024px) {
  .review-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .photo-section {
    position: static;
  }

  .photo-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .author-image {
    width: 300px;
    height: 380px;
  }
}

@media (max-width: 768px) {
  .review-content {
    padding: 1rem;
  }

  .notebook-page {
    padding: 2rem 1.5rem;
  }

  .review-text-content {
    margin-left: 20px;
  }

  .margin-line {
    left: 40px;
  }

  .folded-corner.bottom-left {
    left: 40px;
  }

  .quote-text {
    font-size: 1.1rem;
    padding: 0 1rem;
  }

  .page-footer {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .similar-book-card {
    padding: 1.2rem;
  }
}
</style>
