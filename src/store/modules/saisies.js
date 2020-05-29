import SaisieService from '../../services/saisie.service';

const state = {
    dateSelectionee: new Date(),
    dateDeSaisie: [],
    saisies: [],
    saisiesFullByWeek: [],
    errors: [], // log des erreurs
    success: [], // log des success
};

const mutations = {
    GET_SAISIES(state, saisies) {
        state.saisies = saisies.data;
    },
    UPDATE_DATE(state, value){
        state.dateSelectionee = value;
    },
    GET_SAISIES_BY_WEEK(state, value){
        state.saisiesFullByWeek = value;
    },
    CREATE_ERROR(state, error) {
        state.errors = [ error, ...state.errors ];
    },
    CREATE_SUCCESS(state, succes) {
        state.success = [ succes, ...state.success ];
    },
}

const actions = {
    getSaisies( {commit}, dateDebut, dateFin){
        SaisieService.getSaisie(dateDebut, dateFin)
            .then(() => {
                commit('GET_SAISIES', res.data);
            });
    },
    getSaisieFullByWeek( {commit}, dateDebut, dateFin) {
        SaisieService.getSaisieWeekly(dateDebut, dateFin)
            .then(() => {
                commit('GET_SAISIES_BY_WEEK', res.data);
                commit('CREATE_SUCCESS', succes);
            })
            .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec sur la récuperation 
            des projets dans la méthode 
            getAllProjects: ${err.message}`,
                };
                commit('CREATE_ERROR', error);
            });
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
