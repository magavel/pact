<template>
  <div class="container">
    <div class="card m-3">
      <div class="card-body">
        <ListProject />
      </div>
    </div>
    <div class="card m-3">
      <div class="card-body">
        <h3 class="card-title">
          Nouveau projet
        </h3>
        <CreateProjectForm />
      </div>
    </div>
  </div>
</template>

<script>
import CreateProjectForm from "@/components/projects/CreateProjectForm.vue";
import ListProject from "../components/projects/ListProject";

export default {
  components: {
    ListProject,
    CreateProjectForm
  },

  name: "BoardProject"
};
</script>

<style scoped></style>
