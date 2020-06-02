<template>
  <div id="principal">
    <div id="lien">
      <a href="#" class="titre">Mes Activités</a>
      <a href="#" class="titre">Saisir à la place de</a>
    </div>
    <div id="saisie">
      <div id="container-saisie">
        <div class="row ">
            <div class="col-0">
          <Calendrier/>
            </div>
          <div class="col-sm ml-5 mr-5">
            <TitreDate/>
            <DataTableSaisies/>
            <TotalCharges/>
          </div>
        </div>
      </div>
    </div>
    <div id="formulaire">
      <Tabs>
        <Tab name="Nouvelle activité" :selected="true">
          <AjoutActivite/>
        </Tab>
        <Tab name="Activités favorites">
          <InputActivitesFavorites />
        </Tab>
        <Tab name="Journées types">
          <h1>Journées types</h1>
        </Tab>
      </Tabs>
      <!--<form v-on:submit="sub" action="#" > -->
    </div>
  </div>
</template>

<script>
  import Calendrier from "../components/saisies/Calendrier";
  import TitreDate from "../components/saisies/TitreDate";
  import DataTableSaisies from "../components/saisies/DataTableSaisies";
  import TotalCharges from "../components/saisies/TotalCharges";
  import Tabs from "../components/saisies/Tabs";
  import Tab from "../components/saisies/Tab";
  import AjoutActivite from "../components/saisies/AjoutActivite";
  import InputActivitesFavorites from '../components/saisies/InputActivitesFavorites';


  export default {
    components: {
      AjoutActivite,
      TotalCharges,
      DataTableSaisies,
      Calendrier,
      TitreDate,
      Tabs,
      Tab,
      InputActivitesFavorites
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

