<template>
  <div>
    <div>
      <InitCreateProject
              :list_libelle_fiche_siclade="list_libelle_fiche_siclade"
              :project="project"
              :projects="projects"
      />
    </div>
    <div class="bg-grey arrondi py-4 pl-4 pr-4 ml-n3 mr-n3 ">
      <CreateModule
              v-for="(item, index) in numberOfModule"
              :key="index"
              :module-s-i="moduleSI"
              :type-module="typeModule"
              :maturite-client="maturiteClient"
              :priorite-pole="prioritePole"
              :number-of-module="numberOfModule"
              @remove="removeModuleSI"
      />
      <div>
        <!--        <span class="button" @click="addModule"-->
        <span @click="">
              <font-awesome-icon icon="plus-circle"/> Ajouter un module</span
        >
      </div>
    </div>
  </div>
</template>
<script>
  import CreateModule from './CreateModule';
  import InitCreateProject from './InitCreateProject';

  export default {
    name: 'Initialisation',
    components: {
      CreateModule,
      InitCreateProject
    },
    props: {
      list_libelle_fiche_siclade: {},
      maturiteClient: {},
      moduleSI: {},
      numberOfModule: {},
      prioritePole: {},
      project: {},
      projects: {},
      removeModuleSI: {},
      typeModule: {}
    }
  };
</script>
<style scoped>
  .bg-grey {
    background-color: #e6dfdf85;
  }

  .arrondi {
    border-radius: 0 120px 0 120px / 0 50px 0 50px;
  }

  p-multiselect-label-container {
    height: 38px;
  }

  .p-multiselect-typeProject-token img {
    width: 20px;
    vertical-align: middle;
    margin-right: 0.5em;
  }

</style>