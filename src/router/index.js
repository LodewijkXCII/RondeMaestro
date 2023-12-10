import { createRouter, createWebHistory } from "vue-router";
import { useCyclistStore } from "../stores/selectedRiders";
import { useAuthStore } from "../stores/userAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: { layout: "LoginLayout" },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/:race_id/:race/etappe-overzicht",
      name: "raceStageOverview",
      component: () => import("../views/StagesView.vue"),
    },
    {
      path: "/:race_id/:race/klassement",
      name: "klassementOverview",
      component: () => import("../views/KlassementOverview.vue"),
    },
    {
      path: "/:race_id/etappe/:stage_id/:city",
      name: "stageCyclistOverview",
      component: () => import("../views/OverviewView.vue"),
      beforeEnter: (to) => {
        const riderStore = useCyclistStore();
        riderStore.riders.stage = +to.params.stage_id;
      },
    },
    {
      path: "/uitslag/:race_id/",
      name: "resultOverview",
      component: () => import("../views/ResultOverview.vue"),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = useAuthStore().getLoggedInValue;

//   if (to.name !== "login" && !isAuthenticated && from.path !== "login")
//     return next({ name: "login" });
//   else return next();
// });

export default router;
