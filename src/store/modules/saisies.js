import SaisieService from '../../services/saisie.service';

const state = {
    dateSelectionee: [],
    dateDeSaisie: [],
    saisies: [],
    phases: [],
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
    GET_SAISIES_PAR_PERIODE(state, value){
        state.saisiesParPeriode = value;
    },
    GET_SAISIES_BY_WEEK_TEST(state, saisies){
        state.saisies = saisies.data;
    },
    CREATE_ERROR(state, error) {
        state.errors = [ error, ...state.errors ];
    },
    CREATE_SUCCESS(state, succes) {
        state.success = [ succes, ...state.success ];
    },
    GET_PHASES(state, phases){
        state.phases = phases.data;
    }
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
    getSaisieByWeekTest({commit}, dateDebutFin){
        console.log("test by week");
        SaisieService.getSaisieWeekly(dateDebutFin[0], dateDebutFin[1])
            .then((response) => {
                console.log(response.data);
                for(let prop in response.data.data){
                    console.log(`response.data.data.${prop} = ${response.data.data[prop]}`);
                }
            })
    },
    getPhases( {commit} ){
        SaisieService.getPhases().then((response)=>{
            console.log("response phases : " + response);
            console.log("response phases data: " + response.data);
            console.log("response phases data data : " + response.data.data);
            commit('GET_PHASES', response.data);
        });
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
