<template>
    <div class="days">
        
        <div v-for="day in this.date" :key="day" class="day">
            <p class="dateInfo">{{day}}. {{month}}</p>
            <!-- prolazak kroz broj polja iz baze jajaDb-->
            <div v-for="(dayDb,index1) in this.jajaDb" :key="dayDb">
                <p v-if="dayDb.datum[0]==day">Količina jaja: {{this.jajaDb[index1].kolicinaJaja}}</p>
            </div>
            <!-- prolazak kroz broj polja iz baze hranaDb-->
            <div v-for="(hrana,index2) in this.hranaDb" :key="hrana">
                <p v-if="hrana.datum[0]==day">Potrošena hrana (kg): {{roundToTwo(this.hranaDb[index2].kolicinaHrane)}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: '',
            month: '',
            monthNum:'',
        }
    },
    props: {
        jajaDb: Object,
        hranaDb: Object,
    },
    methods: {
        roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
        }
    },
    beforeMount() {
        let months = ["Siječanj","Veljača","Ožujak","Travanj", "Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad", "Studeni", "Prosinac"];
        var now = new Date();
        this.monthNum = now.getMonth();
        this.month = months[this.monthNum];
        
        this.date = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
        
    },
}
</script>

<style>
    body{
        overflow-x: hidden;
        background: #D4AF37;
    }
    .days{
        margin-left: auto;
        padding-top: 190px;
        display: grid;
        grid-template-columns: repeat(7, 13vw [col-start]);
        justify-content: center;
    }
    .days p{
        text-align: center;
        
    }

    .dateInfo{
        border-bottom: 1px solid black;        
    }
    .day {
        box-shadow: 5px 5px #888888;
        background-color: wheat;
        border: 1px solid black;
        margin: 5px 5px;
        height: 150px;
    }

@media only screen and (max-width: 950px) {
    .days{
        grid-template-columns: repeat(6, 15vw [col-start]);

    }
}
    
@media only screen and (max-width: 775px) {
    .days{
        grid-template-columns: repeat(5, 18vw [col-start]);

    }
}

@media only screen and (max-width: 650px) {
    .days{
        grid-template-columns: repeat(4, 20vw [col-start]);

    }
}
   
@media only screen and (max-width: 600px) {
    .days{
        grid-template-columns: repeat(3, 32vw [col-start]);
    }
}

</style>