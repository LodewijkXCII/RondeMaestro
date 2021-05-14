const state = {
  stage: '',
};

const getters = {};

const mutations = {
  setEtappes: (state, etappe) => {
    state.stage = etappe;
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
