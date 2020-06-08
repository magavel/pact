import equipeservice from '../../services/equipe.service';
import router from '../../router';
import userservice from "../../services/user.service";


// initial state
const state = {
  equipes: [], // un tableau de l'ensemble des utilisateurs
  equipe: {},
  errors: [], // log des erreurs
  success: [], // log des success
};

const mutations = {
  GET_ALL_EQUIPES(state, equipes) {
    state.equipes = equipes.equipes;
  },
  CREATE_EQUIPE(state, equipe) {
    state.equipes = [ equipe, ...state.equipes ];
  },
  CREATE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  GET_EQUIPE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
  CREATE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
};

const actions = {
  getAllEquipes({ commit}) {
    equipeservice.getAllEquipes()
        .then((res) => {
          const succes = {
            date: new Date(),
            message: 'lecture de tous les équipes',
          }
          commit('GET_ALL_EQUIPES', res.data);
          commit('GET_EQUIPE_SUCCESS', succes);

        })
        .catch((err) => {
          const error = {
            date: new Date(),
            message: `echec sur la récuperation 
            des équipes dans la méthode 
             getAllEquipes: ${err.message}`,
          };
          commit('GET_FAVORITE_ERROR', error);
        });
  }
};


export default {
  namespaced: true,
  state,
  actions,
  mutations
}
