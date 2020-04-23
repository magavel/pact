<template>
  <div>
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
        <div class="row">
          <label for="quartierFonctionnel">
            Date de mise en service souhaitée par le client
          </label>
          <Calendar v-model="besoins.dateMiseEnServiceSouhaite" :numberOfMonths="3"/>
          <label>
            Enjeux du projet iiiiii
          </label>
          <InputNumber v-model="value20" mode="decimal" showButtons :min="1" :max="4"/>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'Besoins',
    props: {
      besoins: {}
    }
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