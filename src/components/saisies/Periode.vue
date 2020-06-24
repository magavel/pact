<template>
    <div id="periode" class="ml-n3 mb-3">
                            <span class="mr-2 ml-1">
                                <img src="../../assets/event-24px.svg">
                            </span>
        <Calendar v-model="dateDeSaisie[0]" :locale="fr" dateFormat="dd/mm/yy" v-on:date-select="updateDate"/>
        <span class="ml-3 mr-3"> au </span>
        <Calendar v-if="dateDeSaisie[1] !== null" v-model="dateDeSaisie[1]" :locale="fr" dateFormat="dd/mm/yy" v-on:date-select="updateDate"/>
        <Calendar v-else v-model="dateDeSaisie[0]" :locale="fr" dateFormat="dd/mm/yy" v-on:date-select="updateDate"/>
    </div>
</template>
<script>
    export default {
        name: 'Periode',
        computed:{
            dateDeSaisie(){
                return this.$store.state.saisies.dateDeSaisie;
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
                dateDebut: null,
                dateFin: null,
            }
        },
        created() {
            this.dateDeSaisie.push(new Date());
        },
        methods: {
            updateDate(){
                let tabDateISO = [];
                let dateDebut = this.dateDeSaisie[0];
                let dateFin = this.dateCalendrier[1];
                dateDebut.setHours(0, -dateDebut.getTimezoneOffset(), 0, 0);
                dateFin.setHours(0, -dateFin.getTimezoneOffset(), 0, 0);
                tabDateISO.push(dateDebut.toISOString());
                tabDateISO.push(dateFin.toISOString());
                this.$store.commit('saisies/UPDATE_DATE_SAISIE', [this.dateDeSaisie[0], this.dateDeSaisie[1]]);
                this.$store.commit('saisies/UPDATE_DATE', tabDateISO);
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
