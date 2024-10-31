import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';
const token = localStorage.getItem('token');

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  timeout: 60000,
  withCredentials: false,
});

export default axiosClient;
