import projectService from '../../services/project.service';

// initial state

const state = {
  project: {},
};

// getters
const getters = {
};

// actions
//  on dispatch les actions.....
const actions = {

  createProject({ commit }, project) {
    console.log('ds ll', project);
    projectService.createProject(project)
      .then(() => {
        commit('CREATE_PROJECT', project);
      });
  },
  getProjects({ commit }) {
    projectService.getAllProjects()
      .then((res) => {
        console.log('res dans le store', res)
      })
      .catch((error) => {
        console.log(error)
      });
  },
};
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// mutations
// on commit les mutations....
const mutations = {
  CREATE_PROJECT(state, project) {
    state.project = { project, ...project };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
