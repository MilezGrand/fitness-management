import axios from 'axios';

const instance = axios.create({
  withCredentials: false,
  baseURL: 'http://127.0.0.1:4000',
});

export default instance;
