<template>
  <div class="container">
  <!--  <header class="jumbotron">
      <h3>
        <div class="text-center">Profile</div>
      </h3>
    </header>
    <strong>Login : </strong>  <strong>{{currentUser.username}}</strong>
   <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> -->
    <div class="row">
      <div class="col-md-12 text-center"> Mon profile PactNG</div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <form>
          <div class="form-group row">
            <label for="username" class="col-4 col-form-label">Login</label>
            <div class="col-8">
              {{currentUser.username}}
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-4 col-form-label">Prenom</label>
            <div class="col-8">
              <input id="name" name="name" placeholder="First Name" class="form-control here" type="text" v-model="user.utilisateur_prenom">
            </div>
          </div>
          <div class="form-group row">
            <label for="lastname" class="col-4 col-form-label">Nom</label>
            <div class="col-8">
              <input id="lastname" name="lastname" placeholder="Last Name" class="form-control here" type="text" v-model="user.utilisateur_nom">
            </div>
          </div>

          <div class="form-group row">
            <label for="email" class="col-4 col-form-label">Adresse mail</label>
            <div class="col-8">
              <input id="email" name="email" placeholder="Email" class="form-control here" required="required" type="text" v-model="user.utilisateur_email">
            </div>
          </div>
          <div class="form-group row">
            <label for="abreviation" class="col-4 col-form-label">Abreviation</label>
            <div class="col-8">
              <input id="abreviation" name="email" placeholder="Abreviation" class="form-control here" required="required" type="text" v-model="user.utilisateur_abreviation">
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-4 col-8">
              <button name="submit" type="submit" class="btn btn-primary" disabled="">mettre à jour mon profile</button>
            </div>
          </div>

        </form>
      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Profile',
  computed: mapState( {
    user: state=> state.users.user,
    refgrade: state=> state.references.refGrade,
    loading: false,
    currentUser() {
      return this.$store.state.auth.user;
    },
  }),
  created() {
    this.$store.dispatch('references/getRefGrade')
    this.$store.dispatch('users/getUserById',this.currentUser.username);
    //this.refGradeUser = this.user.utilisateur_grade;
  },
  data() {
    return {
      refGradeUser: null,
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {

  }
};
</script>
