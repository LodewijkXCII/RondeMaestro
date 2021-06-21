import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/auth';
import { USER_REQUEST } from '../actions/user';

import routes from '@/api/routes';

const state = {
  token: localStorage.getItem('token') || '',
  refreshtoken: localStorage.getItem('refreshtoken') || '',
  status: '',
  hasLoadedOnce: false,
  userName: '',
  userType: null,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  getUserName: (state) => state.userName,
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    console.log(user);
    return new Promise(async (resolve, reject) => {
      commit(AUTH_REQUEST);

      const { route } = user;
      const sendUser = {
        password: user.password,
        email: user.email,
      };

      try {
        const resp = await routes.create(`${route}`, sendUser);

        localStorage.setItem('token', resp.data.accesToken);
        localStorage.setItem('refresh-token', resp.data.refreshToken);

        commit(AUTH_SUCCESS, resp);
        dispatch(USER_REQUEST);
        resolve(resp);
      } catch (err) {
        commit(AUTH_ERROR, err);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        reject(err);
      }
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem('token');
      localStorage.removeItem('refresh-token');
      resolve();
    });
  },
};

const mutations = {
  setUser: (state, user, type) => {
    state.userName = user;
    state.userType = type;
  },
  // setAuth: (state, type) => {
  //   state.auth = type;
  // },

  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success';
    state.token = resp.data.accesToken;
    state.refreshtoken = resp.data.refreshToken;
    state.hasLoadedOnce = true;
    state.userName = resp.data.user.name;
    state.userType = resp.data.user.user_type;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
