import axios from 'axios';

const API_URL = 'http://localhost:8080/apiPactNG/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(`${API_URL}signin`, {
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
        return axios.post(`${API_URL}signup`, {
            username: user.email.split('@')[0],
            email: user.email,
            password: user.password,
        });
    }
}

export default new AuthService();
