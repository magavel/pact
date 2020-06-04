<template>
    <div class="d-flex justify-content-around total pt-2 mr-3"  style="margin-left: 39%">
        <div><span>TOTAL CHARGES</span></div>
        <div><span id="sommes-charges" >{{ this.chargesTotalJour }}</span></div>
        <!-- <div><span v-bind:class="classeCharges">{{ this.messageCharge }}</span></div> -->
    </div>
</template>
<script>
    export default {
        name: 'TotalCharges',
        data() {
            return {
                chargesTotalJour:null,
            }
            }
    }
</script>

<style>
    .charges-valide{
        color: #1F9E02;
        margin-right: 34px;
    }
    .charges-supp{
        color: #DC0007;
        margin-right: 33px;
    }
    .charges-manquante{
        color: #E67504;
        margin-right: 50px;
    }
    .div-charges-manquante{
        background-color: #FBE3BF;
    }
    .div-charges-valide{
        background-color: #E1EBE0;
    }
    .div-charges-supp{
        background-color: #F3D6D6;
    }

    .total{
        border-radius: 10px;
        height: 40px;
    }
</style>