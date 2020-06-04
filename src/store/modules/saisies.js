import SaisieService from '../../services/saisie.service';

const state = {
    dateSelectionee: new Date(),
    dateDeSaisie: [],
    saisies: [],
    phases: [],
    saisiesParPeriode: [],
    errors: [], // log des erreurs
    success: [], // log des success
    phaseActives: [],
};

const mutations = {
    GET_SAISIES(state, saisies) {
        state.saisies = saisies.data;
    },
    GET_PHASES_ACTIVES(state, phases) {
        state.phaseActives = phases.data;
    },
    GET_PHASES_ACTIVES_SUCCESS(state, succes) {
        state.success = [ succes, ...state.success ];
    },
    GET_PHASES_ACTIVES_ERROR(state, succes) {
        state.errors = [ succes, ...state.errors ];
    },
    UPDATE_DATE(state, value){
        state.dateSelectionee = value;
    },
    GET_SAISIES_PAR_PERIODE(state, value){
        state.saisiesParPeriode = value;
    },
    CREATE_ERROR(state, error) {
        state.errors = [ error, ...state.errors ];
    },
    CREATE_SUCCESS(state, succes) {
        state.success = [ succes, ...state.success ];
    },
}

const actions = {
    getSaisieParPeriode( {commit}, periode) {
        SaisieService.getSaisieParPeriode(periode)
            .then((response) => {
                console.log('getSaisieParPeriode', response.data.data);
                commit('GET_SAISIES_PAR_PERIODE', response.data.data)

            })
            .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec sur la récuperation 
            des projets dans la méthode 
            getSaisieParPeriode: ${err.message}`,
                };
                commit('CREATE_ERROR', error);
            });;
    },
    getSaisies( {commit}, dateDebutFin){
        console.log("test");
        SaisieService.getSaisie(dateDebutFin[0], dateDebutFin[1])
            .then((response) => {
                console.log("response.data : " + response.data);
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
    getPhaseActivesUtilisateurs( {commit}) {
        console.log("store phases actives");
        SaisieService.getPhaseActivesUtilisateurs()
            .then((res) => {
                const succes = {
                    date: new Date(),
                    message: 'lecture de tous les phases actives',
                }
                commit('GET_PHASES_ACTIVES', res.data);
                commit('GET_PHASES_ACTIVES_SUCCESS', succes);

            })
            .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec sur la récuperation 
            des phases actives.
             getPhaseActivesUtilisateurs: ${err.message}`,
                };
                commit('GET_PHASES_ACTIVES_ERROR', error);
            });
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
