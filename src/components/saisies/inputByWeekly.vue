<template>
    <div>

        <div class="text-center bg-white">
            <span class="font-weight-bolder"> Du {{ activitiesByWeek.periode.start | dateFrFull() }} au {{ activitiesByWeek.periode.end | dateFrFull()}}</span>
        </div>
        <div class="table-responsive">
        </div>
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
                <!--<div class=" zoneScroll">-->
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
                <!--</div>-->
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



    </div>
</template>

<script>
    export default {
        name: "inputByWeekly",
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
    .triangle::after {
        position: absolute;
        left: 25px;
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
