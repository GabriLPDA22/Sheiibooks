<template>
  <section class="about-me-section">
    <!-- Fondo con textura de papel -->
    <div class="paper-texture-bg"></div>

    <!-- Contenedor principal -->
    <div class="about-container">
      <!-- Header de la sección -->
      <header class="section-header">
        <div class="header-decorations">
          <span class="deco-item book">📖</span>
          <span class="deco-item heart">💕</span>
          <span class="deco-item coffee">☕</span>
        </div>

        <h2 class="section-title">Sobre Mí</h2>
        <div class="title-underline">
          <img src="/images/Underline_10.png" alt="decorative underline" class="underline-img">
        </div>
      </header>

      <!-- Contenido principal -->
      <div class="content-wrapper">
        <!-- Lado izquierdo: Foto y datos -->
        <div class="left-side">
          <div class="profile-card">
            <!-- Foto con efecto polaroid -->
            <div class="polaroid-frame">
              <img src="/images/avatar.jpg" alt="Sheila" class="profile-photo">
              <div class="polaroid-caption">¡Hola, soy Sheila!</div>
              <div class="tape-decoration"></div>
            </div>

            <!-- Mini datos curiosos -->
            <div class="fun-facts">
              <h3 class="facts-title">Datos curiosos:</h3>
              <ul class="facts-list">
                <li class="fact-item">
                  <span class="fact-icon">🎂</span>
                  <span class="fact-text">23 años</span>
                </li>
                <li class="fact-item">
                  <span class="fact-icon">📍</span>
                  <span class="fact-text">España</span>
                </li>
                <li class="fact-item">
                  <span class="fact-icon">☕</span>
                  <span class="fact-text">Adicta al café con leche</span>
                </li>
                <li class="fact-item">
                  <span class="fact-icon">🌙</span>
                  <span class="fact-text">Lectora nocturna</span>
                </li>
                <li class="fact-item">
                  <span class="fact-icon">📚</span>
                  <span class="fact-text">+200 libros al año</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Lado derecho: Biografía -->
        <div class="right-side">
          <div class="bio-content">
            <!-- Introducción -->
            <div class="intro-section">
              <p class="intro-text">
                ¡Bienvenidos a mi rincón literario! Soy <span class="highlight">Sheila</span>,
                una apasionada lectora que vive entre páginas y sueña con historias.
                Desde pequeña, los libros han sido mis mejores compañeros de aventuras.
              </p>
            </div>

            <!-- Mi historia con los libros -->
            <div class="story-section">
              <h3 class="subsection-title">Mi historia con los libros</h3>
              <p class="story-text">
                Todo comenzó cuando tenía 8 años y mi abuela me regaló mi primer libro de fantasía.
                Desde entonces, no he parado de leer. Lo que empezó como una forma de escapar de la
                realidad se convirtió en mi mayor pasión. Ahora, no puedo imaginar mi vida sin libros.
              </p>
            </div>

            <!-- Por qué este blog -->
            <div class="blog-reason">
              <h3 class="subsection-title">¿Por qué este blog?</h3>
              <p class="reason-text">
                Creé <span class="blog-name">Sheiibooks</span> porque quería un espacio donde compartir
                mi amor por la lectura. Aquí encontrarás reseñas honestas, recomendaciones apasionadas
                y muchas reflexiones sobre los mundos que descubro en cada página.
              </p>
            </div>

            <!-- Lo que me gusta -->
            <div class="likes-section">
              <h3 class="subsection-title">Además de leer, me encanta...</h3>
              <div class="likes-grid">
                <div class="like-item">
                  <span class="like-icon">✍️</span>
                  <span class="like-text">Escribir en mi diario</span>
                </div>
                <div class="like-item">
                  <span class="like-icon">🎨</span>
                  <span class="like-text">Hacer bookstagram</span>
                </div>
                <div class="like-item">
                  <span class="like-icon">🍰</span>
                  <span class="like-text">Repostería casera</span>
                </div>
                <div class="like-item">
                  <span class="like-icon">🎬</span>
                  <span class="like-text">Adaptaciones de libros</span>
                </div>
                <div class="like-item">
                  <span class="like-icon">🌿</span>
                  <span class="like-text">Pasear por la naturaleza</span>
                </div>
                <div class="like-item">
                  <span class="like-icon">🎵</span>
                  <span class="like-text">Playlists para leer</span>
                </div>
              </div>
            </div>

            <!-- Frase motivacional -->
            <div class="quote-section">
              <div class="quote-marks">"</div>
              <p class="motivational-quote">
                Un libro es un sueño que tienes en tus manos.
                Mi misión es ayudarte a encontrar tu próximo sueño favorito.
              </p>
              <div class="quote-author">— Sheila ♡</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de contacto/redes -->
      <footer class="contact-section">
        <h3 class="contact-title">¡Conectemos!</h3>
        <p class="contact-text">
          Me encantaría conocer tus recomendaciones y charlar sobre libros
        </p>
        <div class="social-links">
          <a href="#" class="social-link instagram">
            <span class="social-icon">📷</span>
            <span class="social-name">@sheiibooks</span>
          </a>
          <a href="#" class="social-link goodreads">
            <span class="social-icon">📚</span>
            <span class="social-name">Goodreads</span>
          </a>
          <a href="#" class="social-link email">
            <span class="social-icon">💌</span>
            <span class="social-name">Email</span>
          </a>
        </div>
      </footer>
    </div>

    <!-- Elementos decorativos flotantes -->
    <div class="floating-elements">
      <div class="float-element el-1">✨</div>
      <div class="float-element el-2">📖</div>
      <div class="float-element el-3">🌸</div>
      <div class="float-element el-4">☕</div>
      <div class="float-element el-5">💭</div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  // Animación de entrada
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

  tl.fromTo('.section-header',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 }
  )
  .fromTo('.left-side',
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.8 },
    "-=0.4"
  )
  .fromTo('.right-side',
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.8 },
    "-=0.6"
  )
  .fromTo('.contact-section',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    "-=0.2"
  )

  // Animación de elementos flotantes
  gsap.to('.float-element', {
    y: 'random(-20, 20)',
    x: 'random(-10, 10)',
    duration: 'random(3, 5)',
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      amount: 2,
      from: "random"
    }
  })

  // Hover en las tarjetas de likes
  const likeItems = document.querySelectorAll('.like-item')
  likeItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" })
    })
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { scale: 1, duration: 0.3 })
    })
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Kalam:wght@300;400;700&family=Crimson+Text:wght@400;600&display=swap');

.about-me-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #FBF8F3 0%, #F5F0E8 50%, #EADDD1 100%);
  padding: 4rem 1rem;
  font-family: 'Crimson Text', serif;
  overflow: hidden;
}

/* Textura de papel */
.paper-texture-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image:
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139, 69, 19, .5) 35px, rgba(139, 69, 19, .5) 70px);
  pointer-events: none;
}

.about-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header de la sección */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.header-decorations {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.deco-item {
  animation: gentle-float 3s ease-in-out infinite;
}

.deco-item.book { animation-delay: 0s; }
.deco-item.heart { animation-delay: 1s; }
.deco-item.coffee { animation-delay: 2s; }

.section-title {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(3rem, 8vw, 4.5rem);
  color: #8B4513;
  font-weight: 700;
  margin-bottom: 1rem;
}

.title-underline {
  display: flex;
  justify-content: center;
}

.underline-img {
  width: 200px;
  height: auto;
}

/* Contenido principal */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .content-wrapper {
    grid-template-columns: 350px 1fr;
    gap: 4rem;
  }
}

/* Lado izquierdo */
.profile-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(139, 69, 19, 0.15);
  border: 2px solid rgba(139, 69, 19, 0.08);
}

.polaroid-frame {
  background: white;
  padding: 1rem 1rem 3rem 1rem;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transform: rotate(-2deg);
  margin-bottom: 2rem;
  position: relative;
  transition: transform 0.3s ease;
}

.polaroid-frame:hover {
  transform: rotate(0deg) scale(1.02);
}

.profile-photo {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

.polaroid-caption {
  text-align: center;
  font-family: 'Kalam', cursive;
  font-size: 1.2rem;
  color: #4a5568;
  margin-top: 1rem;
  font-weight: 600;
}

.tape-decoration {
  position: absolute;
  top: -10px;
  right: 20px;
  width: 60px;
  height: 25px;
  background: linear-gradient(45deg, #FFD93D 0%, #FFEC8B 100%);
  opacity: 0.8;
  transform: rotate(12deg);
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.fun-facts {
  background: rgba(255, 182, 193, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  border: 2px dashed rgba(255, 182, 193, 0.3);
}

.facts-title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: #8B4513;
  margin-bottom: 1rem;
  font-weight: 700;
}

.facts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  font-family: 'Kalam', cursive;
}

.fact-icon {
  font-size: 1.3rem;
}

.fact-text {
  color: #4a5568;
  font-weight: 500;
}

/* Lado derecho */
.bio-content {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.1);
  border: 1px solid rgba(139, 69, 19, 0.08);
}

.intro-section {
  margin-bottom: 2rem;
}

.intro-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2d3748;
  font-weight: 400;
}

.highlight {
  color: #8B4513;
  font-weight: 600;
  font-family: 'Dancing Script', cursive;
  font-size: 1.4rem;
}

.subsection-title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  color: #8B4513;
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;
  padding-left: 25px;
}

.subsection-title::before {
  content: '✨';
  position: absolute;
  left: -25px;
  top: 0;
}

.story-section,
.blog-reason {
  margin-bottom: 2rem;
}

.story-text,
.reason-text {
  line-height: 1.7;
  color: #4a5568;
}

.blog-name {
  color: #8B4513;
  font-weight: 600;
  font-style: italic;
}

/* Sección de gustos */
.likes-section {
  margin-bottom: 2rem;
}

.likes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.like-item {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 182, 193, 0.1));
  border-radius: 12px;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Kalam', cursive;
  font-size: 0.9rem;
  color: #4a5568;
  border: 1px solid rgba(139, 69, 19, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.like-item:hover {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 182, 193, 0.2));
  border-color: rgba(139, 69, 19, 0.2);
}

.like-icon {
  font-size: 1.2rem;
}

/* Cita motivacional */
.quote-section {
  background: linear-gradient(135deg, rgba(199, 125, 255, 0.1), rgba(255, 107, 157, 0.1));
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  margin-top: 2rem;
  border: 2px solid rgba(199, 125, 255, 0.2);
}

.quote-marks {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: rgba(199, 125, 255, 0.4);
  position: absolute;
  top: -10px;
  left: 20px;
}

.motivational-quote {
  font-family: 'Kalam', cursive;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2d3748;
  text-align: center;
  font-style: italic;
  margin: 0;
}

.quote-author {
  text-align: right;
  font-family: 'Dancing Script', cursive;
  font-size: 1.3rem;
  color: #8B4513;
  margin-top: 1rem;
  font-weight: 700;
}

/* Sección de contacto */
.contact-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.1);
  border: 2px solid rgba(139, 69, 19, 0.08);
}

.contact-title {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.contact-text {
  font-family: 'Kalam', cursive;
  color: #4a5568;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-family: 'Kalam', cursive;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.social-link.instagram {
  background: linear-gradient(45deg, #833AB4, #FD1D1D, #FCB045);
  color: white;
}

.social-link.goodreads {
  background: #553B08;
  color: white;
}

.social-link.email {
  background: linear-gradient(45deg, #FF6B9D, #C77DFF);
  color: white;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.social-icon {
  font-size: 1.2rem;
}

/* Elementos flotantes */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 5;
}

.float-element {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.3;
}

.el-1 { top: 10%; left: 5%; }
.el-2 { top: 20%; right: 10%; }
.el-3 { bottom: 30%; left: 8%; }
.el-4 { top: 60%; right: 15%; }
.el-5 { bottom: 15%; right: 25%; }

/* Animaciones */
@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

/* Responsive */
@media (max-width: 768px) {
  .about-me-section {
    padding: 2rem 1rem;
  }

  .profile-card,
  .bio-content {
    padding: 1.5rem;
  }

  .likes-grid {
    grid-template-columns: 1fr;
  }

  .social-links {
    flex-direction: column;
    align-items: center;
  }

  .social-link {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}

/* Modo reducido de movimiento */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
