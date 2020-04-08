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
  /**
   * on commit le project une fois que le
   * service a enregistrer le project en asynchrone
   * @param commit
   * @param project
   */
  createProject({ commit }, project) {
    projectService.createProject(project)
      .then(()=> {
      commit('CREATE_PROJECT', project);
    });
  }
};

// mutations
// on commit les mutations....
const mutations = {
  /**
   * Met a disposition l'état (le state) et le payload
   * project pour mettre a jour l'état correspondant de project par ajout de project...
   * via spread operator
   * @param state
   * @param project
   * @constructor
   */
  CREATE_PROJECT(state, project) {
    state.project =  {project, ...project};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
