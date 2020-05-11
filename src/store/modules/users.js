import userservice from '../../services/user.service';


// initial state
const state = {
  users: [], // un tableau de l'ensemble des utilisateurs
  user: {},
  errors: [], // log des erreurs
  success: [], // log des success
};

const mutations = {
  GET_ALL_USERS(state, users) {
    state.users = users.data;
  },
  CREATE_USER(state, user) {
    state.users = [ user, ...state.users ];
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
          message: 'lecture de tous les utilisateurs',
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
