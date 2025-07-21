<template>
  <section class="hero-section relative w-full h-screen overflow-hidden bg-cream flex justify-center items-center" style="perspective: 1500px;">

    <div ref="heroContent" class="hero-content absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center text-center p-8 opacity-0">
      <div>
        <h1 class="font-script text-6xl md:text-8xl text-text-main mb-4">Seiibooks</h1>
        <p class="font-mono text-lg text-brown-dark max-w-2xl mx-auto">
          Un espacio para descubrir historias y compartir pasiones.
        </p>
      </div>
    </div>

    <div
      ref="book"
      @click="openBook"
      @mouseenter="onHover"
      @mouseleave="onLeave"
      class="book"
    >
      <div class="pages"></div>
      <div class="spine">
        <div class="spine-title font-serif">Seiibooks</div>
      </div>
      <div class="front-cover flex flex-col justify-between p-8">
        <div class="text-center mt-12">
          <svg class="inline-block w-24 h-24 mb-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.5 50C25.5 50 40.5 25.5 50.5 50C60.5 74.5 75.5 50 75.5 50" stroke="#312E2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M50 22L52.5 27.5L58 30L52.5 32.5L50 38L47.5 32.5L42 30L47.5 27.5L50 22Z" fill="#312E2B"/>
            <path d="M78 65L79.5 69L83 70.5L79.5 72L78 76L76.5 72L73 70.5L76.5 69L78 65Z" fill="#312E2B" opacity="0.6"/>
            <path d="M22 35L23.5 39L27 40.5L23.5 42L22 46L20.5 42L17 40.5L20.5 39L22 35Z" fill="#312E2B" opacity="0.6"/>
          </svg>
          <h2 class="font-script text-6xl md:text-7xl text-text-main">Seiibooks</h2>
          <p class="font-mono text-base text-brown-dark mt-2">por Sheila</p>
        </div>
        <div class="text-center font-mono text-brown-dark text-sm">
          Pulsa para abrir
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';

const book = ref(null);
const heroContent = ref(null);
let isAnimating = false;
let isOpen = false;

// Animación al pasar el ratón por encima
function onHover() {
  if (isOpen) return;
  gsap.to(book.value, {
    duration: 0.5,
    y: -20, // Levitar
    rotationX: -5,
    rotationZ: 1,
    ease: 'power2.out'
  });
}

// Animación al quitar el ratón
function onLeave() {
  if (isOpen) return;
  gsap.to(book.value, {
    duration: 0.5,
    y: 0,
    rotationX: 0,
    rotationZ: 0,
    ease: 'power2.out'
  });
}

function openBook() {
  if (isAnimating || isOpen) return;
  isAnimating = true;
  isOpen = true;

  const tl = gsap.timeline();

  tl
    .to(book.value, {
      duration: 1.5,
      rotationY: -110,
      x: -50, // Lo movemos un poco a la izquierda para centrar la vista
      ease: 'power3.inOut'
    })
    .to(heroContent.value, {
      duration: 1,
      opacity: 1,
      ease: 'power2.out'
    }, "-=1.2");
}
</script>

<style scoped>
.book {
  width: 350px;
  height: 500px;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
}

.front-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #EADCD1;
  /* Textura de lino sutil */
  background-image: linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%),
                    linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%);
  background-size: 8px 8px;
  background-position: 0 0, 4px 4px;
  transform: translateZ(20px);
  backface-visibility: hidden;
  border-radius: 2px 5px 5px 2px;
  box-shadow:
    inset 4px 0 15px rgba(0,0,0,0.15),
    10px 10px 25px rgba(0,0,0,0.25);
}

.pages, .spine {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px; /* Libro más grueso */
  height: 100%;
  transform-origin: left center;
}

.pages {
  /* Simulación de páginas con múltiples sombras */
  background: #fdfdfd;
  transform: rotateY(90deg) translateZ(20px);
  box-shadow:
    inset 0 0 5px rgba(0,0,0,0.1),
    inset 1px 0 0 #f5f5f5,
    inset 2px 0 0 #f0f0f0,
    inset 3px 0 0 #f5f5f5,
    inset 4px 0 0 #f0f0f0;
}

.spine {
  background: #5a514d; /* Marrón más oscuro y rico */
  transform: rotateY(90deg) translateZ(-20px);
  border-radius: 5px 0 0 5px;
  /* Bandas en relieve en el lomo */
  background-image:
    linear-gradient(to bottom, transparent 10%, #4a413d 10%, #4a413d 12%, transparent 12%),
    linear-gradient(to bottom, transparent 88%, #4a413d 88%, #4a413d 90%, transparent 90%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spine-title {
  color: transparent;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 20px;
  letter-spacing: 2px;
  /* Efecto pan de oro */
  background-image: linear-gradient(135deg, #fde497 0%, #d5a15a 50%, #b47d34 100%);
  -webkit-background-clip: text;
  background-clip: text;
  transform: rotate(180deg);
}
</style>
