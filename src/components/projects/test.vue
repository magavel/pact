<template>
  <form>

    <div>
      <div class="bg-light">
        Modules <font-awesome-icon icon="exclamation-circle" />
      </div>
      <div class="form-row">
        <div class="form-group col">
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
        <div class="form-group col">
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
        <div class="col">
          <div class="row">

            <div class="form-group col-md-6">
              <label for="typeModedule">
                Type de module
              </label>
              <Dropdown
                      v-model="moduleSI.typeModule"
                      :options="typeModule"
                      optionLabel="name"
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
                      v-model="moduleSI"
                      :options="maturiteClient"
                      optionLabel="name"
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
                      v-model="moduleSI.priorisationClient"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="prioritePole">
                Priorité pôle
              </label>
              <Dropdown
                      v-model="moduleSI.prioritePole"
                      :options="prioritePole"
                      optionLabel="name"
                      id="prioritePole"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="commentairePole">Commentaire du pôle </label>
            <textarea
                    class="form-control"
                    id="commentairePole"
                    rows="5"
                    v-model="moduleSI.commentaireModulePole"
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <font-awesome-icon icon="plus-circle" />  Ajouter un module
      </div>
    </div> <!-- fin module -->


  </form>
</template>

<script>
  export default {
    name: 'test'
  };
</script>

<style scoped>

</style>
