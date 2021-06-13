import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';
import Vue from 'vue';
import { AUTH_LOGOUT } from '../actions/auth';

import routes from '@/api/routes';

import { decodeToken } from '@/utils/auth';

const state = { status: '', profile: {} };

const getters = {
  getProfile: (state) => state.profile,
  isProfileLoaded: (state) => !!state.profile.name,
};

const actions = {
  [USER_REQUEST]: async ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    const token = localStorage.getItem('token');
    const { id } = decodeToken(token);

    await routes
      .find(`users/${id}`)
      .then((resp) => {
        commit(USER_SUCCESS, resp.data);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  },
};

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success';
    Vue.set(state, 'profile', resp);
  },
  [USER_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
