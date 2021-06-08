import axios from 'axios';
import config from '../utils/config';
import { AUTH_LOGOUT } from '@/store/actions/auth';

const baseURL = config.DEV_URL;

let instance = axios.create({
  baseURL,
});
//request interceptor to add the auth token header to requests
instance.interceptors.request.use(
  (setting) => {
    const accesToken = localStorage.getItem('token');

    if (accesToken) {
      setting.headers['Authorization'] = accesToken;
    }
    return setting;
  },
  (error) => {
    console.error(error);
    Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function(error) {
    console.log('Bye World', error.response.status);
    const orgRequest = error.config;
    console.log(orgRequest);
    let refreshToken = localStorage.getItem('refresh-token');

    console.log(refreshToken);

    if (refreshToken && error.response.status === 401 && !orgRequest._retry) {
      localStorage.removeItem('token');
      console.log('foutje');
      orgRequest._retry = true;
      await axios
        .post(`${baseURL}auth/refresh_token`, { refreshToken: refreshToken })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('token', res.data.accessToken);
            console.log('Access token refreshed!');
            return axios(orgRequest);
          }
        })
        .catch((error) => {
          if (error.status != 200) {
            this.$store
              .dispatch(AUTH_LOGOUT)
              .then(() => this.$router.push('/auth'));
          }
          console.error(error);
        });
    } else {
      return Promise.reject(error);
    }
  }
);

export const api = instance;
