import userservice from '../../services/user.service';
import router from '../../router';


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
  GET_ALL_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
  UPDATE_ERROR(state, error) {
    state.errors = [ error, ...state.errors ];
  },
  UPDATE_SUCCESS(state, succes) {
    state.success = [ succes, ...state.success ];
  },
};

const actions = {
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
};


export default {
  namespaced: true,
  state,
  actions,
  mutations
}
