import { createRouter, createWebHistory } from 'vue-router'

// Importar componentes
import Home from '../views/Home.vue'
import Biblioteca from '../views/Biblioteca.vue'
import BookReview from '../components/BookReview.vue'
import Recomendaciones from '../views/Recomendaciones.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/biblioteca',
    name: 'Biblioteca',
    component: Biblioteca
  },
  {
    path: '/review/:id',
    name: 'BookReview',
    component: BookReview,
    props: true
  },
  {
    path: '/recomendaciones/:genero',
    name: 'Recomendaciones',
    component: Recomendaciones,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
