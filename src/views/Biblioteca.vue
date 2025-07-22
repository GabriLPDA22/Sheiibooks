<template>
  <div class="biblioteca-page">
    <!-- Sección de Recent Reviews (tu cuaderno actual) -->
    <RecentReviews />

    <!-- Nueva sección de Géneros Favoritos -->
    <FavoriteGenres />

    <!-- Aquí puedes añadir más secciones en el futuro -->
  </div>
</template>

<script setup>
import RecentReviews from '../components/RecentReviews.vue'
import FavoriteGenres from '../components/FavoriteGenres.vue'
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
