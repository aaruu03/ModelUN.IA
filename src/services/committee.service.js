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

const getCommittee = (path, id) => {
    return axios.post(API_URL + path, {id});
}; 

const deleteCommittee = (id) => {
    return axios.post(API_URL + "deletec/" + id, {id});
};

export default {
    createCommittee,
    getCommittee,
    deleteCommittee,
};