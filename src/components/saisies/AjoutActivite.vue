<template>
    <div id="ajoutActivite" class="">
        <Periode/>
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
                    v-on:click="clickValider"></Button>
        </div>
        <!-- </form> -->
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
            clickValider() {

               // alert(this.selectedMission.option-value);
            //    alert(this.selectedActivite.option-value);
               let start = new Date(this.$store.state.saisies.dateDeSaisie[0]);
                let end = new Date(this.$store.state.saisies.dateDeSaisie[1]);

                let loop =  new Date(start)
                while (loop <= end) {

                    alert(this.charges);


                    let newDate = loop.setDate(loop.getDate() + 1);
                    loop = new Date(newDate);
                    let uneSaisie = new Saisie();
                    uneSaisie.saisie_phaseId = this.selectedMission;
                    uneSaisie.activite_Id= this.selectedActivite;
                    uneSaisie.saisie_charge = parseInt(this.charges.split(':')[0]*60) + parseInt(this.charges.split(':')[1]);
                    uneSaisie.saisie_commentaire = this.commentaire;
                    uneSaisie.saisie_username = JSON.parse(localStorage.getItem('user')).username;
                    uneSaisie.saisie_date = loop;

                    this.$store.dispatch('saisies/ajouterUneSaisie',  uneSaisie);

                }

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