import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const token = user ? user.token : '';



export const http = axios.create({
   baseURL: `http://localhost/api/`,
   headers: {
        Authorization: `Bearer `+token,
        'Content-Type': 'application/json'
   }
 })