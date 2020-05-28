import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

//const API_URL = 'http://localhost:8080/apiPactNG/api/v1/';

class UserService {

  createUser(user) {
    return axios.post(config.API_URL.concat('users'),
      user,
      { headers: authHeader() })
  }

  /**
   * mise a jour du mot de passe.
   * @param password
   * @returns {Promise<AxiosResponse<any>>}
   */
  updatePassword(password) {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.put(config.API_URL.concat('users/', user.username, '/password'),
      password,
      { headers: authHeader() })
  }

  /**
   * Mise à jour d'un utilisateur.
   * @param unUtilisateur unUtilisateur.
   * @returns {Promise<AxiosResponse<any>>} retour le mise à jour.
   */
  updateUser(unUtilisateur) {
    return axios.put(config.API_URL.concat('users/', unUtilisateur.utilisateur_username),
      unUtilisateur,
      { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(`${config.API_URL}users`, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(`${config.API_URL}mod`, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(`${config.API_URL}admin`, { headers: authHeader() });
  }
}

export default new UserService();
