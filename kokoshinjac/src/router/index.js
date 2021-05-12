import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import IzracunTroskova from '../views/IzracunTroskova.vue'
import {auth} from "../../firebase"
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/izracun',
    name: 'IzracunTroskova',
    component: IzracunTroskova,
    meta: {
      requiresAuth: true
    }
  },

  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  console.log(auth.currentUser, requiresAuth);
  if (requiresAuth && !auth.currentUser) {
    next('/')
    alert('Molimo prijavite se u sustav')
  } else {
    next()
  }
})

export default router
