const state = {
  race_id: 35,
  loading: false,
};

const getters = {
  getRaceID: (state) => state.race_id,
  getLoading: (state) => state.loading,
};

const actions = {};

const mutations = {
  toggleLoading: (state) => {
    state.loading = !state.loading;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
