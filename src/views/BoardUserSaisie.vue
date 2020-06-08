<template>
  <div id="principal">
    <div id="lien">
        <span><a href="#" class="titre">Mes Activités</a></span>
        <span><a href="#" class="titre">Saisir à la place de</a></span>
    </div>
    <div id="saisie">
      <div id="container-saisie">
        <div class="row ">
            <div class="col-0">
          <Calendrier/>
            </div>
          <div class="col-sm ml-5 mr-5">
            <!-- router-view -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div id="formulaire">
      <Tabs>
        <Tab name="Nouvelle activité" icon="pi pi-calendar-plus" :selected="true">
          <AjoutActivite/>
        </Tab>
        <Tab name="Activités favorites" icon="pi pi-star-o">
          <InputActivitesFavorites :key="activiteFavKey" />
        </Tab>
        <Tab name="Journées types" icon="pi pi-heart">
            <InputJourneeFavorites />
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import Calendrier from "../components/saisies/Calendrier";
  import Tabs from "../components/saisies/Tabs";
  import Tab from "../components/saisies/Tab";
  import AjoutActivite from "../components/saisies/AjoutActivite";
  import InputActivitesFavorites from '../components/saisies/InputActivitesFavorites';
  import InputJourneeFavorites from "../components/saisies/InputJourneeFavorites";
  import DailyListing from "../components/saisies/DailyListing";

  export default {
    components: {
      DailyListing,
      AjoutActivite,
      Calendrier,
      Tabs,
      Tab,
      InputActivitesFavorites,
        InputJourneeFavorites
    },
    computed: {
      activiteFavKey(){
        return this.$store.state.saisies.activiteFavKey;
      }
    }
  }
</script>

<style>
  #saisie{
    background-color: white;
    margin-bottom: 2em;
  }
  #container-saisie{
    margin-left: 0;
    /*background-image: url("../assets/Trace-82.svg");*/
    /*background-size: 800px;
    background-repeat: no-repeat;*/
    z-index: 1;
  }
</style>

