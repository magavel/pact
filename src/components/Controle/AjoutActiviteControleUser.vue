<template>

    <div id="ajoutActivite" class="">
        <Toast />
        <Periode/>
        <form
                id="formSaisie"
                novalidate="true"
                @submit.prevent="clickValider"
        >
            <div class="row pl-5">
                <div>
                <span>Collaborateurs</span>
                </div>
            </div>
            <div class="row pl-5">
               <!-- <div id="inputCollaborateur">
                    <AutoComplete
                            v-model="selectedCollaborateur"
                            :suggestions="filteredCollaborateur"
                            :dropdown="true"
                            @complete="searchCollaborateurBasic($event)" field="utilisateur_username"/>
                </div> -->
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
            <div class="col">
                <div class="row">
                    <span>Missions / Modules</span>
                </div>
                <div class="row dropdownWidth">
                    <Dropdown v-model="selectedMission" :options="phaseActives" option-value="phase_id" option-label="phase_chemin"/>
                </div>
                <div class="row mt-4">
                    <span>Commentaire (max 100 caractères)</span>
                </div>
                <div class="row dropdownWidth">
                    <Textarea v-model="commentaire" rows="5" cols="30"></Textarea>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <span>Type d'activités</span>
                </div>
                <div class="row dropdownWidth">
                    <Dropdown v-model="selectedActivite" :options="refActivite" option-value="refTypeId" option-label="refTypeLibelleCourt"/>
                </div>
                <div class="row mt-4">
                    <span>Charges(hh:mm)</span>
                </div>
                <div class="row">
                    <div id="charges">
                        <InputMask v-model="charges" mask="9:99" placeholder="  :  "/>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isAjout" class="row justify-content-end mr-3" style="margin-left: 39%">
            <Button id="btnAjouter" type="submit" label="Ajouter" class="p-button-secondary"></Button>
        </div>
        <div v-else class="row justify-content-end mr-3" style="margin-left: 39%">
            <Button id="annuler" label="Annuler" class="p-button-secondary" v-on:click="annuler"></Button>
            <Button id="btnModifier" label="Modifier" v-on:click="updateSaisie"></Button>
        </div>
        </form>
    </div>
</template>
<script>
    import Periode from "../saisies/Periode";
    import { mapState } from 'vuex';
    import Saisie from "../../models/saisie";
    import fromMinutesToHours from "../../filters/fromMinutesToHours";

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
           clickValider(event) {
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
                event.target.reset();
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
            updateSaisie(event){
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
        components: {Periode}
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

    #ajoutActivite{
        background-color: white;
    }

    /deep/ #inputCollaborateur .p-inputtext{
        width: 454px;
    }



    .p-dropdown {
      width: 12rem;
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
