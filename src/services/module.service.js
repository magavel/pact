import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

export default {
  createModule(payload, projet_id) {
    return axios.post(`${config.API_URL}systemeInformations/${projet_id}/modules`, payload, { headers: authHeader() });
  }
};
