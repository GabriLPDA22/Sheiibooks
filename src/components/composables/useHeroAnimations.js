// RUTA: src/components/composables/useHeroAnimations.js

import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

/**
 * @description Composable para manejar todas las animaciones GSAP de la Hero Section.
 * @param {object} refs - Un objeto que contiene las referencias a los elementos del DOM.
 * @param {Ref<string>} typedText - La referencia reactiva para el texto de la máquina de escribir.
 * @param {Ref<boolean>} showCursor - La referencia reactiva para la visibilidad del cursor.
 * @param {string} fullTypedText - El texto completo que se va a escribir.
 */
export function useHeroAnimations(refs, { typedText, showCursor, fullTypedText }) {

  const {
    leftSection, centerSection, rightSection,
    avatarContainer, scrollIndicator, quotesBackground,
    particlesCanvas, ambientLight
  } = refs;

  // Efecto de escritura mejorado
  const typeWriterEffect = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Efecto de cursor parpadeando antes de escribir
    gsap.to('.cursor', { opacity: 0, duration: 0.1, repeat: 5, yoyo: true });

    await new Promise(resolve => setTimeout(resolve, 1000));

    for (let i = 0; i <= fullTypedText.length; i++) {
      typedText.value = fullTypedText.slice(0, i);

      // Variación en la velocidad para más realismo
      const delay = Math.random() * 40 + 50;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Efecto final del cursor
    setTimeout(() => {
      gsap.to('.cursor', {
        opacity: 0,
        duration: 0.5,
        delay: 1.5
      });
      showCursor.value = false;
    }, 1200);
  };

  // Movimiento del mouse mejorado con parallax
  const handleMouseMove = (e) => {
    if (!avatarContainer.value) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (e.clientX - centerX) / centerX;
    const deltaY = (e.clientY - centerY) / centerY;

    // Parallax en el avatar con rotación 3D
    gsap.to(avatarContainer.value, {
      duration: 2,
      x: deltaX * 18,
      y: deltaY * 12,
      rotationY: deltaX * 8,
      rotationX: -deltaY * 5,
      ease: "power2.out"
    });

    // Parallax en las partículas flotantes
    gsap.to('.hero-section__floating-particle', {
      duration: 1.5,
      x: deltaX * 10,
      y: deltaY * 8,
      stagger: 0.02,
      ease: "power2.out"
    });

    // Parallax en las citas de fondo
    gsap.to('.hero-section__quote', {
      duration: 2.5,
      x: deltaX * 6,
      y: deltaY * 4,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Efecto en la luz ambiental
    if (ambientLight.value) {
      gsap.to(ambientLight.value, {
        duration: 3,
        x: deltaX * 25,
        y: deltaY * 20,
        ease: "power2.out"
      });
    }
  };

  // Animación de skill mejorada
  const animateSkill = (e) => {
    const item = e.currentTarget;

    gsap.timeline()
      .to(item, {
        duration: 0.4,
        scale: 1.08,
        y: -8,
        rotationY: 5,
        z: 20,
        ease: "back.out(1.7)"
      })
      .to(item.querySelector('.hero-section__skill-icon'), {
        duration: 0.3,
        rotation: 12,
        scale: 1.2,
        ease: "back.out(1.7)"
      }, 0);

    // Efecto de brillo
    const shine = item.querySelector('.hero-section__skill-shine');
    if (shine) {
      gsap.fromTo(shine,
        { left: '-100%' },
        { left: '100%', duration: 0.8, ease: "power2.out" }
      );
    }
  };

  const resetSkill = (e) => {
    const item = e.currentTarget;

    gsap.timeline()
      .to(item, {
        duration: 0.4,
        scale: 1,
        y: 0,
        rotationY: 0,
        z: 0,
        ease: "power2.out"
      })
      .to(item.querySelector('.hero-section__skill-icon'), {
        duration: 0.3,
        rotation: 0,
        scale: 1,
        ease: "power2.out"
      }, 0);
  };

  onMounted(() => {
    // Timeline principal cinematográfico
    const masterTL = gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.out" }
    });

    // Secuencia de entrada mejorada
    masterTL
      .set([leftSection.value, centerSection.value, rightSection.value], { opacity: 0 })
      .fromTo(leftSection.value,
        { opacity: 0, y: 100, scale: 0.8, rotationY: -45 },
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 1.5, ease: "back.out(1.7)" },
        "start"
      )
      .fromTo(centerSection.value,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: "power3.out" },
        "start+=0.3"
      )
      .fromTo(rightSection.value,
        { opacity: 0, x: 100, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        "start+=0.6"
      )
      .call(typeWriterEffect, [], "start+=1.2")
      .fromTo('.hero-section__avatar-glow',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.3, duration: 2, ease: "power2.out" },
        "start+=0.5"
      )
      .fromTo('.hero-section__floating-particle',
        { scale: 0, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "back.out(1.7)" },
        "start+=1"
      )
      .fromTo(scrollIndicator.value,
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" },
        "+=1"
      );

    // Animaciones continuas mejoradas

    // Rotación de anillos del avatar - CORREGIDO
    gsap.to('.hero-section__avatar-ring', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none"
    });

    gsap.to('.hero-section__avatar-ring--secondary', {
      rotation: -360,
      duration: 45,
      repeat: -1,
      ease: "none"
    });

    // Animación del scroll indicator mejorada
    gsap.to('.hero-section__scroll-arrow', {
      y: 12,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Efecto de respiración en el contenedor central
    gsap.to(centerSection.value, {
      scale: 1.02,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animación de citas flotantes mejorada
    if (quotesBackground.value) {
      const quotes = gsap.utils.toArray(quotesBackground.value.children);

      quotes.forEach((quote, index) => {
        const driftAnimation = () => {
          gsap.set(quote, {
            x: gsap.utils.random(-100, window.innerWidth + 100),
            y: gsap.utils.random(-200, -100),
            rotation: gsap.utils.random(-25, 25),
            scale: gsap.utils.random(0.8, 1.4),
            opacity: 0
          });

          const tl = gsap.timeline({
            onComplete: () => {
              gsap.delayedCall(gsap.utils.random(3, 10), driftAnimation);
            }
          });

          tl.to(quote, {
            opacity: gsap.utils.random(0.4, 0.8),
            duration: gsap.utils.random(3, 6),
            ease: "power2.out"
          })
          .to(quote, {
            x: gsap.utils.random(-100, window.innerWidth + 100),
            y: window.innerHeight + 200,
            rotation: `+=${gsap.utils.random(-45, 45)}`,
            scale: `*=${gsap.utils.random(0.8, 1.2)}`,
            duration: gsap.utils.random(30, 45),
            ease: "none"
          }, 0)
          .to(quote, {
            opacity: 0,
            duration: gsap.utils.random(4, 8),
            ease: "power2.in"
          }, ">-8");
        };

        gsap.delayedCall(index * 2 + gsap.utils.random(0, 15), driftAnimation);
      });
    }

    // Efecto shimmer periódico
    gsap.to('.hero-section__center-shimmer', {
      left: '100%',
      duration: 4,
      repeat: -1,
      repeatDelay: 6,
      ease: "power2.inOut"
    });

    // Animación de partículas flotantes del avatar
    gsap.to('.hero-section__floating-particle', {
      y: '-=25',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.6,
        from: "random"
      }
    });

    // Efecto de pulso en el botón CTA
    gsap.to('.hero-section__cta-button', {
      boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(212, 175, 55, 0.4)",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Gradiente animado en el título
    gsap.to('.hero-section__main-title', {
      backgroundPosition: "200% center",
      duration: 5,
      repeat: -1,
      ease: "none"
    });

    // Levitación suave del layout
    gsap.to('.hero-section__layout', {
      y: -8,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animación de las partículas del avatar con rotación
    gsap.to('.hero-section__floating-particle', {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
      stagger: 0.3
    });

    // Pulso de resplandor del avatar
    gsap.to('.hero-section__avatar-pulse', {
      opacity: 0.7,
      scale: 1.5,
      duration: 3,
      repeat: -1,
      ease: "power2.out"
    });
  });

  // Cleanup
  onUnmounted(() => {
    gsap.killTweensOf("*");
    window.removeEventListener('resize', () => {});
  });

  return {
    handleMouseMove,
    animateSkill,
    resetSkill
  };
}
