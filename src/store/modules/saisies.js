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
