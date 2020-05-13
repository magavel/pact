<template>
    <div id="ajoutActivite" class="">
        <div id="periode" class="ml-n3">
                            <span class="mr-2 ml-1">
                                <img src="src/assets/event-24px.svg">
                            </span>
            <Calendar v-model="date2" :locale="fr" dateFormat="dd/mm/yy"/>
            <span class="ml-3 mr-3"> au </span>
            <Calendar :locale="fr" dateFormat="dd/mm/yy"/>
        </div>
        <div class="row pl-5">
            <div class="col">
                <div class="row">
                    <span>Missions / Modules</span>
                </div>
                <div class="row dropdownWidth">
                    <Dropdown v-model="selectedMission" :options="missionsData"/>
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
                    <Dropdown v-model="selectedActivite" :options="tabActivite"/>
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
        <div class="row justify-content-end">
            <Button id="btnAjouter" type="submit" label="Ajouter" class="p-button-secondary"
                    v-on:click="clickValider"></Button>
        </div>
        <!-- </form> -->
    </div>
</template>
<script>
    export default {
        name: 'AjouterActivitee',
        props: {
            charges: {},
            clickValider: {},
            commentaire: {},
            date2: {},
            fr: {},
            missionsData: {},
            selectedActivite: {},
            selectedMission: {},
            tabActivite: {}
        }
    }
</script>
<style lang="scss" scoped>

    #btnAjouter {
        background: #154194 0% 0% no-repeat padding-box;
        border-radius: 30px;
        opacity: 1;
        font: Regular 18px/22px Myriad Pro;
        letter-spacing: 0px;
        color: #FFFBFB;
        width: 100px;
        height: 50px;
        margin-right: 1%;
    }
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

    #ajoutActivite{
        background-color: white;
    }
</style>