<template>
  <div class="selectedInfo">
    <div :class="countRiders(riderStore.ridersCount)">
      Geselecteerd: {{ riderStore.ridersCount }} van 8 renners
    </div>

    <div
      class="btn"
      :class="countRiders(riderStore.ridersCount)"
      @click="sendSelection"
    >
      {{ sendButton }}
    </div>
    <div class="btn danger" @click="wisSelection">Wis selectie</div>
    <div v-show="riderStore.errorMessage.length >= 1" class="errormessage">
      {{ riderStore.errorMessage }}
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
  props: { stage: Object },

  setup(props) {
    const riderStore = useCyclistStore();
    const startlistStore = useStartlistStore();
    const stage_id = riderStore.riders.stage;
    const route = useRoute();
    const raceInfo = ref();
    const avoidRouteLeave = ref(false);
    const user_id = ref(useAuthStore().getUserID);
    const errorMsg = riderStore.getErrorMessage;
    const sendButton = ref("Verstuur selectie");

    function sendSelection() {
      if (riderStore.ridersCount > 8) {
        riderStore.errorMessage =
          "Je hebt teveel renners geselecteerd! Kies er maximaal 8.";
        setTimeout(() => {
          riderStore.errorMessage = "";
        }, 5000);
        return;
      } else if (riderStore.ridersCount < 8) {
        riderStore.errorMessage =
          "Je hebt nog geen 8 renners geselecteerd. Weet je zeker dat je deze renners wilt opslaan?";
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

      // riderStore.clearStore();
      router.push({
        name: "stageCyclistOverview_confirm",
        params: { stage_id },
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
    }

    function setCyclistSelected(cyclist) {
      const selectedRider = startlistStore.teams[cyclist.team_name].find(
        ({ cyclist_id }) => cyclist.cyclist_id == cyclist_id
      );

      selectedRider.selected = true;
    }

    function countRiders(count) {
      if (count != 8) {
        if (count > 8) {
          return "danger";
        } else {
          return "alert";
        }
      }
      return "action";
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
      countRiders,
    };
  },
});
</script>

<style lang="scss">
.selectedCyclists {
  margin-top: 2rem;
}

.alert {
  color: var(--clr-alert);
  font-weight: 900;
}

.danger {
  color: var(--clr-accent);
  font-weight: 900;
}
</style>
