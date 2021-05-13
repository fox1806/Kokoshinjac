import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import IzracunTroskova from '../views/IzracunTroskova.vue'
import {auth} from "../../firebase"
import firebase from "firebase/app"
import "firebase/auth"

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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
    alert("Ne!")
  } else {
    next();
  }
});

export default router
