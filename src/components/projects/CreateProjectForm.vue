<template>
  <div>

    <form @submit.prevent="createProject">
      <div>
          <Initialisation
            :list_libelle_fiche_siclade="list_libelle_fiche_siclade"
            :maturite-client="maturiteClient"
            :module-s-i="moduleSI"
            :number-of-module="numberOfModule"
            :priorite-pole="prioritePole"
            :project="project"
            :projects="projects"
            :remove-module-s-i="removeModuleSI"
            :type-module="typeModule"
          />
        <div class="pt-3">

          <button
            @click.prevent="nextStep"
            class="btn rounded-pill btn-primary float-right"
          >
            Passer à l'étape suivante
          </button>
          <button
                  @click.prevent="createProject"
                  class="btn rounded-pill btn-primary mr-3"
          >
            Enregistrer le projet
          </button>

        </div>
      </div>
    </form>
  </div>
</template>
<script>
// import project from '../../store/modules/project';
import Initialisation from "./Initialisation";
import Besoins from "./Besoins";
import projects from "../../store/modules/projects";

export default {
  name: "InitialisationProject",
  components: { Besoins, Initialisation },
  computed: {
    step() {
      return this.$store.state.projects.step;
    }
  },
  data() {
    return {
      steps: [
        { value: "Initialisation", icon: "init" },
        { value: "Besoins", icon: "" },
        { value: "Equipe", icon: "people-fill" },
        { value: "Planification", icon: "plan" }
      ],
      numberOfModule: 1,
      maturiteClient: [
        { value: "M1" },
        { value: "M2" },
        { value: "M3" },
        { value: "M4" },
        { value: "M5" }
      ],
      typeModule: [
        { value: '1'},
        { value: '2'},
        { value: '3' },
        { value: '4' },
        { value: '5' }
      ],
      prioritePole: [
        { value: "P1" },
        { value: "P2" },
        { value: "P3" },
        { value: "P4" },
        { value: "P5" }
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
        systeme_information_tag_projet: [],
        systeme_information_list_module: []
      },
      moduleSI: {
        module_libelle: "",
        module_libelle_court: "",
        module_type: "",
        module_maturite_client: {},
        module_priorisation_client: "",
        module_priorite_pole: {},
        module_commentaire_pole: ""
      }
    };
  },
  methods: {
    resetForm() {
      project: {}
    },
    enregistrementFicheProjet() {
      this.project.systeme_information_list_module.push(this.moduleSI);
      console.log('le projet', this.project);
      this.$store.dispatch("projects/createProject", this.project);
    },
    majStep(){
      this.$store.commit('projects/UPDATE_STEP', 1)
    },
    nextStep() {
        this.$router.push({name: 'besoins',  params: { project: this.project} })
    },
    addModule() {
      console.log("ds addModule");
      this.numberOfModule += 1;
      console.log(this.numberOfModule);
    },
    removeModuleSI() {
      console.log("ds le remove");
    },
    createProject() {
      this.enregistrementFicheProjet();
      this.resetForm();
      this.$router.push({name: ''})
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
