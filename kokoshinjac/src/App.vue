<template>
  <div class="nav">
    <div class="links">
      <router-link v-if="admin" to="/pregled"> Pregled | </router-link> 
      <router-link v-if="admin||korisnik" to="/unos">Unos | </router-link> 
      <router-link v-if="admin||korisnik" to="/pregledunosa">Pregled unosa </router-link>
      <router-link v-if="admin" to="/troskovnik">| Troškovnik</router-link>
    </div>
    <Navbar />
  <router-view @logiranKorisnik="checkUser"/>
  </div>
</template>

<script>

import Navbar from './views/Navbar.vue'
import {auth,users} from '../firebase'

export default {
  data() {
    return {
      admin: false,
      korisnik: false,
    }
  },
  components:{
    Navbar
  },
  beforeMount() {
    this.checkUser();
  },
  methods: {
    
    checkUser(){
      const currentUser = auth.currentUser;
    users.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
            if(currentUser){
              if(currentUser.uid === doc.data().UID){
                if(doc.data().grupa==='voditelj') this.admin=true;
                else this.korisnik = true;
              }
          }
          });
      });
    }
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}


.links{
  /* margin-top: 300px; */
  
  background: #222831;
  display: block;
  margin-left: auto;
  margin-right: auto;
  color:#D4AF37;
  height: 30px;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
}

.links a{
  color: #D4AF37;
  font-size: 20px;
}

@media only screen and (max-width: 400px) {
    .links a {
      font-size: 15px;
    }
}

</style>

