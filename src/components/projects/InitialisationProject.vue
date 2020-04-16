<template>
  <form @submit.prevent="createProject">
    <div class="form-row">
      <div class="form-group col">
        <label for="longTitle">
          Libellé fiche projet
        </label>
        <input
                type="text"
                class="form-control"
                id="longTitle"
                placeholder="P@ct-NG"
                v-model="project.libelle_systeme_information"
        />
      </div>
      <div class="form-group col">
        <label for="shortTitle">
          Libellé court <i class="pi pi-exclamation-circle"> </i>
        </label>
        <input
                type="text"
                class="form-control"
                id="shortTitle"
                placeholder="PROJET_1"
                v-model="project.libelle_court_systeme_information"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col">
          <label
                  for=""
          >Projet spécifique
            <i class="pi pi-exclamation-circle"> </i>
          </label>
          <MultiSelect
                  v-model="project.tag_projet"
                  :options="projects"
                  optionLabel="type"
                  placeholder="Sélectionner un type de projet"
                  optionDisabled="true"
          >
            <template #value="slotProps">
              <div
                      class="p-multiselect-typeProject-token"
                      v-for="option of slotProps.value" :key="option.value">
                <span>
                  {{option.value}}
                  <i class="pi pi-times"></i>
                </span>
              </div>
              <div
                      class="p-multiselect-empty-typeProject-token"
                      v-if="!slotProps.value || slotProps.value.length === 0">
                Sélectionner un tag
              </div>
            </template>
          </MultiSelect>
        </div>
      <div class="form-group col">
        <label for="ficheSiclade">
          Fiche(s) Siclade <i class="pi pi-exclamation-circle"></i>
        </label>
        <input
                type="text"
                class="form-control"
                id="ficheSiclade"
                placeholder="????"
                v-model="project.libelle_fiche_siclade"
        />
      </div>
    </div>
    <div>
      <div class="bg-light">
        Modules <i class="pi pi-exclamation-circle"></i>
      </div>
      <div class="form-row">

        <div class="form-group col">
          <label for="libelleModule">
            Libellé modules
          </label>
          <input
                  type="text"
                  class="form-control"
                  id="libelleModule"
                  v-model="project.libelle_module"
          />
        </div>
        <div class="form-group col">
          <label for="libelleFicheDeclic">
            Fiche(s) Déclic
          </label>
          <input
                  type="text"
                  class="form-control"
                  id="libelleFicheDeclic"
                  v-model="project.libelle_module"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="typeModedule">
            Type de module
          </label>
          <input
                  type="text"
                  class="form-control"
                  id="typeModedule"
                  v-model="project.type_module"
          />
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary float-right">Suivant</button>
  </form>
</template>
<script>
// import project from '../../store/modules/project';

export default {
  name: 'InitialisationProject',
  data() {
    return {
      typeProjects: [
        'PMV',
        'Fab num',
        'POC',
        'Autre',
      ],
      projects: [
        { type: 'PMV', value: 'PMV' },
        { type: 'Fab Num', value: 'Fab Num' },
        { type: 'POC', value: 'POC' },
        { type: 'Interne', value: 'Interne' },
      ],
      project: {
        libelle_systeme_information: '',
        libelle_fiche_siclade: '',
        libelle_court_systeme_information: '',
        tag_projet: [],
      },
    };
  },
  methods: {
    createProject() {
      console.log('project', this.project);
      this.$store.dispatch('projects/createProject', this.project);
    },
  },
};
</script>
<style scoped>
  .p-multiselect-car-option {
    display: inline-block;
    vertical-align: middle;
    span {
      margin-top: .125em;
    }
  }

  .p-multiselect-typeProject-token,
  .p-multiselect-empty-typeProject-token {
    padding: 2px 4px;
    margin: 0 0.286em 0 0;
    display: inline-block;
    vertical-align: middle;
    height: 1.857em;
    border-radius: 3px;
  }

  .p-multiselect-typeProject-token img {
    width: 20px;
    vertical-align: middle;
    margin-right: .5em
  }

  .p-multiselect-typeProject-token {
    background: #007ad9;
    color: #ffffff;
  }

  .p-multiselect-empty-typeProject-token {
    background: #d95f00;
    color: #ffffff;
  }
</style>
