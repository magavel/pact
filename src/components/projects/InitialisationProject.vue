<template>
  <form @submit.prevent="createProject">
    <div class="form-group">
      <label for="longTitle">Libellé fiche projet</label>
      <input
              type="text"
              class="form-control"
              id="longTitle"
              placeholder="P@ct-NG"
              v-model="project.longTitle"
      />
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="ficheSiclade">
          Fiche(s) Siclade <i class="pi pi-exclamation-circle" style="fontSize: 1.5em"></i>
        </label>
        <input
                type="text"
                class="form-control"
                id="ficheSiclade"
                placeholder="????"
                v-model="project.siclade"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="shortTitle">Libellé court</label>
        <input
                type="text"
                class="form-control"
                id="shortTitle"
                placeholder="PROJET_1"
                v-model="project.shortTitle"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="zoneFonctionnelle">Zone(s) fonctionnelle(s)</label>
        <input
                type="text"
                class="form-control"
                id="zoneFonctionnelle"
                placeholder="????"
                v-model="project.zoneFonctionnelle"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="quartierFonctionnel">Quartier(s) fonctionnel(s)</label>
        <input
                type="text"
                class="form-control"
                id="quartierFonctionnel"
                placeholder="????"
                v-model="project.quartierFonctionnel"
        />
      </div>
      <div class="form-group">
        <label
                class="mr-3"
                for="longTitle"
        >Projet spécifique
          <i class="pi pi-exclamation-circle" style="fontSize: 1.5em"> </i>
        </label>
        <MultiSelect
                v-model="typeProjetInput"
                :options="projects"
                optionLabel="type"
                placeholder="Sélectionner un type de projet"
                optionDisabled="true"
        >
          <template #value="slotProps">
            <div
                    class="p-multiselect-typeProject-token"
                    v-for="option of slotProps.value" :key="option.value">
              <span>{{option.value}}</span>
            </div>
            <div
                    class="p-multiselect-empty-typeProject-token"
                    v-if="!slotProps.value || slotProps.value.length === 0">
              Sélectionner un tag
            </div>
          </template>
        </MultiSelect>
      </div>
    </div>
    <button type="submit" class="btn btn-primary float-right">Suivant</button>
  </form>
</template>
<script>
export default {
  methods: {
    createProject() {
      console.log('dans la methode', this.project);
      this.$store.dispatch('createProject', this.project);
    },
  },
  data() {
    return {
      typeProjetInput: null,
      projects: [
        { type: 'PMV', value: 'PMV' },
        { type: 'Fab Num', value: 'Fab Num' },
        { type: 'POC', value: 'POC' },
        { type: 'Interne', value: 'Interne' },
      ],
    };
  },
  name: 'InitialisationProject',
  props: {
    project: {},
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
