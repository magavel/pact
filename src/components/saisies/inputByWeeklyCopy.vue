<template>
    <div>

        <div class="text-center bg-white">
            <span class="font-weight-bolder"> Du {{ activitiesByWeek.periode.start | dateFrFull() }} au {{ activitiesByWeek.periode.end | dateFrFull()}}</span>
        </div>


<!--
        <div class="table-responsive">
            <div class="">
                <div class="header wrapper">
                    <div class="rounded-left align-middle large entete bg-gris-module pl-3">Missions / Modules</div>
                    <div class="bg-gris-module align-middle entete">Type d'activité</div>
                    <div class="bg-gris-module align-middle text-center entete"   v-for="col in activitiesByWeek.periode" :key="col">
                        {{ col | jourFrShort() }} <br> {{ col | monthYearShort()}}
                    </div>
                    <div class=" align-middle bg-gris-module entete font-weight-bold"><font-awesome-icon icon="angle-right" /></div>
                    <div class="rounded-right align-middle bg-gris-module  font-weight-bold"></div>
                </div>

                <div class="body" style="overflow: scroll">
                    <div v-for="item in 6" :key="item" class=" wrapper">
                        <div class=" align-middle entete ">
                            <span class="badge mt-1 badge-pill badge-secondary font-weight-light">
                                activité {{ item}}
                            </span>
                        </div>
                        <div class=" align-middle entete">Type </div>
                        <div class="align-middle text-center entete"  v-for="col in activitiesByWeek.charge" :key="col">
                            <div class="input-group input-group-sm">
                                <input class="form-control text-center m-2" v-model="col.value">
                                <div class="input-group-append"  :class="{triangle: col.comment}"></div>

                            </div>
                        </div>
                        <div class=" align-middle entete font-weight-bold"></div>
                        <div class="align-middle font-weight-bold">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="header wrapper">
                    <div class="rounded-left align-middle entete bg-gris-module">Total des charges</div>
                    <div class="bg-gris-module align-middle entete"></div>
                    <div class="bg-gris-module align-middle text-center entete"  v-for="item in 7" :key="item"> <span class="text-center"> {{ item }}</span></div>
                    <div class=" align-middle bg-gris-module entete font-weight-bold"></div>
                    <div class="rounded-right align-middle bg-gris-module  font-weight-bold"></div>
                </div>

            </div>
        </div>
  -->
  <table class="table table-sm table-borderless bg-white">
                <thead class="">
                <tr class="">
                    <th class="rounded-left align-middle entete bg-gris-module" scope="col">Missions / Modules</th>
                    <th   class="bg-gris-module align-middle entete" scope="col">Type d'activité</th>
                    <th  v-for="col in activitiesByWeek.periode" :key="col" class="bg-gris-module align-middle text-center entete" scope="col">{{ col | jourFrShort() }} <br> {{ col | monthYearShort()}}</th>
                    <th class=" align-middle bg-gris-module entete font-weight-bold" scope="col"><font-awesome-icon icon="angle-right" /></th>
                    <th  class="rounded-right align-middle bg-gris-module  font-weight-bold"></th>
                </tr>
                </thead>
<!--       <div class=" zoneScroll">-->
                    <tbody>
                    <tr class="">
                        <td  class="badge mt-1 badge-pill badge-primary font-weight-light">Permissions exceptionnelles / Récup</td>
                        <td  ></td>
                        <td  class="colData" v-for="col in activitiesByWeek.charge" :key="col">
                            <div class="input-group input-group-sm mb-3">
                                <input class="form-control text-center" v-model="col.value">
                            </div>
                        </td>
                        <td></td>
                        <td>        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button></td>
                    </tr>
                    <tr>
                        <td class="badge mt-1 badge-pill badge-secondary font-weight-light">PACT NG/ V1</td>
                        <td>Développement</td>
                        <td class="colData" v-for="col in activitiesByWeek.charge" :key="col">
                            <div class="input-group input-group-sm mb-3">
                                <input class="form-control text-center" v-model="col.value">
                            </div>
                        </td>
                        <td></td>
                        <td>        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button></td>
                    </tr>

                    <tr>
                        <td class="badge mt-1 badge-pill badge-secondary font-weight-light">PACT NG/ V1</td>
                        <td>Développement</td>
                        <td class="colData" v-for="col in activitiesByWeek.charge" :key="col">
                            <div class="input-group input-group-sm mb-3">
                                <input class="form-control text-center" v-model="col.value">
                            </div>
                        </td>
                        <td></td>
                        <td>        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button></td>
                    </tr>

                    <tr>
                        <td class="badge mt-1 badge-pill badge-secondary font-weight-light">PACT NG/ V1</td>
                        <td>Développement</td>
                        <td class="colData" v-for="col in activitiesByWeek.charge" :key="col">
                            <div class="input-group input-group-sm mb-3">
                                <input class="form-control text-center" v-model="col.value">
                            </div>
                        </td>
                        <td></td>
                        <td>        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button></td>
                    </tr>
                    <tr>
                        <td class="badge mt-1 badge-pill badge-gris-module font-weight-light" >Activité défense/ Activités militaires</td>
                        <td >Cérémonie</td>
                        <td class="colData" v-for="col in activitiesByWeek.charge" :key="col">
                            <div class="input-group input-group-sm">
                                    <input class="form-control text-center" v-model="col.value">
                                <div class="input-group-append"  :class="{triangle: col.comment}"></div>

                            </div>
                        </td>
                        <td></td>
                        <td>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </td>
                    </tr>
                    </tbody>
              <!-- </div>-->
            <tfoot>
                <tr class="">
                    <td class="rounded-left align-middle entete pl-4 bg-gris-module text-uppercase" scope="col">
                        Total charges <font-awesome-icon icon="info-circle" />
                    </td>
                    <td   class="bg-gris-module align-middle entete" scope="col"></td>
                    <td   v-for="col in activitiesByWeek.charge" class="bg-gris-module text-center align-middle entete" scope="col"> {{ col.value }}</td>
                    <td class="align-middle bg-gris-module entete" scope="col"></td>
                    <td class="rounded-right align-middle bg-gris-module entete" scope="col"></td>
                </tr>
            </tfoot>
        </table>


        <DataTable v-model="favorites"
                   class="p-datatable-responsive p-datatable-customers"
                   :rows="4">
            <template #empty>
                Aucune Activités trouvées.
            </template>
            <template #loading>
                Chargement des données en cours.
            </template>
            <Column field="name"
                    header="Missions/ Modules">
                <template #body="slotProps">
                    <div :class="slotProps.data.SaisieFavorite_moduleLibelle" class="pl-3">
                        {{ slotProps.data.SaisieFavorite_moduleLibelle}}
                    </div>
                </template>
            </Column>
            <Column field="activite"
                    header="Type d'activités">
                <template #body="slotProps">
                    <div :class="slotProps.data.SaisieFavorite_activite_libelle" class="pl-3">
                        {{ slotProps.data.SaisieFavorite_activite_libelle}}
                    </div>
                </template>

            </Column>
            <Column field="commentaire"
                    header="Commentaires">
                <template #body="slotProps">
                    <div :class="slotProps.data.SaisieFavorite_commentaire" class="pl-3">
                        {{ slotProps.data.SaisieFavorite_commentaire}}
                    </div>
                </template>
            </Column>
            <Column field="charges"
                    header="Charges (h:m)" body-class="pl-4">
                <template #body="slotProps">
                    <div :class="slotProps.data.SaisieFavorite_charges" class="pl-3">
                        {{ slotProps.data.SaisieFavorite_charges}}
                    </div>
                </template>
            </Column>
            <Column header="Actions">
                <template #body>
                    <Button type="button" icon="pi pi-plus" class="p-button-secondary"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-secondary"></Button>
                </template>
            </Column>
        </DataTable>





    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "inputByWeekly",
        computed: mapState({
            saisiesFullByWeek: state => state.saisies.saisiesFullByWeek,
        }),
        mounted() {
            console.log('saisiesFullByWeek', saisiesFullByWeek);
        },
        data() {
            return {
                activitiesByWeek: {
                   // periode: {start: '2020-05-18T18:20:33.516Z', end: '2020-05-24T18:20:33.516Z'},
                    periode: [
                        '2020-05-18T18:20:33.516Z',
                        '2020-05-19T18:20:33.516Z',
                        '2020-05-20T18:20:33.516Z',
                        '2020-05-21T18:20:33.516Z',
                        '2020-05-22T18:20:33.516Z',
                        '2020-05-23T18:20:33.516Z',
                        '2020-05-24T18:20:33.516Z',
                    ],
                    charge:[
                        {value:'2:30', comment:'textetetetetetet'},
                        {value:'2:30'},
                        {value:'2:30'},
                        {value:'2:30'},
                        {value:'2:30', comment:'kskskdd'},
                        {value:'2:30'},
                        {value:'2:30'},
                    ],
                    data: [
                        {
                            activity: 'PACT NG/ V1',
                            activityID: 898798798798,
                            typeActivity: {type: 'developpement', title: 'Développement'},
                            comment: 'Fonctionnalité X...',
                            charges: [
                                {day: '2020-05-18T18:20:33.516Z', charge: '02:30'},
                                {day: '2020-05-19T18:20:33.516Z', charge: '02:30'},
                                {day: '2020-05-20T18:20:33.516Z', charge: '02:30'},
                                {day: '2020-05-21T18:20:33.516Z', charge: '02:30'},
                                {day: '2020-05-22T18:20:33.516Z', charge: '02:30'},
                                {day: '2020-05-23T18:20:33.516Z', charge: '02:30'},
                                {day: '2020-05-24T18:20:33.516Z', charge: '02:30'},
                            ],
                        },

                    ]
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

    .wrapper {
        width: 100%;
        display: grid;
        grid-gap: 0;
        grid-template-columns: repeat(auto-fill, minmax(65px, max-content));
    }


    .triangle::after {
        position: absolute;
        left: 62px;
        content:'';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 10px 10px 0;
        border-color: transparent #007bff transparent transparent;
    }
    .collData {
        & input {

        width: 80px;
        }
    }
    .zoneScroll {
            display: block;
            position: relative;
            height: 200px;
            overflow: auto;
    }

    .entete {
        height: 50px;
    }

</style>
