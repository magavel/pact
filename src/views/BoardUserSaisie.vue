<template>
  <div id="principal" class="">
    <div id="lien" class="mb-5 ml-n5 mt-n2">
      <router-link to="/activites/myActivities"><span class="mr-3">Mes Activités</span></router-link>
      <router-link to="/activites/ajoutActiviteControle" class="ml-5"><span class="ml-3">Activités de mes équipes</span></router-link>
    </div>
    <div class="ml-n5">
      <router-view></router-view>
    </div>
    <!--<MyActivities :activite-fav-key="activiteFavKey" :ajout-activite-key="ajoutActiviteKey" :tabs-key="tabsKey"/>-->
  </div>
</template>

<script>
  import MyActivities from "../components/saisies/MyActivities";

  export default {
    components: {
      MyActivities
    },
    created() {
      this.$store.dispatch('users/getAllFavorites');
      this.$router.push({name: 'myActivities'});
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

  #lien a{
    color: #535353;
    font-size: medium;
  }

  #lien a:active{
    color: #154194;
    text-decoration: underline;
  }

  #lien .router-link-active{
    color: #154194;
    text-decoration: underline;
    font-size: medium;
  }

  #lien a.router-link-exact-active{
    background: none;
  }
</style>

