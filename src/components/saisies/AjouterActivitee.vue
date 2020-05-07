<template>
    <div id="ajoutActivite" class="container">
        <div class="row">
            <div id="periode">
                        <span class="span-icon-calendar">
                            <img src="src/assets/event-24px.svg">
                        </span>
                <Calendar v-model="date2" :locale="fr" dateFormat="dd/mm/yy"/>
                <span style="margin-left: 15px"> au </span>
                <Calendar :locale="fr" dateFormat="dd/mm/yy"/>
            </div>
        </div>
        <div class="row mr-n5">
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
<style scoped>

    a {
        padding: 10px;
    }

    #btnAjouter {
        background: #154194 0% 0% no-repeat padding-box;
        border-radius: 30px;
        opacity: 1;
        font: Regular 18px/22px Myriad Pro;
        letter-spacing: 0px;
        color: #FFFBFB;
        opacity: 1;
        width: 100px;
        height: 50px;
        margin-right: 1%;
    }

    #periode {
        background-color: #ffca7a;
        height: 70px;
        padding: 5px;
        width: 368px;
        margin-left: -67px;
        border-radius: 0px 30px 30px 0px;
    }

    .span-icon-calendar {
        margin-left: 14px;
    }

    #ajoutActivite{
        background-color: white;
    }


</style>