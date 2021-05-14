import Vue from 'vue';

const state = {
  stage: '',
  selectie: [],
};

const getters = {
  countSelectie: (state) => {
    return state.selectie.length;
  },
};

const mutations = {
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

  setSearchRennner: (state, renner) => {
    state.searchRenner = renner;
  },
  setSearchTeam: (state, team) => {
    state.searchTeam = team;
  },
};

const actions = {
  removeSelectie: (context, renner) => {
    context.commit('removeFromSelectie', renner);
  },
  removeAll({ commit }) {
    return new Promise((resolve, reject) => {
      commit('deleteSelectie');
      resolve();
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
