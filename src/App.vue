<template>
  <div>
    <div class="backgroundNav mt-n3">
    </div>
    <div class="card shadow-lg bgCard m-3">
      <div class="card-body">
        <Navigation
                :current-user="currentUser"
                :log-out="logOut"/>
        <CentralContainer
                :current-user="currentUser"
                :show-admin-board="showAdminBoard"
                :show-moderator-board="showModeratorBoard"/>
      </div>
    </div>
    mise à jour du 01 juillet 2020
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";
  import CentralContainer from "./components/CentralContainer";

  export default {
    components: {CentralContainer, Navigation},
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
.bgCard {
  border-radius: 27px;
  background-color: rgba(255, 255, 255, 0.26);
}

  .backgroundNav {
    position:absolute;
    width: 240px;
    min-height: 138vh;
    background-color: $primary;
  }

  body #divCalendar .p-datepicker {
      border: none;
      background-color: $secondary;
      // border-radius: 0px 30px 30px 0px;
      border-radius: 0px 30px 30px 0px;
  }

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

  body #divCalendar .p-datepicker .p-datepicker-header{
    background-color: $secondary;
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

  body #divCalendar .p-datepicker {
    border: none;
    background-color: $secondary;
    // border-radius: 0px 30px 30px 0px;
    border-radius: 0px 30px 30px 0px;
  }




</style>
