import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Signin from '../views/Signin.vue';
import Signup from '../views/Signup.vue';
import EtappeOverzicht from '../views/Etappe/EtappeOverzicht.vue';
import EtappeSingle from '../views/Etappe/_id.vue';
import Selectie from '../views/RennerOverview.vue';
import EtappeUitslag from '../views/Uitslag/EtappeUitslag.vue';
import UitslagSingle from '../views/Uitslag/_id.vue';
import Score from '../views/Score/Score.vue';
import ScoreSingle from '../views/Score/_id.vue';
import Klassement from '../views/Klassement/Klassement.vue';
import AlgKlassement from '../views/Klassement/Algemeen.vue';
import KlassementSingle from '../views/Klassement/_id.vue';

// import { isLoggedIn } from '../utils/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: {
      guest: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
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
    path: '/:etappeID/selectie',
    name: 'selectie',
    component: Selectie,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/etappe-uitslag',
    name: 'etappe-uitslag',
    component: EtappeUitslag,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/etappe-uitslag/:etappeID',
    name: 'uitslag-single',
    component: UitslagSingle,
    meta: {
      requiresAuth: true,
      isAdmin: true,
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
    path: '/klassement/',
    name: 'klassement',
    component: Klassement,
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
    component: KlassementSingle,
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
        path: '/signin',
        query: { nextUrl: to.fullPath },
      });
    } else {
      let user = localStorage.getItem('user');
      // if (to.matched.some((record) => record.meta.is_admin)) {
      //   if (user.is_admin == 1) {
      //     next();
      //   } else {
      //     next({ name: 'dashboard' });
      //   }
      // } else {
      next();
      // }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next();
    } else {
      next({ name: 'dashboard' });
    }
  } else {
    next();
  }
});

export default router;
