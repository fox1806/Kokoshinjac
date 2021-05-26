<template>
    <div class="pregledUnosa">
        <h1 class="mainText">Odabir kategorije pregleda</h1>
         <select class="dropUnos" v-model ="odabrano">
            <option disabled value="">Unos</option>
            <option v-for ="opcija in opcije" :key="opcija" :value="opcija">{{opcija}}</option>
        </select>
        <button @click="loadDb">Odaberi</button>
        <div class="pregledBaze" v-if="this.loadedDb">
            <table v-for="podatak in this.loadedDb" :key="podatak[0]">
                <tr>
                    <th>{{podatak[0]}}</th>
                    <th>{{podatak[1].datum}}</th>
                    <th v-if="this.odabrano==='jaja'">{{podatak[1].kolicinaJaja}}</th>
                    <th v-if="this.odabrano==='hrana'">{{podatak[1].kolicinaHrane}}</th>
                    <th class="deleteBtn" @click="izbrisi(podatak[0])">Izbrisi</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import {auth,jaja, hrana} from '../../firebase'

export default {
    data() {
        return {
            loadedDb: [],
            odabrano:'',
            opcije :['jaja','hrana'],    


        }
    },
    methods: {
        loadDb(){
        let user = auth.currentUser.uid;

            this.loadedDb = []
            if(this.odabrano==="jaja"){
                
                jaja.get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    if(doc.data().korisnik === user){
                        this.loadedDb.push([
                            doc.id,
                            doc.data()
                            ])
                    }
                })
            })
            }else if(this.odabrano==="hrana"){
                hrana.get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    if(doc.data().korisnik === user){
                        this.loadedDb.push([
                            doc.id,
                            doc.data()
                            ])
                    }
                })
            })
            }else alert("Odaberite izbor")
            
            
        },
        izbrisi(ID){
            if(confirm('Jeste sigurni da zelite ukloniti podatak?')){
                if(this.odabrano==="jaja"){
                    jaja.doc(ID).delete().then(() => {
                        // brisanje po ID-u
                        alert('Podatak uspjesno uklonjen')
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }else{
                    hrana.doc(ID).delete().then(() => {
                    // brisanje po ID-u
                        alert('Podatak uspjesno uklonjen')

                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                }
                
            }
        }
    },
    // beforeMount() {
    //     this.loadDb();
    // }
}
</script>

<style>
    .pregledUnosa{
        margin-top: 200px;
    }
    .mainText{
        margin-top: 50px;
    }
    .jela{
        display: grid;
        grid-template-columns: 100px 100px 100px;
        margin: 20px;
        justify-content: center;
    }
    .jela p{
        border: 1px solid black;
    }
    .deleteBtn {
        cursor: pointer;
    }
</style>