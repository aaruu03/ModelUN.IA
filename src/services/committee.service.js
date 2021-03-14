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

const addDirectives = (id, title, dtype, description, signatures, actions, pass) => {
    return axios.post(API_URL + "diradd/" + id, {
        id,
        title,
        dtype,
        description,
        signatures,
        actions,
        pass
    });
};

export default {
    createCommittee,
    getCommittee,
    deleteCommittee,
    addDirectives,
};
//sends requests to committee backend with all necessary information