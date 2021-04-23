import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import IzracunTroskova from '../views/IzracunTroskova.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/izracun',
    name: 'IzracunTroskova',
    component: IzracunTroskova
  },

  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
