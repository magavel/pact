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
        <Stepper :step="step"/>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import ListProject from "../components/projects/ListProject";
  import Stepper from "./Stepper";

  export default {
  computed: {
    step() {
      return 1;
    }
  },
  components: {
    Stepper,
    ListProject
  },

  name: "BoardProject"
};
</script>

