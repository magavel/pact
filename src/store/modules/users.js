import userservice from '../../services/user.service';
import projectService from '../../services/project.service';

// initial state
const state = {
  users: [], // un tableau de l'ensemble des utilisateurs
  errors: [], // log des erreurs
  success: [], // log des success
};

const mutations = {
  GET_ALL_USERS(state, projects) {
    state.users = users;
  },
  CREATE_USER(state, project) {
    state.users = [ project, ...state.users ];
  },
  CREATE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  CREATE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
};

const actions = {
  getAllUsers({ commit }) {
    userservice.getUserBoard()
      .then((res) => {
        const succes = {
          date: new Date(),
          message: 'lecture de tous les projets',
        }
        commit('GET_ALL_USERS', res.data);
        commit('CREATE_SUCCESS', succes);

      })
      .catch((err) => {
        const error = {
          date: new Date(),
          message: `echec sur la récuperation 
            des user dans la méthode 
            getUserBoard: ${err.message}`,
        };
        commit('CREATE_ERROR', error);
      });
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations
}
