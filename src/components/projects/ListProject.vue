<template>
  <div>
    Liste des projets

    <DataTable :value="projects" :paginator="true" :rows="10" selectionMode="single"  dataKey="systeme_information_id" :reorderableColumns="true" >
      <template #loading>
        Loading records, please wait...
      </template>
      <template #header class="mb-4">
         Liste de vos fiches projets
          <div class="p-datatable-globalfilter-container">
            <InputText v-model="filters['global']" placeholder="Recherche globale" />
          </div>
      </template>
      <Column field="systeme_information_libelle_court" header="Projets" :sortable="true" filterMatchMode="gte"></Column>
      <Column field="systeme_information_nombre_modules" header="Nbre de modules" :sortable="true" filterMatchMode="gte"></Column>
      <Column field="systeme_information_etatDuSi" header="Statut de la fiche" :sortable="true" filterMatchMode="gte"></Column>
      <Column field="systeme_information_niveau_completion" header="Niveau de complétion" :sortable="true" filterMatchMode="gte">
        <template #body="slotProps">
          <ProgressBar :value="slotProps.data.systeme_information_niveau_completion * 100" :showValue="false" />
        </template>
      </Column>

      <Column field="systeme_information_dispo_saisie" header="Disponible à la saisie des activités" :sortable="true" filterMatchMode="gte"></Column>
      <Column field="systeme_information_created_date" header="Créé le" :sortable="true" filterMatchMode="gte"></Column>
      <Column field="systeme_information_last_modified_date" header="Dernière modification">
        <template #body="slotProps">
            {{slotProps.data.systeme_information_last_modified_date}} par {{ slotProps.data.systeme_information_last_modified_by}}
        </template>
      </Column>
      <Column field="" header="Actions"></Column>
      <template #footer>
        <span v-if="projects.length ===1 ">Il y a au totale:  {{projects ? projects.length : 0 }} projet.</span>
        <span v-if="projects.length >1 ">Il y a au totale:  {{projects ? projects.length : 0 }} projets.</span>
      </template>

    </DataTable>
    <ul>
      <li v-for="projet in projects" :key="projet.id">
        {{ projet }}
      </li>
    </ul>
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
};
</script>

<style lang="scss" scoped>
  .customer-badge {
    border-radius: 2px;
    padding: .25em .5em;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;

    &.status-qualified {
      background-color: #C8E6C9;
      color: #256029;
    }

    &.status-unqualified {
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
      font-size: 20px;
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

</style>
