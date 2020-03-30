import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/apiPactNG/api/v1/';

class MissionService {
  // eslint-disable-next-line class-methods-use-this
  getMissionServiceUserBoard(datesearch) {
    const user = JSON.parse(localStorage.getItem('user'));

    return axios.get(API_URL.concat('users/', user.username, '/missions'), {
      headers: authHeader(),
      params: { date: datesearch },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getMissionServiceAllMissions() {
    return axios.get(API_URL.concat('missions'), { headers: authHeader() });
  }

  /**
   * methode de post des activites.
   * @param dateDebut date debut activite
   * @param commentairePost commentaire.
   */
  // eslint-disable-next-line class-methods-use-this
  postMission(dateDebut, commentairePost) {
    const user = JSON.parse(localStorage.getItem('user'));

    axios.post(API_URL.concat('users/', user.username, '/missions'),
      { date: dateDebut, commentaire: commentairePost });
  }
}

export default new MissionService();
