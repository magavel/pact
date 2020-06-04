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

  getSaisieParPeriode(periode){
    // GET http://localhost:8080/apiPactNG/api/v1/users/titi/saisiesByWeek?dateDebut=2020-03-18T08:00:08.566Z&dateFin=2020-03-18T08:00:08.566Z
    const user = JSON.parse(localStorage.getItem('user'));
    const dateDebut = periode.dateDebut;
    const dateFin = periode.dateFin;
    console.log('periode dans le service', periode)

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
    postSaisie(typeActivite, charge, date, commentaire){
        const user = JSON.parse(localStorage.getItem('user'));
        axios.post(config.API_URL.concat('phases/1/saisies'),
            {
                saisie_type_activite: typeActivite,
                saisie_charge: charge,
                saisie_date: date,
                saisie_commentaire: commentaire,
                saisie_username: user.username
            });
    }

    /**
     * retourne les phases actives
     * @returns {Promise<AxiosResponse<any>>}
     */
    getPhaseActivesUtilisateurs() {

        const user = JSON.parse(localStorage.getItem('user'));
        console.log('phase activies')

        return axios.get(`${config.API_URL}users/${user.username}/phases`, {
            headers: authHeader()
        });

    }

}

export default new SaisieService();
