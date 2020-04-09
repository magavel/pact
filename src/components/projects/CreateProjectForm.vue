<template>
  <div>
    <Steps :model="items" :readonly="false" />
    <InitialisationProject />
  </div>
</template>

<script>
import InitialisationProject from './InitialisationProject.vue';

export default {
  components: {
    InitialisationProject,
  },
  data() {
    return {
      items: [
        {
          label: 'Initialisation',
          icone: '',
          to: '/steps',
        },
        {
          label: 'Besoins',
          icone: '',
          to: '/steps/seat',
        },
        {
          label: 'Equipe',
          icone: '',
          to: '/steps/payment',
        },
        {
          label: 'Planification',
          icone: '',
          to: '/steps/confirmation',
        },
      ],
    };
  },
};
</script>
