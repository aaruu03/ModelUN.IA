import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const createCommittee = (username, comname, topic, topic2) => {
    return axios.post(API_URL + "createc", {
        username,
        comname,
        topic,
        topic2,
    });
};

const getCommittees = (username) => {
    return axios.get(API_URL + "user", { headers: authHeader()}, {
        username,
    } );
}; 

export default {
    createCommittee,
    getCommittees,
};