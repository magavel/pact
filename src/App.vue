<template>
  <div id="app">
    <nav class="navbar  navbar-expand-lg navbar-dark sticky-top flex-md-nowrap p-0">
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
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                <router-link to="/profile" class="dropdown-item">
                  <font-awesome-icon icon="user" />
                  Profile
                </router-link>
                <router-link to="/profile" class="dropdown-item">
                  <font-awesome-icon icon="user" />
                  Changer son mot de passe
                </router-link>

                <a class="dropdown-item" href @click.prevent="logOut">
                  <font-awesome-icon icon="sign-out-alt" />Deconnexion
                </a>
              </div>
            </div>
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
                <router-link v-if="currentUser" to="/home" class="nav-link">
                  <font-awesome-icon icon="chalkboard" /> Rapport
                </router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/activites" class="nav-link">
                  <font-awesome-icon icon="pencil-alt" /> saisie
                </router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/projects" class="nav-link">
                  <font-awesome-icon icon="pencil-alt" /> Projets
                </router-link>
              </li>
              <li v-if="currentUser" class="nav-item">
                <router-link to="/admin" class="nav-link">
                  <font-awesome-icon icon="cogs" /> Administration</router-link>
              </li>
              <li v-if="showModeratorBoard" class="nav-item">
                <router-link to="/mod" class="nav-link"> Board Pilote</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="currentUser" to="/user" class="nav-link">
                  <font-awesome-icon  icon="user-friends" /> Gestion des utilisateurs</router-link>
              </li>
            </ul>


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
    background-color: $background;
    & a {
      font-weight: bold;
      height: 50px;
      margin-right: -15px;
      color: white;
      &.router-link-exact-active {
        color: $gris-sombre;
        background-color: $background;
        border-radius: 25px 0 0 25px;
      }
      &:hover{
        color: $secondary;
      }
    }

  }

  body #divCalendar .p-datepicker {
    border: none;
    background-color: $secondary;
    border-radius: 0px 30px 30px 0px;
  }

  body #divCalendar .p-datepicker .p-datepicker-header{
    background-color: $secondary;
  }

  .card{
    border: none;
  }

  body #charges .p-inputtext{
    width: 70px;
    text-align: center;
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
