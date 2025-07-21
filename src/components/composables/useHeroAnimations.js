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
    avatarContainer, scrollIndicator, quotesBackground
  } = refs;

  const typeWriterEffect = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    for (let i = 0; i <= fullTypedText.length; i++) {
      typedText.value = fullTypedText.slice(0, i);
      await new Promise(resolve => setTimeout(resolve, 65));
    }
    setTimeout(() => { showCursor.value = false; }, 1200);
  };

  const handleMouseMove = (e) => {
    if (!avatarContainer.value) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (e.clientX - centerX) / centerX;
    const deltaY = (e.clientY - centerY) / centerY;

    gsap.to(avatarContainer.value, {
      duration: 1.5,
      x: deltaX * 12,
      y: deltaY * 8,
      ease: "power2.out"
    });
  };

  const animateSkill = (e) => {
    gsap.to(e.currentTarget, { duration: 0.3, scale: 1.05, y: -2, ease: "power2.out" });
  };

  const resetSkill = (e) => {
    gsap.to(e.currentTarget, { duration: 0.3, scale: 1, y: 0, ease: "power2.out" });
  };

  onMounted(() => {
    const masterTL = gsap.timeline({ defaults: { duration: 1.2, ease: "power3.out" } });
    masterTL
      .fromTo(leftSection.value, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1 }, "start")
      .call(typeWriterEffect, [], "start+=1")
      .fromTo(scrollIndicator.value, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1 }, "+=1.5");

    gsap.to('.hero-card__avatar-ring', { rotation: 360, duration: 30, repeat: -1, ease: "none" });
    gsap.to('.hero-section__scroll-arrow', { y: 8, duration: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut" });

    if (quotesBackground.value) {
      const quotes = gsap.utils.toArray(quotesBackground.value.children);
      quotes.forEach(quote => {
        const driftAnimation = () => {
          gsap.timeline({ onComplete: driftAnimation })
            .set(quote, {
              x: () => gsap.utils.random(0, window.innerWidth * 0.9),
              y: -150,
              rotation: () => gsap.utils.random(-20, 20),
              scale: () => gsap.utils.random(0.8, 1.3),
              opacity: 0,
            })
            .to(quote, {
              opacity: () => gsap.utils.random(0.3, 0.7),
              duration: gsap.utils.random(4, 6),
            }, '+=1')
            .to(quote, {
              y: window.innerHeight + 150,
              rotation: '+=30',
              duration: () => gsap.utils.random(35, 50),
              ease: 'none',
            }, '<')
            .to(quote, {
              opacity: 0,
              duration: gsap.utils.random(4, 6),
            }, '>-6');
        };
        gsap.delayedCall(gsap.utils.random(0, 15), driftAnimation);
      });
    }
  });

  onUnmounted(() => {
    gsap.killTweensOf("*");
  });

  return {
    handleMouseMove,
    animateSkill,
    resetSkill
  };
}
