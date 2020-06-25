<template>
  <div >
    <div id="saisie">
      <div id="container-saisie">
        <CardPeriodeControle/>
        <div class="d-flex justify-content-end m-2 pr-5">
          <div class="btn-group btn-group-md mr-n2">
            <button type="button" class="btn btn-outline-primary" @click="selectionnerTous">Tous</button>
            <button type="button" class="btn btn-outline-primary" @click="selectionnerEquipe">Par équipe projet</button>
            <button type="button" class="btn btn-outline-primary" @click="selectionnerEquipeOrga">Par entité</button>
          </div>
        </div>
          <keep-alive>
          <component v-bind:is="currentTabComponent" ></component>
              </keep-alive>
      </div>
    </div>
    <div id="formulaire">

      <Tabs :key="tabsKey">
        <Tab name="Nouvelle activité" icon="pi pi-calendar-plus" :selected="true">
          <AjoutActiviteControleUser />
        </Tab>
        <Tab name="Activités favorites" icon="pi pi-star-o">
          <InputControleActivitesFavorites />
        </Tab>
        <Tab name="Journées types" icon="pi pi-heart">
          <InputControleJourneeFavorites />
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import ListControleUser from "../components/Controle/ListControleUser";
  import ListControleEquipe from "../components/Controle/ListControleEquipe";
  import ListControleEquipeOrga from "../components/Controle/ListControleEquipeOrga";
  import AjoutActiviteControleUser from "../components/Controle/AjoutActiviteControleUser";
  import InputControleActivitesFavorites from "../components/Controle/InputControleActivitesFavorites";
  import InputControleJourneeFavorites from "../components/Controle/InputControleJourneeFavorites";

  import Tabs from "../components/saisies/Tabs";
  import Tab from "../components/saisies/Tab";
  import CardPeriodeControle from "../components/Controle/CardPeriodeControle";

  export default {
  name: 'BoardControleSaisieUser',
  components: {
    CardPeriodeControle,
      ListControleUser,
      AjoutActiviteControleUser,
      ListControleEquipe,
      ListControleEquipeOrga,
    InputControleActivitesFavorites,
    InputControleJourneeFavorites,
    Tab,
    Tabs
  },
  data() {
    return {
      content: '',
        currentTab : "ListControleUser",
    };
  },
  computed: {
    tabsKey(){
      return this.$store.state.saisies.tabsKey;
    },
      currentTabComponent: function() {
          return this.currentTab;
      }
  },
      methods: {
          selectionnerTous() {
              this.currentTab = "ListControleUser";
          },
          selectionnerEquipe() {
              this.currentTab = "ListControleEquipe";

          },
          selectionnerEquipeOrga() {
              this.currentTab = "ListControleEquipeOrga";
          }

      }
};
</script>


<style>

  #periodeControle .p-inputtext {
    width: 100px;
    margin-top: 10%;
  }

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
</style>
