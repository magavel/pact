<template>
  <div>
    <form @submit.prevent="createProject">
      <InitCreateProject
        :list_libelle_fiche_siclade="list_libelle_fiche_siclade"
        :project="project"
        :projects="projects"
      />
      <CreateModule
        v-for="(item, index) in numberOfModule"
        :key= "index"
        :module-s-i="modulesSI"
        :type-module="typeModule"
        :maturite-client="maturiteClient"
        :priorite-pole="prioritePole"
        :number-of-module="numberOfModule"
        @remove="removeModuleSI"
      />
      <div>
        <span class="button" @click="addModule"
          ><font-awesome-icon icon="plus-circle" /> Ajouter un module</span
        >
      </div>
      <button type="submit" class="btn btn-primary float-right">Suivant</button>
    </form>
  </div>
</template>
<script>
// import project from '../../store/modules/project';

import CreateModule from "./CreateModule";
import InitCreateProject from "./InitCreateProject";

export default {
  name: "InitialisationProject",
  components: { InitCreateProject, CreateModule },
  data() {
    return {
      numberOfModule: 1,
      maturiteClient: [
        { name: "M1" },
        { name: "M2" },
        { name: "M3" },
        { name: "M4" },
        { name: "M5" }
      ],
      typeModule: [
        { name: "module de type 1" },
        { name: "module de type 2" },
        { name: "module de type 3" },
        { name: "module de type 4" },
        { name: "module de type 5" }
      ],
      prioritePole: [
        { name: "P1" },
        { name: "P2" },
        { name: "P3" },
        { name: "P4" },
        { name: "P5" }
      ],
      projects: [
        { type: "PMV", value: "PMV" },
        { type: "Fab Num", value: "Fab Num" },
        { type: "POC", value: "POC" },
        { type: "Interne", value: "Interne" }
      ],
      list_libelle_fiche_siclade: [
        { value: "SERENA" },
        { value: "SERENA2" },
        { value: "SERENA3" },
        { value: "SERENA4" }
      ],
      project: {
        systeme_information_libelle: "",
        systeme_information_libelle_fiche_siclade: [],
        systeme_information_libelle_court: "",
        systeme_information_tag_projet: []
      },
      modulesSI: [],
      moduleSI: {
        module_libelle: { type: String },
        module_libelle_court: { type: String },
        module_type: { type: Number },
        module_maturite_client: {},
        module_priorisation_client: { type: String },
        module_priorite_pole: {},
        module_commentaire_pole: { type: String }
      }
    };
  },
  methods: {
    addModule() {
      console.log("ds addModule");
      this.numberOfModule += 1;
      console.log(this.numberOfModule);
    },
    removeModuleSI() {
      console.log('ds le remove');
    },
    createProject() {
      console.log("moduleSI", this.moduleSI);
      this.modulesSI.push(this.moduleSI)
      console.log("modulesSI", this.modulesSI);
      //this.$store.dispatch("projects/createProject", this.project);
    }
  }
};
</script>
<style scoped>
.button {
  cursor: pointer;
}
p-multiselect-label-container {
  height: 38px;
}
.p-multiselect-car-option {
  display: inline-block;
  vertical-align: middle;
  span {
    margin-top: 0.125em;
  }
}

.p-multiselect-typeProject-token img {
  width: 20px;
  vertical-align: middle;
  margin-right: 0.5em;
}

.p-dropdown {
  width: 12em;
}
</style>
