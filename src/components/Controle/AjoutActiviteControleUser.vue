<template>

    <div id="ajoutActivite" class="">
        <Toast />
        <Periode/>
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <form
                id="formSaisie"
                novalidate="true"
                @submit.prevent="clickValider"
        >
            <div class="row pl-5 mt-5 mb-1">
                <div>
                <span>Collaborateurs</span>
                </div>
            </div>
          <ValidationProvider name="collaborateur" rules="required" v-slot="{ errors }">
            <div class="row pl-5">
              <Dropdown ref="collaborateur" name="collaborateur" id="inputCollaborateur" v-model="selectedCollaborateur"
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
        <div class="row pl-5 mt-5">
            <div class="col">

                <div class="row mb-1">
                    <span>Missions</span>
                </div>
              <ValidationProvider name="missions" rules="required" v-slot="{ errors }">
                <div class="row dropdownWidth">
                    <Dropdown name="missions" v-model="selectedMission" :options="phaseActives" option-value="phase_id" option-label="phase_chemin"/>
                    <span
                      class="block text-red-600 text-xs absolute bottom-0 left-0"
                      v-if="errors[0]"
                  >{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
                <div class="row mt-4 mb-1">
                    <span>Commentaire (max 100 caractères)</span>
                </div>
              <ValidationProvider name="commentaire" rules="sizeMaxTextArea" v-slot="{ errors }">
                <div class="row dropdownWidth">
                    <Textarea v-model="commentaire" rows="5" cols="30"></Textarea>
                </div>
                <span
                    class="block text-red-600 text-xs absolute bottom-0 left-0"
                    v-if="errors[0]"
                >{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="col">
                <div class="row mb-1">
                    <span>Type d'activités</span>
                </div>
              <ValidationProvider name="typeActivite" rules="required" v-slot="{ errors }">
                <div class="row dropdownWidth">
                    <Dropdown name="typeActivite" v-model="selectedActivite" :filter="true" :options="refActivite" option-value="refTypeId" option-label="refTypeLibelleCourt"/>
                  <span
                      class="block text-red-600 text-xs absolute bottom-0 left-0"
                      v-if="errors[0]"
                  >{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
                <div class="row mt-4 mb-1">
                    <span>Charges(hh:mm)</span>
                </div>
              <ValidationProvider name="charge" rules="required|controleTemps" v-slot="{ errors }">
                <div class="row">
                    <div id="charges">
                        <InputMask v-model="charges" mask="9:99" placeholder="  :  "/>
                    </div>
                  <div>
                    <span> {{ errors[0] }}</span>
                  </div>
                </div>
              </ValidationProvider>
            </div>
        </div>
        <div v-if="isAjout" class="row justify-content-end mr-3" style="margin-left: 39%">
            <Button id="btnAjouter" type="submit" label="Ajouter" class="p-button-secondary"></Button>
        </div>
        <div v-else class="row justify-content-end mr-3" style="margin-left: 39%">
            <Button id="annuler" label="Annuler" class="p-button-secondary mr-3" v-on:click="annuler"></Button>
            <Button id="btnModifier" label="Modifier" v-on:click="updateSaisie"></Button>
        </div>

        </form>
      </ValidationObserver>
    </div>
</template>
<script>
    import Periode from "../saisies/Periode";
    import { mapState } from 'vuex';
    import Saisie from "../../models/saisie";
    import fromMinutesToHours from "../../filters/fromMinutesToHours";
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
    import { required } from 'vee-validate/dist/rules';

    // Override the default message.
    extend('required', {
      ...required,
      message: 'Ce champs est requis'
    });

    extend("vide", {
      validate: (value) => {
        console.log('valeur de value', value);
        /* if (!value || 0 === value.length) {
           return true;
         }
         return false;*/
      },
      message:
          "c'est vide"
    });
    extend("controleTemps", {
      validate: (value) => {
        if ((parseInt(value.split(':')[0]*60) + parseInt(value.split(':')[1])) > 0) {
          return true;
        }
        return false;
      },
      message:
          "Saisir une durée"
    });

    extend("sizeMaxTextArea", {
      validate: (value) => {
        if (value.length <= 250) {
          return true;
        }
        return false;
      },
      message:
          "Taille du commentaire supérieur à 250 caractères"
    });


    export default {
        computed:mapState( {
            phaseActives: state=> state.saisies.phaseActives,
            refActivite: state=> state.references.refActivite,
            saisieUpdate: state=> state.saisies.saisieUpdate,
            listeCollaborateur: state=> state.users.users,
            loading: false,
        }),
        data() {
            return {
                selectedMission: null,
                commentaire:"",
                selectedActivite: null,
                charges: null,
                tabActivite: null,
                messages: [],
                isAjout: true,
                selectedCollaborateur: null,
                filteredCollaborateur: null
            }
        },
        created() {
          this.$store.dispatch('saisies/getPhaseActivesUtilisateurs', this.selectedCollaborateur);
            this.$store.dispatch('references/getRefActivite');
            this.$store.dispatch('users/getAllUsers');

          if(this.saisieUpdate !== null && this.saisieUpdate !== undefined){


           // console.log('store', this.$store.state.users.user );
               this.selectedCollaborateur =  this.saisieUpdate.selectedCollaborateurUsername;
                 this.rafraichirFavoris();
                this.selectedMission = this.saisieUpdate.SaisieFavorite_phaseId;
                this.commentaire = this.saisieUpdate.SaisieFavorite_commentaire;
                this.selectedActivite = this.saisieUpdate.SaisieFavorite_activiteId;
                this.charges = fromMinutesToHours(this.saisieUpdate.SaisieFavorite_charges);
                this.isAjout = false;

            }

        },
        methods: {
            dateBetween: function(startDate, endDate) {
                let dates = [],
                    currentDate = startDate,
                    addDays = function(days) {
                        let date = new Date(this.valueOf());
                        date.setDate(date.getDate() + days);
                        return date;
                    };
                while (currentDate <= endDate) {
                    dates.push(currentDate);
                    currentDate = addDays.call(currentDate, 1);
                }
                return dates;
            },
          rafraichirFavoris() {
            this.$store.dispatch('saisies/getPhaseActivesUtilisateurs', this.selectedCollaborateur);

          },
           async clickValider() {
             this.loading = true;
             const isValid = await this.$refs.observer.validate();
             if (!isValid) {
               this.loading = false;
               return;
             }

               let start = new Date(this.$store.state.saisies.dateDeSaisie[0]);
               let end = new Date(this.$store.state.saisies.dateDeSaisie[1]);
               let loop =   new Date(this.$store.state.saisies.dateDeSaisie[0]);
               // for (let loop = new Date(start); loop <= end; loop = loop.getDate()+1 ){
               let dates = this.dateBetween(start, end);
               dates.forEach((date) =>{
                    let uneSaisie = new Saisie();
                    uneSaisie.saisie_phaseId = this.selectedMission;
                    uneSaisie.activite_Id= this.selectedActivite;
                    uneSaisie.saisie_charge = parseInt(this.charges.split(':')[0]*60) + parseInt(this.charges.split(':')[1]);
                    uneSaisie.saisie_commentaire = this.commentaire;
                    uneSaisie.saisie_username =  this.selectedCollaborateur;
                 uneSaisie.saisie_date = date;
                    this.$store.dispatch('saisies/ajouterUneSaisie',  uneSaisie);
               });

                //this.$parent.$parent.$parent.$forceUpdate(); // a checker
               this.$store.commit("saisies/UPDATE_ACTIVITE_FAV_KEY");
               //appel du Toaster
               this.$toast.add({severity:'success', summary: 'Succes', detail:'Saisie enregistrée', life: 3000});
               //reset des champs
                this.selectedMission = null;
                this.commentaire= "";
                this.selectedActivite= null;
                this.charges= null;
                this.$refs.observer.reset();
            },
            annuler(){
                this.isAjout = true;
                this.selectedMission = null;
                this.commentaire = null;
                this.selectedActivite = null;
                this.charges = null;
                this.$store.commit("saisies/UPDATE_TABS_KEY");
                this.$store.commit('saisies/GET_SAISIE_UPDATE', null);
            },
            async updateSaisie(event){
              this.loading = true;
              const isValid = await this.$refs.observer.validate();
              if (!isValid) {
                this.loading = false;
                return;
              }

                let start = new Date(this.$store.state.saisies.dateDeSaisie[0]);
                let end = new Date(this.$store.state.saisies.dateDeSaisie[1]);
                let loop =   new Date(this.$store.state.saisies.dateDeSaisie[0]);
                // for (let loop = new Date(start); loop <= end; loop = loop.getDate()+1 ){
                let dates = this.dateBetween(start, end);
                dates.forEach((date) =>{
                    let saisieModif = {

                        saisie_phaseId : this.selectedMission,
                        activite_Id : this.selectedActivite,
                        saisie_charge : parseInt(this.charges.split(':')[0]*60) + parseInt(this.charges.split(':')[1]),
                        saisie_commentaire : this.commentaire,
                        saisie_username : JSON.parse(localStorage.getItem('user')).username,
                        saisie_date : date,
                    };
                    if (this.saisieUpdate.SaisieFavorite_saisieId === -1) { // cas d'une valeur vide donc c'est une création

                      this.$store.dispatch('saisies/ajouterUneSaisie',  saisieModif);
                    } else {
                      saisieModif.saisie_Id = this.saisieUpdate.SaisieFavorite_saisieId;
                      this.$store.dispatch('saisies/updateSaisie', saisieModif);
                    }
                });

                //this.$parent.$parent.$parent.$forceUpdate(); // a checker
                this.$store.commit("saisies/UPDATE_ACTIVITE_FAV_KEY");
                this.$store.commit("saisies/UPDATE_TABLE_SAISIE_KEY");
                //appel du Toaster
                this.$toast.add({severity:'success', summary: 'Succes', detail:'Saisie modifiée', life: 3000});
                //reset des champs
                this.selectedMission = null;
                this.commentaire= "";
                this.selectedActivite= null;
                this.charges= null;
                this.$store.commit("saisies/UPDATE_TABS_KEY");
                this.$store.commit('saisies/GET_SAISIE_UPDATE', null);
                this.$refs.observer.reset();
                //event.target.reset();
            },
            searchCollaborateur(query) {
                return this.listeCollaborateur.filter((collaborateur) => {
                    return collaborateur.utilisateur_username.toLowerCase().includes(query.toLowerCase());
                });
            },
            searchCollaborateurBasic(event) {
                setTimeout(() => {
                    this.filteredCollaborateur = this.searchCollaborateur(event.query);
                }, 250);
            },
        },
        name: 'AjoutActivite',
        components: {Periode, ValidationProvider, ValidationObserver}
    }
</script>

<style lang="scss" scoped>


    #btnAjouter {
        background: #154194 0% 0% no-repeat padding-box;
        border-radius: 30px;
        opacity: 1;
        letter-spacing: 0px;
        color: #FFFBFB;
        width: 100px;
        height: 50px;
        margin-right: 1%;
    }

    #btnModifier{
        background: #154194 0% 0% no-repeat padding-box;
        border-radius: 30px;
        opacity: 1;
        letter-spacing: 0px;
        color: #FFFBFB;
        width: 100px;
        height: 50px;
        margin-right: 1%;
        border: none;
    }

    #annuler{
        border-radius: 30px;
        opacity: 1;
        letter-spacing: 0px;
        width: 100px;
        height: 50px;
        background: #E0E4EB 0% 0% no-repeat padding-box;
        border: none;
        color: #535353;
    }

    #ajoutActivite{
        background-color: white;
    }

    /deep/ #inputCollaborateur .p-inputtext{
        width: 454px;
    }



    .p-dropdown {
      width: 35rem;
    }

    .p-dropdown-car-option,
    .p-dropdown-car-value {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        margin-right: .5rem;
        width: 24px;
      }

      span {
        line-height: 1;
      }
    }

    .p-dropdown-car-value {
      justify-content: flex-start;

      img {
        width: 17px;
      }
    }



</style>
