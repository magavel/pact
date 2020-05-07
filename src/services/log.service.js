import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

//const API_URL = 'http://localhost:8080/apiPactNG/api/v1/';

class LogService {
  systemHealth() {
    return axios.get(config.API_MANAGE.concat('management/health'), { headers: authHeader() });
  }

  updatePassword(password) {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.put(config.API_URL.concat('users/', user.username, '/password'),
      password,
      { headers: authHeader() })
  }


}

export default new UserService();
