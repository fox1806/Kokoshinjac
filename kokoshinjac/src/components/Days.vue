<template>
    <div class="days">
        <div @click="check(day)" v-for="(day,index) in this.date" :key="day" class="day">
            <p class="dateInfo">{{day}}. {{month}}</p>
            <p>{{Math.floor(Math.random(index)*100)}} Jaja</p>
            <p>{{Math.floor(Math.random(index)*100)}}g Hrane</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: '',
            month: '',
        }
    },
    methods: {
        check(day){
            console.log(day);
        }
    },
    beforeMount() {
        let months = ["Siječanj","Veljača","Ožujak","Travanj", "Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad", "Studeni", "Prosinac"];
        var now = new Date();

        this.month = months[now.getMonth()];
        
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
        cursor: pointer;
        padding-top: 190px;
        display: grid;
        grid-template-columns: repeat(9, 10vw [col-start]);
        /* grid-gap: 0px; */
        padding-left: 20px;

    }
    .days p{
        /* padding-left: 25px; */
        text-align: center;
    }

    .dateInfo{
        border-bottom: 1px solid black;
        
    }
    .day {
        border: 1px solid black;
        margin: 5px 5px;
    }

@media only screen and (max-width: 990px) {
    .days{
        grid-template-columns: repeat(7, 13vw [col-start]);

    }
}
    
@media only screen and (max-width: 990px) {
    .days{
        grid-template-columns: repeat(5, 18vw [col-start]);

    }
}
   
@media only screen and (max-width: 990px) {
    .days{
        grid-template-columns: repeat(3, 28vw [col-start]);

    }
}

</style>