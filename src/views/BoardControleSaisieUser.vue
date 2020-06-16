<template>
  <div class="container">
    <div class="card m-3">
      <div class="card-body">
        <CardPeriodeControle/>
        <ListControleUser />
      </div>
    </div>
    <div id="formulaire">
      <Tabs :key="tabsKey">
        <Tab name="Nouvelle activité" icon="pi pi-calendar-plus" :selected="true">
          <AjoutActiviteControleUser />
        </Tab>
        <Tab name="Activités favorites" icon="pi pi-star-o">

        </Tab>
        <Tab name="Journées types" icon="pi pi-heart">

        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import ListControleUser from "../components/Controle/ListControleUser";
  import AjoutActiviteControleUser from "../components/Controle/AjoutActiviteControleUser";
  import Tabs from "../components/saisies/Tabs";
  import Tab from "../components/saisies/Tab";
  import CardPeriodeControle from "../components/Controle/CardPeriodeControle";

  export default {
  name: 'BoardControleSaisieUser',
  components: {
    CardPeriodeControle,
      ListControleUser,
      AjoutActiviteControleUser,
    Tab,
    Tabs
  },
  data() {
    return {
      content: '',
    };
  },
  computed: {
    tabsKey(){
      return this.$store.state.saisies.tabsKey;
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