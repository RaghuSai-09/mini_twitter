
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const login = payload => api.post('/users/login', payload); 
export const signup = payload => api.post('/users/signup', payload); 
export const getTweets = () => api.get('/users/tweets');
export const getusers = () => api.get('/users/all');
export const follow = payload => api.put(`/users/follow/`,payload);
export const user = payload => api.get(`/users/followlist/`,payload);
export const createTweet = payload => api.post('/users/create', payload);