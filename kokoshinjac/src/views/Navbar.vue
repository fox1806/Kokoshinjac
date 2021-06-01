<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Kokoshinjac</h1>
    <div class="buttons">
      <h2 v-if="this.loginButton" @click="prijava()">Prijava</h2>
      <h2 v-if="!this.loginButton" @click="signOut">Odjava</h2>
    </div>
    <Login v-if="clicked" v-on:loginSucc="loginSuccessful"/>
  </div>
</template>

<script>
  import Login from './Login.vue';
  import {auth} from '../../firebase'
  import Unos from './Unos.vue';

export default {
  data() {
    return {
      clicked: false,
      loginButton: true,
    }
  },  
  components: {
    Login,
    Unos,
  },
  methods: {
      prijava(){
      this.clicked = !this.clicked;
    },
    loginSuccessful(value){
      //izbrisi
      this.clicked = value;
      this.loginButton = false;
      this.$emit('logiranKorisnik');
    },
    signOut(){
      auth.signOut().then(()=>{
        this.$router.go()
      });
    },
    checkUser(){
      (auth.currentUser!==null) ? this.loginButton = false : this.loginButton = true;
    }
  },

  beforeMount(){
    this.checkUser();
  },
  watch:{
    $route (to, from){
      // napravljen zbog problema gdje je loginButton u navbaru uzimao true vrijednost. 
      // dodan watcher za router da provjerava ako postoji
    this.checkUser();
    }
  }, 


}
</script>

<style>
  .home{
    position: absolute;
    width: 100vw;
    height: 150px;
    background-color: #222831;
    top: 0;
    left: 0;
    margin-top: 30px;
  }
  
  .home img{
    height: 110px;
    display: flex;
    padding-top: 20px;
    padding-left: 25%;
    
  }

  .home h1{
    color: #D4AF37;
    position: absolute;
    top: 50%;
    left: 45%;
    margin: -25px 0 0 -25px; 
    }

  .buttons{
    position: absolute;
    top: 0;
    color: #D4AF37;
    cursor: pointer;
    margin-top: 35px;
    margin-left: 20px;
  }

  @media only screen and (max-width: 750px) {
    .home h1{
      /* left: 50%; */
      transform: translateX(-55px);
      font-size: 35px;
    }
    .home img {
      height: 50px;
      padding: 0;
      margin-left: auto;
      margin-right: auto;
      /* margin-top: 20px; */
    }
    .buttons {
      font-size: 15px;
      margin: 0;
      padding-left: 10px;
    }
}
</style>