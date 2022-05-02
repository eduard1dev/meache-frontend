import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiClient = (ctx?: any) => {
  const { 'nextauth.token': token } = parseCookies(ctx);

const api = axios.create({
  baseURL: 'http://ec2-52-22-114-151.compute-1.amazonaws.com/'
});

  if (token) {
    api.defaults.headers['token'] = `Bearer ${token}`;
  }

  return api;
}

export const api = getApiClient();