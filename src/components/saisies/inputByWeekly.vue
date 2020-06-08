<template>
    <div class="mt-5">
        <div class="text-center bg-white">
            <span class="font-weight-bolder"> Du {{ datePeriode[0] | dateFrFull() }} au {{ datePeriode[1] | dateFrFull()}}</span>
        </div>
        <DataTable v-model="saisiesParPeriode"
                   class="p-datatable-responsive p-datatable-customers p-datatable-sm"
                   :rows="4"
                   :resizableColumns="true"
                   columnResizeMode="expand"
        >
            <template #empty>
                Aucune Activités trouvées.
            </template>
            <template #loading>
                Chargement des données en cours.
            </template>
            <Column field="saisieByWeek_moduleLibelle"
                    header="Missions/ Modules"
                    headerStyle="width: 150px"
            >
                <template #body="slotProps">
                    <div :class="slotProps.data.saisieByWeek_moduleLibelle" class="pl-3">
                        {{ slotProps.data.saisieByWeek_moduleLibelle}}
                    </div>
                </template>
            </Column>
            <Column field="saisieByWeek_activite_id"
                    header="Type d'activités"
                    headerStyle="width: 100px"
            >
                <template #body="slotProps">
                    <div :class="slotProps.data.saisieByWeek_activite_id" class="pl-3">
                        {{ slotProps.data.saisieByWeek_activite_id}}
                    </div>
                </template>

            </Column>
            <Column v-for="date in activitiesByWeek.periode" :field="date" :key="date"
                    :header="date | dateFrShort()">
            </Column>
            <Column header="Actions"  headerStyle="width: 100px">
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
    import  moment from "moment";
    import utils from '../../shared/utils'

    export default {
        name: "inputByWeekly",
        computed: mapState({
            saisiesParPeriode: state => state.saisies.saisiesParPeriode,
            datePeriode: state => state.saisies.dateDeSaisie,


        }),
        created() {
            this.$store.dispatch('saisies/getSaisieParPeriode', {
                dateDebut: this.datePeriode[0],
                dateFin: this.datePeriode[1]
            });
            console.log('tableau de utils',utils.dateBetween(this.datePeriode[0], this.datePeriode[1]))
        },
        data() {
            return {
                tableauPeriode:[],
                periode:{dateDebut:'2020-03-18', dateFin:'2020-03-21'},
                periode2:{dateDebut:'2020-03-18T18:20:33.516Z', dateFin:'2020-03-21T18:20:33.516Z'},
                activitiesByWeek: {
                    periode: [
                        '2020-05-18',
                        '2020-05-19',
                        '2020-05-20',
                        '2020-05-21',
                        '2020-05-22',
                        '2020-05-23',
                        '2020-05-24',
                    ],

                }
            }
        },
        methods: {
        },
    }
</script>

<style lang="scss" scoped>
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
    .p-datatable {
        font-size: 10px;
    }
    /deep/ .p-datatable.p-datatable-customers {
        .p-datatable-header {
            border: 0 none;
            padding: 12px;
            text-align: left;
            font-size: 10px;
        }

        .p-datatable-thead{
            background-color: #E6DFDF85;
            border-radius: 10px;
        }

        .p-datatable-thead > tr > th {
            border: 0 none;
            text-align: left;

            &.p-filter-column {
                border-top: 1px solid #c8c8c8;
            }
        }
        p-column-title {
            font-size: 10px;
        }

        .p-datatable-tbody > tr > td {
            border: 0 none;
            cursor: auto;
        }

        .p-dropdown-label:not(.p-placeholder) {
            text-transform: uppercase;
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
