import SaisieService from '../../services/saisie.service';

const state = {
    saisies: [],
    errors: [], // log des erreurs
    success: [], // log des success
};

const mutations = {
    GET_SAISIES(state, saisies) {
        state.saisies = saisies;
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
