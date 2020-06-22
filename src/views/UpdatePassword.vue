<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
        alt=""
      />
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form name="form"
            @submit.prevent="handleSubmit(handleLogin)">
        <ValidationProvider name="oldPassword" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="oldPassword">Mot de passe actuel </label>
          <input
            v-model="password.oldpassword"
            type="text"
            class="form-control"
            name="oldPassword"
          />
          <span
              class="block text-red-600 text-xs absolute bottom-0 left-0"
              v-if="errors[0]"
          >{{ errors[0] }}</span>
        </div>
        </ValidationProvider>
        <ValidationProvider name="newPassword" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="newPassword">Nouveau mot de passe</label>
          <Password v-model="password.newpassword"
                    weak-label="faible"
                    medium-label="moyen"
                    strong-label="fort"
                    promptLabel="Nouveau mot de passe"/>
          <span
              class="block text-red-600 text-xs absolute bottom-0 left-0"
              v-if="errors[0]"
          >{{ errors[0] }}</span>
        </div>
        </ValidationProvider>
        <ValidationProvider name="newPasswordCheck" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="newPasswordCheck">Re-saissir le mot de passe</label>
          <Password v-model="password.newpasswordCheck"
                    weak-label="faible"
                    medium-label="moyen"
                    strong-label="fort"
                    promptLabel="Nouveau mot de passe"/>
          <span
              class="block text-red-600 text-xs absolute bottom-0 left-0"
              v-if="errors[0]"
          >{{ errors[0] }}</span>
        </div>
        </ValidationProvider>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Sauvegarder</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import User from '../models/user';
import Password from '../models/password';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';


// Override the default message.
extend('required', {
  ...required,
  message: 'Ce champs est requis'
});

export default {
  name: 'UpdatePassword',
  data() {
    return {
      user: new User('', ''),
      password: new Password ('', '',''),
      loading: false,
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.password.oldpassword && this.password.newpassword) {
        this.$store.dispatch('auth/updatePassword', this.password).then(
            () => {
              this.$router.push('/profile');
            },
            (error) => {
              this.loading = false;
              this.message = "echec de la mise à jour" /*(error.response && error.response.data)
                  || error.message
                  || error.toString();*/
            },
        );
      }
    }
  },
  components: {ValidationProvider, ValidationObserver}
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
a {
  color : #154194
}
</style>
