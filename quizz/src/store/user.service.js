const API = "https://api.trivia.willfry.co.uk/questions?limit=20";
import axios from 'axios';

module.exports = questions = (type) => {
    if (type === "") {
        return axios.get(API);
    } else {
        return axios.get(`https://api.trivia.willfry.co.uk/questions?categories=${type}&limit=20`);
    }
}