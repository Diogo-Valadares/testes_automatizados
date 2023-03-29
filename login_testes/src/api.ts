import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:4000/', // Replace with your backend URL
  timeout: 5000, // Optional timeout value
});

export default instance;
export {};