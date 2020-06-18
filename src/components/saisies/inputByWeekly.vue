<template>
    <div class="mt-5">
        <div v-for="mission in saisiesParPeriode">
            {{ mission }}
            <div v-for="col in mission.saisieByWeek_charges">
            le {{ col.chargeHebdomadaire_date }} charges: {{ col.chargeHebdomadaire_charges }}
            </div>
        </div>
        <div class="text-center bg-white">
            <span class="font-weight-bolder"> Du {{ datePeriode[0] | dateFrFull() }} au {{ datePeriode[1] | dateFrFull()}}</span>
        </div>
        <div class="divTable">
            <div class="divTableBody">
                <!-- ligne des titres -->
                <div class="divTableRow">
                    <div class="divTableCell rounded-left align-middle large entete bg-gris-module pl-3">Missions/ Modules</div>
                    <div class="divTableCell bg-gris-module align-middle entete ">Type d'activités</div>
                    <div class="divTableCell bg-gris-module align-middle text-center entete"> < </div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell align-middle bg-gris-module entete font-weight-bold"> > </div>
                    <div class="divTableCell rounded-right align-middle bg-gris-module  font-weight-bold">Actions</div>
                </div>
                <!-- ligne des data et des projets -->
                <div class="divTableRow" v-for="mission in saisiesParPeriode">
                    <div class="divTableCell">{{ mission.saisieByWeek_moduleLibelle }}</div>
                    <div class="divTableCell">{{ mission.saisieByWeek_activite_libelle }}</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                </div>
                <!-- ligne du footer -->
                <div class="divTableRow">
                    <div class="divTableCell rounded-left align-middle entete bg-gris-module">Total des charges</div>
                    <div class="divTableCell bg-gris-module align-middle entete">&nbsp;</div>
                    <div class="divTableCell bg-gris-module align-middle text-center entete">&nbsp;</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell  align-middle bg-gris-module entete font-weight-bold">&nbsp;</div>
                    <div class="divTableCell rounded-right align-middle bg-gris-module  font-weight-bold">&nbsp;</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import  moment from "moment";
    import utils from '../../shared/utils'

    export default {
        name: "inputByWeekly",
        computed: mapState({
            saisiesParPeriode: state => state.saisies.saisiesParPeriode,
            datePeriode: state => state.saisies.dateDeSaisie,
            dateSaisiePeriode: state => state.saisies.dateSelectionee,
        }),
        created() {
            this.$store.dispatch('saisies/getSaisieParPeriode', {
                dateDebut: this.$store.state.saisies.dateSelectionee[0],
                dateFin: this.$store.state.saisies.dateSelectionee[1]
            });
            this.test();
        },
        data () {
            return {
                header : [],
            }
        },

        methods: {

            test() {
             //   alert(this.saisiesParPeriode.length)
               // alert(this.saisiesParPeriode[0].saisieByWeek_charges.length);
                this.saisiesParPeriode[0].saisieByWeek_charges.forEach((saisie) => {
                    let value ;
                        this.header.push(saisie.chargeHebdomadaire_date);
                }


                );
            }

        },
    }
</script>

<style lang="scss" scoped>
    .entete {
        height: 50px;
    }
    .divTable{
        display: table;
        width: 100%;
    }
    .divTableRow {
        display: table-row;
    }
    .divTableCell, .divTableHead {
        // border: 1px solid #999999;
        display: table-cell;
        padding: 3px 10px;
    }
    .divTableHeading {
        background-color: #EEE;
        display: table-header-group;
        font-weight: bold;
    }
    .divTableFoot {
        background-color: #EEE;
        display: table-footer-group;
        font-weight: bold;
    }
    .divTableBody {
        display: table-row-group;
    }

    #periode {
        background-color: #ffca7a;
        height: 70px;
        padding: 5px;
        width: 368px;
        border-radius: 0px 30px 30px 0px;
        &::before{
            content:"\A";
            border-style: solid;
            border-width: 10px 15px 10px 0;
            border-color: transparent #FFCA7A transparent transparent;
            position: relative;
            left: -5px;
            top: -29px;
        }
    }
    .testBg1{
        background-color: #069F90;
        border-radius: 8px;
        color: white;
    }

    .testBg2{
        background-color: #AA2393;
        border-radius: 8px;
        color: white;
    }
    .testBg3{
        background-color: #4028A7;
        border-radius: 8px;
        color: white;
    }

    .PACTNG_PMV{
        background-color: #069F90;
        border-radius: 8px;
        color: white;

    }

    .PACTNG_INFOCENTRE{
        background-color: #AA2393;
        border-radius: 8px;
        color: white;

    }

</style>
