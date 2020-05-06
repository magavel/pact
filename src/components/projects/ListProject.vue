<template>
  <div>
    Liste des projets

    <DataTable :value="projects" :paginator="true" :rows="10">
      <template #header>
        <div>
         Liste des projets des CDAD
        </div>
      </template>
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
      <template #paginatorLeft>
        <Button type="button" icon="pi pi-refresh" />
      </template>
      <template #paginatorRight>
        <Button type="button" icon="pi pi-cloud" />
      </template>

      <template #footer>
        Il y a au totale:  {{projects ? projects.length : 0 }} projets.
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
        {field: 'vin', header: 'Vin'},
        {field: 'year', header: 'Year'},
        {field: 'brand', header: 'Brand'},
        {field: 'color', header: 'Color'}
      ],
    }
  },
  name: 'ListProject',
  computed:mapState( {
    projects: state=> state.projects.projects.systemeInformations,
  }),
  created() {
    this.$store.dispatch('projects/getAllProjects');
  },
};
</script>

<style scoped></style>
