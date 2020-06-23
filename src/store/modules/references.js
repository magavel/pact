// initial state
import ReferencesService from "../../services/reference.service";


const state = {
    refActivite: [],
    refGrade:[],
    errors: [], // log des erreurs
    success: [], // log des success
};

const mutations = {
    GET_REF_ACTIVITE(state, activite) {
        state.refActivite = activite;
    },
    GET_REF_ACTIVITE_ERROR(state, error) {
        state.errors = [error, ...state.errors];
    },
    GET_REF_ACTIVITE_SUCCESS(state, succes) {
        state.success = [succes, ...state.success];
    }
};


const actions = {
    getRefActivite({commit}) {
        ReferencesService.getRefTypeActivite()
            .then((res) => {
                const succes = {
                    date: new Date(),
                    message: 'lecture de tous les utilisateurs',
                }
                commit('GET_REF_ACTIVITE', res.data.data);
                commit('GET_REF_ACTIVITE_SUCCESS', succes);

            })
            .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec sur la récuperation 
            des ref activites: ${err.message}`,
                };
                commit('GET_REF_ACTIVITE_ERROR', error);
            });
    },
    getRefGrade({commit}) {
        ReferencesService.getRefGrade()
            .then((res) => {
                const succes = {
                    date: new Date(),
                    message: 'lecture des grades',
                }
                commit('GET_REF_GRADE', res.data.data);
                commit('GET_REF_ACTIVITE_SUCCESS', succes);

            })
            .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec sur la récuperation 
            des ref grade: ${err.message}`,
                };
                commit('GET_REF_ACTIVITE_ERROR', error);
            });
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
