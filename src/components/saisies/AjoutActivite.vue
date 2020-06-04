<template>
    <div id="ajoutActivite" class="">
        <Periode/>
        <div class="row pl-5">
            <div class="col">
                <div class="row">
                    <span>Missions / Modules</span>
                </div>
                <div class="row dropdownWidth">
                    <Dropdown v-model="selectedMission"  option-label="name"/>
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
    import SaisieService from "../../services/saisie.service"

    export default {
        name: 'AjoutActivite',
        components: {Periode},
        computed : {
            phases(){
                return this.$store.state.saisies.phases;
            }
        },
        created() {
            SaisieService.getPhases().then((response) =>{
                console.log("response phases : " + response);
                for(let prop in response){
                    console.log(`response.${prop} = ${response[prop]}`);
                }
                for(let prop in response.headers){
                    console.log(`response.${prop} = ${response.headers[prop]}`);
                }
            });
            /*this.$store.dispatch('saisies/getPhases');
            console.log("data phases : " + this.$store.state.phases);*/
        },
        methods:{
            clickValider(){
                console.log("cliquer");
            }
        },
        data(){
            return{
                selectedMission: null,
                commentaire: null,
                selectedActivite: null,
                charges: "0:0"
            }
        }
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