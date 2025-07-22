<template>
  <section class="favorite-genres">
    <!-- Fondo de papel limpio -->
    <div class="paper-background">
      <div class="paper-texture"></div>
    </div>

    <div class="genres-container">
      <!-- Header de la sección -->
      <header class="section-header">
        <div class="header-decoration">
          <span class="deco-element book">📚</span>
          <span class="deco-element heart">♡</span>
          <span class="deco-element star">✦</span>
        </div>

        <h2 class="main-title">Mis Géneros Favoritos</h2>
        <div class="title-underline"></div>

        <p class="section-subtitle">
          Los mundos literarios que más conquistan mi corazón y despiertan mi imaginación...
        </p>

        <!-- Flecha decorativa -->
        <svg class="arrow-decoration" viewBox="0 0 200 40">
          <path d="M15,20 Q60,10 100,20 Q140,30 185,20" stroke="#8B4513" fill="none" stroke-width="3" stroke-linecap="round"/>
          <path d="M180,17 L187,20 L180,23" stroke="#8B4513" fill="none" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </header>

      <!-- Grid de géneros -->
      <main class="genres-grid">
        <article
          v-for="(genre, index) in favoriteGenres"
          :key="genre.name"
          class="genre-card"
          :class="`card-${index + 1}`"
          @click="exploreGenre(genre)"
          @mouseenter="animateCard"
          @mouseleave="resetCard"
        >
          <!-- Decoración de washi tape -->
          <div class="washi-tape" :class="`tape-${(index % 4) + 1}`"></div>

          <!-- Contenido de la tarjeta -->
          <div class="card-content">
            <!-- Icono y emoji del género -->
            <div class="genre-icon-area">
              <span class="genre-emoji">{{ genre.emoji }}</span>
              <div class="icon-glow"></div>
            </div>

            <!-- Nombre del género -->
            <h3 class="genre-name">{{ genre.name }}</h3>

            <!-- Descripción personal -->
            <p class="genre-description">{{ genre.description }}</p>

            <!-- Nivel de amor (corazones) -->
            <div class="love-level">
              <span class="love-label">Mi nivel de amor:</span>
              <div class="hearts-container">
                <span
                  v-for="heart in 5"
                  :key="heart"
                  class="love-heart"
                  :class="{ 'filled': heart <= genre.loveLevel }"
                >
                  ♡
                </span>
              </div>
            </div>

            <!-- Libros favoritos del género -->
            <div class="favorite-books">
              <span class="books-label">Favoritos:</span>
              <div class="books-list">
                <span
                  v-for="(book, bookIndex) in genre.favoriteBooks.slice(0, 2)"
                  :key="book"
                  class="book-chip"
                  :class="`chip-${(bookIndex % 3) + 1}`"
                >
                  {{ book }}
                </span>
                <span v-if="genre.favoriteBooks.length > 2" class="more-books">
                  +{{ genre.favoriteBooks.length - 2 }} más
                </span>
              </div>
            </div>

            <!-- Por qué me gusta -->
            <div class="why-love">
              <div class="quote-mark">"</div>
              <p class="love-reason">{{ genre.whyLove }}</p>
              <div class="quote-mark quote-end">"</div>
            </div>

            <!-- Estadística curiosa -->
            <div class="genre-stat">
              <span class="stat-icon">📊</span>
              <span class="stat-text">{{ genre.stat }}</span>
            </div>
          </div>

          <!-- Decoraciones de esquina -->
          <div class="corner-decorations">
            <div class="corner-doodle top-left">✨</div>
            <div class="corner-doodle bottom-right">{{ ['🌟', '💫', '⭐', '✨'][index % 4] }}</div>
          </div>

          <!-- Efecto de hover -->
          <div class="hover-effect"></div>
        </article>
      </main>

      <!-- Footer con call to action -->
      <footer class="section-footer">
        <div class="footer-content">
          <p class="footer-text">¿Compartes alguno de estos gustos literarios?</p>
          <button class="explore-button" @click="exploreAllGenres">
            <span class="button-icon">🔍</span>
            <span class="button-text">Explorar más géneros</span>
          </button>
        </div>
      </footer>
    </div>

    <!-- Sección fija de Sheila a la izquierda -->
    <div class="fixed-sheila-section">
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
    </div>

    <!-- Elementos flotantes decorativos -->
    <div class="floating-elements">
      <div class="float-element element-1">📖</div>
      <div class="float-element element-2">✨</div>
      <div class="float-element element-3">💭</div>
      <div class="float-element element-4">🌸</div>
      <div class="float-element element-5">⭐</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const favoriteGenres = ref([
  {
    name: 'Fantasía Épica',
    emoji: '🐉',
    description: 'Mundos mágicos llenos de aventuras, donde todo es posible y los héroes nacen de las páginas.',
    loveLevel: 5,
    favoriteBooks: ['El Nombre del Viento', 'El Señor de los Anillos', 'Canción de Hielo y Fuego'],
    whyLove: 'Me permite escapar a mundos donde la magia es real y los sueños se hacen realidad.',
    stat: 'He leído 47 libros de fantasía este año'
  },
  {
    name: 'Romance Contemporáneo',
    emoji: '💕',
    description: 'Historias de amor que me hacen suspirar y creer en los finales felices.',
    loveLevel: 4,
    favoriteBooks: ['Los 7 Maridos de Evelyn Hugo', 'Beach Read', 'The Spanish Love Deception'],
    whyLove: 'Porque el amor siempre encuentra la manera de sorprenderme y emocionarme.',
    stat: '35 libros románticos que me robaron el sueño'
  },
  {
    name: 'Misterio & Thriller',
    emoji: '🔍',
    description: 'Enigmas que resolver, secretos que descubrir y giros que jamás veo venir.',
    loveLevel: 4,
    favoriteBooks: ['La Chica del Tren', 'Big Little Lies', 'El Código Da Vinci'],
    whyLove: 'Adoro la adrenalina de intentar resolver el misterio antes que el protagonista.',
    stat: 'Resolví 3 de cada 10 misterios antes del final'
  },
  {
    name: 'Ficción Histórica',
    emoji: '🏛️',
    description: 'Viajes en el tiempo a través de páginas, viviendo historias de épocas pasadas.',
    loveLevel: 5,
    favoriteBooks: ['Circe', 'Los Pilares de la Tierra', 'Memorias de una Geisha'],
    whyLove: 'Me fascina cómo el pasado cobra vida y se vuelve tan real como el presente.',
    stat: 'He viajado a 12 épocas diferentes este año'
  },
  {
    name: 'Young Adult',
    emoji: '🌟',
    description: 'Historias que despiertan la adolescente que llevo dentro y me hacen soñar.',
    loveLevel: 4,
    favoriteBooks: ['Los Juegos del Hambre', 'Divergente', 'Cinder'],
    whyLove: 'Porque nunca es tarde para sentirse joven y creer que puedes cambiar el mundo.',
    stat: 'Mi saga YA favorita tiene 7 libros'
  },
  {
    name: 'Ciencia Ficción',
    emoji: '🚀',
    description: 'Futuros posibles, mundos distantes y tecnología que desafía la imaginación.',
    loveLevel: 3,
    favoriteBooks: ['Klara y el Sol', 'El Marciano', '1984'],
    whyLove: 'Me encanta imaginar cómo será el mundo del mañana y qué nos depara el futuro.',
    stat: 'He explorado 8 planetas diferentes en mis lecturas'
  }
])

const animateCard = (e) => {
  e.currentTarget.style.transform = 'translateY(-8px) rotate(1deg) scale(1.02)'
}

const resetCard = (e) => {
  e.currentTarget.style.transform = 'translateY(0) rotate(0deg) scale(1)'
}

const exploreGenre = (genre) => {
  // Crear un slug del nombre del género para la URL
  const genreSlug = genre.name.toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/ /g, '-')
    .replace(/[áàä]/g, 'a')
    .replace(/[éèë]/g, 'e')
    .replace(/[íìï]/g, 'i')
    .replace(/[óòö]/g, 'o')
    .replace(/[úùü]/g, 'u')
    .replace(/ñ/g, 'n')

  // Navegar a la página de recomendaciones con datos del género
  router.push({
    name: 'Recomendaciones',
    params: { genero: genreSlug },
    query: {
      nombre: genre.name,
      nivel: genre.loveLevel,
      emoji: genre.emoji
    }
  })
}

const exploreAllGenres = () => {
  console.log('Explorar todos los géneros')
  // Navegar a página completa de géneros
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Special+Elite&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Kalam:wght@400;700&display=swap');

.favorite-genres {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #FBF8F3 0%, #F5F0E8 50%, #EADDD1 100%);
  font-family: 'Crimson Text', serif;
  padding: 4rem 1rem;
}

/* Fondo de papel limpio */
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

.genres-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 100px;
}

/* Header de la sección */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.header-decoration {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.deco-element {
  animation: gentle-bounce 3s ease-in-out infinite;
}

.deco-element.book {
  color: #8B4513;
  animation-delay: 0s;
}

.deco-element.heart {
  color: #FF69B4;
  animation-delay: 1s;
}

.deco-element.star {
  color: #FFD700;
  animation-delay: 2s;
}

.main-title {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: #8B4513;
  margin-bottom: 1rem;
  font-weight: 700;
}

.title-underline {
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, #8B4513, #A0522D, #8B4513);
  margin: 0 auto 2rem;
  border-radius: 2px;
}

.section-subtitle {
  font-family: 'Kalam', cursive;
  font-size: 1.3rem;
  color: #A0522D;
  font-style: italic;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.arrow-decoration {
  width: 200px;
  height: 40px;
  margin: 0 auto;
  display: block;
}

/* Grid de géneros */
.genres-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .genres-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .genres-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Tarjetas de género */
.genre-card {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 8px 25px rgba(139, 69, 19, 0.1),
    0 3px 10px rgba(139, 69, 19, 0.05);
  border: 2px solid rgba(139, 69, 19, 0.08);
  overflow: hidden;
  transform-origin: center;
  will-change: transform;
}

.genre-card:hover {
  box-shadow:
    0 15px 40px rgba(139, 69, 19, 0.2),
    0 8px 20px rgba(139, 69, 19, 0.1);
  border-color: rgba(139, 69, 19, 0.15);
}

/* Washi tape decorativo */
.washi-tape {
  position: absolute;
  top: -3px;
  left: 20px;
  right: 20px;
  height: 12px;
  border-radius: 0 0 6px 6px;
  opacity: 0.8;
}

.tape-1 { background: linear-gradient(45deg, #FF6B9D, #FF8A9B); }
.tape-2 { background: linear-gradient(45deg, #C77DFF, #E0AAFF); }
.tape-3 { background: linear-gradient(45deg, #06FFA5, #96F7D2); }
.tape-4 { background: linear-gradient(45deg, #FFD93D, #FFEC8B); }

.card-content {
  position: relative;
  z-index: 5;
}

/* Icono del género */
.genre-icon-area {
  position: relative;
  text-align: center;
  margin-bottom: 1.5rem;
}

.genre-emoji {
  font-size: 3rem;
  display: inline-block;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.genre-card:hover .genre-emoji {
  transform: scale(1.1) rotate(5deg);
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2), transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.genre-card:hover .icon-glow {
  opacity: 1;
}

/* Nombre del género */
.genre-name {
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  color: #8B4513;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}

/* Descripción */
.genre-description {
  font-family: 'Kalam', cursive;
  font-size: 0.95rem;
  color: #654321;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Nivel de amor */
.love-level {
  text-align: center;
  margin-bottom: 1.5rem;
}

.love-label {
  display: block;
  font-family: 'Special Elite', monospace;
  font-size: 0.8rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.hearts-container {
  display: flex;
  justify-content: center;
  gap: 0.3rem;
}

.love-heart {
  font-size: 1.3rem;
  color: #ddd;
  transition: all 0.3s ease;
}

.love-heart.filled {
  color: #FF69B4;
  text-shadow: 0 0 8px rgba(255, 105, 180, 0.4);
  animation: heart-pulse 2s ease-in-out infinite;
}

/* Libros favoritos */
.favorite-books {
  margin-bottom: 1.5rem;
}

.books-label {
  display: block;
  font-family: 'Special Elite', monospace;
  font-size: 0.8rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.books-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
}

.book-chip {
  background: linear-gradient(45deg, #F5F0E8, #E6D3B7);
  color: #654321;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(139, 69, 19, 0.2);
}

.more-books {
  color: #A0522D;
  font-size: 0.75rem;
  font-style: italic;
  padding: 0.3rem 0.5rem;
}

/* Por qué me gusta */
.why-love {
  position: relative;
  background: rgba(255, 182, 193, 0.1);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-left: 3px solid #FFB6C1;
}

.quote-mark {
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: #A0522D;
  position: absolute;
  font-weight: 700;
}

.quote-mark:first-child {
  top: 5px;
  left: 8px;
}

.quote-end {
  bottom: 5px;
  right: 8px;
}

.love-reason {
  font-family: 'Kalam', cursive;
  font-size: 0.9rem;
  color: #654321;
  font-style: italic;
  margin: 0;
  padding: 0 1rem;
  text-align: center;
}

/* Estadística */
.genre-stat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(139, 69, 19, 0.05);
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px dashed #D2B48C;
}

.stat-icon {
  font-size: 1.1rem;
}

.stat-text {
  font-family: 'Special Elite', monospace;
  font-size: 0.85rem;
  color: #8B4513;
  font-weight: 600;
}

/* Decoraciones de esquina */
.corner-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.corner-doodle {
  position: absolute;
  font-size: 1rem;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.corner-doodle.top-left {
  top: 15px;
  left: 15px;
}

.corner-doodle.bottom-right {
  bottom: 15px;
  right: 15px;
}

.genre-card:hover .corner-doodle {
  opacity: 1;
  transform: scale(1.2);
}

/* Efecto de hover */
.hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.genre-card:hover .hover-effect {
  left: 100%;
}

/* Footer */
.section-footer {
  text-align: center;
  margin-top: 3rem;
}

.footer-content {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid rgba(139, 69, 19, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.footer-text {
  font-family: 'Kalam', cursive;
  font-size: 1.1rem;
  color: #654321;
  margin-bottom: 1.5rem;
}

.explore-button {
  background: linear-gradient(45deg, #8B4513, #A0522D);
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  color: white;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
}

.explore-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
  background: linear-gradient(45deg, #A0522D, #CD853F);
}

.button-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.explore-button:hover .button-icon {
  transform: scale(1.1) rotate(10deg);
}

/* Sección fija de Sheila BIEN CUADRADA */
.fixed-sheila-section {
  position: absolute;
  left: 275px;
  top: 675px;
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

/* Elementos flotantes */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.float-element {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.3;
  animation: float-gentle 8s ease-in-out infinite;
}

.element-1 { top: 10%; left: 5%; animation-delay: 0s; }
.element-2 { top: 20%; right: 10%; animation-delay: 2s; }
.element-3 { bottom: 30%; left: 8%; animation-delay: 4s; }
.element-4 { bottom: 15%; right: 15%; animation-delay: 6s; }
.element-5 { top: 60%; left: 50%; animation-delay: 8s; }

/* Animaciones */
@keyframes gentle-bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}

@keyframes heart-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .favorite-genres {
    padding: 2rem 1rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .genre-card {
    padding: 1.5rem;
  }

  .genre-emoji {
    font-size: 2.5rem;
  }

  .genre-name {
    font-size: 1.5rem;
  }

  /* Ocultar sección fija de Sheila en móviles */
  .fixed-sheila-section {
    display: none;
  }
}

/* Modo reducido de movimiento */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }

  .genre-card:hover {
    transform: none;
  }
}
</style>
