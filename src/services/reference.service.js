import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../shared/config';

/**
 * classe de service pour accéder au table de référence.
 */
class ReferencesService {
    // GET http://localhost:8080/apiPactNG/api/v1/referentiels/ref_type_activite
    getRefTypeActivite(){
        return axios.get(config.API_URL.concat("referentiels/ref_type_activite"), { headers: authHeader()});
    }
    getRefTypeModule(){
        return axios.get(config.API_URL.concat("referentiels/ref_type_module"), { headers: authHeader()});
    }
    getRefTypeProjet(){
        return axios.get(config.API_URL.concat("referentiels/ref_type_projet"), { headers: authHeader()});
    }
    getRefGrade() {
        return axios.get(config.API_URL.concat("referentiels/ref_grade"), { headers: authHeader()});
    }
}

export default new ReferencesService();
