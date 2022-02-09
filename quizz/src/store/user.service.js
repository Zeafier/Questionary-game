const API = "https://api.trivia.willfry.co.uk/questions?limit=20";
import axios from 'axios';

class userService {
    questions(type) {
        if (type === "all") {
            return axios.get(API);
        } else {
            return axios.get(`https://api.trivia.willfry.co.uk/questions?categories=${type}&limit=20`);
        }
    }
}

export default new userService 