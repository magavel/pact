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
                  dayNamesMin: ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'],
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
        methods: {
            clickCalendar(){
                let tabDateISO = [];


                //this.$store.commit('saisies/UPDATE_DATE', this.dateCalendrier.toISOString());

                if(this.dateCalendrier[1] === null || this.dateCalendrier[1] === this.dateCalendrier[0]){
                    let dateDebut = this.dateCalendrier[0];
                    dateDebut.setHours(0, -dateDebut.getTimezoneOffset(), 0, 0);
                    tabDateISO.push(dateDebut.toISOString());
                    tabDateISO.push(dateDebut.toISOString());
                    this.$store.commit('saisies/UPDATE_DATE', tabDateISO);
                    this.$store.commit('saisies/UPDATE_DATE_SAISIE', [this.dateCalendrier[0], this.dateCalendrier[0]]);
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
                    this.$router.push({name: 'periodeListing'}, (data)=> {
                        console.log('ds le router ', data)});
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

    @import "../../assets/custom.scss";

    a {
        padding: 10px;
    }


    #divCalendar {
        /*background-image: url("../../assets/Trace-82.svg");
        background-size: 354px;
        background-repeat: no-repeat;
        background-position-y: -30px;
        background-position-x: 15px;*/
    }


    /deep/ #divCalendar .p-datepicker table {
        font-size: 50px;
    }

    /deep/  .p-datepicker .p-datepicker-header .p-datepicker-title{
        font-weight: 900;
    }


    /deep/ #divCalendar .p-datepicker table {
        font-size: 12px;
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


</style>
