<template>
  <div>
    <Toast />
    <transition-group name="p-messages" tag="div">
      <Message v-for="msg of messages" :severity="msg.severity" :key="msg.content" :life="3000">{{msg.content}}</Message>
    </transition-group>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form  name="form" @submit.prevent="handleSubmit(submit)">
          <ValidationProvider name="username" rules="required" v-slot="{ errors }">
          <div class="form-group">
          <label for="username">Email</label>
          <input
            v-model="user.email"
            type="text"
            class="form-control"
            name="username"
          />
              <span>{{ errors[0] }}</span>
        </div>
          </ValidationProvider>
          <ValidationProvider name="password" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            name="password"
          />
            <span>{{ errors[0] }}</span>
          <!-- <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Mot de passe est requis</div>-->
        </div>
          </ValidationProvider>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Connexion</span>
          </button>
        </div>
        <div class="form-group">
           <a href @click.prevent="register">Mot de passe oublié</a>
        </div>
        <div class="form-group">
          Première visite ? <a href @click.prevent="register">Créer un compte</a>
        </div>
        <div class="form-group">
          <!--<div v-if="message" class="alert alert-danger" role="alert">{{message}}</div> -->

        </div>
      </form>
        </ValidationObserver>
    </div>
  </div>
  </div>
</template>

<script>
import { ValidationProvider,ValidationObserver,extend } from 'vee-validate';
import {required } from 'vee-validate/dist/rules';
import Message from 'primevue/message';

import User from '../models/user';

extend('required', {
    ...required,
    message: 'Ce champs est requis'
});

export default {
  name: 'Login',
    components: {
      ValidationProvider, ValidationObserver, Message
    },
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: null,
      messages: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
      async submit() {
          this.loading = true;
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
            this.loading = false;
            return;
        }
          this.loading = false;
          if (this.user.email && this.user.password) {
              this.$store.dispatch('auth/login', this.user).then(
                      () => {
                          this.$router.push('/activites');
                      },
                      (error) => {
                          this.loading = false;
                    //    this.message = "problème de login/mot de passe";
                        this.messages = [
                          {severity: 'error', content: 'problème de login/mot de passe'}
                        ]
                          /*this.message = (error.response && error.response.data)
                                  || error.message
                                  || error.toString();*/
                      },
              );
          }
      }
    ,
      register() {
        this.$router.push('/register');
      },
  },
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
