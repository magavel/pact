<template>
  <div>
    <DataTable ref="dt" :value="projects" :paginator="true" :rows="10" selectionMode="single"  dataKey="systeme_information_id" :reorderableColumns="true" >
      <template #loading>
        Loading records, please wait...
      </template>
      <template #header>
         Liste de vos fiches projets
          <div class="p-datatable-globalfilter-container mt-n2">
            <InputText v-model="filters['global']" placeholder="Recherche globale" />
          </div>
      </template>
      <Column field="systeme_information_libelle_court" header="Projets" :sortable="true" filterMatchMode="gte"></Column>
      <Column field="systeme_information_nombre_modules" header="Nbre de modules" :sortable="true" filterMatchMode="gte"></Column>
      <Column field="systeme_information_etatDuSi" header="Statut de la fiche" :sortable="true" filterMatchMode="gte">
        <template #body="slotProps">
          <span :class="'statut-fiche status-' + slotProps.data.systeme_information_etatDuSi">{{slotProps.data.systeme_information_etatDuSi}}</span>
        </template>
      </Column>
      <Column field="systeme_information_niveau_completion" header="Niveau de complétion" :sortable="true" filterMatchMode="gte">
        <template #body="slotProps">
          <ProgressBar :value="slotProps.data.systeme_information_niveau_completion * 100" :showValue="false" />
        </template>
      </Column>
      <Column field="systeme_information_dispo_saisie" header="Disponible à la saisie des activités" :sortable="true" filterMatchMode="gte">
        <template #body="slotProps">
          <span v-if="slotProps.data.systeme_information_dispo_saisie">Oui</span>
          <span v-else>Non</span>
        </template>
      </Column>
      <Column field="systeme_information_created_date" header="Créé le" :sortable="true"  filterMatchMode="custom" :filterFunction="filterDate">
        <template #filter>
          <Calendar v-model="filters['systeme_information_created_date']" dateFormat="dd-mm-yy" class="p-column-filter" placeholder="Création"/>
        </template>
        <template #body="slotProps">
          {{moment(slotProps.data.systeme_information_created_date).format('DD/MM/YYYY')}}
        </template>
      </Column>
      <Column field="systeme_information_last_modified_date" header="Dernière modification">
        <template #body="slotProps">
            le {{moment(slotProps.data.systeme_information_last_modified_date).format('DD/MM/YYYY')}} par {{ slotProps.data.systeme_information_last_modified_by}}
        </template>
      </Column>
      <Column field="" header="Actions">
        <template #body="slotProps">
          <div class="d-flex flex-nowrap">
            <Button type="button" icon="pi pi-upload" class="p-button-secondary" @click="upload(slotProps.data.systeme_information_id)"></Button>
            <Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
            <Button type="button" icon="pi pi-briefcase" class="p-button-secondary" @click="exportCSV($event)" ></Button>
          </div>
        </template>
      </Column>
      <template #footer>
        <span v-if="projects.length ===0 ">Il n'y a pas de projet.</span>
        <span v-if="projects.length ===1 ">Il y a au totale:  {{projects ? projects.length : 0 }} projet.</span>
        <span v-if="projects.length >1 ">Il y a au totale:  {{projects ? projects.length : 0 }} projets.</span>
      </template>

    </DataTable>

<!--        {{ projects }}-->

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      filters: {},
      columns: [
        {field: 'systeme_information_libelle_court', header: 'Projets'},
        {field: 'systeme_information_nombre_modules', header: 'Nbre de modules'},
        {field: 'systeme_information_etatDuSi', header: 'Statut de la fiche'},
        {field: 'systeme_information_niveau_completion', header: 'Niveau de complétion'},
        {field: 'systeme_information_dispo_saisie', header: 'Disponible à la saisie des activité'},
        {field: 'systeme_information_created_date', header: 'Créé le'},
        {field: 'systeme_information_last_modified_by', header: 'Auteur de la dernière modification'},
        {field: 'systeme_information_last_modified_date', header: 'Dernière modification'},
        {field: 'niveau', header: 'Actions'},
      ],
    }
  },
  name: 'ListProject',
  computed:mapState( {
    projects: state=> state.projects.projects,
  }),
  created() {
    this.$store.dispatch('projects/getAllProjects');
  },
  methods: {
    filterDate(value, filter) {
      if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return value === this.formatDate(filter);
    },
    formatDate(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      return day + '-'+ month + '-' + date.getFullYear();
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    upload(id) {
      console.log('ds upload', id);

    }
  },
};
</script>

<style lang="scss" scoped>
  .statut-fiche {
    border-radius: 2px;
    padding: .25em .5em;
    //text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: .2px;
    &.status-Initialisation {
      background-color: #C8E6C9;
      color: #256029;
    }
    &.status-Besoins {
      background-color: #FFCDD2;
      color: #C63737;
    }
    &.status-negotiation {
      background-color: #FEEDAF;
      color: #8A5340;
    }
    &.status-new {
      background-color: #B3E5FC;
      color: #23547B;
    }
    &.status-renewal {
      background-color: #ECCFFF;
      color: #694382;
    }
    &.status-proposal {
      background-color: #FFD8B2;
      color: #805B36;
    }
  }

  .p-multiselect-representative-option {
    display: inline-block;
    vertical-align: middle;

    img {
      vertical-align: middle;
      width: 24px;
    }

    span {
      margin-top: .125em;
    }
  }

  /deep/ .p-paginator {
    .p-dropdown {
      float: left;
    }

    .p-paginator-current {
      float: right;
    }
  }

  /deep/ .p-progressbar {
    height: 8px;
    background-color: #D8DADC;

    .p-progressbar-value {
      background-color: #00ACAD;
    }
  }

  /deep/ .p-column-filter {
    display: block;

    input {
      width: 100%;
    }
  }

  .p-datatable-globalfilter-container {
    float: right;

    input {
      width: 200px;
    }
  }

  /deep/ .p-datepicker {
    min-width: 25em;

    td {
      font-weight: 400;
    }
  }

  /deep/ .p-datatable.p-datatable-customers {
    .p-datatable-header {
      border: 0 none;
      padding: 12px;
      text-align: left;
      font-size: 10px;
    }

    .p-paginator {
      border: 0 none;
      padding: 1em;
    }

    .p-datatable-thead > tr > th {
      border: 0 none;
      text-align: left;

      &.p-filter-column {
        border-top: 1px solid #c8c8c8;
      }
    }
    p-column-title {
      font-size: 10px;
    }

    .p-datatable-tbody > tr > td {
      border: 0 none;
      cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
      text-transform: uppercase;
    }
  }

  /* Responsive */
  .p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
    display: none;
  }

  @media screen and (max-width: 64em) {
    /deep/ .p-datatable {
      &.p-datatable-customers {
        .p-datatable-thead > tr > th,
        .p-datatable-tfoot > tr > td {
          display: none !important;
        }

        .p-datatable-tbody > tr > td {
          text-align: left;
          display: block;
          border: 0 none !important;
          width: 100% !important;
          float: left;
          clear: left;

          .p-column-title {
            padding: .4em;
            min-width: 30%;
            display: inline-block;
            margin: -.4em 1em -.4em -.4em;
            font-weight: bold;
          }
        }
      }
    }
  }
  p-datatable-header{
    height: 50px;
  }

</style>
