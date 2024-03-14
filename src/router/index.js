import { createRouter, createWebHistory } from "vue-router";
import { useCyclistStore } from "../stores/selectedRiders";
import { useCurrentRaceStore } from "../stores/currentRace";

import { authGuard } from "../guards/authGuard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: true },
      beforeEnter(to, from, next) {
        const currentRaceStore = useCurrentRaceStore();
        if (!currentRaceStore.currentRace.race_id.value) {
          currentRaceStore.setCurrentRace();
        }
        next();
      },
    },
    {
      path: "/inloggen",
      name: "inloggen",
      component: () => import("../views/Login.vue"),
      meta: { layout: "LoginLayout" },
    },
    {
      path: "/registeren",
      name: "registeren",
      component: () => import("../views/Signup.vue"),
      meta: { layout: "LoginLayout" },
    },

    {
      path: "/:race_id/:race/etappe-overzicht",
      name: "raceStageOverview",
      component: () => import("../views/StagesView.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/:race_id/:race/klassement",
      name: "klassementOverview",
      component: () => import("../views/KlassementOverview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:race_id/etappe/:stage_id/:city",
      name: "stageCyclistOverview",
      component: () => import("../views/OverviewView.vue"),
      beforeEnter: (to) => {
        const riderStore = useCyclistStore();
        riderStore.riders.stage = +to.params.stage_id;
      },
      meta: { requiresAuth: true },
    },
    {
      path: "/:stage_id/bevestiging",
      name: "stageCyclistOverview_confirm",
      component: () => import("../views/ConfirmView.vue"),
      beforeEnter: (to, from, next) => {
        if (from.name == "stageCyclistOverview" && from.params) {
          return next();
        } else {
          return next({ name: "home" });
        }
      },
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/uitslag/:race_id",
      name: "resultOverview",
      component: () => import("../views/ResultOverview.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    authGuard(to, from, next);
  } else {
    next();
  }
});

export default router;
