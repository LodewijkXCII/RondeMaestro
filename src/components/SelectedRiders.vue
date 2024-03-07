<template>
  <div class="selectedInfo">
    <p :class="countRiders(riderStore.ridersCount)">
      {{ riderStore.ridersCount }} van 8 renners geslecteerd
    </p>

    <div
      class="btn"
      :class="countRiders(riderStore.ridersCount)"
      @click="sendSelection"
    >
      {{ sendButton }}
    </div>
    <div class="btn danger" @click="wisSelection">Wis selectie</div>
    <SelectError
      v-show="errorMessage.length > 0"
      :message="errorMessage"
      :type="countRiders(riderStore.ridersCount)"
    >
    </SelectError>
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

import messages from "../utils/responseError";

import RennerSmallCard from "../components/RennerSmallCard.vue";

import { useCyclistStore } from "../stores/selectedRiders";
import { useStartlistStore } from "../stores/startlistRace";
import { useAuthStore } from "../stores/userAuth";
import router from "../router";
import SelectError from "./modals/SelectError.vue";

import Swal from "sweetalert2";

export default defineComponent({
  components: { RennerSmallCard, SelectError },

  setup() {
    const route = useRoute();

    const raceInfo = ref();

    const errorMessage = ref("");
    const user_id = ref(useAuthStore().getUserID);

    const riderStore = useCyclistStore();
    const startlistStore = useStartlistStore();

    const avoidRouteLeave = ref(false);
    const changesMade = riderStore.changesMade;
    const confirmNeeded = riderStore.confirmNeeded;

    const stage_id = riderStore.riders.stage;

    const sendButton = ref("Verstuur selectie");

    async function sendSelection() {
      try {
        await checkRiderCount();

        await axios.delete(
          `${import.meta.env.VITE_API_URL}/entries?stage_id=${parseInt(
            stage_id
          )}&users_id=${user_id.value}`
        );

        await riderStore.riders.renners.forEach(async (renner) => {
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

        router.push({
          name: "stageCyclistOverview_confirm",
          params: { stage_id },
        });
      } catch (error) {
        console.error(error);
        return;
      }
    }

    async function checkRiderCount() {
      if (riderStore.ridersCount > 8) {
        errorMessage.value = messages.MORE_THAN_EIGTH;
        throw new Error("teveel renners geselecteerd");
      } else if (riderStore.ridersCount < 8) {
        errorMessage.value = messages.LESS_THAN_EIGTH;

        await Swal.fire({
          icon: "warning",
          title: "Let op:",
          text: messages.LESS_THAN_EIGTH,
          showDenyButton: true,

          confirmButtonText: "Ja",
          denyButtonText: "Nee",
          customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            denyButton: "order-3",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            return;
          } else if (result.isDenied) {
            throw new Error("geen accept");
          }
        });
      }

      sendButton.value = "Versturen...";
    }

    function wisSelection() {
      riderStore.riders.renners.forEach((renner) => {
        startlistStore.removeSelected(renner);
        riderStore.removeSelected(renner);
      });
    }

    function deleteRenner(rennerIndex, renner) {
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
          riderStore.needConfirm(true);
          return "alert";
        }
      }
      errorMessage.value = "";
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
          riderStore.changesMade = false;
        }
        if (raceData) {
          raceInfo.value = raceData;
        }
      } catch (error) {
        console.error(error);
      }
    });
    onBeforeRouteLeave((to, from, next) => {
      if (avoidRouteLeave.value) {
        next();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Er zijn wijzigingen",
          text: "Weet je zeker dat je zonder opslaan wil doorgaan?",
          showDenyButton: true,

          confirmButtonText: "Ja",
          denyButtonText: "Nee",
          customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            denyButton: "order-3",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            riderStore.clearStore();
            next();
          } else if (result.isDenied) {
            return false;
          }
        });
      }
    });
    return {
      avoidRouteLeave,
      changesMade,
      confirmNeeded,
      deleteRenner,
      wisSelection,
      raceInfo,
      riderStore,
      startlistStore,
      sendSelection,
      sendButton,
      errorMessage,
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
