<template>
  <div>
    <form >
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
                  rows="7"
                  v-model="besoins.descriptionProjet"
          ></textarea>
        </div>
        <div class="form-group col-md-6">
          <div class="row mt-4 ml-4">
            <label for="dateMiseService">
              Date de mise en service souhaitée par le client
            </label>
            <Calendar id="dateMiseService" v-model="besoins.dateMiseEnServiceSouhaite" :numberOfMonths="1"/>
          </div>
            <div class="form-group row mt-4 ml-4">
              <label for="enjeuxProjet">
                Enjeux du projet
              </label> <br>
              <input
                      id="enjeuxProjet"
                      v-model="besoins.enjeuxProjet"
                      class="form-control"
              />
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
            <label for="reseauSupport">Réseaux support</label><br>
            <MultiSelect
                    id="reseauSupport"
                    v-model="besoins.typeSI"
                    :options="reseauSupport"
                    optionLabel="value"
            />
          </div>
        </div>
        <div class="bg-gris-module arrondi pb-3 mb-3">

          <InfogerenceModule v-for="systeme_information_module in systeme_information_modules" :key="systeme_information_module.module_Id"
                             :infogerence="infogerence"
                             :niveau-hebergement="niveauHebergement"
                             :systeme_information_module="systeme_information_module"
          />
        </div>


      </div>
      <div class="d-flex justify-content-between">

        <button
                @click.prevent="prevStep"
                class="btn rounded-pill btn-primary"
        >
          Revenir à l'étape précedente
        </button>

        <button
                @click.prevent="nextStep"
                class="btn rounded-pill btn-primary float-right"
        >
          Enregistrer et passer à l'étape suivant
        </button>
      </div>
    </form>
  </div>
</template>
<script>
  import InfogerenceModule from "./InfogerenceModule";

  export default {
    name: 'Besoins',
    components: {InfogerenceModule},
    props: ['projet'],
    methods: {
      updateProjet()
      {
        const {
          autoriteClient,
          beneficiaire,
          zoneFonctionnelle,
          quartierFonctionnel,
          descriptionProjet,
          dateMiseEnServiceSouhaite,
          enjeuxProjet,
        } = this.projet.data();
        this.projetClone = {
          id : this.projet.id,
          autoriteClient,
          beneficiaire,
          zoneFonctionnelle,
          quartierFonctionnel,
          descriptionProjet,
          dateMiseEnServiceSouhaite,
          enjeuxProjet,
        };
      },
      nextStep() {
        // TODO mettre a jour dans le store  le step
        this.$store.commit('projects/UPDATE_STEP', 3)
        this.$router.push({name: 'equipe'});
      },
      prevStep() {
        // TODO mettre a jour dans le store  le step
        this.$store.commit('projects/UPDATE_STEP', 1);
        this.$router.push('/projects');
      },
    },
    created() {
      console.log('created' );
      this.$store.dispatch('projects/getProjectById', 1);
    },
    computed: {
      projet() {
        return this.$store.state.projects.projet;
      }
    },
    data() {
      return {
        projetClone:{},
        systeme_information_modules: [
          {
            module_Id: 2,
            module_libelle: 'test projet module',
          },
          {
            module_Id: 4,
            module_libelle: 'Autre module encore',
          },
        ],
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
