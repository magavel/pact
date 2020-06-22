<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <div class="mb-4 pb-4">
        <Toast />
        <Periode/>

      <div class="row pl-5">
        <div>
          <span>Collaborateurs</span>
        </div>
      </div>
      <ValidationProvider name="collaborateur" rules="required" v-slot="{ errors }">
      <div class="row pl-5">
        <Dropdown id="inputCollaborateur" v-model="selectedCollaborateur"
                  :options="listeCollaborateur"
                  optionLabel="utilisateur_username"
                  option-value="utilisateur_username"
                  :filter="true"
                  placeholder="Selectionner collaborateur"
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
              <span
                  class="block text-red-600 text-xs absolute bottom-0 left-0"
                  v-if="errors[0]"
              >{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <div class="row pl-5">
      <div>
          <span>
            les Activites favorites
          </span>
      </div>
      </div>
        <div class="row pl-5 mr-5">
    <DataTable v-model="favorites"
               class="p-datatable-responsive p-datatable-customers"
               :scrollable="true"
               scrollHeight="200px"
               :rows="4" :key="componentKey">
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
                    {{ slotProps.data.SaisieFavorite_charges | fromMinutesToHours() }}
                </div>
            </template>
        </Column>
        <Column header="Actions">
            <template #body="slotProps">
                <Button type="button" icon="pi pi-plus" class="p-button-secondary" @click.prevent="handleSubmit(ajouterUneActiviteFavorite(slotProps))"></Button>
            </template>
        </Column>
    </DataTable>
        </div>
        <div class="row">
        </div>
         </div>
  </ValidationObserver>
</template>
<script>
  import { mapState } from 'vuex';
  import Periode from "../saisies/Periode";
  import Saisie from "../../models/saisie";
  import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
  import { required } from 'vee-validate/dist/rules';

  // Override the default message.
  extend('required', {
    ...required,
    message: 'Ce champs est requis'
  });

  export default {
    computed:mapState( {
      favorites: state=> state.users.favorites,
      listeCollaborateur: state=> state.users.users,
      loading: false,
    }),
    created() {
      this.$store.dispatch('users/getAllFavorites');
      if (this.$store.state.users.users) {
        this.$store.dispatch('users/getAllUsers');
      }
    },
      data() {
        return {
            display: false,
            componentKey: 0,
            messages: [],
           selectedCollaborateur:  null,
          filteredCollaborateur: null
        }
      },
      methods: {
          async ajouterUneActiviteFavorite(props) {
          const isValid = await this.$refs.observer.validate();
          if (!isValid) {
            return;
          }
              let uneSaisieSelec = this.favorites[props.index];
              let uneSaisie = new Saisie();
              uneSaisie.saisie_phaseId = uneSaisieSelec.SaisieFavorite_phaseId;
              uneSaisie.activite_Id= uneSaisieSelec.SaisieFavorite_activiteId;
              uneSaisie.saisie_charge = uneSaisieSelec.SaisieFavorite_charges;
              uneSaisie.saisie_commentaire = uneSaisieSelec.SaisieFavorite_commentaire;
              uneSaisie.saisie_username = this.selectedCollaborateur;
              uneSaisie.saisie_date = new Date(this.$store.state.saisies.dateDeSaisie[0]);
              this.$store.dispatch('saisies/ajouterUneSaisie',  uneSaisie);
              this.$store.dispatch('saisies/getSaisies', [this.$store.state.saisies.dateSelectionee[0], this.$store.state.saisies.dateSelectionee[1]]);
              this.$store.commit("saisies/UPDATE_TABLE_SAISIE_KEY");
              this.forceRerender();
              this.$toast.add({severity:'success', summary: 'Succes', detail:'Saisie enregistrée', life: 3000});
          },
          forceRerender() {
              this.componentKey += 1;
          },
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
          this.$store.dispatch('users/getAllFavorites',this.selectedCollaborateur);
        }
      },
    name: 'InputActivitesFavorites',
      components: {Periode, ValidationObserver, ValidationProvider}
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
