<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Kokoshinjac</h1>
    <h2 v-if="this.loginButton" @click="prijava()" class="prijavaBtn">Prijava</h2>
    <Login v-if="this.clicked" v-on:loginSucc="loginSuccessful"/>
  </div>
</template>

<script>
  import Login from './Login.vue';

export default {
  name: 'Home',
  components: {
    Login,
  },
  methods: {
    prijava(){
      this.clicked = true;
    },
    loginSuccessful(value){
      //izbrisi
      this.clicked = value;
      this.loginButton = false;
    }
  },
  data() {
    return {
      clicked: false,
      loginButton: true,
    }
  },
}
</script>

<style>
  .home{
    position: absolute;
    width: 100vw;
    height: 150px;
    background-color: black;
    top: 0;
    left: 0;
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

  .prijavaBtn{
    color: #D4AF37;
    position: absolute;
    top: 0;
    cursor: pointer;
    margin-top: 55px;
    margin-left: 15px;
  }

  @media only screen and (max-width: 750px) {
    .home h1{
      left: 50%;
    }
}
</style>