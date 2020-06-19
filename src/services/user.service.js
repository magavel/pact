import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

//const API_URL = 'http://localhost:8080/apiPactNG/api/v1/';

class UserService {
  /**
   * retourne la liste des favorites de l'utilisateur en cours.
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAllFavorites(username) {

    if (username === undefined) {
      const user = JSON.parse(localStorage.getItem('user'));
      return axios.get(config.API_URL.concat('users/', user.username, '/favoris'), {headers: authHeader()});
    } else {
      return axios.get(config.API_URL.concat('users/', username, '/favoris'), {headers: authHeader()});
    }
  }

  /**
   * retourne la liste des journees favorites de l'utilisateur en cours.
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAllJourneeFavorites() {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(config.API_URL.concat('users/', user.username, '/journeeFavoris'), { headers: authHeader() });
  }

  /**
   * methode de suppression des favoris.
   * @param Saisie_id
   */
  supprimerFavoris(saisie_id) {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.delete(`${config.API_URL}users/${user.username}/favoris/${saisie_id}`, { headers: authHeader() });

  }

  /**
   * methode d'ajout d'une journée favorite.
   * @param journee journée favorite
   */
  ajouterJourneeFavorites(journee) {
    const user = JSON.parse(localStorage.getItem('user'));

    return axios.post(`${config.API_URL}users/${user.username}/journeeFavoris`,
        journee,{
          headers: authHeader()
        } );
  }

  /**
   * methode creation des utilisateurs.
   * @param user unUser
   * @returns {Promise<AxiosResponse<any>>}
   */
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

  getControleSaisies(periode) {
    const user = JSON.parse(localStorage.getItem('user'))
    const dateDebut = periode.dateDebut;
    const dateFin = periode.dateFin;

    return axios.get(`${config.API_URL}users/${user.username}/controleSaisie?dateDebut=${dateDebut}&dateFin=${dateFin}`, { headers: authHeader() });
  }

  getControleEquipeSaisies(periode) {
    const user = JSON.parse(localStorage.getItem('user'))
    const dateDebut = periode.dateDebut;
    const dateFin = periode.dateFin;

    return axios.get(`${config.API_URL}users/${user.username}/controleEquipeSaisie?dateDebut=${dateDebut}&dateFin=${dateFin}`, { headers: authHeader() });
  }

  /**
   * get user par ID.
   * @param username id user
   * @returns {Promise<AxiosResponse<any>>}
   */
  getUserById(username) {
    return axios.get(`${config.API_URL}users/${username}`, { headers: authHeader() });

  }

}

export default new UserService();
