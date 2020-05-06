import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

export default {
    /**
     * creation projet et avec CB du back retour vers la page
     * besoins grace au router.push
     * @param project
     * @returns {Promise<AxiosResponse<any>>}
     */
  createProject(project) {
    //return axios.post(`${API_URL}/systemeInformations`, project, { headers: authHeader() });
    return axios.post(`${config.API_URL}systemeInformations`, project, { headers: authHeader() });
  },
  getAllProjects() {
    return axios.get(`${config.API_URL}systemeInformations?search= `, { headers: authHeader() })
        .catch((err) => {
            console.log('erreur', err)
        });
  }
};
