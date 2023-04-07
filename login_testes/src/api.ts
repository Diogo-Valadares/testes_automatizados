import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://testesbackend-a4375.web.app/', // Replace with your backend URL
  timeout: 5000, // Optional timeout value
});

export default instance;
export {};