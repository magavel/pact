<template>
    <div class="row mt-3 mr-auto">
        <Toast />
        <DataTable v-model="saisies"
                   class="p-datatable-responsive p-datatable-customers"
                   :rows="5"
                   :scrollable="true"
                   scrollHeight="300px"
                   dataKey="SaisieFavorite_saisieId"
                   :rowHover="false"
                   :selection.sync="selectedSaisies"
                   :key="componentKey">
            <template #empty>
                Aucune Activités sur la journée selectionnée, vous pouvez ajouter une ou plusieurs activités.
            </template>
            <template #loading>
                Chargement des données en cours.
            </template>
            <Column field="SaisieFavorite_moduleLibelle" header="Missions" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    <div class="">
                        <span :class="slotProps.data.SaisieFavorite_moduleLibelle" class="p-1">{{ slotProps.data.SaisieFavorite_moduleLibelle}} </span>
                    </div>
                </template>
            </Column>
            <Column field="SaisieFavorite_activite_libelle" header="Type d'activités" :sortable="true" filterMatchMode="contains">

            </Column>
            <Column field="SaisieFavorite_commentaire" header="Commentaires" :sortable="true" filterMatchMode="contains">

            </Column>
            <Column field="SaisieFavorite_charges" header="Charges (h:m)" :sortable="true" filterMatchMode="contains">
                <template #body="slotProps">
                    {{ slotProps.data.SaisieFavorite_charges | fromMinutesToHours() }}
                </template>
            </Column>
          <Column  header="Origine" :sortable="true" filterMatchMode="contains">
            <template #body="slotProps">
             Modifiée par {{ slotProps.data.SaisieFavorite_last_modified_by }}
            </template>
          </Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-times" class="p-button-secondary"  @click.prevent="afficherSaisieDialog(slotProps)"></Button>
                    <ToggleButton v-model="slotProps.data.SaisieFavorite_isFavorite" type="button"
                                  class="p-button-secondary" @click='ajouterActiviteFavorite(slotProps)'
                                  off-icon="pi pi-star-o" on-icon="pi pi-star"></ToggleButton>
                    <Button type="button" icon="pi pi-pencil" class="p-button-secondary" @click="modifierSaisie(slotProps)"></Button>
                </template>
            </Column>
        </DataTable>
        <Dialog :visible.sync="display">
            <template #header>
                <h3>Confirmation</h3>
            </template>
            Voulez-vous supprimer votre saisie ?
            <template #footer>
                <Button label="Oui" icon="pi pi-check" @click.prevent="supprimerSaisie" />
                <Button label="Non" icon="pi pi-times" class="p-button-secondary"  @click.passive="fermerSaisieDialog" />
            </template>
        </Dialog>
    </div>
</template>
<script>
    import SaisieService from "../../services/saisie.service";


    export default {
        name: 'DataTableSaisies',
        data() {
            return {
                selectedSaisies: null,
                selectedSupprime : null,
                componentKey : 0,
                display:false,
            }
        },
        computed: {
            saisies(){
                return this.$store.state.saisies.saisies;
            },
            dateSelectionee(){
                return this.$store.state.saisies.dateSelectionee;
            },
        },
        created() {
            let dateJour = new Date();
            if(this.$store.state.saisies.dateDeSaisie[0] !== undefined){
                dateJour = this.$store.state.saisies.dateDeSaisie[0];
            }
            dateJour.setHours(0, -dateJour.getTimezoneOffset(), 0, 0);
            this.$store.dispatch('saisies/getSaisies', [dateJour.toISOString(), dateJour.toISOString()]);
        },
        methods:{
            ajouterActiviteFavorite(props) {
                if (this.saisies[props.index].SaisieFavorite_isFavorite) {
                    this.$store.dispatch('users/supprimerFavoris', this.saisies[props.index].SaisieFavorite_saisieId);
                    this.$store.dispatch('users/getAllFavorites');
                    this.$store.commit("saisies/UPDATE_ACTIVITE_FAV_KEY");
                } else {
                    this.$store.dispatch('saisies/updateActiviteFavorite', this.saisies[props.index]);
                    this.$store.dispatch('users/getAllFavorites');
                    this.$store.commit("saisies/UPDATE_ACTIVITE_FAV_KEY");
                }
            },
            afficherSaisieDialog(props) {
                this.display = true;
                this.selectedSupprime = this.saisies[props.index];
            },
            fermerSaisieDialog(e) {
                this.display = false;
            },
            supprimerSaisie(e) {
                this.$store.dispatch('saisies/supprimerSaisie', this.selectedSupprime.SaisieFavorite_saisieId);
                this.display = false;
                this.$store.dispatch('users/getAllFavorites');
                //this.saisies.splice(index, 1);
                this.$toast.add({severity:'info', summary: 'Info Message', detail:'saisie supprimée', life: 3000});
                this.$store.dispatch('saisies/getSaisies', [this.$store.state.saisies.dateSelectionee[0], this.$store.state.saisies.dateSelectionee[1]]);
                //this.$store.commit("saisies/UPDATE_TABLE_SAISIE_KEY");
                this.$store.commit("saisies/UPDATE_ACTIVITE_FAV_KEY");
                this.forceRerender();
            },
            forceRerender() {
                this.componentKey += 1;
            },
            modifierSaisie(props){
                this.$store.commit('saisies/GET_SAISIE_UPDATE', this.saisies[props.index]);
                this.$store.commit('saisies/UPDATE_AJOUT_ACTIVITE_KEY');
                this.$store.commit('saisies/UPDATE_TABS_KEY');
            },
        }
    }
</script>

<style lang="scss" scoped>

    /deep/ .p-datatable {
        &.p-datatable-customers {
            .p-datatable-thead > tr > th,
            .p-datatable-tfoot > tr > td {
                padding: 3px;
                background-color: #E6DFDF85;
                border: none;
                font-size: 0.9em;
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
                padding-top: 0.8em;
                font-size: 0.9em;
                border-bottom: 1px solid #00000029;
                padding-left: 1em;
                .p-column-title {
                    font-size: 0.9em;
                }
                span{
                    font-size: 0.8em;
                }
            }
            .p-sortable-column .p-sortable-column-icon{
                display: none;
            }
        }
    }

    /deep/ .p-datatable .p-datatable-scrollable-header{
        background: none;
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
    .testBg3{
        background-color: #4028A7;
        border-radius: 8px;
        color: white;

    }

    /deep/ .p-togglebutton.p-button .p-button-icon-left{
        color: #1976D2;
    }

    /deep/ .p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover .p-button-icon-left{
        color: #1976D2;
    }

    .p-togglebutton{
        height: 1.9em;;
    }

    /deep/ .p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover{
        border-color: #2196F3;
    }

    /deep/ .p-togglebutton.p-button.p-highlight{
        background-color: white;
    }

    /deep/ .p-togglebutton.p-button.p-highlight:hover{
        background-color: #e9ecef;
    }

    /deep/ .p-togglebutton.p-button.p-highlight:hover .p-button-icon-left{
        color: #1976D2;
    }
</style>
