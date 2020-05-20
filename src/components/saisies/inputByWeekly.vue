<template>
    <div>

        <div class="text-center bg-white">
            <span class="font-weight-bolder"> Du {{ activitiesByWeek.periode.start | dateFrFull() }} au {{ activitiesByWeek.periode.end | dateFrFull()}}</span>
        </div>
        <div class="d-flex flex-nowrap">
            <div class="container">
                <div class="row">
                    <div class="header col-3 bg-gris-module rounded-left">Missions/ Modules</div>
                    <div class="col-2 bg-gris-module ">Type d'activités</div>
                    <div class="col-2 bg-gris-module">Commentaires</div>
                </div>
                <div class="row">
                    <span class="col-3 ">eeeeee</span>
                    <span class="col-2">eeeeee</span>
                    <span class="col-2">eeeeee</span>
                </div>
                <div class="row">
                    <span class="cell">rrrrr</span>
                    <span class="cell">rrrrr</span>
                    <span class="cell">rrrrr</span>
                </div>
            </div>
            <div  class="table">
                <div class="row">
                    <span class="header cell bg-gris-module rounded-left">lundi</span>
                    <span class=" bg-gris-module ">mardi</span>
                    <span class=" bg-gris-module">mercredi</span>
                    <span class=" bg-gris-module">jeudi</span>
                    <span class=" bg-gris-module">vendredi</span>
                    <span class=" bg-gris-module">samedi</span>
                    <span class=" bg-gris-module">dimanche</span>
                </div>
                <div class="row">
                    <span class=" "><input type="text" placeholder="23:23" ></span>
                    <span class=" "><input type="text" placeholder="23:23" ></span>
                    <span class=" "><input type="text" placeholder="23:23" ></span>
                    <span class=" "><input type="text" placeholder="23:23" ></span>
                    <span class=" "><input type="text" placeholder="23:23" ></span>
                    <span class=" "><input type="text" placeholder="23:23" ></span>
                    <span class=" "><input type="text" placeholder="23:23" ></span>


                </div>

            </div>
        </div>





    </div>
</template>

<script>
    export default {
        name: "inputByWeekly",
        data() {
            return {
                activitiesByWeek: {
                    //periode: {start: '2020-05-18T18:20:33.516Z', end: '2020-05-24T18:20:33.516Z'},
                    periode: [
                        '2020-05-18T18:20:33.516Z',
                        '2020-05-19T18:20:33.516Z',
                        '2020-05-20T18:20:33.516Z',
                        '2020-05-21T18:20:33.516Z',
                        '2020-05-22T18:20:33.516Z',
                        '2020-05-23T18:20:33.516Z',
                        '2020-05-24T18:20:33.516Z'
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


    .header {
        height: 40px;
    }

</style>
