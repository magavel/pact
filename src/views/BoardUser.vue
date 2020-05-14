<template>
  <div class="container">
    <div class="card m-3">
      <div class="card-body">
        <ListUser />
      </div>
    </div>
    <!--  <div class="card m-3">
        <div class="card-body">
          <h3>{{content}}</h3>
        </div>
      </div> -->
  </div>
</template>

<script>
import UserService from '../services/user.service';
import ListUser from "../components/administration/ListUser";

export default {
  name: 'User',
  components: {
    ListUser
  },
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content = (error.response && error.response.data)
          || error.message
          || error.toString();
      },
    );
  },
};
</script>
