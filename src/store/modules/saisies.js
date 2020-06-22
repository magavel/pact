import SaisieService from '../../services/saisie.service';


const state = {
    // format : 2020-06-04T22:00:00.000Z
    dateSelectionee: [],
    // format : Fri Jun 05 2020 09:35:47 GMT+0200 (heure d’été d’Europe centrale)
    dateDeSaisie: [],
    saisies: [],
    phases: [],
    saisiesParPeriode: [],
    errors: [], // log des erreurs
    success: [], // log des success
    phaseActives: [],
    activiteFavKey: 0,
    tableauSaisieKey: 0,
    saisieUpdate: null,
    ajoutActiviteKey: 0,
    tabsKey: 0,
    lastSaisie:0,
};

const mutations = {
    GET_SAISIES(state, saisies) {
        state.saisies = saisies.data;
    },
    GET_SAISIE_UPDATE(state, value){
        console.log('value', value);
        state.saisieUpdate = value;
        console.log('state.saisieUpdate', state.saisieUpdate);
    },
    CREATE_SAISIES(state, saisies) {
        state.saisies = [ saisies, ...state.saisies ];
    },
    UPDATE_SAISIES_SUCESS(state, succes) {
        state.success = [ succes, ...state.succes ];
    },
    UPDATE_SAISIES_ERROR(state, succes) {
        state.errors = [ succes, ...state.errors ];
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
    UPDATE_ACTIVITE_FAV_KEY(state){
        state.activiteFavKey += 1;
    },
    UPDATE_TABS_KEY(state){
        state.tabsKey += 1;
    },
    UPDATE_TABLE_SAISIE_KEY(state){
        state.tableauSaisieKey += 1;
    },
    UPDATE_AJOUT_ACTIVITE_KEY(state){
        state.ajoutActiviteKey += 1;
        console.log('tate.ajoutActiviteKey', state.ajoutActiviteKey);
    },
    DELETE_SUCCESS(state, sucess) {
        state.success = [ succes, ...state.success ];
    },
    DELETE_ERROR(state, error) {
        state.errors = [ error, ...state.errors ];
    },
    LAST_SAISIE_ID(state,id) {
        state.lastSaisie = id;
        console.log("LAST_SAISIE_ID :" + id);
    }

}

const actions = {
    getSaisieParPeriode({commit}, periode) {
        SaisieService.getSaisieParPeriode(periode)
            .then((response) => {
                // console.log('getSaisieParPeriode', response.data.data);
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
            });

    },
    getSaisies( {commit}, dateDebutFin){
        SaisieService.getSaisie(dateDebutFin[0], dateDebutFin[1])
            .then((response) => {
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
    getPhaseActivesUtilisateurs({commit}, username) {
        console.log("store phases actives");
        SaisieService.getPhaseActivesUtilisateurs(username)
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
    ajouterUneSaisie({commit}, uneSaisie) {
        SaisieService.postSaisie(uneSaisie)
            .then((res) => {
                const succes = {
                    date: new Date(),
                    message: 'ajout une saisie',
                }
                commit('CREATE_SUCCESS', succes);
                if(res.status === 201) {
                    console.log (res.data.saisie_Id);
                    let value = res.data.saisie_Id;
                    commit('LAST_SAISIE_ID',value);
                }


            })
            .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec de la mise à jour 
             dans la méthode 
            ajouterUneSaisie: ${err.message}`,
                };
                commit('CREATE_ERROR', error);
                console.log(error.message);
            });
    },
    updateSaisie({commit}, uneSaisie){
        SaisieService.updateSaisie(uneSaisie).then(r => {
            console.log('r', r);
        });
    },
    updateActiviteFavorite({commit}, uneSaisie) {
        SaisieService.updateActiviteFavorite(uneSaisie)
            .then((res) => {
                const succes = {
                    date: new Date(),
                    message: 'mise à jour des favoris une saisie',
                }
                commit('UPDATE_SAISIES_SUCESS', succes);

            })
            .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec de la mise à jour 
             dans la méthode 
            updateActiviteFavorite: ${err.message}`,
                };
                commit('UPDATE_SAISIES_ERROR', error);
                console.log(error.message);
            });
    },
    supprimerSaisie({commit}, Saisie_id) {
        SaisieService.supprimerSaisie(Saisie_id)
            .then((res) => {
                const succes = {
                    date: new Date(),
                    message: 'suppression d un saisie',
                }
                commit('DELETE_SUCCESS', succes);

            })
            .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec sur la suppression d'une saisie: ${err.message}`,
                };
                commit('DELETE_ERROR', error);
            });
    },
    updateCharge({ commit }, charge) {
        SaisieService.updateCharge(charge)
             .catch((err) => {
                const error = {
                    date: new Date(),
                    message: `echec update charge: ${err.message}`,
                };
                commit('UPDATE_SAISIES_ERROR', error);
                console.log(err.message)
            });
    },

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
