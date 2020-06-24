<template>
    <div class="mb-4 pb-4">
        <Toast />
        <Periode/>
      <div class="row pl-5">
        <div>
          <span>Vos activites</span>
        </div>
      </div>
        <div class="row pl-5 mr-5">
    <DataTable v-model="favorites"
               class="p-datatable-responsive p-datatable-customers"
               :scrollable="true"
               scrollHeight="200px"
               :rows="4" :key="componentKey">
        <template #empty>
          <div class="row pl-5 mr-5 text-center">
          <span class="messageFavoriVide">Aucune activité favorite renseignée</span>
          </div>
          <div class="row pl-5 mr-5 text-center">
            <span class="messageFavoriVide">Utilisez les icones
              <em class="pi pi-star-o"></em> dans le bloc au-dessus pour constituer votre liste</span>
          </div>
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
                    {{ slotProps.data.SaisieFavorite_charges | fromMinutesToHours() }}
                </div>
            </template>
        </Column>
        <Column header="Actions">
            <template #body="slotProps">
                <Button type="button" icon="pi pi-plus" class="p-button-secondary" @click.prevent="ajouterUneActiviteFavorite(slotProps)"></Button>
                <Button type="button" icon="pi pi-times" class="p-button-secondary" @click.prevent="afficherSupprimerDialog(slotProps)"></Button>
            </template>
        </Column>
    </DataTable>
        </div>
        <div class="row">
        </div>
        <Dialog :visible.sync="display">
            <template #header>
                <h3>Confirmation</h3>
            </template>
            Voulez-vous supprimer votre activité favorites ?
            <template #footer>
                <Button label="Oui" icon="pi pi-check" @click.prevent="supprimerFavoris" />
                <Button label="Non" icon="pi pi-times" class="p-button-secondary"  @click.passive="fermerSupprimerDialog" />
            </template>
        </Dialog>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Periode from "./Periode";
  import Saisie from "../../models/saisie";

  export default {
    computed:mapState( {
      favorites: state=> state.users.favorites,
      loading: false,
    }),
    created() {
      this.$store.dispatch('users/getAllFavorites');
    },
      data() {
        return {
            display: false,
            selectedSupprime : null, // favoris selectionnée
            componentKey: 0,
            messages: [],
        }
      },
      methods: {
          ajouterUneActiviteFavorite(props) {
              let uneSaisieSelec = this.favorites[props.index];
              let uneSaisie = new Saisie();
              uneSaisie.saisie_phaseId = uneSaisieSelec.SaisieFavorite_phaseId;
              uneSaisie.activite_Id= uneSaisieSelec.SaisieFavorite_activiteId;
              uneSaisie.saisie_charge = uneSaisieSelec.SaisieFavorite_charges;
              uneSaisie.saisie_commentaire = uneSaisieSelec.SaisieFavorite_commentaire;
              uneSaisie.saisie_username = JSON.parse(localStorage.getItem('user')).username;
              uneSaisie.saisie_date = new Date(this.$store.state.saisies.dateDeSaisie[0]);
              this.$store.dispatch('saisies/ajouterUneSaisie',  uneSaisie);
              this.$store.dispatch('saisies/getSaisies', [this.$store.state.saisies.dateSelectionee[0], this.$store.state.saisies.dateSelectionee[1]]);
              this.$store.commit("saisies/UPDATE_TABLE_SAISIE_KEY");
              this.forceRerender();
              this.$toast.add({severity:'success', summary: 'Succes', detail:'L\'activité a bien été ajoutée à vos favoris', life: 3000});
          },
          afficherSupprimerDialog(props) {
              this.display = true;
              this.selectedSupprime = this.favorites[props.index];
          },
          fermerSupprimerDialog(e) {
              this.display = false;
          },
          supprimerFavoris(e) {
              this.$store.dispatch('users/supprimerFavoris', this.selectedSupprime.SaisieFavorite_saisieId);
              this.display = false;
              this.$store.dispatch('users/getAllFavorites');
              this.forceRerender();
              this.$toast.add({severity:'info', summary: 'Info Message', detail:'Activité favorite supprimée', life: 3000});
              this.$store.dispatch('saisies/getSaisies', [this.$store.state.saisies.dateSelectionee[0], this.$store.state.saisies.dateSelectionee[1]]);
              this.$store.commit("saisies/UPDATE_TABLE_SAISIE_KEY");
          },
          forceRerender() {
              this.componentKey += 1;
          }
      },
    name: 'InputActivitesFavorites',
      components: {Periode}
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

    /*/deep/ .p-datatable.p-datatable-customers {
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

    }*/

    /deep/ .p-datatable {
        &.p-datatable-customers {
            .p-datatable-thead > tr > th,
            .p-datatable-tfoot > tr > td {
                padding: 5px;
                background-color: #E6DFDF85;
                border: none;
                font-size: 0.9em;
                padding-left: 1em;
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
                padding-left: 0.5em;
                .p-column-title {
                    font-size: 0.9em;
                }
                span{
                    font-size: 0.8em;
                }
            }

            .p-datatable-tbody > tr.p-datatable-emptymessage > td{
                padding-bottom: 4rem;
                padding-top: 4rem;
            }

            .p-datatable-tbody > tr.p-datatable-emptymessage > td span{
                font-size: 1em;
            }

            .p-sortable-column .p-sortable-column-icon{
                display: none;
            }

            .p-datatable-emptymessage > td > div:first-child > span{
                margin-left: 36%;
            }

            .p-datatable-emptymessage > td > div:last-child > span{
                margin-left: 28%;
            }
        }
    }

    /deep/ .p-datatable .p-datatable-scrollable-header{
        background: none;
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

    </style>
