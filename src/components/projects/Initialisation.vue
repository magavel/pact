<template>
  <div>
    <div>
      <InitCreateProject
              :list_libelle_fiche_siclade="list_libelle_fiche_siclade"
              :project="project"
              :projects="projects"
      />

    </div>
    <div class="bg-gris-module arrondi py-4 pl-4 pr-4 ml-n3 mr-n3 ">
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
        <span class="button" @click="addModule">
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
    methods: {
      addModule() {
        alert('ahh')
      }
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
<style lang="scss" scoped>

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
