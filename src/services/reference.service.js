import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

class ReferencesService {
    // GET http://localhost:8080/apiPactNG/api/v1/referentiels/ref_type_activite
    getRefTypeActivite(){
        return axios.get(config.API_URL.concat("referentiels/ref_type_activite"), { headers: authHeader()});
    }


}

export default new ReferencesService();
