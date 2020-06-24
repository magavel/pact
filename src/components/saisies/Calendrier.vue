<template>
    <div class="col ml-n3" id="divCalendar">
        <Calendar v-model="dateCalendrier"
                  :inline="true"
                  :locale="fr"
                  selectionMode="range"
                  v-on:date-select="clickCalendar"
                  dateFormat="dd/mm/yy">
        </Calendar>
    </div>
</template>
<script>
    import router from "../../router";
    export default {
        name: 'Calendrier',
        data(){
          return{
              fr: {
                  firstDayOfWeek: 1,
                  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                  dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
                  monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
                  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
                  today: 'Aujourd\'hui',
                  clear: 'Effacer',
                  weekHeader: 'Sm',
              },
              dateCalendrier: new Date(),
          }
        },
        computed: {
            dateSelectionee(){
                return this.$store.state.saisies.dateSelectionee;
            },
            dateDeSaisie(){
                return this.$store.state.saisies.dateDeSaisie;
            }
        },
        created() {
            this.dateCalendrier = new Date();
            if(this.dateDeSaisie !== undefined){
                this.dateCalendrier = this.dateDeSaisie;
            }

        },
        methods: {
            clickCalendar(){
                let tabDateISO = [];


                //this.$store.commit('saisies/UPDATE_DATE', this.dateCalendrier.toISOString());

                if(this.dateCalendrier[1] === null || this.dateCalendrier[1] === this.dateCalendrier[0]){
                   // this.$store.state.saisies.saisies = [];
                    let dateDebut = this.dateCalendrier[0];
                    dateDebut.setHours(0, -dateDebut.getTimezoneOffset(), 0, 0);
                    tabDateISO.push(dateDebut.toISOString());
                    tabDateISO.push(dateDebut.toISOString());
                    this.$store.commit('saisies/UPDATE_DATE', tabDateISO);
                    this.$store.commit('saisies/UPDATE_DATE_SAISIE', [this.dateCalendrier[0], this.dateCalendrier[0]]);
                    this.$store.dispatch('saisies/getSaisies', tabDateISO);
                    router.push({ name: 'dailyListing'});
                }
                else{
                    let dateDebut = this.dateCalendrier[0];
                    let dateFin = this.dateCalendrier[1];
                    dateDebut.setHours(0, -dateDebut.getTimezoneOffset(), 0, 0);
                    dateFin.setHours(0, -dateFin.getTimezoneOffset(), 0, 0);
                    tabDateISO.push(dateDebut.toISOString());
                    tabDateISO.push(dateFin.toISOString());
                    this.$store.commit('saisies/UPDATE_DATE', tabDateISO);
                    this.$store.commit('saisies/UPDATE_DATE_SAISIE', [this.dateCalendrier[0], this.dateCalendrier[1]]);
                    this.$router.push({name: 'periodeListing'});
                }
            },
        }
    }
</script>
<style lang="scss" scoped>

    @import "../../assets/custom.scss";

    a {
        padding: 10px;
    }


    /*#divCalendar {
        background-image: url("../../assets/Trace-82.svg");
        background-size: 354px;
        background-repeat: no-repeat;
        background-position-y: -30px;
        background-position-x: 15px;
    }*/


    /deep/ .p-datepicker .p-datepicker-header .p-datepicker-title{
        font-weight: 900;
        font-size: 0.9em;
    }


    /deep/ #divCalendar .p-datepicker table {
        font-size: 12px;
    }

    /deep/ .p-datepicker table{
        font-size: 0.9em;
    }

    /deep/ .p-datepicker table td{
        padding: 0.4rem;
    }

    @media (max-width: 992px) {
        /deep/ .p-datepicker table td{
            padding: 0;
        }
    }

   /* /deep/ #divCalendar .p-datepicker {
        border: none;
        background-color: $secondary;
        // border-radius: 0px 30px 30px 0px;
        border-radius: 0px 30px 30px 0px;
    }*/

   /deep/ body #divCalendar .p-datepicker {
       border: none;
       background-color: $secondary;
       // border-radius: 0px 30px 30px 0px;
       border-radius: 0px 30px 30px 0px;
   }

    /deep/ .p-datepicker .p-datepicker-header{
        border-bottom: none;
    }

    /deep/ .p-datepicker .p-datepicker-header .p-datepicker-prev{
        color: black;
    }

    /deep/.p-datepicker .p-datepicker-header .p-datepicker-next{
        color: black;
    }

    /deep/.p-datepicker table th{
        text-align: center;
        padding: 0.2rem;
    }

    /deep/ .p-datepicker .p-datepicker-header{
        padding: 0;
    }

</style>
