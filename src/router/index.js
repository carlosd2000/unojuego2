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
      path: '/Registro',
      name: 'Registro',
      component: () => import('../views/Registro.vue'),

    },
    {
      path: '/lobby',
      name: 'lobby',
      component: () => import('../views/Lobby.vue'),
    },
    {
      path: "/joingame",
      name: "JoinGame",
      component: () => import("../views/JoinGame.vue")
    },
    {
      path: '/pregameroom',
      name: 'pregameroom',
      component: () => import('../views/PreGameRoom.vue'),
    }
  ],
})

export default router
