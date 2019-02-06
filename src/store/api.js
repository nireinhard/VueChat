import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:8088/'
});

export const ROUTES = {
  'signin': 'auth/signin',
  'signup': 'auth/signup',
  'user': 'api/v1/users',
  'chats': 'api/v1/chats',
};
