import { createRouter, createWebHashHistory } from 'vue-router'
import Navbar from '../views/Navbar.vue'
import Pregled from '../views/Pregled.vue'
import Unos from "../views/Unos"
import PregledUnosa from "../views/PregledUnosa"
import {auth} from "../../firebase"
// import firebase from "firebase/app"
// import "firebase/auth"

const routes = [
  {
    path: '/',
    name: 'Navbar',
    component: Navbar
  },
  {
    path: '/pregled',
    name: 'Pregled',
    component: Pregled,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pregledunosa',
    name: 'PregledUnosa',
    component: PregledUnosa,
    meta: {
      requiresAuth: true,
      group: 'user',
    }
  },
  {
    path: '/unos',
    name: 'unos',
    component: Unos,
    meta: {
      requiresAuth: true,
    }
  },

  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
      if (requiresAuth && !isAuthenticated) {
      next("/");
      alert("Prijavite se kako bi pristupili navedenom")
    } else {
      next();
    }
  
});

export default router
