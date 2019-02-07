import axios from 'axios';

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL
});

export const ROUTES = {
  'signin': 'auth/signin',
  'signup': 'auth/signup',
  'user': 'api/v1/users',
  'chats': 'api/v1/chats',
};
