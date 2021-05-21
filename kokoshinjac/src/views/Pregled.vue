<template>
    <div>
        <Days :jajaDb="this.jajaDb" :hranaDb="this.hranaDb" />
    </div>
</template>

<script>
  import Days from '../components/Days'
  import {jaja, hrana} from '../../firebase'


export default {
    components:{
        Days
    },
    data() {
        return {
            jajaDb: [],
            hranaDb: [],
            res: [],
        }
    },
    methods: {
        
    
    },
    beforeCreate(){
        let result;
        jaja.onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    }, (doc) => {
        this.jajaDb.length = 0;

        // ...
        doc.forEach(data=>{
            this.jajaDb.push(data.data());
        })
        result = Object.values(this.jajaDb.reduce((a, {datum, kolicinaJaja}) => {
            let date = new Date(datum.seconds*1000);
            datum = [date.getDate(),date.getMonth()];
            a[datum] = (a[datum] || {datum, kolicinaJaja: 0});
            a[datum].kolicinaJaja = String(Number(a[datum].kolicinaJaja) + Number(kolicinaJaja));
            return a;
        }, {}));
    
        this.jajaDb.length = 0;
        this.jajaDb.push.apply(this.jajaDb,result)
    });
    
    hrana.onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    }, (doc) => {
        this.hranaDb.length = 0;
        // ...
        doc.forEach(data=>{
            // console.log(data.data());
            this.hranaDb.push(data.data());
        })
        result = Object.values(this.hranaDb.reduce((a, {datum, kolicinaHrane}) => {
        let date = new Date(datum.seconds*1000);
        datum = [date.getDate(),date.getMonth()];
        a[datum] = (a[datum] || {datum, kolicinaHrane: 0});
        a[datum].kolicinaHrane = String(Number(a[datum].kolicinaHrane) + Number(kolicinaHrane));
        return a;
        }, {}));
    
        this.hranaDb.length = 0;
        this.hranaDb.push.apply(this.hranaDb,result);
    });
    }
}
</script>