<template>
  <main class="">
    <h2>Teams en renners</h2>
    <div class="cyclistSelector">
      <div v-for="(item, index) in teams">
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
import { useCyclistStore } from "../stores/selectedRiders";
import RennerSmallCard from "./RennerSmallCard.vue";
export default {
  components: {
    RennerSmallCard,
  },
  props: {
    teams: Object,
  },
  setup() {
    const riderStore = useCyclistStore();
    const toSelectie = (renner) => {
      if (
        riderStore.riders.renners.some((e) => e.cyclist_id == renner.cyclist_id)
      ) {
        renner.selected = false;
        return riderStore.removeRider(renner);
      }
      renner.selected = true;
      return riderStore.addRider(renner);
    };

    return {
      toSelectie,
    };
  },
};
</script>

<style lang="scss">
.cyclistSelector {
  display: grid;
  grid-template-columns: repeat(3, var(--rider-card-width));
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
