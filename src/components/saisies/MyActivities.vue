<template>
    <div>
        <div id="saisie">
            <div id="container-saisie">
                <div class="d-lg-flex">
                    <div class="">
                        <Calendrier/>
                    </div>
                    <div class=" m-3">
                        <!-- router-view -->
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
        <div id="formulaire">
            <Tabs :key="tabsKey">
                <Tab name="Nouvelle activité" icon="pi pi-calendar-plus" :selected="true">
                    <AjoutActivite :key="ajoutActiviteKey"/>
                </Tab>
                <Tab name="Activités favorites" icon="pi pi-star-o">
                    <InputActivitesFavorites :key="activiteFavKey"/>
                </Tab>
                <Tab name="Journées types" icon="pi pi-heart">
                    <InputJourneeFavorites/>
                </Tab>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import AjoutActivite from "./AjoutActivite"
    import Calendrier from "./Calendrier"
    import InputActivitesFavorites from './InputActivitesFavorites'
    import InputJourneeFavorites from "./InputJourneeFavorites"
    import Tab from "./Tab"
    import Tabs from "./Tabs"

    export default {
        name: 'MyActivities',
        components: {AjoutActivite, Calendrier, InputActivitesFavorites, InputJourneeFavorites, Tab, Tabs},
        computed: {
            activiteFavKey(){
                return this.$store.state.saisies.activiteFavKey;
            },
            ajoutActiviteKey(){
                return this.$store.state.saisies.ajoutActiviteKey;
            },
            tabsKey(){
                return this.$store.state.saisies.tabsKey;
            }
        },
        created() {
            this.$router.push({ name: 'dailyListing'});
        }

    }
</script>
<style>
    #saisie {
        background-color: white;
        margin-bottom: 2em;
    }

    #container-saisie {
        margin-left: 0;
        /*background-image: url("../assets/Trace-82.svg");*/
        /*background-size: 800px;
        background-repeat: no-repeat;*/
        z-index: 1;
    }

    #lien a {
        color: #535353;
    }

    #lien a:active {
        color: #154194;
        text-decoration: underline;
    }

</style>