import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/apiPactNG/api/v1';
export default {
  createModule(payload, projet_id) {
    return axios.post(`${API_URL}/systemeInformations/${projet_id}/modules`, payload, { headers: authHeader() });
  }
};
