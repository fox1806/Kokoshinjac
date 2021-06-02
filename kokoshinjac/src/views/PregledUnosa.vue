<template>
    <div class="pregledUnosa">
        <h1 class="mainText">Odabir kategorije pregleda</h1>
        <select class="dropUnos" v-model ="odabrano">
            <option disabled value="">Odabir</option>
            <option v-for ="opcija in opcije" :key="opcija" :value="opcija">{{opcija}}</option>
        </select>
        <button class="dropUnos" @click="startLoadDb">Odaberi</button>
        <div class="pregledBaze" v-if="this.loadedDb">
            <table class="tablicaPrikaz" v-if="this.odabrano">
                <tr>
                    <th>Identifikacijska oznaka podatka</th>
                    <th>Datum unosa</th>
                    <th v-if="this.odabrano==='Jaja'">Količina jaja</th>
                    <th v-if="this.odabrano==='Hrana'">Količina hrane (kg)</th>
                </tr>
                <tr v-for="podatak in this.loadedDb" :key="podatak[0]" >
                    <th class="redoviPrikaz">{{podatak[0]}}</th>
                    <th class="redoviPrikaz">{{podatak[1].datum}}</th>
                    <th class="redoviPrikaz" v-if="this.odabrano==='Jaja'">{{podatak[1].kolicinaJaja}}</th>
                    <th class="redoviPrikaz" v-if="this.odabrano==='Hrana'">{{podatak[1].kolicinaHrane}}</th>
                    <th class="deleteBtn, redoviPrikaz" @click="izbrisi(podatak[0])"><img src="../assets/trash.png"></th>
                </tr>
            </table>
        </div>
        <div class="paginationButtons">
            <h4 class="btnBack" v-if="this.stranica>1" @click="prevPage"><img src="../assets/left-arrow.png"> Natrag </h4>
            <h4 class="btnNext" v-if="(this.stranica>=1)&&this.dalje" @click="nextPage">Sljedeća <img src="../assets/right-arrow.png"></h4>
        </div>
    </div>
</template>

<script>
import {auth, jaja, hrana,users} from '../../firebase'

export default {
    data() {
        return {
            loadedDb: [],
            odabrano:'',
            opcije :['Jaja','Hrana'],    
            limit: 8,
            last: '', 
            first: '',
            stranica: 0,
            dalje: true,
        }
    },
    methods: {
        nextPage(){
            let query;
            try {
                if(this.odabrano==="Jaja"){
                query = jaja.orderBy("datum").limit(this.limit).startAfter(this.last);
                }else if(this.odabrano==="Hrana"){
                    query = hrana.orderBy("datum").limit(this.limit).startAfter(this.last);
                }
                this.loadDb(query);
                this.stranica++;
            } catch (error) {
                this.startLoadDb();
            }
            
        },
        prevPage(first){
            let query;
            try {
                if(this.odabrano==="Jaja"){
                query = jaja.orderBy("datum").limitToLast(this.limit).endBefore(this.first);
                }else if(this.odabrano==="Hrana"){
                    query = hrana.orderBy("datum").limitToLast(this.limit).endBefore(this.first);
                }
                this.loadDb(query);
                this.dalje=true;
                this.stranica--;
            } catch (error) {
                this.startLoadDb();
            }
            
        },
        startLoadDb(){
            this.dalje=true;
            let query;
            if(this.odabrano=="Jaja"){
                query = jaja.orderBy("datum").limit(this.limit);
            }else if(this.odabrano=="Hrana"){
                query = hrana.orderBy("datum").limit(this.limit);

            }else alert("Odaberite kategoriju")

            this.loadDb(query)
            this.stranica=1;
        },
        loadDb(query){
            let user = auth.currentUser.uid;
            let grupa;
            users.onSnapshot((doc) => {
                    doc.forEach((data)=>{
                        if(user===data.data().UID) grupa = data.data().grupa;
                    })
                // ako je admin ima pristup svim podacima
                if(grupa==="voditelj") {
                    query.onSnapshot({
                    // Listen for document metadata changes
                    includeMetadataChanges: true
                    }, (doc) => {
                        this.loadedDb.length = 0;
                        // ...
                        this.last = doc.docs[doc.docs.length-1]
                        this.first = doc.docs[0]

                        let counter = 0;

                        doc.forEach((data)=>{
                            counter++;
                                this.loadedDb.push([
                                    data.id,
                                data.data(),
                                ])
                        })
                        if(counter!=this.limit) this.dalje=false;
                        // console.log(counter);
                        this.formatDate()
                });
                // inace je korisnik i ima pristup samo svojim podacima
                }else {
                    query.where("korisnik","==",user).onSnapshot({
                    // Listen for document metadata changes
                    includeMetadataChanges: true
                    }, (doc) => {
                        this.loadedDb.length = 0;
                        // ...
                        this.last = doc.docs[doc.docs.length-1]
                        this.first = doc.docs[0]

                        let counter = 0;

                        doc.forEach((data)=>{
                            counter++;
                                this.loadedDb.push([
                                    data.id,
                                data.data(),
                                ])
                        })
                        // 
                        if(counter!=this.limit) this.dalje=false;

                        this.formatDate()
                });
                }
                })
                
        },
        formatDate(){
            this.loadedDb.forEach((vrijednost)=>{
                    let date = new Date(vrijednost[1].datum.seconds*1000);
                    if(date.getMonth()===new Date().getMonth()){
                        vrijednost[1].datum = date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear()+'.';
                    }
                })
        },
        izbrisi(ID){
            if(confirm('Jeste sigurni da želite ukloniti podatak?')){
                if(this.odabrano==="Jaja"){
                    jaja.doc(ID).delete().then(() => {
                        // brisanje po ID-u
                        alert('Podatak uspješno uklonjen');
                        this.loadDb();
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }else{
                    hrana.doc(ID).delete().then(() => {
                    // brisanje po ID-u
                        alert('Podatak uspješno uklonjen');
                        this.loadDb();

                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                }
                
            }
        }
    },
}
</script>

<style>
    .pregledUnosa{
        margin-top: 150px;
        display: grid;
        justify-content: center;        
    }
    table,th {
        border: 2px solid black;
        border-collapse: collapse;
    }
    th{
        padding: 10px;
        width: 15px;
    }
    .mainText{
        margin-top: 50px;
        text-align: center;
    }
    .dropUnos{
        width: 100px;
        justify-self: center;
        border: 1px solid black;
        
    }
    .tablicaPrikaz{
        width: 500px;

    }
    .deleteBtn {
        cursor: pointer;
    }
     .paginationButtons{
        display: flex;
        justify-content: center;
        /* border: 2px solid black; */
    } 
    .btnNext {
        margin-left: 25px;
        /* position: absolute; */
        border: 2px solid black;
        line-height: 40px;
        width: 100px;
        text-align: center;
        cursor: pointer;
    }
    .btnNext img{
        vertical-align: middle;
    }
    .btnBack{
        border: 2px solid black;
        line-height: 40px;
        width: 100px;
        text-align: center;
        cursor: pointer;
    }
    .btnBack img{
        vertical-align: middle;
    }
</style>