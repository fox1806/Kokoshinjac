<template>
  <div id="nav">
    <!-- <Home /> -->
    <!-- <router-link to="/">Home</router-link>  -->


  <router-view/>
  </div>

  
</template>

<script>

import Home from './views/Home.vue'


export default {
  components:{
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

</style>

