<template>
  <div class="container">
    <div class="card m-3">
      <div class="card-body">
        <ListUser />
      </div>
    </div>
     <div class="card m-3" ref="CreateUser">
        <div class="card-body">
          <CreateUser />
        </div>
      </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import ListUser from "../components/administration/ListUser";
import CreateUser from "../components/administration/CreateUser";

export default {
  name: 'User',
  components: {
    ListUser,
    CreateUser
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
