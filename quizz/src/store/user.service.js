const API = "api/questions?";
import axios from 'axios';

class userService {
    questions(type) {
        if (type === "all") {
            return axios.get(`${API}limit=20`);
        } else {
            return axios.get(`${API}categories=${type}&limit=20`);
        }
    }
}

export default new userService 