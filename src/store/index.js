
import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import projectService from '../services/project.service';

Vue.use(Vuex);

export default new Vuex.Store({
  // initial state
  state: {
    projects: [], // un tableau de l'ensemble des projets
    errors: [], // log des erreurs
    success: [], // log des success
  },
  // mutations
  // on commit les mutations....
  mutations: {
    GET_ALL_PROJECTS(state, projects) {
      state.projects = projects;
    },
    CREATE_PROJECT(state, project) {
      state.projects = [ project, ...state.project ];
    },
    CREATE_ERROR(state, error) {
      state.errors = [ error, ...state.errors ];
    },
    CREATE_SUCCESS(state, succes) {
      state.success = [ succes, ...state.success ];
    },
  },
  // actions
  //  on dispatch les actions.....
  // sert à requeter le backoffice en asynchrone
  actions: {
    createProject({ commit }, project) {
      projectService.createProject(project)
        .then(() => {
          commit('CREATE_PROJECT', project);
        });
    },
    getAllProjects({ commit }) {
      projectService.getAllProjects()
        .then((res) => {
          const succes = {
            date: new Date(),
            message: 'lecture de tous les projets',
          }
          commit('GET_ALL_PROJECTS', res.data);
          commit('CREATE_SUCCESS', succes);

        })
        .catch((err) => {
          const error = {
            date: new Date(),
            message: `echec sur la récuperation 
            des projets dans la méthode 
            getAllProjects: ${err.message}`,
          };
          commit('CREATE_ERROR', error);
        });
    },
  },
  modules: {
    auth,
  },
});
