<template>
    <div>
      <div>
        Modules <font-awesome-icon icon="exclamation-circle" />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="libelleModule">
            Libellé module
          </label>
          <input
            type="text"
            class="form-control"
            id="libelleModule"
            v-model="moduleSI.module_libelle"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="libelleFicheDeclic">
            Fiche(s) Déclic
          </label>
          <input
            type="text"
            class="form-control"
            id="libelleFicheDeclic"
            v-model="moduleSI.ficheDeclic"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="typeModedule">
                de module
              </label>
              <Dropdown
                v-model="moduleSI.module_type"
                :options="typeModule"
                optionLabel="value"
                id="typeModedule"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="libelleCourtModule">
                Libellé court <font-awesome-icon icon="exclamation-circle" />
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="PACT_NG_ML1"
                id="libelleCourtModule"
                v-model="moduleSI.module_libelle_court"
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="form-group col-md-4">
              <label for="maturiteClient">
                Maturité client
              </label>
              <Dropdown
                v-model="moduleSI.module_maturite_client"
                :options="maturiteClient"
                optionLabel="value"
                id="maturiteClient"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="priorisationClient">
                Priorisation client
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="?????"
                id="priorisationClient"
                v-model="moduleSI.module_priorisation_client"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="prioritePole">
                Priorité pôle
              </label><br>
              <Dropdown
                v-model="moduleSI.module_priorite_pole"
                :options="prioritePole"
                optionLabel="value"
                id="prioritePole"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="commentairePole">Commentaire du pôle </label>
            <textarea
              class="form-control"
              id="commentairePole"
              rows="5"
              v-model="moduleSI.module_commentaire_pole"
            ></textarea>
          </div>
        </div>
      </div>
<!--      <div><span class="button" @click="deleteModule" >Supprimer le module</span></div>-->
    </div>
</template>

<script>
export default {
  name: "CreateModule",
  props:  {
      moduleSI: {},
      typeModule: {},
      maturiteClient: {},
      prioritePole: {},
  },
  computed: {
    numberOfModule() {
      return this.numberOfModule;
    }
  },
  methods: {
    deleteModule() {
      this.numberOfModule-=1;
      console.log('ds le delete', this.numberOfModule);
    }
  },
};
</script>
<style scoped>
  .button {
    cursor:pointer;
  }
</style>
