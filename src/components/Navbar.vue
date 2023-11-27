<template>
  <nav class="wrapper">
    <div class="wrapper navbar">
      <router-link to="/">
        <img src="../assets/logo.svg" class="brand-logo" />
      </router-link>
      <div class="nav-links">
        <router-link
          :to="{
            name: 'raceStageOverview',
            params: {
              race_id: 39,
              race: 'le-tour-de-france-2023',
            },
          }"
          class="nav-item"
        >
          Renners selecteren
        </router-link>
        <router-link
          :to="{
            name: 'resultOverview',
            params: {
              race_id: 39,
            },
          }"
          class="nav-item"
        >
          Uitslagen
        </router-link>

        <router-link
          :to="{
            name: 'raceStageOverview',
            params: {
              race_id: 39,
              race: 'le-tour-de-france-2023',
            },
          }"
          class="nav-item"
        >
          Klassement
        </router-link>

        <!-- <router-link
          :to="{
            name: 'raceStageOverview',
            params: {
              race_id: 39,
              race: 'le-tour-de-france-2023',
            },
          }"
          class="nav-item"
        >
          Ploegenspel
        </router-link> -->
      </div>
      <div class="nav-right">
        <div class="nav-item nav-next-stage">
          Volgende etappe:

          <span v-if="nextStage">
            {{ nextStage.stage_nr }}. {{ nextStage.start_city }} -
            {{ nextStage.finish_city }}
          </span>
        </div>
        <Username />
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";
import { defineComponent, ref } from "vue";
import Username from "./Username.vue";
import axios from "axios";
import router from "../router";

export default defineComponent({
  components: {
    Username,
  },
  methods: {
    goToStage(etappe) {
      router.replace({
        name: "stageCyclistOverview",
        params: {
          race_id: etappe.race_id,
          stage_id: etappe.id,
          city: `${etappe.start_city
            .replaceAll(" ", "-")
            .toLowerCase()}-${etappe.finish_city
            .replaceAll(" ", "-")
            .toLowerCase()}`,
        },
      });
    },

    getTime(timestamp) {
      return DateTime.fromISO(timestamp).setLocale("nl").toFormat("d MMM y");
    },
  },
  setup() {
    const nextStage = ref();
    const showDropdown = ref(false);

    const token = ref();
    token.value = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}/stages/upcoming`)
      .then((response) => {
        nextStage.value = response.data;
      })
      .catch((err) => {
        console.error(err);
      });

    return { nextStage, showDropdown, token };
  },
});
</script>

<style lang="scss" scoped>
nav {
  padding: 1rem 2rem;
  background: var(--clr-background-mute);
  margin-bottom: 1em;
  width: 100%;

  .navbar {
    display: flex;
    gap: 1em;
  }
  .brand-logo {
    max-width: 100px;
    margin-right: 2rem;
  }
  .nav-links {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .nav-right {
    margin-left: auto;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .nav-item {
    text-transform: uppercase;
    font-weight: 400;
    text-decoration: none;
    color: var(--clr-text);
    font-size: var(--fs-300);
    fill: var(--clr-text);

    &:hover {
      --border-size: 2px;
      border-bottom: var(--border-size) solid var(--clr-primary);
      margin-bottom: calc(var(--border-size) * -1);
    }
  }

  .nav-next-stage {
    font-weight: 100;
    text-transform: initial;

    span {
      color: var(--clr-secondary);
      padding-top: 0.25rem;
      text-transform: uppercase;
      font-size: var(--fs-300);
      font-weight: bold;
      // display: block;
      cursor: pointer;
    }

    &:hover {
      border: none;
      margin-bottom: 0;
    }
  }
  .nav-dropdown-wrapper {
    position: relative;
  }
  .nav-dropdown {
    position: absolute;
    color: var(--clr-text);
    background: var(--clr-background-mute);
    width: max-content;

    .nav-item-dropdown {
      cursor: pointer;
    }
  }
}
</style>
