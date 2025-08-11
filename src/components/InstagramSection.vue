<template>
  <section class="polaroid-section" ref="sectionRef">
    <!-- Elementos decorativos de fondo (solo desktop) -->
    <div class="scrapbook-background">
      <span class="deco-heart" v-for="i in 5" :key="`heart-${i}`">♡</span>
      <span class="deco-star" v-for="i in 3" :key="`star-${i}`">✦</span>
      <span class="deco-sparkle" v-for="i in 4" :key="`sparkle-${i}`">✨</span>
    </div>

    <!-- Contenedor principal estilo scrapbook -->
    <div class="scrapbook-container">
      <!-- Ilustración de Sheila (solo desktop) -->
      <div class="sticker-illustration">
        <div class="sheila-polaroid-wrapper">
          <div class="sheila-polaroid">
            <div class="sheila-polaroid-inner">
              <img
                src="/images/avatar.jpg"
                alt="Sheila con libros"
                class="sheila-photo"
              >
            </div>
            <p class="sheila-caption">¡Mira estos! →</p>
          </div>
          <div class="washi-tape tape-sheila"></div>
        </div>
      </div>

      <!-- Polaroid principal MEJORADA con estructura realista -->
      <div class="polaroid-main-wrapper">
        <!-- Sombra trasera para profundidad -->
        <div class="polaroid-shadow"></div>

        <!-- Marco Polaroid ultra-realista -->
        <div class="polaroid-frame">
          <!-- Bordes superiores con textura -->
          <div class="polaroid-border-top"></div>
          <div class="polaroid-border-left"></div>
          <div class="polaroid-border-right"></div>

          <!-- Logo/texto Polaroid -->
          <div class="polaroid-branding">
            <span class="brand-text">Polaroid</span>
          </div>

          <!-- Área principal de la foto con marco interno -->
          <div class="polaroid-photo-area">
            <!-- Marco interno negro característico -->
            <div class="photo-inner-frame">
              <!-- Grid de videos con efecto revelado -->
              <div
                class="video-grid"
                :class="{ 'revealed': isRevealed }"
                ref="imageAreaRef"
              >
                <article
                  v-for="video in videoReels"
                  :key="video.id"
                  class="video-item"
                  @click="openVideo(video)"
                  @mouseenter="hoverVideo = video.id"
                  @mouseleave="hoverVideo = null"
                >
                  <div class="video-thumbnail">
                    <img
                      :src="video.thumbnail"
                      :alt="video.title"
                      loading="lazy"
                    >
                    <!-- Efecto de brillo al hover -->
                    <div class="video-shine" v-if="hoverVideo === video.id"></div>
                    <div class="video-overlay">
                      <div class="play-button">
                        <svg viewBox="0 0 60 60">
                          <circle cx="30" cy="30" r="28" fill="rgba(255,255,255,0.95)"/>
                          <path d="M23,20 L23,40 L40,30 Z" fill="#8B4513"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="video-duration">{{ video.duration }}</div>
                </article>
              </div>
            </div>
          </div>

          <!-- Área inferior característica de Polaroid -->
          <div class="polaroid-bottom">
            <!-- Textura y sombreado del área inferior -->
            <div class="bottom-texture"></div>

            <!-- Texto manuscrito -->
            <div class="polaroid-caption">
              <h2 class="caption-title">Momentos capturados</h2>
              <p class="caption-subtitle">Mis videos favoritos ♡</p>
            </div>
          </div>

          <!-- Cintas adhesivas decorativas (solo desktop) -->
          <div class="washi-tape tape-top-left"></div>
          <div class="washi-tape tape-top-right"></div>
          <div class="washi-tape tape-bottom-left"></div>
          <div class="washi-tape tape-bottom-right"></div>
        </div>
      </div>

      <!-- Post-it decorativo (solo desktop) -->
      <div class="sticky-note">
        <div class="sticky-fold"></div>
        <p>Ver más en mi Instagram →</p>
        <a
          href="https://instagram.com/sheiibooks"
          target="_blank"
          rel="noopener noreferrer"
          class="instagram-link"
        >
          @sheiibooks
        </a>
      </div>

      <!-- Elementos decorativos adicionales -->
      <div class="extra-decorations">
        <div class="paper-clip"></div>
        <div class="push-pin"></div>
      </div>
    </div>

    <!-- Modal para reproducir videos -->
    <Teleport to="body">
      <transition name="modal-advanced">
        <div
          v-if="activeVideo"
          class="video-modal"
          @click="closeVideo"
        >
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeVideo">
              <svg viewBox="0 0 24 24">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>

            <div class="modal-video">
              <iframe
                v-if="activeVideo.embedUrl"
                :src="activeVideo.embedUrl"
                frameborder="0"
                allowfullscreen
                class="video-iframe"
              ></iframe>
            </div>

            <div class="modal-info">
              <h3>{{ activeVideo.title }}</h3>
              <p>{{ activeVideo.description }}</p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Referencias
const sectionRef = ref(null)
const imageAreaRef = ref(null)
const isRevealed = ref(false)
const activeVideo = ref(null)
const hoverVideo = ref(null)

// Datos de los videos con imágenes realistas
const videoReels = ref([
  {
    id: 1,
    title: 'Unboxing: Edición Especial ACOTAR',
    thumbnail: 'https://www.tiktok.com/@sheiibooks/video/7526147367607880982?lang=es-419',
    embedUrl: 'https://www.tiktok.com/@sheiibooks/video/7526147367607880982?lang=es-419',
    duration: '0:45',
    description: 'Abriendo la hermosa edición especial con todos sus extras.'
  },
  {
    id: 2,
    title: 'Mi rincón de lectura Tour',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '0:30',
    description: 'Un tour por mi espacio favorito para leer.'
  },
  {
    id: 3,
    title: 'Top 5 Fantasía Épica 2024',
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1:00',
    description: 'Mis recomendaciones imperdibles del género.'
  },
  {
    id: 4,
    title: 'Bookhaul Diciembre',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '0:58',
    description: 'Todos los libros que llegaron este mes.'
  },
  {
    id: 5,
    title: 'Organizando mi biblioteca',
    thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=500&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '0:40',
    description: 'Reorganizando mis estanterías por colores.'
  },
  {
    id: 6,
    title: 'Reacción: Final Crescent City',
    thumbnail: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '0:35',
    description: 'Mi reacción emocional al final (lágrimas incluidas).'
  }
])

// Intersection Observer para animación de revelado
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isRevealed.value) {
          setTimeout(() => {
            isRevealed.value = true
          }, 300)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (imageAreaRef.value) {
    observer.observe(imageAreaRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// Funciones
const openVideo = (video) => {
  activeVideo.value = video
  document.body.style.overflow = 'hidden'
}

const closeVideo = () => {
  activeVideo.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Dancing+Script:wght@700&family=Bebas+Neue&display=swap');

/* Variables */
:root {
  --polaroid-white: #F8F8F6;
  --polaroid-frame: #FAFAF8;
  --polaroid-shadow: rgba(0, 0, 0, 0.4);
  --polaroid-black: #1A1A1A;
  --brown-dark: #8B4513;
  --brown-light: #D2691E;
  --paper-bg: #F5F0E8;
  --accent-pink: #FFB6C1;
  --accent-yellow: #FFD700;
  --washi-gradient-1: linear-gradient(45deg, #FFB6C1 25%, #FFC0CB 25%, #FFC0CB 50%, #FFB6C1 50%, #FFB6C1 75%, #FFC0CB 75%);
  --washi-gradient-2: linear-gradient(45deg, #87CEEB 25%, #98D8E8 25%, #98D8E8 50%, #87CEEB 50%, #87CEEB 75%, #98D8E8 75%);
  --washi-gradient-3: linear-gradient(45deg, #FFD700 25%, #FFEB9C 25%, #FFEB9C 50%, #FFD700 50%, #FFD700 75%, #FFEB9C 75%);
  --washi-gradient-4: linear-gradient(45deg, #98FB98 25%, #90EE90 25%, #90EE90 50%, #98FB98 50%, #98FB98 75%, #90EE90 75%);
}

/* Sección principal */
.polaroid-section {
  position: relative;
  padding: 4rem 1rem;
  background: var(--paper-bg);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Fondo tipo scrapbook (solo desktop) */
.scrapbook-background {
  display: none;
}

/* Contenedor principal */
.scrapbook-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

/* Wrapper principal de la polaroid */
.polaroid-main-wrapper {
  position: relative;
  margin: 0 auto;
}

/* Sombra trasera */
.polaroid-shadow {
  position: absolute;
  top: 20px;
  left: 10px;
  right: -10px;
  bottom: -20px;
  background: var(--polaroid-shadow);
  filter: blur(20px);
  opacity: 0.6;
  border-radius: 3px;
  display: none;
}

/* Marco Polaroid ULTRA-REALISTA */
.polaroid-frame {
  background: var(--polaroid-frame);
  position: relative;
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.05),
    0 2px 4px rgba(0,0,0,0.1),
    0 10px 30px rgba(0,0,0,0.3),
    0 20px 50px rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
}

/* Bordes con textura */
.polaroid-border-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 12px;
  background: linear-gradient(to bottom,
    rgba(255,255,255,0.8) 0%,
    rgba(255,255,255,0.4) 50%,
    transparent 100%);
  z-index: 2;
}

.polaroid-border-left,
.polaroid-border-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12px;
  background: linear-gradient(to right,
    rgba(255,255,255,0.6) 0%,
    rgba(255,255,255,0.3) 50%,
    transparent 100%);
  z-index: 2;
}

.polaroid-border-right {
  right: 0;
  background: linear-gradient(to left,
    rgba(255,255,255,0.6) 0%,
    rgba(255,255,255,0.3) 50%,
    transparent 100%);
}

/* Logo Polaroid */
.polaroid-branding {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: none;
}

.brand-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.8rem;
  color: rgba(0,0,0,0.3);
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* Área de la foto */
.polaroid-photo-area {
  margin: 12px 12px 0 12px;
  background: var(--polaroid-black);
  position: relative;
}

/* Marco interno negro */
.photo-inner-frame {
  border: 8px solid var(--polaroid-black);
  background: var(--polaroid-black);
  position: relative;
  overflow: hidden;
}

/* Grid de videos */
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  background: var(--polaroid-black);
  aspect-ratio: 1;
  filter: sepia(1) blur(5px) brightness(0.7);
  opacity: 0;
  transform: scale(0.95);
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-grid.revealed {
  filter: none;
  opacity: 1;
  transform: scale(1);
}

/* Items de video */
.video-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background: #000;
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.video-item:hover .video-thumbnail img {
  transform: scale(1.1);
}

/* Efecto de brillo */
.video-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg,
    transparent 30%,
    rgba(255,255,255,0.3) 50%,
    transparent 70%);
  transform: rotate(45deg);
  animation: shine 0.6s ease-out;
}

@keyframes shine {
  from { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  to { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

/* Overlay y play button */
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom,
    transparent 0%,
    transparent 70%,
    rgba(0,0,0,0.4) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-item:hover .video-overlay {
  opacity: 1;
}

.play-button {
  transform: scale(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-item:hover .play-button {
  transform: scale(1);
}

.play-button svg {
  width: 45px;
  height: 45px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

/* Duración del video */
.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
}

/* Área inferior de la Polaroid */
.polaroid-bottom {
  height: 90px;
  position: relative;
  background: var(--polaroid-frame);
}

/* Textura del área inferior */
.bottom-texture {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right,
    transparent 0%,
    rgba(0,0,0,0.05) 50%,
    transparent 100%);
}

/* Caption de la Polaroid */
.polaroid-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

.caption-title {
  font-family: 'Kalam', cursive;
  font-size: 1.4rem;
  color: #333;
  margin: 0;
  font-weight: 700;
  transform: rotate(-1deg);
}

.caption-subtitle {
  font-family: 'Kalam', cursive;
  font-size: 0.95rem;
  color: #666;
  margin: 3px 0 0 0;
  transform: rotate(0.5deg);
}

/* Elementos decorativos - ocultos en mobile */
.sticker-illustration,
.washi-tape,
.sticky-note,
.extra-decorations,
.deco-heart,
.deco-star,
.deco-sparkle {
  display: none;
}

/* Modal mejorado */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.modal-close svg {
  width: 18px;
  height: 18px;
  stroke: white;
}

.modal-video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background: #000;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.modal-info {
  padding: 1.5rem;
  background: #FAFAFA;
}

.modal-info h3 {
  font-family: 'Dancing Script', cursive;
  font-size: 1.6rem;
  color: var(--brown-dark);
  margin: 0 0 0.5rem 0;
}

.modal-info p {
  font-family: 'Kalam', cursive;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* Transición del modal */
.modal-advanced-enter-active,
.modal-advanced-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-advanced-enter-active .modal-content,
.modal-advanced-leave-active .modal-content {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.modal-advanced-enter-from {
  opacity: 0;
}

.modal-advanced-enter-from .modal-content {
  transform: scale(0.7) translateY(50px);
  opacity: 0;
}

.modal-advanced-leave-to {
  opacity: 0;
}

.modal-advanced-leave-to .modal-content {
  transform: scale(0.9) translateY(-30px);
  opacity: 0;
}

/* DESKTOP STYLES */
@media (min-width: 768px) {
  .polaroid-section {
    padding: 6rem 2rem;
  }

  /* Mostrar sombra trasera */
  .polaroid-shadow {
    display: block;
  }

  /* Mostrar elementos decorativos */
  .scrapbook-background {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .deco-heart,
  .deco-star,
  .deco-sparkle {
    position: absolute;
    font-size: 2rem;
    opacity: 0.3;
    animation: float 8s ease-in-out infinite;
  }

  .deco-heart {
    color: var(--accent-pink);
  }

  .deco-star {
    color: var(--accent-yellow);
  }

  .deco-sparkle {
    font-size: 1.5rem;
  }

  .deco-heart:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
  .deco-heart:nth-child(2) { top: 70%; right: 10%; animation-delay: 2s; }
  .deco-heart:nth-child(3) { bottom: 20%; left: 15%; animation-delay: 4s; }
  .deco-heart:nth-child(4) { top: 40%; right: 20%; animation-delay: 6s; }
  .deco-heart:nth-child(5) { bottom: 40%; right: 30%; animation-delay: 8s; }

  .deco-star:nth-child(1) { top: 20%; right: 15%; animation-delay: 1s; }
  .deco-star:nth-child(2) { bottom: 30%; left: 25%; animation-delay: 3s; }
  .deco-star:nth-child(3) { top: 60%; left: 40%; animation-delay: 5s; }

  .deco-sparkle:nth-child(1) { top: 30%; left: 20%; animation-delay: 0.5s; }
  .deco-sparkle:nth-child(2) { bottom: 25%; right: 35%; animation-delay: 2.5s; }
  .deco-sparkle:nth-child(3) { top: 80%; left: 60%; animation-delay: 4.5s; }
  .deco-sparkle:nth-child(4) { top: 15%; right: 40%; animation-delay: 6.5s; }

  /* Contenedor con más espacio */
  .scrapbook-container {
    max-width: 800px;
    padding: 2rem;
  }

  /* Polaroid principal */
  .polaroid-main-wrapper {
    transform: rotate(-3deg);
    transition: transform 0.3s ease;
  }

  .polaroid-main-wrapper:hover {
    transform: rotate(-2deg) scale(1.02);
  }

  .polaroid-frame {
    max-width: 500px;
    margin: 0 auto;
  }

  /* Mostrar logo */
  .polaroid-branding {
    display: block;
  }

  /* Ajustar márgenes */
  .polaroid-photo-area {
    margin: 20px 20px 0 20px;
  }

  .photo-inner-frame {
    border-width: 12px;
  }

  /* Grid 3x2 en desktop */
  .video-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
  }

  /* Área inferior más grande */
  .polaroid-bottom {
    height: 110px;
  }

  /* Caption más grande */
  .caption-title {
    font-size: 1.8rem;
  }

  .caption-subtitle {
    font-size: 1.1rem;
  }

  /* Ilustración de Sheila */
  .sticker-illustration {
    display: block;
    position: absolute;
    left: -150px;
    top: 50px;
    z-index: 10;
  }

  .sheila-polaroid-wrapper {
    position: relative;
  }

  .sheila-polaroid {
    background: var(--polaroid-frame);
    padding: 0.8rem 0.8rem 3rem 0.8rem;
    box-shadow:
      0 5px 15px rgba(0, 0, 0, 0.3),
      0 2px 5px rgba(0, 0, 0, 0.2);
    transform: rotate(8deg);
    transition: transform 0.3s ease;
  }

  .sheila-polaroid:hover {
    transform: rotate(5deg) scale(1.05);
  }

  .sheila-polaroid-inner {
    background: var(--polaroid-black);
    padding: 6px;
  }

  .sheila-photo {
    width: 150px;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  .sheila-caption {
    font-family: 'Kalam', cursive;
    font-size: 1rem;
    text-align: center;
    margin-top: 0.8rem;
    color: #333;
    transform: rotate(-1deg);
  }

  /* Cintas adhesivas (Washi Tape) */
  .washi-tape {
    display: block;
    position: absolute;
    opacity: 0.85;
    background-size: 10px 10px;
  }

  .tape-sheila {
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(-5deg);
    width: 70px;
    height: 25px;
    background: var(--washi-gradient-1);
  }

  .tape-top-left {
    top: -8px;
    left: -8px;
    width: 60px;
    height: 22px;
    background: var(--washi-gradient-2);
    transform: rotate(-15deg);
  }

  .tape-top-right {
    top: -10px;
    right: -8px;
    width: 65px;
    height: 24px;
    background: var(--washi-gradient-3);
    transform: rotate(20deg);
  }

  .tape-bottom-left {
    bottom: 35px;
    left: -10px;
    width: 55px;
    height: 22px;
    background: var(--washi-gradient-4);
    transform: rotate(-25deg);
  }

  .tape-bottom-right {
    bottom: 30px;
    right: -12px;
    width: 60px;
    height: 24px;
    background: var(--washi-gradient-1);
    transform: rotate(30deg);
  }

  /* Post-it mejorado */
  .sticky-note {
    display: block;
    position: absolute;
    right: -100px;
    bottom: 120px;
    background: #FFEB3B;
    padding: 1.2rem;
    width: 160px;
    box-shadow:
      2px 2px 10px rgba(0, 0, 0, 0.2),
      inset 0 -2px 2px rgba(0, 0, 0, 0.05);
    transform: rotate(5deg);
    font-family: 'Kalam', cursive;
    position: relative;
  }

  .sticky-fold {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #FFEB3B 50%, #F9D71C 50%);
    box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.1);
  }

  .sticky-note p {
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
    color: #333;
  }

  .instagram-link {
    color: var(--brown-dark);
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .instagram-link:hover {
    text-decoration: underline;
  }

  /* Elementos decorativos adicionales */
  .extra-decorations {
    display: block;
  }

  .paper-clip {
    position: absolute;
    top: -20px;
    right: 100px;
    width: 30px;
    height: 50px;
    background: linear-gradient(to bottom, #C0C0C0, #A0A0A0);
    border-radius: 50% 50% 0 0;
    transform: rotate(-20deg);
    opacity: 0.8;
    border: 2px solid #999;
  }

  .push-pin {
    position: absolute;
    top: -15px;
    left: 200px;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #FF4444, #CC0000);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* Modal más grande */
  .modal-content {
    max-width: 800px;
  }
}

/* Animaciones */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* Para pantallas muy grandes */
@media (min-width: 1200px) {
  .scrapbook-container {
    max-width: 1000px;
  }

  .polaroid-frame {
    max-width: 600px;
  }

  .sticker-illustration {
    left: -180px;
  }

  .sheila-photo {
    width: 180px;
    height: 240px;
  }

  .sticky-note {
    right: -120px;
  }
}

/* Modo reducido de movimiento */
@media (prefers-reduced-motion: reduce) {
  .video-grid {
    transition: none;
  }

  .deco-heart,
  .deco-star,
  .deco-sparkle {
    animation: none;
  }

  .polaroid-main-wrapper,
  .sheila-polaroid {
    transition: none;
  }

  .video-shine {
    animation: none;
  }
}
</style>
