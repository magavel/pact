<template>

    <div id="ajoutActivite" class="pb-4">
        <Toast />
        <div class="d-flex justify-content-between">
            <Periode/>
            <span class="mr-5 mt-3">*Champs obligatoires</span>
        </div>
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <form
                id="formSaisie"
                novalidate="true"
                @submit.prevent="handleSubmit(clickValider)"
        >
        <div class="row pl-5">
            <div class="col">
                <div class="row mb-1">
                    <span>Mission*</span>
                </div>
              <ValidationProvider name="mission" rules="required" v-slot="{ errors }">
                <div class="row dropdownWidth">
                    <Dropdown name="mission" v-model="selectedMission" :options="phaseActives" option-value="phase_id" option-label="phase_chemin"/>
              <span
                  class="block text-red-600 text-xs absolute bottom-0 left-0"
                  v-if="errors[0]"
              >{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
                <div class="row mt-4 mb-1">
                    <span>Commentaires (max 250 caractères)</span>
                </div>
              <ValidationProvider name="commentaire" rules="sizeMaxTextArea" v-slot="{ errors }">
                <div class="row dropdownWidth">
                    <Textarea name="commentaire" v-model="commentaire" rows="3" cols="30"></Textarea>
                </div>
                <span
                    class="block text-red-600 text-xs absolute bottom-0 left-0"
                    v-if="errors[0]"
                >{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col">
                <div class="row mb-1">
                    <span>Type d'activité*</span>
                </div>
              <ValidationProvider name="typeActivite" rules="required" v-slot="{ errors }">
                <div class="row dropdownWidth">
                    <Dropdown v-if="selectedMission !== null"  name="typeActivite" v-model="selectedActivite" :filter="true" :options="refActivite"  option-value="refTypeId" option-label="refTypeLibelleCourt"/>
                    <Dropdown v-else  name="typeActivite" v-model="selectedActivite" :filter="true" :options="refActivite"  option-value="refTypeId" option-label="refTypeLibelleCourt" disabled/>
                  <span
                      class="block text-red-600 text-xs absolute bottom-0 left-0"
                      v-if="errors[0]"
                  >{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
                <div class="row mt-4 mb-1">
                    <span>Charges(hh:mm)*</span>
                </div>
                <div class="row">
                  <ValidationProvider name="charge" rules="required|controleTemps|controleMinute|controleHeure" v-slot="{ errors }">
                    <div id="charges">
                        <InputMask name="charge" v-model="charges" mask="9:99" placeholder="  :  "/>
                      <span  v-if="errors[0]"> {{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>

            </div>
        </div>
        <div v-if="isAjout" class="row justify-content-end mr-3" style="margin-left: 39%">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <Button id="btnAjouter" type="submit" label="Ajouter" class="p-button-secondary"></Button>
        </div>
        <div v-else class="row justify-content-end mr-3" style="margin-left: 39%">
            <Button id="annuler" label="Annuler" class="p-button-secondary mr-3" v-on:click="annuler"></Button>
            <Button id="btnModifier" label="Modifier" v-on:click="handleSubmit(updateSaisie)"></Button>
        </div>
        </form>
      </ValidationObserver>
    </div>
</template>
<script>
    import Periode from "./Periode";
    import { mapState } from 'vuex';
    import Saisie from "../../models/saisie";
    import fromMinutesToHours from "../../filters/fromMinutesToHours";
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
    import { required, email } from 'vee-validate/dist/rules';

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

    extend("controleMinute", {
      validate: (value) => {
        if ((parseInt(value.split(':')[1])) <= 59) {
          return true;
        }
        return false;
      },
      message:
          "minutes supérieurs à 59"
    });

    extend("controleHeure", {
      validate: (value) => {
        if ((parseInt(value.split(':')[0])) <= 23) {
          return true;
        }
        return false;
      },
      message:
          "heures supérieurs à 23"
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
              loading: false,
            }
        },
        created() {
            this.$store.dispatch('saisies/getPhaseActivesUtilisateurs');
            this.$store.dispatch('references/getRefActivite');
             if(this.saisieUpdate !== null && this.saisieUpdate !== undefined){
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
          async clickValider() {
            this.loading = true;
            const isValid = await this.$refs.observer.validate();
            if (!isValid) {
              this.loading = false;
              return;
            }
            this.loading = false;
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
                    uneSaisie.saisie_username = JSON.parse(localStorage.getItem('user')).username;
                    uneSaisie.saisie_date = date;
                    this.$store.dispatch('saisies/ajouterUneSaisie',  uneSaisie);
               });
                this.$store.dispatch('saisies/getSaisies', [this.$store.state.saisies.dateSelectionee[0], this.$store.state.saisies.dateSelectionee[1]]);
                this.$store.dispatch('saisies/getSaisieParPeriode', {
                    dateDebut: this.$store.state.saisies.dateSelectionee[0],
                    dateFin: this.$store.state.saisies.dateSelectionee[1]
                });
                //this.$parent.$parent.$parent.$forceUpdate(); // a checker
               this.$store.commit("saisies/UPDATE_ACTIVITE_FAV_KEY");
               this.$store.commit('saisies/UPDATE_TABLE_SAISIE_KEY');
               //appel du Toaster
               this.$toast.add({severity:'success', summary: 'Succes', detail:'L\'activité a bien été ajoutée', life: 3000});
               //reset des champs
                this.selectedMission = null;
                this.commentaire= "";
                this.selectedActivite= null;
                this.charges= null;
                this.$refs.observer.reset(); // remet à jour le form

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
            async updateSaisie(){
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
                        saisie_Id : this.saisieUpdate.SaisieFavorite_saisieId,
                        saisie_phaseId : this.selectedMission,
                        activite_Id : this.selectedActivite,
                        saisie_charge : parseInt(this.charges.split(':')[0]*60) + parseInt(this.charges.split(':')[1]),
                        saisie_commentaire : this.commentaire,
                        saisie_username : JSON.parse(localStorage.getItem('user')).username,
                        saisie_date : date,
                    };
                    this.$store.dispatch('saisies/updateSaisie',  saisieModif);
                });
                this.$store.dispatch('saisies/getSaisies', [this.$store.state.saisies.dateSelectionee[0], this.$store.state.saisies.dateSelectionee[1]]);
                this.$store.dispatch('saisies/getSaisieParPeriode', {
                    dateDebut: this.$store.state.saisies.dateSelectionee[0],
                    dateFin: this.$store.state.saisies.dateSelectionee[1]
                });
                //this.$parent.$parent.$parent.$forceUpdate(); // a checker
                this.$store.commit("saisies/UPDATE_ACTIVITE_FAV_KEY");
                //this.$store.commit("saisies/UPDATE_TABLE_SAISIE_KEY");
                //appel du Toaster
                this.$toast.add({severity:'success', summary: 'Succes', detail:'L\'activité a bien été modifiée', life: 3000});
                //reset des champs
                this.selectedMission = null;
                this.commentaire= "";
                this.selectedActivite= null;
                this.charges= null;
                this.$store.commit("saisies/UPDATE_TABS_KEY");
                this.$store.commit('saisies/GET_SAISIE_UPDATE', null);
                this.$store.commit('saisies/UPDATE_TABLE_SAISIE_KEY');
                //event.target.reset();
            }
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
        width: 150px;
        height: 50px;
        margin-right: 4%;
        border: none;
    }
    #btnModifier{
        background: #154194 0% 0% no-repeat padding-box;
        border-radius: 30px;
        opacity: 1;
        letter-spacing: 0px;
        color: #FFFBFB;
        width: 150px;
        height: 50px;
        margin-right: 4%;
        border: none;
    }
    #annuler{
        border-radius: 30px;
        opacity: 1;
        letter-spacing: 0px;
        width: 150px;
        height: 50px;
        background: #E0E4EB 0% 0% no-repeat padding-box;
        border: none;
        color: #535353;
    }
    #ajoutActivite{
        background-color: white;
    }

    .p-disabled{
        background-color: #E6DFDF85;
    }
</style>
