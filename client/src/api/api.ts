import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Ustawienie adresu API
  headers: { 'Content-Type': 'application/json' }, // Nagłówki
});

export default api;