<template>
    <div id="rowPeriode" class="row justify-content-between mb-5">
        <div class="col mt-5 ml-1 text-center">
            <p id="titrePeriode">Liste des activités de vos équipes</p>
        </div>
        <div class="col-lg-3 ">
            <div id="periodeControle" class="ml-n2">
                            <span class="mr-2 ml-1">
                                <img src="../../assets/event-24px.svg">
                            </span>
                <Calendar v-model="dateDeSaisie[0]" :locale="fr" dateFormat="dd/mm/yy"   v-on:date-select="clickCalendar"/>
                <span class="ml-3 mr-3"> au </span>
                <Calendar v-if="dateDeSaisie[1] !== null" v-model="dateDeSaisie[1]" :locale="fr" dateFormat="dd/mm/yy"  v-on:date-select="clickCalendar" />
                <Calendar v-else v-model="dateDeSaisie[0]" :locale="fr" dateFormat="dd/mm/yy"  v-on:date-select="clickCalendar" />
            </div>
        </div>
    </div>
</template>
<script>
    import router from "../../router";

    export default {
        name: 'CardPeriodeControle',
        computed: {
            dateDeSaisie() {
                return this.$store.state.saisies.dateDeSaisie;
            },
        },
        data() {
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
        methods: {
            clickCalendar() {
                if (this.dateDeSaisie[1] === null || this.dateDeSaisie[1] === this.dateDeSaisie[0]) {
                    // this.$store.state.saisies.saisies = [];
                    let dateDebut = this.dateDeSaisie[0];
                    let periode = new Object();
                    periode.dateDebut = this.dateDeSaisie[0].toISOString();
                    periode.dateFin = this.dateDeSaisie[0].toISOString();
                    dateDebut.setHours(0, -dateDebut.getTimezoneOffset(), 0, 0);
                    this.$store.commit('saisies/UPDATE_DATE_SAISIE', [this.dateDeSaisie[0], this.dateDeSaisie[0]]);
                    this.$store.dispatch('users/getControleSaisies', periode);
                    this.$store.dispatch('users/getControleEquipeSaisies', periode);
                    this.$store.dispatch('users/updateTableControle');


                } else {
                    let dateDebut = this.dateDeSaisie[0];
                    let dateFin = this.dateDeSaisie[1];
                    dateDebut.setHours(0, -dateDebut.getTimezoneOffset(), 0, 0);
                    dateFin.setHours(0, -dateFin.getTimezoneOffset(), 0, 0);
                    let periode = new Object();
                    periode.dateDebut = this.dateDeSaisie[0].toISOString();
                    periode.dateFin = this.dateDeSaisie[1].toISOString();

                    this.$store.commit('saisies/UPDATE_DATE_SAISIE', [this.dateDeSaisie[0], this.dateDeSaisie[1]]);
                    this.$store.dispatch('users/getControleSaisies', periode);
                    this.$store.dispatch('users/getControleEquipeSaisies', periode);
                    this.$store.dispatch('users/updateTableControle');

                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    #periodeControle {
        background-color: #ffca7a;
        height: 70px;
        padding: 5px;
        width: 368px;
        border-radius: 30px 0px 0px 30px;

        &::after {
            content: "\A";
            border-style: solid;
            border-width: 15px 10px 10px 15px;
            border-color: transparent transparent transparent #FFCA7A;
            position: relative;
            left: 56px;
            top: -26px;
         }
    }

    #rowPeriode{
        height: 150px;
        padding-top: 50px;
    }

    #titrePeriode{
        font-weight:bolder ;
    }

</style>