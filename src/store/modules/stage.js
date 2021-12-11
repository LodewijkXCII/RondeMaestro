const state = {
  stage: '',
};

const getters = {
  getStage: (state) => state.stage,
};

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
