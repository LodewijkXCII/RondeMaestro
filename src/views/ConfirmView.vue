<script>
import { ref, defineComponent, onMounted } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useCyclistStore } from "../stores/selectedRiders";
import RennerLargeCard from "../components/RennerLargeCard.vue";

import router from "../router";
import axios from "axios";

export default defineComponent({
  components: { RennerLargeCard },

  setup() {
    const riderStore = useCyclistStore();
    const selectedRiders = ref();
    const stageData = ref();
    const route = useRoute();

    onMounted(async () => {
      await getStageData();
    });

    const getStageData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/stages/${parseInt(
            route.params.stage_id
          )}`,
        });

        if (data) {
          stageData.value = data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    selectedRiders.value = riderStore.riders.renners.forEach((renner) => {
      renner.selected = false;
    });

    const goToOverview = () => {
      router.push({
        name: "raceStageOverview",
        params: {
          race_id: +stageData.value.race_id,
          race: stageData.value.name.replace(" ", "-").toLowerCase(),
        },
      });
    };
    const goToStage = () => {
      router.push({
        name: "stageCyclistOverview",
        params: {
          race_id: stageData.value.race_id,
          stage_id: stageData.value.stage_id,
          city: `${stageData.value.start_city
            .replaceAll(" ", "-")
            .toLowerCase()}-${stageData.value.finish_city
            .replaceAll(" ", "-")
            .toLowerCase()}`,
        },
      });
    };

    return {
      riderStore,
      getStageData,
      stageData,
      selectedRiders,
      goToOverview,
      goToStage,
    };
  },
});
</script>

<template>
  <div class="wrapper">
    <main class="wrapper wrapper-small flow">
      <h1>Je selectie is opgeslagen</h1>
      <div v-if="stageData">
        <p>
          Voor etappe {{ stageData.stage_nr }} {{ stageData.start_city }} -
          {{ stageData.finish_city }} heb je de volgende renners geselecteerd.
        </p>
        <p>Succes en veel kijkplezier!</p>
      </div>

      <div class="btn danger" @click="goToOverview">Etappe overzicht</div>
      <div class="btn action" @click="goToStage">Selectie aanpassen</div>

      <div class="selectedCyclists-overview">
        <RennerLargeCard
          v-for="renner in riderStore.riders.renners"
          :renner="renner"
          :icon="''"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
.selectedCyclists-overview {
  display: grid;
  grid-template-columns: repeat(4, min-content);
  gap: 1rem;
}
</style>
