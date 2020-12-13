import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stage: '',
    selectie: [],
    userName: '',
  },
  getters: {
    countSelectie: (state) => {
      return state.selectie.length;
    },
  },
  mutations: {
    addToSelectie: (state, renner) => {
      state.selectie.push(renner);
    },
    removeFromSelectie: (state, renner) => {
      state.selectie.splice(renner, 1);
    },
    deleteSelectie: (state) => {
      state.selectie = [];
    },
    setEtappes: (state, etappe) => {
      state.stage = etappe;
    },
    setUser: (state, user) => {
      state.userName = user;
    },
  },
  actions: {
    removeSelectie: (context, renner) => {
      context.commit('removeFromSelectie', renner);
    },
    removeAll({ commit }) {
      return new Promise((resolve, reject) => {
        commit('deleteSelectie');
        resolve();
      });
    },
  },
  modules: {},
});
