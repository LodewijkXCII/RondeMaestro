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
  removeFromSelectie: (state, index) => {
    state.selectie[index].selected = false;
    state.selectie.splice(index, 1);
  },
  deleteSelectie: (state) => {
    state.selectie = [];
  },
  setEtappes: (state, etappe) => {
    state.stage = etappe;
  },
  changeSelected: (state, renner) => {
    console.log('state', state.selectie);
    console.log('renner', renner);
    const index = state.selectie.findIndex((r) => r.id == renner.id);
    console.log(index);
  },
};

const actions = {
  removeSelectie: (context, renner) => {
    context.commit('removeFromSelectie', renner);
  },
  removeSelected({ commit }, renner) {
    return new Promise((resolve, reject) => {
      console.log('vuex', renner);
      commit('changeSelected', renner);
      resolve();
    });
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
