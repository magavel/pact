import moduleService from '../../services/module.service'

const state = {
  modules: [], // un tableau de l'ensemble des modules
  errors: [], // log des erreurs
};

const  mutations = {
  CREATE_MODULE(state, payload) {
    state.modules = [ payload, ...state.modules ];
  },
  CREATE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
};

const actions = {
  createModule({ commit }, payload) {
    moduleService.createModule(payload, project_id)
      .then(() => {
        commit('CREATE_PROJECT', payload, project_id);
      });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
