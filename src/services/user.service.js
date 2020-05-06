import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

//const API_URL = 'http://localhost:8080/apiPactNG/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(`${config.API_URL}all`);
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
