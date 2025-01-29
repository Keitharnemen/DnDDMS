import axios from 'axios';

// instancja axios, która zapewnia nam komunikację z backendem
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default api;