<template>
  <div>
    <InitialisationProject />
  </div>
</template>

<script>
import InitialisationProject from './InitialisationProject.vue';
import Stepper from '../Stepper';

export default {
  components: {
    Stepper,
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
