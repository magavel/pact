<template>
  <div class="container">
    <div class="card m-3">
      <div class="card-body">
        <CardPeriodeControle/>
          <div @click="selectionnerTous">Tous</div>
          <div @click="selectionnerEquipe">Par équipe projet</div>
          <div @click="selectionnerEquipeOrga">Par équipe organisation</div>
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
</style>