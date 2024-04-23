import axios from 'axios';
// para no modificar las peticiones actuales coloque puerto 80 pero se debe colocar la 5000
const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:80/api';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
