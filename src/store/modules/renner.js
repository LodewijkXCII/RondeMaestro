import Vue from 'vue';

const state = {
  selectie: [],
  selectedID: null,
};

const getters = {
  countSelectie: (state) => {
    return state.selectie.length;
  },
  selectedID: (state) => state.selectedID,
};

const mutations = {
  addToSelectie: (state, renner) => {
    state.selectie.push(renner);
  },
  removeFromSelectie: (state, index) => {
    state.selectie[index].selected = false;
    state.selectedID = state.selectie[index];
    state.selectie.splice(index, 1);
  },
  deleteSelectie: (state) => {
    const foo = new Promise((resolve, reject) => {
      state.selectie.forEach(
        function(renner, i) {
          console.log(renner, i);
          state.selectedID = renner;
          state.selectie.splice(i, 1);
          if (i === state.selectie.length - 1) resolve();
        }
        // (renner.selected = false)
      );
    });

    foo.then(() => {
      console.log('All done!');
    });
  },

  changeSelected: (state, renner) => {
    const index = state.selectie.findIndex((r) => r.id == renner.id);
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
  removeAll(e) {
    return new Promise((resolve, reject) => {
      e.commit('deleteSelectie');
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
