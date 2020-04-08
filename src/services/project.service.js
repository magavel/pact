import axios from 'axios';

const API_URL = 'http://localhost:8080/apiPactNG/api/v1/';
export default {
  createProject(project) {
    return axios.post(`${API_URL}/projects`, project)
  }
}
