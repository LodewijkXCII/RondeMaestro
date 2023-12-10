<template>
  <div class="selectedInfo">
    <div :class="riderStore.ridersCount > 8 ? 'red' : ''">
      Geselecteerd: {{ riderStore.ridersCount }} van 8 renners
    </div>

    <div class="btn btn-action" @click="sendSelection">{{ sendButton }}</div>
    <div class="btn btn-danger" @click="wisSelection">Wis selectie</div>
    <div v-show="errorMsg.length >= 1" class="errormessage">
      {{ errorMsg }}
    </div>
  </div>
  <div class="selectedCyclists">
    <RennerSmallCard
      v-for="(renner, index) in riderStore.riders.renners"
      :renner="renner"
      :icon="'minus'"
      @click="deleteRenner(index, renner)"
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
import { useStartlistStore } from "../stores/startlistRace";
import { useAuthStore } from "../stores/userAuth";
import router from "../router";

export default defineComponent({
  components: { RennerSmallCard },

  setup() {
    const riderStore = useCyclistStore();
    const startlistStore = useStartlistStore();
    const stage_id = riderStore.riders.stage;
    const route = useRoute();
    const raceInfo = ref();
    const avoidRouteLeave = ref(false);
    // const user_id = ref(useAuthStore().getUserID);
    const user_id = ref(1);
    const errorMsg = ref("");

    const sendButton = ref("Verstuur selectie");

    function sendSelection() {
      if (riderStore.ridersCount > 8) {
        errorMsg.value =
          "Je hebt teveel renners geselecteerd! Kies er maximaal 8.";
        setTimeout(() => {
          errorMsg.value = "";
        }, 5000);
        return;
      }

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

    function wisSelection() {
      riderStore.riders.renners.forEach((renner) => {
        startlistStore.removeSelected(renner);
        riderStore.removeSelected(renner);
      });
      riderStore.madeChange();
    }

    function deleteRenner(rennerIndex, renner) {
      riderStore.madeChange();
      startlistStore.removeSelected(renner);
      riderStore.removeRiderByIndex(rennerIndex);

      return;
    }

    function setCyclistSelected(cyclist) {
      const selectedRider = startlistStore.teams[cyclist.team_name].find(
        ({ cyclist_id }) => cyclist.cyclist_id == cyclist_id
      );

      selectedRider.selected = true;
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
            setCyclistSelected(newRenner);
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
      if (avoidRouteLeave.value || riderStore.selectionChanges == false) {
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
    return {
      avoidRouteLeave,
      deleteRenner,
      wisSelection,
      raceInfo,
      riderStore,
      startlistStore,
      sendSelection,
      sendButton,
      errorMsg,
    };
  },
});
</script>

<style lang="scss">
.selectedCyclists {
  margin-top: 2rem;
}

.red {
  color: var(--clr-accent);
  font-weight: 900;
}
</style>
