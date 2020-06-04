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
            }
        },
        methods: {
            clickCalendar(){
                console.log("date selectionée : " + this.dateSelectionee);
                console.log("dateCalendrier : " + this.dateCalendrier);
                console.log("dateCalendrier[0] : " + this.dateCalendrier[0]);
                console.log("dateCalendrier[1] : " + this.dateCalendrier[1]);
                let tabDate = [];

                //this.$store.commit('saisies/UPDATE_DATE', this.dateCalendrier.toISOString());
                console.log("date selectionée : " + this.dateSelectionee);

                if(this.dateCalendrier[1] === null){
                    tabDate.push(this.dateCalendrier[0].toISOString());
                    this.$store.commit('saisies/UPDATE_DATE', tabDate);
                    router.push({ name: 'dailyListing'});
                }
                else{
                    tabDate.push(this.dateCalendrier[0].toISOString());
                    tabDate.push(this.dateCalendrier[1].toISOString());
                    this.$store.commit('saisies/UPDATE_DATE', tabDate);
                    router.push({name: 'periodeListing'});
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
