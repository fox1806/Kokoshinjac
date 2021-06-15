import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Navbar from '../views/Navbar.vue'
import Pregled from '../views/Pregled.vue'
import Unos from "../views/Unos"
import PregledUnosa from "../views/PregledUnosa"
import Troskovnik from "../views/Troskovnik"
import {
  auth,
  users
} from "../../firebase"

const routes = [{
    path: '/',
    name: 'Navbar',
    component: Navbar
  },
  {
    path: '/pregled',
    name: 'Pregled',
    component: Pregled,
    meta: {
      requiresAuth: true,
      requiresGroup: true,
    }
  },
  {
    path: '/pregledunosa',
    name: 'PregledUnosa',
    component: PregledUnosa,
    meta: {
      requiresAuth: true,
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
  {
    path: '/troskovnik',
    name: 'Troskovnik',
    component: Troskovnik,
    meta: {
      requiresAuth: true,
      requiresGroup: true,
    }
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  let routeGroup;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let requiresGroup = to.matched.some(record => record.meta.requiresGroup);

  const isAuthenticated = auth.currentUser;

  if (isAuthenticated) {
    let grupa;
    // Odrediti grupu u koju spada korisnik
    users.where("UID", "==", isAuthenticated.uid).get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        grupa = doc.data().grupa;
      })
      // usporediti grupe, odnosno provjeriti je li korisnik voditelj 
      // ili djelatnik
      if (requiresGroup && grupa !== "voditelj") {
        next("/");
        alert("Ruta nije dostupna Vašem radnom mjestu.")
      } else {
        next();
      }
    })
  } else {
    // u slucaju da korisnik nije logiran radi se provjera 
    // ako ruta trazi autentifikaciju i ako je korisnik autentificiran
    if (requiresAuth && !isAuthenticated) {
      next("/");
      alert("Prijavite se kako bi pristupili navedenom")
    } else {
      next();
    }
  }



});

export default router