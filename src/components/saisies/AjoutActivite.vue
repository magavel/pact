<template>
    <div id="ajoutActivite" class="">
        <Periode/>
        <div class="row pl-5">
            <div class="col">
                <div class="row">
                    <span>Missions / Modules</span>
                </div>
                <div class="row dropdownWidth">
                    <Dropdown v-model="selectedMission" option-label="name"/>
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
                    <Dropdown v-model="selectedActivite" />
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

    export default {
        computed:mapState( {
            phaseActives: state=> state.saisies.phaseActives,
            loading: false,
        }),
        data() {
            return {
                selectedMission: [],
                commentaire:"",
                selectedActivite: [],
                charges: null,
                tabActivite: [{phase_chemin: 'New York', code: 'NY'}],

            }
        },
        created() {
            this.$store.dispatch('saisies/getPhaseActivesUtilisateurs');

        },
        methods:{
            clickValider(){
                console.log("cliquer");
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