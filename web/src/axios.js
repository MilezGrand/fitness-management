import axios from 'axios';

const instance = axios.create({
  withCredentials: false,
  baseURL: 'http://localhost:4000/api',
  headers: {"Access-Control-Allow-Origin": "https://milezgrand.site"}
});

export default instance;
