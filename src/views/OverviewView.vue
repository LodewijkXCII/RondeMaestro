<template>
  <main class="wrapper flow">
    <StageComponent :stage="stage" />

    <section class="cyclistOverview">
      <Startlist :key="compkey" :teams="teams" />

      <aside>
        <h2>Geselecteerde renners</h2>
        <SelectedRiders :key="compkey" />
      </aside>
    </section>
  </main>
</template>

<script>
import { ref, onMounted, defineComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import RennerSmallCard from "../components/RennerSmallCard.vue";
import SelectedRiders from "../components/SelectedRiders.vue";
import StageComponent from "../components/StageComponent.vue";
import Startlist from "../components/Startlist.vue";

import { useCyclistStore } from "../stores/selectedRiders";

import _ from "lodash";

export default defineComponent({
  components: {
    RennerSmallCard,
    SelectedRiders,
    StageComponent,
    Startlist,
  },

  setup() {
    const teams = ref();
    const stage = ref({
      stage_nr: Number,
      start_city: String,
      finish_city: String,
      distance: Number,
      name: String,
      stage_type: String,
    });
    const compkey = ref(0);
    const route = useRoute();
    const router = useRouter();
    let stage_id = ref(route.params.stage_id);

    router.isReady();
    const riderStore = useCyclistStore();

    onMounted(async () => {
      getCyclistData();
      getStageData();
    });
    watch(route, () => {
      teams.value = [];
      riderStore.riders = {
        stage: route.params.stage_id,
        renners: [],
      };

      compkey.value += 1;
      getCyclistData();
      getStageData();
    });

    const getCyclistData = async () => {
      try {
        const { data, status } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/startlist?race_id=${parseInt(
            route.params.race_id
          )}`,
        });

        if (status == 200) {
          teams.value = _(data)
            .orderBy((renner) => renner.race_number)
            .groupBy((renner) => renner.team_name)
            .value();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getStageData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/stages/${parseInt(
            route.params.stage_id
          )}`,
        });

        if (data) {
          console.log(data);
          stage.value = data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      getCyclistData,
      getStageData,
      compkey,
      teams,
      stage,
      stage_id,
    };
  },
});
</script>

<style lang="scss" scoped>
.cyclistOverview {
  display: grid;
  grid-template-columns: 75% auto;
  gap: 2rem;

  h2 {
    margin-bottom: 1.5rem;
  }
}
</style>
