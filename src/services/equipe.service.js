import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

//const API_URL = 'http://localhost:8080/apiPactNG/api/v1/';

class EquipeService {
  /**
   * retourne la liste des équipes.
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAllEquipes() {
    return axios.get(config.API_URL.concat('equipes'), { headers: authHeader() });
  }

}

export default new EquipeService();
