<template>
    <div class="mw-100">
        <div class="text-center bg-white">
            <span class="font-weight-bolder"> Mes saisies du {{ datePeriode[0] | dateFrFull() }} au {{ datePeriode[1] | dateFrFull()}}</span>
        </div>
        <div class="divTable m-4">
            <div class="mw-100  divTableBody">
                <!-- ligne des titres -->
                <div class=" divTableRow">
                    <div class="divTableHeading rounded-left align-middle large entete bg-gris-module pl-3">Missions/ Modules</div>
                    <div class="divTableHeading bg-gris-module align-middle entete ">Type d'activités</div>
                    <div class="divTableHeading bg-gris-module align-middle text-center entete font-weight-bold"> < </div>
                    <div class="divTableHeading bg-gris-module align-middle text-center entete" v-for="date in tableauDate">{{ date | dateFrShort }}</div>
                    <div class="divTableHeading align-middle bg-gris-module entete font-weight-bold"> > </div>
                    <div class="divTableHeading rounded-right align-middle bg-gris-module  font-weight-bold">Actions</div>
                </div>
                <!-- ligne des data et des projets -->
                <div class="divTableRow" v-for="mission in saisiesParPeriode">
                    <div class="divTableCell">
                        <span class="p-2" :class="mission.saisieByWeek_moduleLibelle">
                            {{ mission.saisieByWeek_moduleLibelle }}
                        </span>
                    </div>
                    <div class="divTableCell">{{ mission.saisieByWeek_activite_libelle }}</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell text-center" v-for="charge in mission.saisieByWeek_charges ">
                        <div @dblclick="update(charge.chargeHebdomadaire_saisieId)">
<!--                            {{ charge.chargeHebdomadaire_charges | fromMinutesToHours }}-->
                            <div v-if= "isUpdate === false">
                                <div class="popup" @click="myFunction()">{{ charge.chargeHebdomadaire_charges | fromMinutesToHours()}}
                                    <span class="popuptext"  @click="modifierSaisie()">{{ charge.chargeHebdomadaire_commentaire }}</span>
                                </div>
                            </div>
                            <div v-else>
                                <InputMask @keydown.enter.stop="miseAjour()"
                                           class="p-field col-xs-2 inputcolumn"
                                           :value="charge.chargeHebdomadaire_charges" v-model="charge.chargeHebdomadaire_charges" mask="9:99" placeholder="  :  "/>
                            </div>
                        </div>
                    </div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell">
                        <Button type="button" icon="pi pi-trash" class="p-button-secondary"
                                @click=""></Button>
                    </div>
                </div>
                <div class="divTableRow spacer"></div>
                <!-- ligne du footer -->
                <div class="divTableRow">
                    <div class="divTableCell rounded-left align-middle entete bg-gris-module">Total des charges</div>
                    <div class="divTableCell bg-gris-module align-middle entete">&nbsp;</div>
                    <div class="divTableCell bg-gris-module align-middle text-center entete">&nbsp;</div>
                    <div class="divTableCell pt-3 bg-gris-module text-center entete" v-for="somme in calculSommeCharge">
                        <span v-if="saisiesParPeriode.length !== 0">{{ somme | fromMinutesToHours }}</span>
                        <span v-else></span>
                    </div>
                    <div class="divTableCell  align-middle bg-gris-module entete font-weight-bold">&nbsp;</div>
                    <div class="divTableCell rounded-right align-middle bg-gris-module  font-weight-bold">&nbsp;</div>
                </div>
            </div>
        </div>

        <!-- test-->
        <DataTable
                :value="saisiesParPeriode"
                :paginator="true"
                :rows="10"
        >
            <template #empty>
                Pas d'activité prévue pour cette période
            </template>
            <template #loading>
                Chargement des missions ...
            </template>
            <Column headerStyle="width: 200px" field="saisieByWeek_moduleLibelle" header="Missions/ Modules"></Column>
            <Column headerStyle="width: 200px" field="chargeHebdomadaire_saisieId" header="Type d'activités">

            </Column>
            <Column v-for=" col of tableauDate" :header="col | dateFrShort ">
                <template #body="slotProps">
                    <span class="">
                        {{ slotProps.data.saisieByWeek_charges }}
                    </span>
                </template>
            </Column>
            <Column headerStyle="width: 100px" field="brand" header="Actions">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-trash" class="p-button-secondary"  @click.prevent="afficherSaisieDialog(slotProps)"></Button>
                </template>
            </Column>
            <ColumnGroup type="footer" >
                <Row>
                    <Column footerStyle="border-top-left-radius:10px; border-bottom-left-radius:10px"  ></Column>
                    <Column footer=" TOTAL CHARGES : " />
                    <Column v-for="somme in calculSommeCharge" >
                        <template #footer="slotProps">
                            <span class="">
                                {{ somme | fromMinutesToHours }}
                            </span>
                        </template>
                    </Column>
                    <Column footerStyle="border-top-right-radius:10px; border-bottom-right-radius:10px"></Column>
                </Row>
            </ColumnGroup>
        </DataTable>
        <!--fin test-->



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
            tableauDate: function () {
               return utils.dateBetween(this.datePeriode[0], this.datePeriode[1]);
            },
            /**
             * Function qui fait la somme des valeur des charges jour / jour
             * @returns []
             */
            calculSommeCharge: function() {
                let somme = [];
                let i = 0;
                // initialisation du tableau pour avoir un tableau préformé
                // mais c'est pas trsè beau
               for (const date of this.tableauDate ) {
                   somme.push(0);
               }
                for (const saisie of this.saisiesParPeriode ) {
                    for (const charge of saisie.saisieByWeek_charges) {
                        somme[i] += charge.chargeHebdomadaire_charges;
                        i ++;
                    }
                    i = 0;
                }
                return somme;
            },
        }),
        created() {
            this.$store.dispatch('saisies/getSaisieParPeriode', {
                dateDebut: this.$store.state.saisies.dateSelectionee[0],
                dateFin: this.$store.state.saisies.dateSelectionee[1]
            });
        },
        data () {
            return {
                header : [],
                isUpdate: false,
            }
        },

        methods: {

            update(id) {
                console.log('id', id)
               // this.isUpdate = true;
            },

            myFunction() {

            },


        },
    }
</script>

<style lang="scss" scoped>
    .spacer{
        height: 10px;
    }

    /* Popup container */
    .popup {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    /* The actual popup (appears on top) */
    .popup .popuptext {
        visibility: hidden;
        width: 160px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 8px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -80px;
    }

    /* Popup arrow */
    .popup .popuptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    /* Toggle this class when clicking on the popup container (hide and show the popup) */
    .popup .show {
        visibility: visible;
        -webkit-animation: fadeIn 1s;
        animation: fadeIn 1s
    }
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
        font-weight: bold;
        display: table-cell;
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
