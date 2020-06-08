<template>
    <div id="ajoutActivite" class="">
        <Periode/>
        <form
                id="formSaisie"
                novalidate="true"
                @submit.prevent="clickValider"
        >
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
        <div class="row justify-content-end mr-3" style="margin-left: 39%">
            <Button id="btnAjouter" type="submit" label="Ajouter" class="p-button-secondary"
                    ></Button>
        </div>
        </form>>
    </div>
</template>
<script>
    import Periode from "./Periode";
    import { mapState } from 'vuex';
    import Saisie from "../../models/saisie";

    export default {
        computed:mapState( {
            phaseActives: state=> state.saisies.phaseActives,
            refActivite: state=> state.references.refActivite,
            loading: false,
        }),
        data() {
            return {
                selectedMission: null,
                commentaire:"",
                selectedActivite: null,
                charges: null,
                tabActivite: null,
            }
        },
        created() {
            this.$store.dispatch('saisies/getPhaseActivesUtilisateurs');
            this.$store.dispatch('references/getRefActivite');
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
                    uneSaisie.saisie_username = JSON.parse(localStorage.getItem('user')).username;
                    uneSaisie.saisie_date = date;
                    this.$store.dispatch('saisies/ajouterUneSaisie',  uneSaisie);
               });
                this.$store.dispatch('saisies/getSaisies', [this.$store.state.saisies.dateSelectionee[0], this.$store.state.saisies.dateSelectionee[1]]);
                this.$store.dispatch('saisies/getSaisieParPeriode', {
                    dateDebut: this.$store.state.saisies.dateSelectionee[0],
                    dateFin: this.$store.state.saisies.dateSelectionee[1]
                });
                this.$parent.DataTableSaisies.forceRerender();
                this.selectedMission = null;
                this.commentaire= "";
                this.selectedActivite= null;
                this.charges= null;
                event.target.reset();
            }
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
</style>
