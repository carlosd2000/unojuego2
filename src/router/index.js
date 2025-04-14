import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gameBoard',
      name: 'game-board',
      component: () => import('../views/GameBoard.vue'),
    },
    {
      path: '/iniciarsesion',
      name: 'IniciarSesion',
      component: () => import('../views/IniciarSesion.vue'),
    },

    {
      path: '/lobby',
      name: 'lobby',
      component: () => import('../views/Lobby.vue'),
    },
  ],
})

export default router
