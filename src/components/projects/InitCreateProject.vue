<template>
  <div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="longTitle">
          Libellé fiche projet
        </label>
        <input
          type="text"
          class="form-control"
          id="longTitle"
          placeholder="P@ct-NG"
          v-model="project.systeme_information_libelle"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="shortTitle">
          Libellé court
          <font-awesome-icon icon="exclamation-circle" />
        </label>
        <input
          type="text"
          class="form-control"
          id="shortTitle"
          placeholder="PROJET_1"
          v-model="project.systeme_information_libelle_court"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label for="projetSprecifique"
          >Projet spécifique
          <font-awesome-icon icon="exclamation-circle" /> </label
        ><br />
        <MultiSelect
          v-model="project.systeme_information_tag_projet"
          :options="projects"
          id="projetSprecifique"
          optionLabel="type"
          placeholder="Sélectionner un type de projet"
          optionDisabled="true"
        >
          <template #value="slotProps">
            <div
              class="p-multiselect-typeProject-token"
              v-for="option of slotProps.value"
              :key="option.value"
            >
              <span>
                {{ option.value }}
              </span>
            </div>
            <div
              class="p-multiselect-empty-typeProject-token"
              v-if="!slotProps.value || slotProps.value.length === 0"
            >
              Sélectionner un tag
            </div>
          </template>
        </MultiSelect>
      </div>
      <div class="form-group col">
        <label for="ficheSiclade">
          Fiche(s) Siclade
          <font-awesome-icon icon="exclamation-circle" /> </label
        ><br />
        <MultiSelect
          id="ficheSiclade"
          v-model="project.systeme_information_libelle_fiche_siclade"
          :options="list_libelle_fiche_siclade"
          optionLabel="value"
          placeholder="Choisir une fiche siclade"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CreateModule from "./CreateModule";
export default {
  name: "InitCreateProject",
  components: { CreateModule },
  props: {
    list_libelle_fiche_siclade: {},
    project: {},
    projects: {}
  }
};
</script>
<style scoped>
p-multiselect-label-container {
  height: 38px;
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
  margin-right: 0.5em;
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
