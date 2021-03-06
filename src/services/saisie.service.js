import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';


class SaisieService {
    getSaisie(dateDebut, dateFin){
        // GET http://localhost:8080/apiPactNG/api/v1/users/titi/saisies?dateDebut=2020-03-18T08:00:08.566Z&dateFin=2020-03-18T08:00:08.566Z
        const user = JSON.parse(localStorage.getItem('user'));

        return axios.get(config.API_URL.concat('users/', user.username, '/saisies'), {
            headers: authHeader(),
            params: {
                dateDebut: dateDebut,
                dateFin: dateFin
            },
        });
    }

    /**
     * methode de suppression d'une saisie
     * @param saisieId identifiant de la saisie.
     * @returns {Promise<AxiosResponse<any>>}
     */
    supprimerSaisie(saisieId) {
        const user = JSON.parse(localStorage.getItem('user'));
        return axios.delete(`${config.API_URL}phases/saisies/${saisieId}`, {
            headers: authHeader()
        });
    }


  getSaisieParPeriode(periode){
    // GET http://localhost:8080/apiPactNG/api/v1/users/titi/saisiesByWeek?dateDebut=2020-03-18T08:00:08.566Z&dateFin=2020-03-18T08:00:08.566Z
    const user = JSON.parse(localStorage.getItem('user'));
    const dateDebut = periode.dateDebut;
    const dateFin = periode.dateFin;
    // console.log('periode dans le service', periode)

    return axios.get(`${config.API_URL}users/${user.username}/saisiesByWeek?dateDebut=${dateDebut}&dateFin=${dateFin}`, {
      headers: authHeader()
    });
  }

  /**
   * methode de mise à jour d'une saisie.
   * @param uneSaisie uneSaisi
   */
  updateSaisie(uneSaisie) {
    return axios.put(config.API_URL.concat('phases/saisies/',uneSaisie.saisie_Id),
      uneSaisie,
      { headers: authHeader() });
  }


    // GET http://localhost:8080/apiPactNG/api/v1/referentiels/ref_type_activite
    getRefTypeActivite(){
        return axios.get(config.API_URL.concat("referentiels/ref_type_activite"));
    }

    // GET http://localhost:8080/apiPactNG/api/v1/users/titi/phases
    getPhases(){
        const user = JSON.parse(localStorage.getItem('user'));
        return axios.get(config.API_URL.concat("users/", user.username, "/phases"), { headers: authHeader() });
    }

    // POST http://localhost:8080/apiPactNG/api/v1/phases/1/saisies
    // Content-Type: application/json
    //
    // {
    //
    //   "saisie_type_activite" : 1,
    //   "saisie_charge" : 3.0,
    //   "saisie_date" : "2020-03-18T08:00:08.566Z",
    //   "saisie_commentaire" : "un commentaire",
    //   "saisie_username" : "titi"
    //
    // }
    postSaisie(uneSaisie){
        const user = JSON.parse(localStorage.getItem('user'));

        return axios.post(`${config.API_URL}phases/${uneSaisie.saisie_phaseId}/saisies`,
            uneSaisie,{
                headers: authHeader()
            } );
    }

    /**
     * retourne les phases actives
     * @returns {Promise<AxiosResponse<any>>}
     */
    getPhaseActivesUtilisateurs(username) {

        console.log('username',username);

        if (username === undefined || username === null) {

            const user = JSON.parse(localStorage.getItem('user'));
            console.log('phase activies')
            return axios.get(`${config.API_URL}users/${user.username}/phases`, {
                headers: authHeader()
            });

        } else {
            return axios.get(`${config.API_URL}users/${username}/phases`, {
                headers: authHeader()
            });
        }


    }
    /**
     * ajouter un favoris.
     * @param uneSaisie
     */
    updateActiviteFavorite(uneSaisie) {
        const user = JSON.parse(localStorage.getItem('user'));

        return axios.post(`${config.API_URL}users/${user.username}/favoris`,
            uneSaisie,{
                headers: authHeader()
            } );
    }
    /**
     * ajouter un favoris.
     * @param uneSaisie
     */
    deleteActiviteFavorite(saisieId) {
        const user = JSON.parse(localStorage.getItem('user'));

        return axios.delete(`${config.API_URL}users/${user.username}/favoris/${saisieId}`,
            uneSaisie,{
                headers: authHeader()
            } );
    }
    updateCharge(uneSaisie) {
        const user = JSON.parse(localStorage.getItem('user'))
        return axios.patch(`${config.API_URL}phases/saisies/${uneSaisie.saisieId}`,
            uneSaisie,{
                headers: authHeader()
            } );

    }

}

export default new SaisieService();
