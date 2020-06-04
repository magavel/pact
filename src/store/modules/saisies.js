import SaisieService from '../../services/saisie.service';
import userservice from "../../services/user.service";
import router from "../../router";

const state = {
    dateSelectionee: [],
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
    CREATE_SAISIES(state, saisies) {
        state.saisies = [ saisies, ...state.saisies ];
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
    UPDATE_DATE_SAISIE(state, value){
        state.dateDeSaisie = value;
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
                console.log("response.data : " );
                console.log(response.data);
                commit('GET_SAISIES', response.data);
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
    },
    ajouterUneSaisie({commit} , uneSaisie) {
        SaisieService.postSaisie(uneSaisie)
            .then((response) => {
                if(response.status === 201) {
                    console.log('data', response.data);
                    //this.$toast.add({severity:'success', summary: 'Succes', detail:'Fiche projet créé en BDD', life: 3000});

                   // router.push({ name: 'user', params:response.data });
                }
                else {
                    console.log('pas de status 201, pb avec le serveur', response.status)
                }
            })
            .then(() => {
                commit('CREATE_SAISIES', uneSaisie);
            });
    }




}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
