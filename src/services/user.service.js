import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
//new
const createCommittee = (username, comname, topic, topic2) => {
  return axios.post(API_URL + "createc", {
      username,
      comname,
      topic,
      topic2,
  });
};

export default {
  getPublicContent,
  getUserBoard,
  createCommittee,
};
