<template>
  <div class="biblioteca-page">
    <!-- Nueva sección Sobre Mí -->
    <AboutMe />

    <!-- Sección de Géneros Favoritos -->
    <FavoriteGenres />

    <!-- Sección de Recent Reviews (tu cuaderno actual) -->
    <RecentReviews />

    <!-- Sección de Instagram -->
    <InstagramSection />

  </div>
</template>

<script setup>
import AboutMe from '../components/AboutMe.vue'
import FavoriteGenres from '../components/FavoriteGenres.vue'
import RecentReviews from '../components/RecentReviews.vue'
import InstagramSection from '../components/InstagramSection.vue'
</script>

<style scoped>
.biblioteca-page {
  /* Eliminar cualquier padding/margin para que las secciones fluyan naturalmente */
  margin: 0;
  padding: 0;
}

/* Asegurar transiciones suaves entre secciones */
.biblioteca-page > * {
  width: 100%;
}
</style>
