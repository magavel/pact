<template>
  <div class="container">
    <div class="card m-3">
      <div class="card-body">
        <ListControleUser />
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import ListControleUser from "../components/Controle/ListControleUser";

export default {
  name: 'BoardControleSaisieUser',
  components: {
      ListControleUser,
  },
  data() {
    return {
      content: '',
    };
  },
};
</script>
