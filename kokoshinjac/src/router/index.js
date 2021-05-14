import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PregledTroskova from '../views/PregledTroskova.vue'
import Unos from "../views/Unos"
// import {auth} from "../../firebase"
import firebase from "firebase/app"
import "firebase/auth"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pregled',
    name: 'PregledTroskova',
    component: PregledTroskova,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/unos',
    name: 'unos',
    component: Unos,
    // meta: {
    //   requiresAuth: true
    // }
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
    next("/");
    alert("Ne!")
  } else {
    next();
  }
});

export default router
