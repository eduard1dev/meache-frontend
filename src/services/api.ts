import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiClient = (ctx?: any) => {
  const { 'nextauth.token': token } = parseCookies(ctx);
console.log(process.env.REACT_ENV)
console.log(process.env.NEXT_PUBLIC_URL)
const api = axios.create({
  baseURL: process.env.REACT_ENV == 'production' ? 'https://meache-api.ed1labs.xyz/' : 'http://localhost:5000'
});

  if (token) {
    api.defaults.headers['token'] = `Bearer ${token}`;
  }

  return api;
}

export const api = getApiClient();