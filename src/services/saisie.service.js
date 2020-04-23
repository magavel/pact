import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/apiPactNG/api/v1/';

class SaisieService {
    getSaisie(dateDebut, dateFin){
        // GET http://localhost:8080/apiPactNG/api/v1/users/titi/saisies?dateDebut=2020-03-18T08:00:08.566Z&dateFin=2020-03-18T08:00:08.566Z
        const user = JSON.parse(localStorage.getItem('user'));

        return axios.get(API_URL.concat('users/', user.username, '/saisies'), {
            headers: authHeader(),
            params: {
                dateDebut: dateDebut,
                dateFin: dateFin
            },
        });
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
        axios.post(API_URL.concat('phases/1/saisies'),
            {
                saisie_type_activite: typeActivite,
                saisie_charge: charge,
                saisie_date: date,
                saisie_commentaire: commentaire,
                saisie_username: user.username
            });
    }
}

export default new SaisieService();