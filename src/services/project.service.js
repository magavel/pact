import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/apiPactNG/api/v1';
export default {
    /**
     * creation projet et avec CB du back retour vers la page
     * besoins grace au router.push
     * @param project
     * @returns {Promise<AxiosResponse<any>>}
     */
  createProject(project) {
    return axios.post(`${API_URL}/systemeInformations`, project, { headers: authHeader() });
  },
  getAllProjects() {
    return axios.get(`${API_URL}/systemeInformations?search= `, { headers: authHeader() })
        .catch((err) => {
            console.log('erreur', err)
        });
  }
};
