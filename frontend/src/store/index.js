import Vue from 'vue';
import Vuex from 'vuex';
import renner from './modules/renner';
import auth from './modules/auth';
import user from './modules/user';
import stage from './modules/stage';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    renner,
    auth,
    user,
    stage,
  },
  strict: debug,
});

export default store;
