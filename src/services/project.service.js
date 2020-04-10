import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/apiPactNG/api/v1';
export default {
  createProject(project) {
    return axios.post(`${API_URL}/systemeInformations`, project);
  },
  getAllProjects() {
    console.log('ds service');
    return axios.get(`${API_URL}/systemeInformations?search= `, { headers: authHeader() });
  }
};
