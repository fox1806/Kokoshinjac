import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase/app"
import "firebase/auth"


  let app;
  firebase.auth().onAuthStateChanged(user=>{
      if(!app){
      app = createApp(App).use(router).mount('#app')
    }
  })