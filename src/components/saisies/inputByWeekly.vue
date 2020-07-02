<template>
    <div class="mw-100">
        <div class="text-center bg-white">
            <span class="font-weight-bolder"> Mes saisies du {{ datePeriode[0] | dateFrFull() }} au {{ datePeriode[1] | dateFrFull()}}</span>
        </div>
        <div class="divTable d-flex flex-nowrap m-4">
<!--
            <div class="mw-100  divTableBody">
                 ligne des titres
                <div class=" divTableRow">
                    <div class="divTableHeading rounded-left align-middle large entete bg-gris-module pl-3">Missions/ Modules</div>
                    <div class="divTableHeading bg-gris-module align-middle entete ">Type d'activités</div>
                    <div class="divTableHeading bg-gris-module align-middle text-center entete font-weight-bold"> < </div>
                    <div class="divTableHeading bg-gris-module align-middle text-center entete" v-for="date in tableauDate">{{ date | dateFrShort }}</div>
                    <div class="divTableHeading align-middle bg-gris-module entete font-weight-bold"> > </div>
                    <div class="divTableHeading rounded-right align-middle bg-gris-module  font-weight-bold">Actions</div>
                </div>
                 ligne des data et des projets
                <div class="divTableRow" v-for="mission in saisiesParPeriode">
                    <div class="divTableCell">
                        <span class="p-2 production">
                            {{ mission.saisieByWeek_moduleLibelle }}
                        </span>
                    </div>
                    <div class="divTableCell">{{ mission.saisieByWeek_activite_libelle }}</div>
                    <div class="divTableCell">&nbsp;</div>
                    <div class="divTableCell text-center scrollHorizontal overflow-auto" v-for="charge in mission.saisieByWeek_charges ">
                        <div @dblclick="update(charge.chargeHebdomadaire_saisieId)">
                                                        {{ charge.chargeHebdomadaire_charges | fromMinutesToHours }}
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
                 ligne du footer
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
              -->


            <!-- tableau des missions -->
<!--            <div class="mw-100  divTableBody">
                &lt;!&ndash; ligne des titres &ndash;&gt;
                <div class=" divTableRow">
                    <div class="divTableHeading rounded-left align-middle large entete bg-gris-module pl-3">Missions/ Modules</div>
                    <div class="divTableHeading bg-gris-module align-middle entete ">Type d'activités</div>

                </div>
                &lt;!&ndash; ligne des data et des projets &ndash;&gt;
                <div class="divTableRow" v-for="mission in saisiesParPeriode">
                    <div class="divTableCell" style="height: 33px">
                        <span class="p-2 production">
                            {{ mission.saisieByWeek_moduleLibelle }}
                        </span>
                    </div>
                    <div class="divTableCell">{{ mission.saisieByWeek_activite_libelle }}</div>

                </div>
                <div class="divTableRow spacer"></div>
                &lt;!&ndash; ligne du footer &ndash;&gt;
                <div class="divTableRow">
                    <div class="divTableCell rounded-left align-middle entete bg-gris-module">Total des charges</div>
                    <div class="divTableCell bg-gris-module align-middle entete">&nbsp;</div>
                </div>
            </div>
            &lt;!&ndash; fin tableau des missions &ndash;&gt;


            &lt;!&ndash; tableau central des charges  &ndash;&gt;
            <div class=" tableauCentral divTableBody">
                &lt;!&ndash; ligne des titres &ndash;&gt;
                <div class=" divTableRow">
                    <div  class="divTableHeading bg-gris-module align-middle text-center entete" v-for="date in tableauDate">{{ date | dateFrShort }}</div>
                </div>
                &lt;!&ndash; ligne des data et des projets &ndash;&gt;
                <div class="divTableRow" v-for="mission in saisiesParPeriode">

                    <div style="height: 33px" class="divTableCell text-center scrollHorizontal overflow-auto" v-for="charge in mission.saisieByWeek_charges ">
                        <div @dblclick="update(charge.chargeHebdomadaire_saisieId)">
                            &lt;!&ndash;                            {{ charge.chargeHebdomadaire_charges | fromMinutesToHours }}&ndash;&gt;
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

                </div>
                <div class="divTableRow spacer"></div>
                &lt;!&ndash; ligne du footer &ndash;&gt;
                <div class="divTableRow">
                    <div class="divTableCell pt-3 bg-gris-module text-center entete" v-for="somme in calculSommeCharge">
                        <span v-if="saisiesParPeriode.length !== 0">{{ somme | fromMinutesToHours }}</span>
                        <span v-else></span>
                    </div>
                </div>
            </div>

            &lt;!&ndash; tableau des actions &ndash;&gt;
            <div class="mw-100  divTableBody">
                &lt;!&ndash; ligne des titres &ndash;&gt;
                <div class=" divTableRow">
                    <div class="divTableHeading rounded-right align-middle bg-gris-module  font-weight-bold" style="height: 50px">Actions</div>
                </div>
                &lt;!&ndash; ligne des data et des projets &ndash;&gt;
                <div class="divTableRow" v-for="mission in saisiesParPeriode">
                    <div class="divTableCell" style="height: 27px">
                        <Button style="height: 27px" type="button" icon="pi pi-trash" class="p-button-secondary"
                                @click=""></Button>
                    </div>
                </div>
                <div class="divTableRow spacer"></div>
                &lt;!&ndash; ligne du footer &ndash;&gt;
                <div class="divTableRow">
                    <div class="divTableCell rounded-right align-middle bg-gris-module  font-weight-bold" style="height: 50px">&nbsp;</div>
                </div>
            </div>-->

            <!-- fin tableau des actions -->


        </div>




        <!-- test-->
        <DataTable
                :value="saisiesParPeriode"
                class="p-datatable-responsive p-datatable-customers"
                :paginator="true"
                :rows="4"
        >
            <template #empty>
                Pas d'activité prévue pour cette période
            </template>
            <template #loading>
                Chargement des missions ...
            </template>
            <Column headerStyle="width: 200px"  header="Missions/ Modules">
                <template #body="slotProps">
                    <span class="production m-2">
                        {{ slotProps.data.saisieByWeek_moduleLibelle }}
                    </span>
                </template>
            </Column>
            <Column headerStyle="width: 200px" field="saisieByWeek_activite_libelle" header="Type d'activités">

            </Column>
            <Column v-for=" col of tableauDate" :field="chargeHebdomadaire_charges" :header="col | dateFrShort ">
<!--                <template #body="slotProps">-->
<!--                    <span class="">-->
<!--                        {{ slotProps.data.saisieByWeek_charges.chargeHebdomadaire_charges }}-->
<!--                    </span>-->
<!--                </template>-->
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

    .tableauCentral {
        overflow-x: auto;
        white-space: nowrap;
    }
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
    /deep/ .p-datatable {
        &.p-datatable-customers {
            .p-datatable-thead > tr > th,
            .p-datatable-tfoot > tr > td {
                padding: 5px;
                background-color: #E6DFDF85;
                border: none;
                font-size: 0.9em;
                padding-left: 0.4em;
            }

            .p-datatable-thead > tr > th:first-child{
                border-radius: 10px 0px 0px 10px;
            }

            .p-datatable-thead > tr > th:last-child{
                border-radius: 0px 10px 10px 0px;
            }

            .p-datatable-tbody > tr > td {
                padding: 0;
                border: none;
                padding-top: 0.4em;
                font-size: 0.9em;
                border-bottom: 1px solid #00000029;
                padding-left: 0.5em;
                padding-bottom: 0.4em;
                .p-column-title {
                    font-size: 0.9em;
                }
                span{
                    font-size: 0.8em;
                }
            }

            .p-datatable-tbody > tr.p-datatable-emptymessage > td{
                padding-bottom: 3rem;
                padding-top: 3rem;
                font-size: 1em;
            }
            .footer {
                border-radius: 10px 0px 0px 10px;
            }
            .p-sortable-column .p-sortable-column-icon{
                display: none;
            }

            .p-datatable-emptymessage > td{
                text-align: center;
            }
        }
    }

    /deep/ .p-paginator{
        .p-paginator-first, .p-paginator-prev, .p-paginator-next, .p-paginator-last {
            min-width: 1rem;
            height: 1rem;
            padding-left: 0.5rem;
        }
        .p-paginator-prev{
            padding-right: 2rem;
        }

        .p-paginator-next{
            padding-left: 2rem;
        }
    }

    /deep/ .p-paginator .p-paginator-pages .p-paginator-page.p-highlight{
        background-color: #5172AF;
    }

    /deep/ .p-paginator .p-paginator-pages .p-paginator-page{
        min-width: 1.5rem;
        height: 1.5rem;
    }

    /deep/ .p-datatable .p-datatable-scrollable-header{
        background: none;
    }


</style>
