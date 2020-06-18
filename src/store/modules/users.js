import userservice from '../../services/user.service';
import router from '../../router';


// initial state
const state = {
  users: [], // un tableau de l'ensemble des utilisateurs
  user: {},
  errors: [], // log des erreurs
  success: [], // log des success
  favorites: [], //activites favorites
  journeesFavorites: [], //journee favorites
  controle: [],//données pour le controle
    controleKey:0, //key de mise à jour.
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
  GET_ALL_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
  UPDATE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  UPDATE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
  GET_FAVORITE_USERS (state, favorites) {
    state.favorites = favorites.data;
  },
  GET_FAVORITE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
  GET_FAVORITE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  DELETE_FAVORITE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
  DELETE_FAVORITE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  GET_JOURNEE_FAVORITE_USERS(state, journee) {
    state.journeesFavorites = journee;
  },
  GET_CONTROLE(state, controles) {
      const parsed = JSON.stringify(controles);
      localStorage.setItem('controles', parsed);
    state.controle = controles;
  },
    UPDATE_TABLE_CONTROLE(state) {
        state.controleKey += 1;
    }
};

const actions = {
  getAllFavorites({ commit}) {
    userservice.getAllFavorites()
      .then((res) => {
        const succes = {
          date: new Date(),
          message: 'lecture de tous les activites favorites utilisateurs',
        }
        commit('GET_FAVORITE_USERS', res.data);
        commit('GET_FAVORITE_SUCCESS', succes);

      })
      .catch((err) => {
        const error = {
          date: new Date(),
          message: `echec sur la récuperation 
            des activites favorites dans la méthode 
             getAllFavorites: ${err.message}`,
        };
        commit('GET_FAVORITE_ERROR', error);
      });
  },  getAllJourneeFavorites({ commit}) {
    userservice.getAllJourneeFavorites()
        .then((res) => {
          const succes = {
            date: new Date(),
            message: 'lecture de tous les journees favorites utilisateurs',
          }
          commit('GET_JOURNEE_FAVORITE_USERS', res.data.data);
          commit('GET_FAVORITE_SUCCESS', succes);

        })
        .catch((err) => {
          const error = {
            date: new Date(),
            message: `echec sur la récuperation 
            des activites favorites dans la méthode 
             getAllFavorites: ${err.message}`,
          };
          commit('GET_FAVORITE_ERROR', error);
        });
  },
  ajouterJourneeFavorites({commit}, journee) {
    userservice.ajouterJourneeFavorites(GET_CONTROLEjournee)
        .then((res) => {
          const succes = {
            date: new Date(),
            message: 'ajout une journee favorite',
          }
          commit('CREATE_SUCCESS', succes);

        })
        .catch((err) => {
          const error = {
            date: new Date(),
            message: `echec de la mise à jour 
             dans la méthode 
            ajouterJourneeFavorites: ${err.message}`,
          };
          commit('CREATE_ERROR', error);
          console.log(error.message);
        });
  },
  supprimerFavoris({commit}, Saisie_id) {
    userservice.supprimerFavoris(Saisie_id)
        .then((res) => {
          const succes = {
            date: new Date(),
            message: 'suppression du favoris',
          }
         commit('DELETE_FAVORITE_SUCCESS', succes);

        })
        .catch((err) => {
          const error = {
            date: new Date(),
            message: `echec sur la suppression du favoris: ${err.message}`,
          };
          commit('DELETE_FAVORITE_ERROR', error);
        });
  },

  createUser({ commit }, user) {
    userservice.createUser(user)
      .then((response) => {
        if(response.status === 201) {
          console.log('data', response.data);
          //this.$toast.add({severity:'success', summary: 'Succes', detail:'Fiche projet créé en BDD', life: 3000});

          router.push({ name: 'user', params:response.data });
        }
        else {
          console.log('pas de status 201, pb avec le serveur', response.status)
        }
      })
      .then(() => {
        commit('CREATE_USER', user);
      });
  },
  getAllUsers({ commit }) {
    userservice.getUserBoard()
      .then((res) => {
        const succes = {
          date: new Date(),
          message: 'lecture de tous les utilisateurs',
        }
        commit('GET_ALL_USERS', res.data);
        commit('GET_ALL_SUCCESS', succes);

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
  updateUser({ commit }, user) {
    userservice.updateUser(user)
      .then((res) => {
        const succes = {
          date: new Date(),
          message: 'mise à jour d un utilisateur',
        }
       // commit('GET_ALL_USERS', res.data);
        commit('UPDATE_SUCCESS', succes);

      })
      .catch((err) => {
        const error = {
          date: new Date(),
          message: `echec de la mise à jour 
             dans la méthode 
            updateUser: ${err.message}`,
        };
        commit('UPDATE_ERROR', error);
        console.log(error.message);
      });
  },
  getControleSaisies({ commit }, periode) {
    userservice.getControleSaisies(periode)
        .then((res) => {
          const succes = {
            date: new Date(),
            message: 'lecture des contrôles',
          }
          commit('GET_CONTROLE', res.data);
          commit('GET_ALL_SUCCESS', succes);

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
    updateTableControle({ commit }) {
        commit('UPDATE_TABLE_CONTROLE');

    }


};


export default {
  namespaced: true,
  state,
  actions,
  mutations
}
