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
    // http://localhost:8080/apiPactNG/api/v1/systemeInformationsList
  getAllProjects() {
    //return axios.get(`${config.API_URL}systemeInformations?search= `, { headers: authHeader() })
      return axios.get(`${config.API_URL}systemeInformationsList`, { headers: authHeader() })
        .catch((err) => {
            console.log('erreur du getAllProjects', err)
        });
  },
    //  http://localhost:8080/apiPactNG/api/v1/systemeInformations/1
    getProjectById(id) {
      return axios.get(`${config.API_URL}systemeInformations/${id}`,{ headers: authHeader() })
          .catch((err) => {
              console.log('erreur du getProjectById', err)
          });
    },
  updateProjet(projet) {
      return axios.put(`${config.API_URL}systemeInformations/{${projet.systemeInformation_Id}}`, projet, { headers:authHeader() })
          .catch((err)=>{
              console.log('erreur lors du put ', err)
          })
  }
};
