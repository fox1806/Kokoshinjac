<template>
  <div class="nav">
    <div class="links">
      <router-link to="/">Home </router-link> 
      <router-link v-if="admin" to="/pregled">| Pregled | </router-link> 
      <router-link v-if="admin" to="/unos">Unos</router-link> 
    </div>
    <!-- ideja za fix!! -->
    <!-- mozda neki emit? -->
    <Home v-on:loggedIn="checkUser" />
        <!-- this.$emit('loginSucc', false); -->
  <router-view/>
  </div>
</template>

<script>

import Home from './views/Home.vue'
import {auth,users} from '../firebase'

export default {
  data() {
    return {
      admin: false,
    }
  },
  components:{
    Home
  },
  beforeMount() {
    console.log('???');
    this.checkUser();
  },
  methods: {
    checkUser(){
      console.log('?');
      const currentUser = auth.currentUser;
    users.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if(currentUser){
              (currentUser.uid === doc.data().UID) ? this.admin = true : '';
          }
          });
      });
    }
  },
  // problem je ako se netko prijavi da se ne refresha screen
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}


.links{
  /* margin-top: 300px; */
  
  background: black;
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
}

</style>

