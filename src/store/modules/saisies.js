import SaisieService from '../../services/saisie.service';

const state = {
    dateSelectionee: new Date(),
    saisies: [],
    errors: [], // log des erreurs
    success: [], // log des success
};

const mutations = {
    GET_SAISIES(state, saisies) {
        state.saisies = saisies.data;
    },
    UPDATE_DATE(state, value){
        state.dateSelectionee = value;
    }
}

const actions = {
    getSaisies( {commit}, dateDebut, dateFin){
        SaisieService.getSaisie(dateDebut, dateFin)
            .then(() => {
                commit('GET_SAISIES', res.data)
            })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
