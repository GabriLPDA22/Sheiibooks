import { createRouter, createWebHistory } from 'vue-router'

// Importar componentes
import Home from '../views/Home.vue'
import Biblioteca from '../views/Biblioteca.vue'
import BookReview from '../components/BookReview.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
