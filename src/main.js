import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import setupInterceptors from "./api/api";

import FlagIcon from "vue-flag-icon";

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

setupInterceptors();

const app = createApp(App);

app.use(Unicon);
app.use(FlagIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
