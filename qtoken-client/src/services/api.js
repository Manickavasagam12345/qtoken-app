import axios from "axios";

const BASE_URL = "http://localhost:5000/api/token";

export const createToken = (data) => axios.post(`${BASE_URL}/create`, data);
export const getTokenList = (page = 1, limit = 10, search = "") =>
  axios.get(`${BASE_URL}/list`, {
    params: { page, limit, search },
  });