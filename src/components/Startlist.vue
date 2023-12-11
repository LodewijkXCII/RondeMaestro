<template>
  <main class="">
    <h2>Teams en renners</h2>
    <div class="cyclistSelector">
      <div v-for="(item, index) in startlistStore.teams">
        <div class="team-info">
          <h3>{{ index }}</h3>
          <img
            :src="
              'https://rondemaestro.s3.eu-central-1.amazonaws.com/teams/' +
              item[0].team_img
            "
            :alt="index"
            class="team-image"
          />
        </div>
        <RennerSmallCard
          v-for="renner in item"
          :renner="renner"
          :icon="'plus'"
          @click="toSelectie(renner)"
          :key="renner.id"
          class="selectie"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted, defineComponent } from "vue";
import { useRoute } from "vue-router";

import { useCyclistStore } from "../stores/selectedRiders";
import { useStartlistStore } from "../stores/startlistRace";
import RennerSmallCard from "./RennerSmallCard.vue";
import { useAuthStore } from "../stores/userAuth";

import axios from "axios";
import _ from "lodash";

export default defineComponent({
  components: {
    RennerSmallCard,
  },

  setup() {
    const riderStore = useCyclistStore();
    const startlistStore = useStartlistStore();
    const route = useRoute();

    onMounted(async () => {
      try {
        const { data, status } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/startlist?race_id=${parseInt(
            route.params.race_id
          )}`,
        });

        if (status == 200) {
          data.forEach((cyclist) => {
            cyclist.selected = false;
          });
          startlistStore.teams = _(data)
            .orderBy((renner) => renner.race_number)
            .groupBy((renner) => renner.team_name)
            .value();
        }
      } catch (error) {
        console.error(error);
      }
    });

    const toSelectie = (renner) => {
      if (
        riderStore.riders.renners.some((e) => e.cyclist_id == renner.cyclist_id)
      ) {
        renner.selected = false;
        return riderStore.removeRider(renner);
      }
      renner.selected = true;
      riderStore.madeChange();
      return riderStore.addRider(renner);
    };

    return {
      toSelectie,
      startlistStore,
    };
  },
});
</script>

<style lang="scss">
.cyclistSelector {
  display: grid;
  grid-template-columns: var(--rider-card-width);
  grid-auto-rows: auto;
  gap: 1rem;
  position: relative;

  &::after {
    --border-width: 0.5rem;
    content: "";
    height: 100%;
    width: var(--border-width);
    background: var(--clr-primary);
    position: absolute;
    right: calc(var(--border-width) * -2);
  }

  // @include md {

  // }
  @include md {
    grid-template-columns: var(--rider-card-width);
  }
  @include lg {
    grid-template-columns: repeat(2, var(--rider-card-width));
  }
  @include xl {
    grid-template-columns: repeat(3, var(--rider-card-width));
  }
}
.selectedCyclists {
  position: relative;
}
.team-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .team-image {
    width: 50px;
  }
}
</style>
