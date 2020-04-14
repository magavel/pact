<template>
  <div>
    Liste des projets
    <ul>
      <li v-for="projet in projects" :key="projet.id">
        {{ projects }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ListProject',
  computed:mapState( {
    projects: state=> state.projects.projects
  }),
  created() {
    this.$store.dispatch('projects/getAllProjects');
  },
};
</script>

<style scoped></style>
