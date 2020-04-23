<template>
  <div>
    numéro de step: {{ step }}
    <ul class="d-flex justify-content-around">
      <li class="trait" v-for="(item, index) in steps" :key="index">
        {{ item.icon }} {{ item.value }}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "Stepper",
    props: {
      step: {},
      steps: []
    }
  };
</script>
<style scoped lang="scss">

</style>
