<template>
    <div id="rowPeriode" class="row justify-content-between mb-5">
        <div class="col mt-5 ml-1">
            <p id="titrePeriode">Liste des activités de vos équipes</p>
        </div>
        <div class="col-4 ">
            <div id="periodeControle" class="ml-n2">
                            <span class="mr-2 ml-1">
                                <img src="src/assets/event-24px.svg">
                            </span>
                <Calendar :locale="fr" dateFormat="dd/mm/yy"/>
                <span class="ml-3 mr-3"> au </span>
                <Calendar :locale="fr" dateFormat="dd/mm/yy"/>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CardPeriodeControle',
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
            border-width: 13px 10px 10px 13px;
            border-color: transparent transparent transparent #FFCA7A;
            position: relative;
            left: 57px;
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