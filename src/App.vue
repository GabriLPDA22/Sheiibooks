<template>
  <div id="app">
    <!-- Navegación principal (opcional) -->
    <nav class="main-nav" v-if="showNavigation">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          <span class="logo-text">Sheiibooks</span>
        </router-link>

        <div class="nav-links">
          <router-link to="/" class="nav-link" active-class="active">
            <span class="nav-icon">🏠</span>
            <span>Inicio</span>
          </router-link>
          <router-link to="/biblioteca" class="nav-link" active-class="active">
            <span class="nav-icon">📚</span>
            <span>Biblioteca</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Contenido principal con transiciones -->
    <main class="main-content" :class="{ 'with-nav': showNavigation }">
      <Transition name="page" mode="out-in">
        <RouterView v-slot="{ Component, route }">
          <component
            :is="Component"
            :key="route.path"
            @toggle-navigation="toggleNavigation"
          />
        </RouterView>
      </Transition>
    </main>

    <!-- Indicador de carga global (opcional) -->
    <div v-if="isLoading" class="global-loading">
      <div class="loading-spinner">
        <span class="loading-icon">📖</span>
        <span class="loading-text">Cargando...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(false)

// Mostrar navegación solo en ciertas páginas
const showNavigation = computed(() => {
  // Ocultar navegación en la página de inicio (hero)
  return route.path !== '/'
})

// Función para alternar navegación (si algunos componentes la necesitan)
const toggleNavigation = (show) => {
  // Esta función puede ser llamada por componentes hijos si necesitan controlar la navegación
  console.log('Toggle navigation:', show)
}

// Simular carga entre páginas
watch(() => route.path, () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Special+Elite&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

/* Reset y estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Crimson Text', serif;
  background: linear-gradient(135deg, #FBF8F3 0%, #F5F0E8 50%, #EADDD1 100%);
  min-height: 100vh;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
}

/* Navegación principal */
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(251, 248, 243, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139, 69, 19, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-logo {
  text-decoration: none;
  color: #8B4513;
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

.nav-logo:hover {
  color: #A0522D;
}

.logo-text {
  position: relative;
}

.logo-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #A0522D;
  transition: width 0.3s ease;
}

.nav-logo:hover .logo-text::after {
  width: 100%;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #8B4513;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(160, 82, 45, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: rgba(139, 69, 19, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.2);
}

.nav-link.active {
  background: #8B4513;
  color: #FBF8F3;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
}

.nav-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-icon {
  transform: scale(1.1) rotate(5deg);
}

/* Contenido principal */
.main-content {
  min-height: 100vh;
  transition: padding-top 0.3s ease;
}

.main-content.with-nav {
  padding-top: 80px;
}

/* Transiciones entre páginas */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.98);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Indicador de carga global */
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(251, 248, 243, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.2);
  border: 2px solid rgba(139, 69, 19, 0.1);
}

.loading-icon {
  font-size: 2rem;
  animation: bounce 1s infinite;
}

.loading-text {
  font-family: 'Dancing Script', cursive;
  font-size: 1.3rem;
  color: #8B4513;
  font-weight: 600;
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(139, 69, 19, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #8B4513, #A0522D);
  border-radius: 10px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #A0522D, #CD853F);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .nav-icon {
    font-size: 1rem;
  }

  .main-content.with-nav {
    padding-top: 120px;
  }

  .loading-spinner {
    margin: 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
  }

  .main-content.with-nav {
    padding-top: 160px;
  }
}

/* Estilos para modo reducido de movimiento */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.2s ease;
  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    transform: none;
  }

  .nav-link,
  .nav-icon,
  .loading-icon {
    animation: none;
    transition: none;
  }

  .nav-link:hover {
    transform: none;
  }
}

</style>
