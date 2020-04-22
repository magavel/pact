<template>
  <div>
    <Steps :model="items" :readonly="true" />
    <keep-alive>
<!--      <router-view :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete" />-->
    </keep-alive>

    <InitialisationProject />
  </div>
</template>

<script>
import InitialisationProject from './InitialisationProject.vue';


export default {
  components: {
    InitialisationProject,
  },
  methods: {
    // nextPage(event) {
    //   for (let field in event.formData) {
    //     this.formObject[field] = event.formData[field];
    //   }
    //
    //   this.$router.push(this.items[event.pageIndex + 1].to);
    // },
    // prevPage(event) {
    //   this.$router.push(this.items[event.pageIndex - 1].to);
    // },
    // complete() {
    //   this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
    // }
  },
  data() {
    return {
      items: [
        {
          label: 'Initialisation',
          icon: '',
          to: '/steps',
        },
        {
          label: 'Besoins',
          icon: '',
          to: '/steps/seat',
        },
        {
          label: 'Equipe',
          icon: '',
          to: '/steps/payment',
        },
        {
          label: 'Planification',
          icon: '',
          to: '/steps/confirmation',
        },
      ],
    };
  },
};
</script>
