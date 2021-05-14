<template>
  <div class="nav">
    <div class="links">
      <router-link to="/">Home</router-link> |
      <router-link to="/pregled">Pregled</router-link> | 
      <router-link to="/unos">Unos</router-link> 
    </div>
    <Home />


  <router-view/>
  </div>

  
</template>

<script>

import Home from './views/Home.vue'


export default {
  components:{
    Home
  },
  data() {
    return {
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

