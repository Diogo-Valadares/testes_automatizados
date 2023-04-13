import axios from 'axios';

export const baseURL = 'http://localhost:4001';

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000, 
});

export default instance;
export {};