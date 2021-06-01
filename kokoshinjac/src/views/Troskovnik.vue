<template >
    <div class="troskovnik">
        <h1>Ukupni trošak</h1>
        <p>
            Ukupno sakupljenih jaja:
            {{this.jaja}}
        </p>
        <p>
            Ukupno potrošeno hrane (kg):
            {{this.hrana}}
        </p>
        <h2>Ukupni prihodi u mjesecu: {{this.jaja*2-this.hrana*2}}HRK</h2>
    </div>
</template>

<script>
import {jaja, hrana} from '../../firebase'
export default {

    data() {
        return {
            hrana:0,
            jaja:0,
        }
    },
    beforeCreate(){
        jaja.onSnapshot({
            // Listen for document metadata changes
        includeMetadataChanges: true
    }, (doc) => {
        this.jaja=0;
        // ...
        doc.forEach(data=>{
            this.jaja+=parseFloat(data.data().kolicinaJaja);
        })
        
    });
    
    hrana.onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    }, (doc) => {
        this.hrana=0;
        // ...
        doc.forEach(data=>{
            this.hrana+=parseFloat(data.data().kolicinaHrane);

        })
    
    });
    }
}
</script>

<style >
    .troskovnik{
        margin-top: 200px;
        margin-left: 20px;
        color: #222831;
    }
</style>