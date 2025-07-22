<template>
  <section class="hero-section" ref="heroSection" @mousemove="handleMouseMove">
    <div class="hero-section__quotes-bg" ref="quotesBackground">
      <div v-for="(quote, index) in backgroundQuotes"
           :key="`quote-${index}`"
           class="hero-section__quote"
           :class="`hero-section__quote--${index + 1}`"
           :style="{ '--animation-delay': index * 0.9 + 's' }">
        {{ quote }}
      </div>
    </div>
    <div class="hero-section__layout">
      <div class="hero-section__column hero-section__column--left" ref="leftSection">
        <div class="hero-section__avatar-area">
          <div class="hero-section__avatar-container" ref="avatarContainer">
            <img src="/images/avatar.jpg" alt="Avatar de Sheila, la autora del blog." class="hero-section__avatar-img">
            <div class="hero-section__avatar-ring"></div>
          </div>
        </div>
        <div class="hero-section__title-area">
          <h1 class="hero-section__main-title" ref="mainTitle">{{ mainTitleText }}</h1>
          <h2 class="hero-section__subtitle" ref="subtitle">{{ subtitleText }}</h2>
        </div>
      </div>
      <div class="hero-section__column hero-section__column--center" ref="centerSection">
        <div class="hero-section__typewriter-area" ref="typewriterArea">
          <p class="hero-section__typewriter-text" aria-label="Descubriendo historias. Compartiendo pasiones.">
            <span class="typed-text">{{ typedText }}</span>
            <span class="cursor" :class="{ 'is-hidden': !showCursor }" aria-hidden="true">|</span>
          </p>
        </div>
        <div class="hero-section__description-area" ref="descriptionArea">
          <p class="hero-section__description-text">{{ descriptionText }}</p>
        </div>
        <div class="hero-section__cta-area" ref="ctaArea">
          <button @click="exploreContent" class="hero-section__cta-button" ref="mainButton">
            <span class="hero-section__cta-icon" aria-hidden="true">📚</span>
            <span class="hero-section__cta-text">{{ ctaText }}</span>
          </button>
        </div>
      </div>
      <div class="hero-section__column hero-section__column--right" ref="rightSection">
        <div class="hero-section__skills-area" ref="skillsArea">
          <h3 class="hero-section__skills-title">Lo que hago</h3>
          <ul class="hero-section__skills-list">
            <li v-for="skill in skills"
                :key="skill.text"
                class="hero-section__skill-item"
                @mouseenter="animateSkill"
                @mouseleave="resetSkill">
              <span class="hero-section__skill-icon" aria-hidden="true">{{ skill.icon }}</span>
              <span class="hero-section__skill-text">{{ skill.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="hero-section__scroll-indicator" ref="scrollIndicator">
      <div class="hero-section__scroll-arrow" aria-hidden="true">↓</div>
      <span class="hero-section__scroll-text">{{ scrollHint }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { useRouter } from 'vue-router';
import { useHeroState } from './composables/useHeroState';
import { useHeroAnimations } from './composables/useHeroAnimations';

// Router para navegación
const router = useRouter();

// Referencias DOM existentes + nuevas
const heroSection = ref(null), leftSection = ref(null), centerSection = ref(null),
      rightSection = ref(null), avatarContainer = ref(null), mainTitle = ref(null),
      subtitle = ref(null), typewriterArea = ref(null), descriptionArea = ref(null),
      skillsArea = ref(null), ctaArea = ref(null), scrollIndicator = ref(null),
      mainButton = ref(null), quotesBackground = ref(null);

// Nuevas referencias para efectos
const particlesCanvas = ref(null);
const ambientLight = ref(null);

// Estado y lógica existente
const { mainTitleText, subtitleText, fullTypedText, descriptionText, ctaText, scrollHint, skills, backgroundQuotes } = useHeroState();
const typedText = ref('');
const showCursor = ref(true);

// Animaciones con nuevas refs
const { handleMouseMove, animateSkill, resetSkill } = useHeroAnimations(
  {
    heroSection, leftSection, centerSection, rightSection, avatarContainer,
    mainTitle, subtitle, typewriterArea, descriptionArea, skillsArea,
    ctaArea, scrollIndicator, mainButton, quotesBackground,
    particlesCanvas, ambientLight
  },
  { typedText, showCursor, fullTypedText }
);

// Sistema de partículas
const initParticleSystem = () => {
  if (!particlesCanvas.value) return;

  const canvas = particlesCanvas.value;
  const ctx = canvas.getContext('2d');

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 60;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.7 ? '#D4AF37' : 'rgba(139, 69, 19, 0.3)',
      pulse: Math.random() * Math.PI * 2
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.pulse += 0.02;

      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = Math.max(0, pulseOpacity);
      ctx.fill();

      if (particle.color.includes('#D4AF37')) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(animate);
  };

  animate();
};

onMounted(() => {
  initParticleSystem();

  // Luz ambiental
  if (ambientLight.value) {
    gsap.to(ambientLight.value, {
      opacity: 0.4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
});

// Método de explorar contenido con navegación del router
const exploreContent = () => {
  if (!mainButton.value) return;

  // Efecto ripple
  const ripple = mainButton.value.querySelector('.hero-section__button-ripple');
  if (ripple) {
    gsap.fromTo(ripple,
      { width: 0, height: 0, opacity: 1 },
      { width: '100px', height: '100px', opacity: 0, duration: 0.6, ease: "power2.out" }
    );
  }

  gsap.timeline()
    .to(mainButton.value, { scale: 0.97, duration: 0.15, ease: "power2.out" })
    .to(mainButton.value, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" })
    .call(() => {
      // Navegación con router a la página de biblioteca
      router.push('/biblioteca');
    });
};
</script>

<style scoped>
/* ==========================================================================
   1. TOKENS DE DISEÑO (Variables)
   ========================================================================== */
.hero-section {
  --color-background-start: #FBF8F3;
  --color-background-mid: #F5F0E8;
  --color-background-end: #EADDD1;
  --color-text-primary: #6B4423;
  --color-text-secondary: #8B4513;
  --color-accent: #A0522D;
  --color-quote: rgba(139, 69, 19, 0.4);
  --color-glass-bg: rgba(255, 255, 255, 0.25);
  --color-glass-border: rgba(139, 69, 19, 0.15);
  --color-shadow-light: rgba(139, 69, 19, 0.1);
  --color-shadow-medium: rgba(139, 69, 19, 0.25);
  --color-shadow-dark: rgba(139, 69, 19, 0.3);

  --font-display: 'Dancing Script', cursive;
  --font-handwriting: 'Special Elite', cursive;
  --font-body: 'Crimson Text', serif;
  --font-ui: 'Libre Baskerville', serif;

  --transition-speed: 0.3s;
}

/* ==========================================================================
   2. ESTILOS BASE Y LAYOUT
   ========================================================================== */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-background-start) 0%, var(--color-background-mid) 50%, var(--color-background-end) 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.hero-section__layout {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr; /* Mobile-first */
  gap: 2.5rem;
  align-items: center;
}

.hero-section__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* ==========================================================================
   3. ELEMENTOS DEL COMPONENTE (BEM)
   ========================================================================== */

/* --- Fondo de citas --- */
.hero-section__quotes-bg {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 1;
}

.hero-section__quote {
  position: absolute;
  font-family: var(--font-display);
  font-size: clamp(1rem, 3vw, 1.8rem);
  color: var(--color-quote);
  font-weight: 500;
  opacity: 0;
  will-change: transform, opacity;
  animation: quote-float 5s infinite ease-in-out;
  animation-delay: var(--animation-delay);
}
/* Posicionamiento individual */
.hero-section__quote--1 { top: 10%; left: 5%; transform: rotate(-8deg); }
.hero-section__quote--2 { top: 20%; right: 10%; transform: rotate(5deg); }
.hero-section__quote--3 { top: 40%; left: 3%; transform: rotate(-3deg); }
.hero-section__quote--4 { top: 65%; right: 8%; transform: rotate(7deg); }
.hero-section__quote--5 { top: 30%; left: 50%; transform: translateX(-50%) rotate(-2deg); }
.hero-section__quote--6 { bottom: 25%; left: 15%; transform: rotate(6deg); }
.hero-section__quote--7 { bottom: 15%; right: 20%; transform: rotate(-4deg); }
.hero-section__quote--8 { top: 75%; left: 12%; transform: rotate(3deg); }
.hero-section__quote--9 { top: 55%; right: 5%; transform: rotate(-6deg); }


/* --- Columna Izquierda: Avatar y Título --- */
.hero-section__column--left { gap: 2rem; }
.hero-section__avatar-container { position: relative; width: 180px; height: 180px; will-change: transform; }
.hero-section__avatar-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 4px solid var(--color-accent); box-shadow: 0 15px 30px var(--color-shadow-medium); }
.hero-section__avatar-ring { position: absolute; top: -10px; left: -10px; width: calc(100% + 20px); height: calc(100% + 20px); border: 2px dashed var(--color-accent); border-radius: 50%; will-change: transform; }
.hero-section__title-area { display: flex; flex-direction: column; gap: 0.5rem; }
.hero-section__main-title { font-family: var(--font-display); font-size: clamp(3rem, 10vw, 4.5rem); font-weight: 700; color: var(--color-text-primary); text-shadow: 2px 2px 6px var(--color-shadow-dark); line-height: 1.1; margin: 0; }
.hero-section__subtitle { font-family: var(--font-handwriting); font-size: clamp(1.1rem, 4vw, 1.4rem); color: var(--color-accent); letter-spacing: 1.5px; margin: 0; }


/* --- Columna Central: Contenido y CTA --- */
.hero-section__column--center {
  gap: 1.5rem;
  background: var(--color-glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 25px;
  padding: 2rem 1.5rem;
  border: 1px solid var(--color-glass-border);
  box-shadow: 0 20px 40px var(--color-shadow-light);
}
.hero-section__typewriter-area { min-height: 45px; }
.hero-section__typewriter-text { font-family: var(--font-handwriting); font-size: clamp(1.05rem, 4vw, 1.3rem); color: var(--color-text-secondary); letter-spacing: 0.5px; margin: 0; }
.hero-section__description-text { font-family: var(--font-body); font-size: clamp(1rem, 3.5vw, 1.15rem); line-height: 1.7; color: var(--color-text-primary); margin: 0; max-width: 45ch; /* Mejora legibilidad */ }
.hero-section__cta-area { margin-top: 0.5rem; }
.hero-section__cta-button { background: linear-gradient(135deg, var(--color-text-secondary) 0%, var(--color-accent) 100%); border: none; padding: 0.9rem 1.8rem; border-radius: 50px; color: var(--color-background-start); font-size: 1rem; font-weight: 600; font-family: var(--font-ui); cursor: pointer; display: inline-flex; align-items: center; gap: 0.7rem; box-shadow: 0 8px 20px var(--color-shadow-dark); transition: all var(--transition-speed) ease; will-change: transform, box-shadow; }
.hero-section__cta-icon { font-size: 1.1rem; transition: transform var(--transition-speed) ease; }


/* --- Columna Derecha: Skills --- */
.hero-section__skills-title { font-family: var(--font-display); font-size: clamp(1.8rem, 7vw, 2.5rem); font-weight: 600; color: var(--color-text-secondary); margin-bottom: 1.5rem; }
.hero-section__skills-list { display: grid; grid-template-columns: 1fr; gap: 1rem; list-style: none; padding: 0; margin: 0; width: 100%; max-width: 320px; }
.hero-section__skill-item { background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(245, 222, 179, 0.7)); backdrop-filter: blur(10px); border: 1px solid var(--color-glass-border); padding: 1rem 1.5rem; border-radius: 20px; color: var(--color-text-primary); font-size: 0.95rem; font-weight: 600; font-family: var(--font-ui); display: flex; align-items: center; gap: 1rem; cursor: pointer; box-shadow: 0 10px 20px var(--color-shadow-light); position: relative; overflow: hidden; transition: all var(--transition-speed) ease-out; will-change: transform, box-shadow; }
.hero-section__skill-icon { font-size: 1.3rem; }

/* --- Indicador de Scroll --- */
.hero-section__scroll-indicator { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: var(--color-text-secondary); opacity: 0.8; z-index: 10; }
.hero-section__scroll-arrow { font-size: 2rem; font-weight: bold; will-change: transform; }
.hero-section__scroll-text { font-family: var(--font-body); font-size: 0.9rem; font-style: italic; font-weight: 600; text-align: center; }


/* ==========================================================================
   4. ESTADOS E INTERACCIONES (Hover, Focus, etc.)
   ========================================================================== */
.hero-section__cta-button:hover,
.hero-section__cta-button:focus-visible {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(160, 82, 45, 0.5);
}

.hero-section__cta-button:hover .hero-section__cta-icon {
  transform: rotate(-15deg) scale(1.1);
}

.hero-section__skill-item::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transition: left 0.6s ease;
}

.hero-section__skill-item:hover,
.hero-section__skill-item:focus-visible {
  transform: translateX(5px) scale(1.03);
  box-shadow: 0 15px 30px var(--color-shadow-medium);
  border-color: var(--color-accent);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(245, 222, 179, 1));
}

.hero-section__skill-item:hover::before {
  left: 100%;
}


/* ==========================================================================
   5. ANIMACIONES Y KEYFRAMES
   ========================================================================== */
.cursor {
  opacity: 1;
  animation: blink 1s infinite;
  margin-left: 2px;
  font-weight: bold;
  color: var(--color-accent);
}
.cursor.is-hidden { opacity: 0; }
@keyframes blink { 50% { opacity: 0; } }

@keyframes quote-float {
  0%, 100% { opacity: 0; transform: translateY(0px) scale(1); }
  50% { opacity: 1; transform: translateY(-15px) scale(1.05); }
}


/* ==========================================================================
   6. DISEÑO RESPONSIVE (Media Queries)
   ========================================================================== */
@media (min-width: 768px) { /* Tablet */
  .hero-section { padding: 3rem 1.5rem; }
  .hero-section__layout { gap: 2rem; }
  .hero-section__skills-list { grid-template-columns: 1fr 1fr; max-width: none; }
  .hero-section__column--center { padding: 2.5rem 2rem; }
}

@media (min-width: 1024px) { /* Desktop */
  .hero-section__layout { grid-template-columns: 1.2fr 1.8fr 1.3fr; gap: 3rem; }
  .hero-section__avatar-container { width: 220px; height: 220px; }
  .hero-section__column--left { gap: 2.5rem; }
  .hero-section__column--center { gap: 2rem; padding: 3rem 2.5rem; }
  .hero-section__skills-list { grid-template-columns: 1fr; }
  .hero-section__cta-button { padding: 1.1rem 2.2rem; font-size: 1.1rem; }
}

/* ==========================================================================
   7. ACCESIBILIDAD
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  .hero-section__avatar-ring,
  .hero-section__scroll-arrow,
  .hero-section__quote,
  .hero-section__cta-button,
  .hero-section__skill-item,
  .hero-section__cta-icon {
    animation: none !important;
    transition: none !important;
  }
  .hero-section__cta-button:hover,
  .hero-section__skill-item:hover {
    transform: none;
  }
}
</style>
