import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Auth from '../views/Auth';
import EtappeOverzicht from '../views/Etappe/EtappeOverzicht.vue';
import EtappeSingle from '../views/Etappe/_id.vue';
import Selectie from '../views/Selectie.vue';
import Score from '../views/Score/Score.vue';
import ScoreSingle from '../views/Score/_id.vue';
import Uitslagen from '../views/Klassement/Uitslagen.vue';
import AlgKlassement from '../views/Klassement/Algemeen.vue';
import KlassementSingle from '../views/Klassement/_id.vue';
import Spelregels from '../views/Spelregels/Spelregels.vue';
import account from '../views/Account/Account.vue';
import store from '@/store';
import { USER_REQUEST } from '@/store/actions/user';

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/spelregels',
    name: 'Spelregels',
    component: Spelregels,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    props: true,
    meta: {
      guest: true,
    },
  },
  {
    path: '/etappe-overzicht',
    name: 'etappe-overzicht',
    component: EtappeOverzicht,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/etappe-overzicht/:etappeID',
    name: 'etappe-single',
    component: EtappeSingle,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/selectie/:etappeID',
    name: 'selectie',
    component: Selectie,
    beforeEnter: ifAuthenticated,
  },

  {
    path: '/score/',
    name: 'Score',
    component: Score,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/score/:etappeID',
    name: 'score-single',
    component: ScoreSingle,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/uitslagen/',
    name: 'uitslagen',
    component: Uitslagen,

    beforeEnter: ifAuthenticated,
  },
  {
    path: '/algemeen-klassement/',
    name: 'algemeen-klassement',
    component: AlgKlassement,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/klassement/:etappeID',
    name: 'klassement-single',
    props: true,
    component: KlassementSingle,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/account',
    name: 'account',
    component: account,
    beforeEnter: ifAuthenticated,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
