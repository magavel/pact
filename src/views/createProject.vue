<template>
  <div class="row">
    <h3>
      Nouveau projet
     </h3>
    <div class="container">
        <CreateProjectForm />
    </div>
  </div>
</template>

<script>
import CreateProjectForm from '@/components/projects/CreateProjectForm.vue';

export default {
  components: {
    CreateProjectForm,
  },

  name: 'ProjectCreate',
};
</script>

<style scoped></style>
