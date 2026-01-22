import axios from "axios";

const TOKEN_BASE = "http://localhost:5000/api/token";
const PATIENT_BASE = "http://localhost:5000/api/patient";

export const createToken = (data) => axios.post(`${TOKEN_BASE}/create`, data);
export const getTokenList = (page = 1, limit = 10, search = "") =>
  axios.get(`${TOKEN_BASE}/list`, { params: { page, limit, search } });

// Patient APIs
export const getPatientByPhone = (phone) =>
  axios.get(`${PATIENT_BASE}/phone/${phone}`);

export const createPatient = (data) =>
  axios.post(`${PATIENT_BASE}/create`, data);

// Patient list
export const getPatients = (search = "") =>
  axios.get(`${PATIENT_BASE}/list`, { params: { search } });
