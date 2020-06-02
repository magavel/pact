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


        <DataTable class="p-datatable-responsive p-datatable-projet" ref="dt" :value="activitiesByWeek" :paginator="true"
                   :rows="10" selectionMode="single" dataKey="systeme_information_id" :reorderableColumns="true">
            <template #loading>
                Loading records, please wait...
            </template>
            <Column field="systeme_information_libelle_court" header="Projets" :sortable="true"
                    filterMatchMode="gte"></Column>
            <Column field="systeme_information_nombre_modules" header="Nbre de modules" :sortable="true"
                    filterMatchMode="gte"></Column>
            <Column field="systeme_information_etatDuSi" header="Statut de la fiche" :sortable="true"
                    filterMatchMode="gte">
                <template #body="slotProps">
                    <span :class="'statut-fiche status-' + slotProps.data.systeme_information_etatDuSi">{{slotProps.data.systeme_information_etatDuSi}}</span>
                </template>
            </Column>
            <Column field="systeme_information_niveau_completion" header="Niveau de complétion" :sortable="true"
                    filterMatchMode="gte">
                <template #body="slotProps">
                    <ProgressBar :value="slotProps.data.systeme_information_niveau_completion * 100"
                                 :showValue="false"/>
                </template>
            </Column>
            <Column field="systeme_information_dispo_saisie" header="Saisie des activités" :sortable="true"
                    filterMatchMode="gte">
                <template #body="slotProps">
                    <span v-if="slotProps.data.systeme_information_dispo_saisie">Oui</span>
                    <span v-else>Non</span>
                </template>
            </Column>
            <Column field="systeme_information_created_date" header="Créé le" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.systeme_information_created_date | dateFrancaise()}}
                </template>
            </Column>
            <Column field="systeme_information_last_modified_date" header="Dernière modification" :sortable="true">
                <template #body="slotProps">
                    {{moment(slotProps.data.systeme_information_last_modified_date).fromNow()}}
                    par
                    <a class="bulle">
                        {{ slotProps.data.systeme_information_last_modified_by | getTrigramme() }}
                        <span>
              {{ slotProps.data.systeme_information_last_modified_by }}
            </span>
                    </a>
                </template>
            </Column>
            <Column field="" header="Actions">
                <template #body="slotProps">
                    <div class="d-flex flex-nowrap">
                        <Button type="button" icon="pi pi-upload" class="p-button-secondary"
                                @click="upload(slotProps.data.systeme_information_id)"></Button>
                        <Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
                        <Button type="button" icon="pi pi-briefcase" class="p-button-secondary"
                                @click="exportCSV($event)"></Button>
                    </div>
                </template>
            </Column>
            <!--      <template #footer>
                    <span v-if="projects.length ===0 ">Il n'y a pas de projet.</span>
                    <span v-if="projects.length ===1 ">Il y a au totale:  {{projects ? projects.length : 0 }} projet.</span>
                    <span v-if="projects.length >1 ">Il y a au totale:  {{projects ? projects.length : 0 }} projets.</span>
                  </template>-->

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
