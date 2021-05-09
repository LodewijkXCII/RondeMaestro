import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stage: '',
    selectie: [],
    userName: '',
    userType: '',
  },
  getters: {
    countSelectie: (state) => {
      return state.selectie.length;
    },
    getUserName: (state) => {
      return state.userName;
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
    setUser: (state, user, type) => {
      state.userName = user;
      state.userType = type;
    },
    setSearchRennner: (state, renner) => {
      state.searchRenner = renner;
    },
    setSearchTeam: (state, team) => {
      state.searchTeam = team;
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
