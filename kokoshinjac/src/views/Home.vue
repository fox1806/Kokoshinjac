<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Kokoshinjac</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style>
  .home{
    position: absolute;
    width: 100vh;
    height: 150px;
    background-color: black;
    top: 0;
    left: 0;
  }
  
  .home img{
    height: 110px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    padding-top: 20px;
    padding-left: 20vh;
    
  }

  .home h1{
    color: #D4AF37;
    position: absolute;
    top: 0;
    padding-top: 10px;
    left: 30vh;
    font-size: 45px;
  }
</style>