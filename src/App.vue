<template>
  <div id="app">
    <nav class="navbar  navbar-expand-lg navbar-dark sticky-top flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0 bg-light text-dark" href="#">Pact-NG</a>
        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <ul class="navbar-nav px-3 ">
          <li class="nav-item text-primary ">
            <router-link to="/register" class="nav-link">
              <font-awesome-icon icon="user-plus" />Enregistrement
            </router-link>
          </li>
          <li class="nav-item text-primary">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt" />Connexion
            </router-link>
          </li>
          </ul>
        </div>
        <div v-if="currentUser" class="navbar-nav ml-auto">
          <ul class="navbar-nav px-3">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <font-awesome-icon icon="user" class="text-primary"/>
              <span class="text-primary">{{ currentUser.username }}</span>
            </router-link>
          </li>
          <li class="nav-item text-primary">
            <a class="nav-link" href @click.prevent="logOut">
             <span class="text-primary"><font-awesome-icon icon="sign-out-alt" />Deconnexion</span>
            </a>
          </li>
          </ul>
        </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-primary-variant sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/home" class="nav-link">
                  <font-awesome-icon icon="home" />Accueil
                </router-link>
              </li>
              <li v-if="showAdminBoard" class="nav-item ">
                <router-link to="/admin" class="nav-link">Tableau administrateur</router-link>
              </li>
              <li v-if="showModeratorBoard" class="nav-item">
                <router-link to="/mod" class="nav-link"> Board Pilote</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/user" class="nav-link text-white">Gestion des utilisateurs</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/activites" class="nav-link text-white">Activites</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/projects" class="nav-link text-white">Projets</router-link>
              </li>
            </ul>
            <h6 class=" text-white sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span class="text-white">Accès</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <div v-if="!currentUser" class="navbar-nav ml-auto">
              <ul class="navbar-nav px-3 ">
                <li class="nav-item ">
                  <router-link to="/register" class="nav-link">
                    <font-awesome-icon icon="user-plus" />Enregistrement
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/login" class="nav-link">
                    <font-awesome-icon icon="sign-in-alt" />Connexion
                  </router-link>
                </li>
              </ul>
            </div>
            <div v-if="currentUser" class="navbar-nav ml-auto">
              <ul class="navbar-nav px-3">
                <li class="nav-item">
                  <router-link to="/profile" class="nav-link">
                    <font-awesome-icon icon="user" />
                    {{ currentUser.username }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href @click.prevent="logOut">
                    <font-awesome-icon icon="sign-out-alt" />Deconnexion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>


    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
         <router-view />
    </main>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>

  <style lang="scss">
  @import "./assets/custom.scss";
  @import "../node_modules/bootstrap/scss/bootstrap.scss";

  body{
    background-color: #e8ebf0;
  }

  body #divCalendar .p-datepicker {
    border: none;
    background-color: #ffca7a;
    border-bottom-right-radius: 7em 5em;
  }

  body #divCalendar .p-datepicker .p-datepicker-header{
    background-color: #ffca7a;
  }

  .card{
    border: none;
  }

  body #charges .p-spinner .p-spinner-input{
    width: 70px;
  }

  body .dropdownWidth .p-dropdown{
    width: 90%;
  }

  .dropdownWidth textarea{
    width: 90%;
  }

  body #periode .p-inputtext{
    width: 100px;
    margin-top: 10%;
  }


</style>
