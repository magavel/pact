<template>
  <div>
    <Stepper t :step="step" :steps="steps" />
    <form @submit.prevent="createProject">
      <div>
        <keep-alive>
          <Initialisation
            v-if="step === 1"
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

          <!-- debut de composant  -->
          <Besoins v-if="step === 2" :besoins="besoins" />
          <!-- fin de composant  -->
        </keep-alive>

        <div class="pt-3">
          <button
            v-if="step !== steps.length"
            @click.prevent="nextStep"
            class="btn rounded-pill btn-primary float-right"
          >
            Suivant
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
// import project from '../../store/modules/project';

import Stepper from "../Stepper";
import Initialisation from "./Initialisation";
import Besoins from "./Besoins";

export default {
  name: "InitialisationProject",
  components: { Besoins, Initialisation, Stepper },

  data() {
    return {
      besoins: {
        autoriteClient: null,
        beneficiaire: null,
        zoneFonctionnelle: null,
        quartierFonctionnel: null,
        descriptionProjet: null,
        dateMiseEnServiceSouhaite: null,
        enjeuxProjet: null,
        typeSI: null,
        commission: null,
        reseauxSupports: {},
        besoinsModules: {}
      },
      besoinModule: {
        infogerant: null,
        hebergement: null,
        niveauHebergement: null
      },
      niveauHergement: [
        { value: "Or" },
        { value: "Argent" },
        { value: "Bronze" }
      ],
      reseauSupport: [
        { value: "INTERNET" },
        { value: "INTRADEF" },
        { value: "INTRACED" }
      ],
      steps: [
        { value: "Initialisation", icon: "init" },
        { value: "Besoins", icon: "" },
        { value: "Equipe", icon: "people-fill" },
        { value: "Planification", icon: "plan" }
      ],
      step: 1,
      numberOfModule: 1,
      maturiteClient: [
        { value: "M1" },
        { value: "M2" },
        { value: "M3" },
        { value: "M4" },
        { value: "M5" }
      ],
      typeModule: [
        { value: "module de type 1" },
        { value: "module de type 2" },
        { value: "module de type 3" },
        { value: "module de type 4" },
        { value: "module de type 5" }
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
    nextStep() {
      this.step++;
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
      this.project.systeme_information_list_module.push(this.moduleSI);
      this.$store.dispatch("projects/createProject", this.project);
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
