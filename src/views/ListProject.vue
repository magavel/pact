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
export default {
  name: 'ListProject',
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  created() {
    this.$store.dispatch('getAllProjects');
  },
};
</script>

<style scoped></style>
