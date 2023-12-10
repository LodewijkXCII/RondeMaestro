<template>
  <nav class="wrapper">
    <div class="navbar">
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
            name: 'klassementOverview',
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
            <router-link
              :to="{
                name: 'stageCyclistOverview',
                params: {
                  race_id: nextStage.race_id,
                  stage_id: nextStage.id,
                  city: getCityNextStage(nextStage),
                },
              }"
            >
              {{ nextStage.stage_nr }}. {{ nextStage.start_city }} -
              {{ nextStage.finish_city }}
            </router-link>
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

    getCityNextStage(nextStage) {
      return `${nextStage.start_city
        .replaceAll(" ", "-")
        .toLowerCase()}-${nextStage.finish_city
        .replaceAll(" ", "-")
        .toLowerCase()}`;
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
  padding: 1rem;
  background: var(--clr-background-mute);
  margin-bottom: 1em;
  width: 100%;
  position: relative;

  .navbar {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .brand-logo {
    max-width: 100px;
    margin-right: 2rem;
  }
  .nav-links {
    gap: 1rem;
    align-items: center;
    display: flex;

    @media (max-width: 576px) {
      align-items: center;
      position: absolute;
      bottom: -45px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: var(--clr-primary);
      padding: 0.75rem;
      margin-left: -1rem;
    }

    .router-link-active {
      font-weight: 900;
      --border-size: 2px;
      border-bottom: var(--border-size) solid var(--clr-primary);
      margin-bottom: calc(var(--border-size) * -1);
      @media (max-width: 576px) {
        border-color: var(--clr-text-white);
      }
    }
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

    @media (max-width: 576px) {
      color: var(--clr-text-white);
    }
  }

  .nav-next-stage {
    font-weight: 100;
    text-transform: initial;
    width: 20ch;
    color: var(--clr-text);

    span {
      color: var(--clr-secondary);
      padding-top: 0.25rem;
      text-transform: uppercase;
      font-size: var(--fs-300);
      font-weight: bold;
      display: block;
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
