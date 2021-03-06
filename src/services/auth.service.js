import axios from 'axios';
import { config } from '../shared/config';

//const API_URL = 'http://localhost:8080/apiPactNG/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(`${config.API_AUTH}signin`, {
                username: user.email.split('@')[0],
                password: user.password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(`${config.API_AUTH}signup`, {
            username: user.email.split('@')[0],
            email: user.email,
            password: user.password,
        });
    }
}

export default new AuthService();
