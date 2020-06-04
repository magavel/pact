<template>
    <div id="periode" class="ml-n3">
                            <span class="mr-2 ml-1">
                                <img src="../../assets/event-24px.svg">
                            </span>
        <Calendar v-model="dateSelectionee[0]" :locale="fr" dateFormat="dd/mm/yy"/>
        <span class="ml-3 mr-3"> au </span>
        <Calendar v-if="dateSelectionee[1] !== null" v-model="dateSelectionee[1]" :locale="fr" dateFormat="dd/mm/yy"/>
        <Calendar v-else v-model="dateSelectionee[0]" :locale="fr" dateFormat="dd/mm/yy"/>


    </div>
</template>
<script>
    export default {
        name: 'Periode',
        computed:{
            dateSelectionee(){
                return this.$store.state.saisies.dateSelectionee;
            }
        },
        data(){
            return {
                fr: {
                    firstDayOfWeek: 1,
                    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                    dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                    dayNamesMin: ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'],
                    monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
                    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
                    today: 'Aujourd\'hui',
                    clear: 'Effacer',
                    weekHeader: 'Sm',
                },
            }
        }
    }
</script>
<style lang="scss" scoped>
    #periode {
        background-color: #ffca7a;
        height: 70px;
        padding: 5px;
        width: 368px;
        border-radius: 0px 30px 30px 0px;

        &::before {
            content: "\A";
            border-style: solid;
            border-width: 10px 15px 10px 0;
            border-color: transparent #FFCA7A transparent transparent;
            position: relative;
            left: -5px;
            top: -29px;
        }
    }


</style>