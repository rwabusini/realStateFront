// src/auth/authServices.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // match your backend

export const login = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/login`, userData);
  return response.data;
};