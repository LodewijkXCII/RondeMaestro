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
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
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
];

const router = new VueRouter({
  routes,
});

export default router;
