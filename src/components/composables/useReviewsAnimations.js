// RUTA: src/components/composables/useReviewsAnimations.js

import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

/**
 * @description Composable para manejar todas las animaciones de la sección de reseñas
 * @param {object} refs - Referencias a elementos DOM
 * @returns {object} Métodos de interacción y animación
 */
export function useReviewsAnimations(refs) {
  const {
    reviewsSection,
    sectionHeader,
    reviewsGrid,
    loadMoreSection,
    divider,
    particlesBackground,
    bookCards
  } = refs;

  let scrollTriggerContext = null;

  /**
   * Animación al hacer hover sobre una tarjeta
   * @param {Event} e - Evento del mouse
   */
  const handleCardHover = (e) => {
    const card = e.currentTarget;
    const bookImage = card.querySelector('.recent-reviews__book-image');
    const ctaButton = card.querySelector('.recent-reviews__cta-button');

    gsap.timeline()
      .to(card, {
        scale: 1.02,
        y: -8,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(bookImage, {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out"
      }, 0)
      .to(ctaButton, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, 0.1);

    // Efecto de brillo
    const shine = card.querySelector('.recent-reviews__card-shine');
    if (shine) {
      gsap.fromTo(shine,
        { left: '-100%' },
        { left: '100%', duration: 0.6, ease: "power2.out" }
      );
    }
  };

  /**
   * Animación al quitar hover de una tarjeta
   * @param {Event} e - Evento del mouse
   */
  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    const bookImage = card.querySelector('.recent-reviews__book-image');
    const ctaButton = card.querySelector('.recent-reviews__cta-button');

    gsap.timeline()
      .to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(bookImage, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      }, 0)
      .to(ctaButton, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      }, 0);
  };

  /**
   * Animación al hacer clic en una tarjeta
   * @param {object} book - Datos del libro
   */
  const handleCardClick = (book) => {
    console.log(`✨ Animación de clic para: ${book.title}`);

    // Efecto de pulso al hacer clic
    const card = event.currentTarget;
    gsap.timeline()
      .to(card, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)"
      });
  };

  /**
   * Inicializa las animaciones de scroll
   */
  const initScrollAnimations = () => {
    // Animación de entrada del header
    gsap.fromTo(sectionHeader.value,
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionHeader.value,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del divisor
    if (divider.value) {
      gsap.fromTo(divider.value,
        {
          opacity: 0,
          scale: 0.5
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: divider.value,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animación escalonada de las tarjetas
    if (reviewsGrid.value) {
      const cards = gsap.utils.toArray('.recent-reviews__card');

      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationY: -15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            amount: 0.6,
            from: "start"
          },
          scrollTrigger: {
            trigger: reviewsGrid.value,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animación del botón "Ver más"
    if (loadMoreSection.value) {
      gsap.fromTo(loadMoreSection.value,
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: loadMoreSection.value,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animaciones continuas sutiles
    initContinuousAnimations();
  };

  /**
   * Inicializa animaciones continuas y sutiles
   */
  const initContinuousAnimations = () => {
    // Flotación suave de las tarjetas
    const cards = gsap.utils.toArray('.recent-reviews__card');
    cards.forEach((card, index) => {
      gsap.to(card, {
        y: '-=5',
        duration: 3 + (index * 0.5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });

    // Pulso suave en las estrellas de rating
    gsap.to('.recent-reviews__star--filled', {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 1,
        from: "random"
      }
    });

    // Rotación sutil de las partículas de fondo
    if (particlesBackground.value) {
      const particles = gsap.utils.toArray('.recent-reviews__particle');
      particles.forEach(particle => {
        gsap.to(particle, {
          rotation: 360,
          duration: gsap.utils.random(20, 40),
          repeat: -1,
          ease: "none"
        });
      });
    }

    // Animación del gradiente del título
    gsap.to('.recent-reviews__title', {
      backgroundPosition: "200% center",
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    // Efecto de respiración en el botón "Ver más"
    gsap.to('.recent-reviews__load-more-button', {
      scale: 1.02,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  /**
   * Inicializa ScrollTrigger para animaciones de scroll
   */
  const initScrollTrigger = () => {
    // Verificar si ScrollTrigger está disponible
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
      scrollTriggerContext = ScrollTrigger.context(() => {
        initScrollAnimations();
      });
    } else {
      // Fallback sin ScrollTrigger - animaciones inmediatas
      console.warn('ScrollTrigger no disponible, usando animaciones de entrada inmediatas');
      gsap.timeline({ delay: 0.5 })
        .fromTo(sectionHeader.value,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo('.recent-reviews__card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        );

      initContinuousAnimations();
    }
  };

  /**
   * Animación de pulso para elementos interactivos
   * @param {HTMLElement} element - Elemento a animar
   */
  const pulseAnimation = (element) => {
    gsap.timeline()
      .to(element, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(element, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      });
  };

  /**
   * Animación de aparición staggered para elementos nuevos
   * @param {Array} elements - Array de elementos DOM
   */
  const staggerIn = (elements) => {
    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1
      }
    );
  };

  onMounted(() => {
    // Pequeño delay para asegurar que el DOM esté listo
    gsap.delayedCall(0.1, initScrollTrigger);
  });

  onUnmounted(() => {
    // Cleanup de animaciones y ScrollTrigger
    gsap.killTweensOf("*");
    if (scrollTriggerContext) {
      scrollTriggerContext.kill();
    }
  });

  return {
    handleCardHover,
    handleCardLeave,
    handleCardClick,
    initScrollAnimations,
    pulseAnimation,
    staggerIn
  };
}
