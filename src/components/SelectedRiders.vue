<template>
  <div class="selectedInfo">
    <div>Geselecteerd: {{ riderStore.ridersCount }} van 8 renners</div>
    <div class="btn btn-action" @click="sendSelection">{{ sendButton }}</div>
    <div class="btn btn-danger">Wis selectie</div>
  </div>
  <div class="selectedCyclists">
    <RennerSmallCard
      v-for="(renner, index) in riderStore.riders.renners"
      :renner="renner"
      :icon="'minus'"
      @click="deleteRenner(index)"
      class="selectie"
    />
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import axios from "axios";

import RennerSmallCard from "../components/RennerSmallCard.vue";

import { useCyclistStore } from "../stores/selectedRiders";
import { useAuthStore } from "../stores/userAuth";
import router from "../router";

export default defineComponent({
  components: { RennerSmallCard },

  setup() {
    const riderStore = useCyclistStore();
    const stage_id = riderStore.riders.stage;
    const route = useRoute();
    const raceInfo = ref();
    const avoidRouteLeave = ref(false);
    const user_id = ref(useAuthStore().getUserID);

    const sendButton = ref("Verstuur selectie");

    function sendSelection() {
      sendButton.value = "Versturen...";

      axios.delete(
        `${import.meta.env.VITE_API_URL}/entries?stage_id=${parseInt(
          stage_id
        )}&users_id=${user_id.value}`
      );

      riderStore.riders.renners.forEach(async (renner) => {
        const body = {
          users_id: user_id.value,
          cyclist_id: renner.cyclist_id,
        };
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/entries?stage_id=${parseInt(
              stage_id
            )}`,
            body
          );
        } catch (error) {
          console.error(error);
        }
      });
      sendButton.value = "Opgeslagen!";

      avoidRouteLeave.value = true;

      riderStore.clearStore();
      router.push({
        name: "raceStageOverview",
        params: { race_id: raceInfo.value.id, race: raceInfo.value.name },
      });
    }

    onMounted(async () => {
      try {
        const { data: entryData } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/entries?stage_id=${parseInt(
            stage_id
          )}&users_id=${user_id.value}`,
        });

        const { data: raceData } = await axios.get(
          `${import.meta.env.VITE_API_URL}/race/${+route.params.race_id}`
        );

        if (entryData) {
          entryData.forEach((renner) => {
            const newRenner = { ...renner, selected: true };

            riderStore.addRider(newRenner);
          });
        }
        if (raceData) {
          raceInfo.value = raceData;
        }
      } catch (error) {
        console.error(error);
      }
    });
    onBeforeRouteLeave((to, from, next) => {
      if (avoidRouteLeave.value || riderStore.ridersCount == 0) {
        next();
      } else {
        const answer = window.confirm(
          "Do you really want to leave? you have unsaved changes!"
        );

        if (answer) {
          riderStore.clearStore();
          next();
        }
        // cancel the navigation and stay on the same page
        else {
          return false;
        }
      }
    });
    return { avoidRouteLeave, raceInfo, riderStore, sendSelection, sendButton };
  },
});
</script>

<style lang="scss">
.selectedCyclists {
  margin-top: 2rem;
}
</style>
