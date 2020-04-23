
import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import projectService from '../services/project.service';
import projects from './modules/projects';
import modules from './modules/modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    projects,
    modules,
  },
});
