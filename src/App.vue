<template>
  <div id="app">
    <nav class="navbar  navbar-expand-lg navbar-dark sticky-top flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0 bg-light text-dark" href="#">Pact-NG</a>
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
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/home" class="nav-link">
                  <font-awesome-icon icon="home" />Accueil
                </router-link>
              </li>
              <li v-if="showAdminBoard" class="nav-item">
                <router-link to="/admin" class="nav-link">Tableau administrateur</router-link>
              </li>
              <li v-if="showModeratorBoard" class="nav-item">
                <router-link to="/mod" class="nav-link"> Board Pilote</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/user" class="nav-link">Gestion des utilisateurs</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/activites" class="nav-link">Activites</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/projects" class="nav-link">Projets</router-link>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Accès</span>
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

<style>
  body{
    background-color: #e8ebf0;
  }

  body .p-datepicker {
    border: none;
    background-color: #ffca7a;
    border-bottom-right-radius: 7em 5em;
  }

  body .p-datepicker .p-datepicker-header{
    background-color: #ffca7a;
  }

  .card{
    border: none;
  }

  .p-datatable.p-datatable-customers {
    .p-datatable-header {
      border: 0 none;
      padding: 12px;
      text-align: left;
      font-size: 20px;
    }

    .p-paginator {
      border: 0 none;
      padding: 1em;
    }

    .p-datatable-thead > tr > th {
      border: 0 none;
      text-align: left;
    }

    .p-datatable-tbody > tr > td {
      border: 0 none;
      cursor: auto;
    }
  }
</style>
