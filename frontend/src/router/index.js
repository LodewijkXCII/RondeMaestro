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

// import { isLoggedIn } from '../utils/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: '/etappe-overzicht',
    name: 'etappe-overzicht',
    component: EtappeOverzicht,
  },
  {
    path: '/etappe-overzicht/:etappeID',
    name: 'etappe-single',
    component: EtappeSingle,
  },
  {
    path: '/:etappeID/selectie',
    name: 'selectie',
    component: Selectie,
  },
  {
    path: '/etappe-uitslag',
    name: 'etappe-uitslag',
    component: EtappeUitslag,
  },
  {
    path: '/etappe-uitslag/:etappeID',
    name: 'uitslag-single',
    component: UitslagSingle,
  },
  {
    path: '/score/',
    name: 'Score',
    component: Score,
  },
  {
    path: '/score/:etappeID',
    name: 'score-single',
    component: ScoreSingle,
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name == 'login' && isLoggedIn()) {
//     next({ path: '/' });
//   } else if (!to.meta.allowAnonymous && !isLoggedIn()) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath },
//     });
//   } else {
//     next();
//   }
// });

export default router;
