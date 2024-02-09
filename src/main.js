import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import setupInterceptors from "./utils/api";

import FlagIcon from "vue-flag-icon";
import VueCountdown from "@chenfengyuan/vue-countdown";

// Unicon icons //
import Unicon from "vue-unicons";
import {
  uniPlus,
  uniTimesCircle,
  uniMinus,
  uniUsersAlt,
  uniTrophy,
  uniAngleDown,
  uniInfoCircle,
} from "vue-unicons/dist/icons";

Unicon.add([
  uniPlus,
  uniTimesCircle,
  uniMinus,
  uniUsersAlt,
  uniTrophy,
  uniAngleDown,
  uniInfoCircle,
]);

import "./assets/main.scss";

const app = createApp(App);

app.use(router);
app.use(Unicon);
app.use(FlagIcon);
app.component(VueCountdown.name, VueCountdown);
app.use(createPinia());

setupInterceptors();
app.mount("#app");
