<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h4 v-if="!this.loginButton" class="userName">{{grupaDjelatnik}}</h4>
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
  import {auth, users} from '../../firebase'
  import Unos from './Unos.vue';

export default {
  data() {
    return {
      clicked: false,
      loginButton: true,
      grupaDjelatnik:'',
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
      
      // pronaci grupu korisnika, ako je voditelj pushati pregled view
      users.where("UID","==",auth.currentUser.uid).onSnapshot((doc)=>{
          doc.forEach(data=>{
            if(data.data().grupa=="voditelj"){
            this.$router.push("/pregled");
            }
          })
        })
      
      this.$emit('logiranKorisnik');
    },
    signOut(){
      auth.signOut().then(()=>{
        this.$router.go()
      });
    },
    checkUser(){
      (auth.currentUser!==null) ? this.loginButton = false : this.loginButton = true;
      this.checkRole();
    },
    checkRole(){
      if(auth.currentUser){
        users.where("UID","==",auth.currentUser.uid).onSnapshot((doc)=>{
          doc.forEach(data=>{
            this.grupaDjelatnik = data.data().grupa;
          })
        })
      }
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

  .userName {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 40px;
    transform: translateY(-40px);
    color: #D4AF37;
  }

  .buttons{
    position: absolute;
    top: 0;
    right: 0;
    color: #D4AF37;
    margin-top: 25px;
    margin-right: 40px;
  }
  .buttons h2 {
    cursor: pointer;
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
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-15%, -50%);
    }
    .buttons h2 {
      /* border: 1px solid #D4AF37; */
      
    }
    .userName {
      margin-right: 10px;
      margin-top: 40px;
    }
}
</style>