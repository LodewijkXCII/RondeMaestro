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

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next({
          path: '/dashboard',
        });
      }
      next();
    },
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
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/etappe-overzicht/:etappeID',
    name: 'etappe-single',
    component: EtappeSingle,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/selectie/:etappeID',
    name: 'selectie',
    component: Selectie,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/score/',
    name: 'Score',
    component: Score,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/score/:etappeID',
    name: 'score-single',
    component: ScoreSingle,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/uitslagen/',
    name: 'uitslagen',
    component: Uitslagen,

    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/algemeen-klassement/',
    name: 'algemeen-klassement',
    component: AlgKlassement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/klassement/:etappeID',
    name: 'klassement-single',
    props: true,
    component: KlassementSingle,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/account',
    name: 'account',
    component: account,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/auth',
        query: { nextUrl: to.fullPath },
      });
    } else if (to.matched.some((record) => record.meta.isAdmin)) {
      if (
        // TODO GET USER_TYPE_ID FROM STORE
        +localStorage.user_type_id === 3 ||
        +localStorage.user_type_id === 6
      ) {
        next();
      } else {
        console.error('Je hebt geen admin rechten');
        next({ name: 'Dashboard' });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
