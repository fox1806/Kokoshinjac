<template>
    <div class="unos">
     <h1>Unos</h1>
        <select class="dropUnos" v-model ="odabrano">
            <option disabled value="">Odabir</option>
            <option v-for ="opcija in opcije" :key="opcija" :value="opcija">{{opcija}}</option>
        </select>
        <br>
        <input class="unosKolicine" v-model="kolicina" type="number" placeholder="Unesite količinu" >
        <br>
        <button  class="buttonSpremi" @click="unosRekorda()">Spremi</button>
    </div>
    
</template>

<script>
import {hrana, jaja, auth} from "../../firebase"

    export default {
        data(){
            return{
            opcije :['jaja','hrana'],    
            odabrano:'',
            kolicina: '',
            }
        },
       methods: {
 
        add(index) {
            this.inputs.push({});
            },


        odabirKolekcije(){
            //console.log(this.odabrano);
            if(this.odabrano === "jaja"){
              //  console.log(this.odabrano);
            }else if(this.odabrano==="hrana"){
                console.log(this.odabrano);
            }
            },

        unosRekorda(){
            if (this.odabrano === "jaja" && this.kolicina > 0){
              //  console.log(this.kolicina); 
              //  console.log(new Date);
                jaja.add({
                 kolicinaJaja: this.kolicina,
                 datum: new Date(),  
                 korisnik: auth.currentUser.uid,
                }).then(()=>{
                    alert('Podatak unesen');
                    this.odabrano = '';
                    this.kolicina = '';
                });
                
            }else if(this.odabrano === "hrana" && this.kolicina > 0){
             //   console.log(this.kolicina ); 
             //   console.log(new Date);
                hrana.add({
                 kolicinaHrane: this.kolicina,
                 datum: new Date(), 
                 korisnik: auth.currentUser.uid,

                }).then(()=>{
                    alert('Podatak unesen');
                    this.odabrano = '';
                    this.kolicina = '';

                });
            }else{
                    alert("Upsana neispravana vrijednost");
                }
        },
       
       }
    
    }

    
    
  
</script>

<style>
    .unos {
        margin-top: 200px;
        /* margin-left: 50%; */
        display: grid;
        margin-left: auto;
        margin-right: auto;
    }
    .unos h1{
        margin-left: auto;
        margin-right: auto;
        color: #222831;
    }
     .buttonSpremi{
    color: black;
    background-color: white;
    /* position : absolute; */
    /* top: 300px ; */
    width: 70px;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
  }

    .dropUnos {
     background-color:white;
     color: black;
     height: 25px;
     font-size: 15px;
     cursor: pointer;
}

 .unosKolicine{
     text-align: left;
     color: black;
     top: 150px;
     width: 120px;
     height: 25px;
     margin-right: auto;
     margin-left: auto;
 }
    
</style>