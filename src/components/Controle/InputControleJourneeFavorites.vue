<template>
    <div>
        <Periode/>
      <div class="row pl-5">
        <div>
          <span>Collaborateurs *</span>
        </div>
      </div>
      <div class="row pl-5">
        <Dropdown  name="collaborateur" id="inputCollaborateur" v-model="selectedCollaborateur"
                   :options="listeCollaborateur"
                   optionLabel="utilisateur_username"
                   option-value="utilisateur_username"
                   :filter="true"
                   :showClear="true" @change="rafraichirFavoris">
          <template #option="slotProps">
            <div class="p-dropdown-car-value" v-if="slotProps.value">
                  <span>{{slotProps.option.utilisateur_prenom}}
                    {{slotProps.option.utilisateur_nom}}</span>
            </div>
            <span v-else>{{slotProps.placeholder}}</span>
          </template>
          <template #option="slotProps">
            <div class="p-dropdown-car-option">
                    <span>{{slotProps.option.utilisateur_prenom}}
                    {{slotProps.option.utilisateur_nom}}</span>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="row pl-5">
        <div>
          <span>Vos Journées favorites</span>
        </div>
      </div>
        <div class="row pl-5 mr-5">

        <TreeTable  selectionMode="multiple" :value="journeesFavorites" :lazy="true" :paginator="true" :rows="rows" :loading="loading"
                   :totalRecords="totalRecords" >
          <template #empty>
            <div class="row pl-5 mr-5 text-center">
              <span >Aucune journées favorites de renseignée</span>
            </div>
            <div class="row pl-5 mr-5 text-center">
            <span >Ajouté des nouvelles journées et utilisé l'icone
              <em class="pi pi-heart"></em> à partir du tableau d'activités pour consituer votre liste</span>
            </div>
          </template>
            <Column field="SaisieFavorite_moduleLibelle" header="Mission" :expander="true"></Column>
            <Column field="SaisieFavorite_charges" header="Charge"></Column>
            <Column field="SaisieFavorite_commentaire" header="Commentaire"></Column>
            <Column headerStyle="width: 8em" bodyStyle="text-align: center">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-plus" class="p-button-secondary" @click.prevent="ajouterUneActiviteFavorite(slotProps)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-secondary" @click.prevent="afficherSupprimerDialog(slotProps)"></Button>
                </template>
            </Column>
        </TreeTable>
        </div>
    </div>

</template>
<script>
  import { mapState } from 'vuex';
  import Periode from "../saisies/Periode";

  export default {
    computed:mapState( {
        journeesFavorites: state=> state.users.journeesFavorites,
        favorites: state=> state.users.favorites,
      listeCollaborateur: state=> state.users.users,
    }),
    created() {
      this.$store.dispatch('users/getAllFavorites');
      this.$store.dispatch('users/getAllJourneeFavorites',this.selectedCollaborateur);
      this.$store.dispatch('users/getAllUsers');
    },
      data() {
          return {
              nodes: null,
              rows: 10,
              loading: false,
              totalRecords: 0,
            selectedCollaborateur:  null,
            filteredCollaborateur: null
          }
      },
          mounted() {

          },
    methods : {
      searchCollaborateur(query) {
        return this.listeCollaborateur.filter((collaborateur) => {
          return collaborateur.utilisateur_username.toLowerCase().startsWith(query.toLowerCase());
        });
      },
      searchCollaborateurBasic(event) {
        setTimeout(() => {
          this.filteredCollaborateur = this.searchCollaborateur(event.query);
        }, 250);
      },
      rafraichirFavoris() {
        this.$store.dispatch('users/getAllJourneeFavorites',this.selectedCollaborateur);
      }
    },
    name: 'InputJourneeFavorites',
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


    </style>
