<template>
  <div id="principal">
    <div id="lien">
        <<span><a href="#" class="titre">Mes Activités</a></span>
        <span class="ml-5"><a href="#" class="titre">Saisir à la place de</a></span>
      <!--<router-link to="/activites">Mes Activités</router-link>-->
      <!--<router-link to="/activites/ajoutActiviteControle">Activités de mes équipes</router-link>-->
    </div>
    <!--<router-view></router-view>-->
    <MyActivities :activite-fav-key="activiteFavKey" :ajout-activite-key="ajoutActiviteKey" :tabs-key="tabsKey"/>
  </div>
</template>

<script>
  import MyActivities from "../components/saisies/MyActivities";

  export default {
    components: {
      MyActivities
    },
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
      this.$store.dispatch('users/getAllFavorites');
      this.$router.push({ name: 'dailyListing'});
    }
  }
</script>

<style>

  #lien a{
    color: #535353;
  }

  #lien a:active{
    color: #154194;
    text-decoration: underline;
  }

</style>

