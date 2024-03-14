<template>
  <DefaultLayout>
    <main class="wrapper wrapper-small flow">
      <h1>Ritoverzicht</h1>
      <Legenda />
      <StageTable :stageInfo="stageInfo" :routerAction="'stage'" />
    </main>
  </DefaultLayout>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import StageTable from "../components/stage/StageTable.vue";
import Legenda from "../components/Legenda.vue";

import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout.vue";

export default {
  components: {
    StageTable,
    Legenda,
    DefaultLayout,
  },

  setup() {
    const route = useRoute();

    let stageInfo = ref();
    let raceInfo = ref();

    const getRaceInfo = async () => {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/stages?race=${
            route.params.race_id
          }&year=${new Date().getFullYear()}`
        )
        .then((response) => {
          stageInfo.value = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const getStageData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/race/${parseInt(
            route.params.race_id
          )}`,
        });

        if (data) {
          raceInfo.value = data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    getRaceInfo();
    getStageData();

    return {
      stageInfo,
      raceInfo,
      getStageData,
      getRaceInfo,
    };
  },
};
</script>

<style>
.list-title > ul {
  margin-top: 0;
}

li.accent::before {
  background: var(--clr-accent);
}
li.accent-green::before {
  background: var(--clr-accent-green);
}
li.secondary::before {
  background: var(--clr-secondary);
}
</style>
