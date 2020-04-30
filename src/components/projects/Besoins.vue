<template>
  <div>
    <form action="">
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="authoriteClient">
          Authorité client
        </label>
        <input
                type="text"
                class="form-control"
                id="authoriteClient"
                placeholder="?????"
                v-model="besoins.autoriteClient"

        />
      </div>
      <div class="form-group col-md-6">
        <label for="beneficiaire">
          Bénéficiaire(s)
        </label>
        <input
                type="text"
                class="form-control"
                id="beneficiaire"
                placeholder="?????"
                v-model="besoins.beneficiaire"

        />
      </div>
    </div>


    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="zoneFonctionnelle">
          Zone(s) fonctionnelle(s)
        </label>
        <input
                type="text"
                class="form-control"
                id="zoneFonctionnelle"
                placeholder="?????"
                v-model="besoins.zoneFonctionnelle"

        />
      </div>
      <div class="form-group col-md-6">
        <label for="quartierFonctionnel">
          Quartier(s) fonctionnel(s)
        </label>
        <input
                type="text"
                class="form-control"
                id="quartierFonctionnel"
                placeholder="?????"
                v-model="besoins.quartierFonctionnel"

        />
      </div>
    </div>


    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="descriptionProjet">
          Description du projet
        </label>
        <textarea
                class="form-control"
                id="descriptionProjet"
                rows="5"
                v-model="besoins.descriptionProjet"
        ></textarea>
      </div>
      <div class="form-group col-md-6">
        <div class="row mt-4 ml-4">
          <label for="dateMiseService">
            Date de mise en service souhaitée par le client
          </label>
          <Calendar id="dateMiseService" v-model="besoins.dateMiseEnServiceSouhaite" :numberOfMonths="1"/>
          <div class="col">
            <label>
              Enjeux du projet
            </label>
            <InputNumber v-model="besoins.enjeuxProjet" mode="decimal" showButtons :min="1" :max="4"/>
          </div>
        </div>

      </div>
    </div>
    <div class="mt-5">

        <h5>Prérequis techniques</h5>


      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="typeSI">Type de SI</label> <br>
          <MultiSelect
                  id="typeSI"
                  v-model="besoins.typeSI"
                  :options="typeSI"
                  optionLabel="value"
          />
        </div>

        <div class="col-md-4">
          <label for="commission">Commission</label><br>
          <MultiSelect
                  id="commission"
                  v-model="besoins.commissions"
                  :options="value"
                  optionLabel="value"
          />
        </div>

        <div class="col-md-4">
          <label for="typeSI">Réseaux support</label><br>
          <MultiSelect
                  id="typeSI"
                  v-model="besoins.typeSI"
                  :options="reseauSupport"
                  optionLabel="value"
          />
        </div>
      </div>

      <h5>Nom du module a fournir...</h5>

      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="infoGerant">Infogérant</label> <br>
          <input
                  type="text"
                  class="form-control"
                  id="infoGerant"
                  v-model="infogerence.infogerant"

          />
        </div>

        <div class="col-md-4">
          <label for="hebergement">Hébergement</label><br>
          <input
                  type="text"
                  class="form-control"
                  id="hebergement"
                  v-model="infogerence.hebergement"

          />
        </div>

        <div class="col-md-4">
          <label for="niveauHerbergement">Niveau d'hébergement</label><br>
          <MultiSelect
                  id="niveauHerbergement"
                  v-model="infogerence.niveauHebergement"
                  :options="niveauHebergement"
                  optionLabel="value"
          />
        </div>
      </div>


    </div>

      <button
              @click.prevent=""
              class="btn rounded-pill btn-primary float-right"
      >
        Passer à l'étape suivant
      </button>

    </form>

  </div>
</template>
<script>
  export default {
    name: 'Besoins',
    data() {
      return {
        infoGerencesTableaux: [],
        infogerence: {
          infogerant: '',
          hebergement: '',
          niveauHebergement: []
        },
        besoins: {
          autoriteClient: null,
          beneficiaire: null,
          zoneFonctionnelle: null,
          quartierFonctionnel: null,
          descriptionProjet: null,
          dateMiseEnServiceSouhaite: null,
          enjeuxProjet: null,
          typeSI: null,
          commissions: [],
          reseauxSupports: {},
          besoinsModules: []
        },
        typeSI: [
          { value: "SIAG" },
          { value: "SIOC" },
          { value: "SIST" }
        ],
        commissions: [
          { value: "Commision untel" },
          { value: "Commision bidule" },
          { value: "Commision truc" }
        ],
        besoinModule: {
          infogerant: null,
          hebergement: null,
          niveauHebergement: null
        },
        niveauHebergement: [
          { value: "Or" },
          { value: "Argent" },
          { value: "Bronze" }
        ],
        reseauSupport: [
          { value: "INTERNET" },
          { value: "INTRADEF" },
          { value: "INTRACED" }
        ],
      }
    },
  };
</script>
<style scoped>
  p-multiselect-label-container {
    height: 38px;
  }

  .p-multiselect-typeProject-token img {
    width: 20px;
    vertical-align: middle;
    margin-right: 0.5em;
  }

</style>
