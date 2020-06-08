<template>
    <div class="row mt-3 mr-auto">
        <DataTable v-model="saisies"
                   class="p-datatable-responsive p-datatable-customers"
                   :rows="5"
                   :scrollable="true"
                   scrollHeight="200px"
                   dataKey="SaisieFavorite_saisieId" :rowHover="true" :selection.sync="selectedSaisies">
            <template #empty>
                Aucune Activités trouvées.
            </template>
            <template #loading>
                Chargement des données en cours.
            </template>
            <Column  selectionMode="multiple" headerStyle="width: 3em"></Column>
            <Column field="SaisieFavorite_moduleLibelle" header="Missions" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <div :class="slotProps.data.SaisieFavorite_moduleLibelle" class="pl-3">
                        {{ slotProps.data.SaisieFavorite_moduleLibelle}}
                    </div>
                </template>
            </Column>
            <Column field="SaisieFavorite_activite_libelle" header="activite" :sortable="true" filterMatchMode="contains">

            </Column>
            <Column field="SaisieFavorite_commentaire" header="commentaire" :sortable="true" filterMatchMode="contains">

            </Column>
            <Column field="SaisieFavorite_charges" header="charges" :sortable="true" filterMatchMode="contains">

            </Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-times" class="p-button-secondary"></Button>
                    <Button type="button" icon="pi pi-star-o" class="p-button-secondary" @click='ajouterActiviteFavorite(slotProps)'></Button>
                    <Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script>
    import SaisieService from "../../services/saisie.service";


    export default {
        name: 'DataTableSaisies',
        data() {
            return {
                selectedSaisies: null,
            }
        },
        computed: {
            saisies(){
                return this.$store.state.saisies.saisies;
            },
            dateSelectionee(){
                return this.$store.state.saisies.dateSelectionee;
            }
        },
        created() {
            let dateJour = new Date();
            dateJour.setHours(0, -dateJour.getTimezoneOffset(), 0, 0);
            this.$store.dispatch('saisies/getSaisies', [dateJour.toISOString(), dateJour.toISOString()]);
        },
        methods:{
            ajouterActiviteFavorite(props) {

                this.$store.dispatch('saisies/updateActiviteFavorite', this.saisies[props.index]);
                this.$store.dispatch('users/getAllFavorites');
            }
        }
    }
</script>

<style lang="scss" scoped>
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

    .PACTNG_PMV{
        background-color: #069F90;
        border-radius: 8px;
        color: white;
        width: 9em;
    }

    .PACTNG_INFOCENTRE{
        background-color: #AA2393;
        border-radius: 8px;
        color: white;
        width: 12em;
    }
    .testBg3{
        background-color: #4028A7;
        border-radius: 8px;
        color: white;

    }
</style>
