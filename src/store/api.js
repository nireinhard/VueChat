import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:8080/'
});

export const ROUTES = {
  'signin': 'auth/signin',
  'signup': 'auth/signup'
};