<template>
  <div id="principal">
    <div id="lien">
      <a href="#" class="titre">Mes Activités</a>
      <a href="#" class="titre">Saisir à la place de</a>
    </div>
    <div id="saisie">
      <div id="container-saisie">
        <div class="row w-100 ml-0">
          <Calendrier/>
          <div class="col-8">
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
          <h1>Activités favorites</h1>
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
  import DataTableSaisies from "./DataTableSaisies";
  import TotalCharges from "./TotalCharges";
  import Tabs from "../components/saisies/Tabs";
  import Tab from "../components/saisies/Tab";
  import AjoutActivite from "./AjoutActivite";

  export default {
    components: {
      AjoutActivite,
      TotalCharges,
      DataTableSaisies,
      Calendrier,
      TitreDate,
      Tabs,
      Tab
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

