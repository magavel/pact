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
    getSaisies( {commit}, dateDebutFin){
        console.log("test");
        SaisieService.getSaisie(dateDebutFin[0], dateDebutFin[1])
            .then((response) => {
                console.log(response.data);
                const donnees = response.data.data;
                console.log("donnees : " + donnees);
                donnees.forEach((s)=> console.log("s :" + s.saisie_Id));
                commit('GET_SAISIES', response);
            })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
