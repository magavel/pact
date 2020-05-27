
import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import projects from './modules/projects';
import modules from './modules/modules';
import users from './modules/users';
import saisies from "./modules/saisies";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    projects,
    modules,
    users,
    saisies,
  },
});
