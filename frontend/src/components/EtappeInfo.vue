<template>
  <div class="EtappeInfoContainer">
    <img
      v-if="stage.image_url"
      :src="stage.image_url"
      :alt="`${stage.name}-${stage.start_city}-${stage.finish_city}-${stage.stage_nr}`"
      class="EtappeInfoContainer--image etappeimg"
    />

    <div class="EtappeInfoContainer--info">
      <div>
        <h2>
          #{{ stage.stage_nr }}. {{ stage.start_city }} -
          {{ stage.finish_city }}
          <img :src="stage.stage_type" />
        </h2>
        <h4>{{ stage.distance }} km</h4>
        <!-- TODO OR SHOW TOP SELECTED RIDERS, OR SHOW SELECTED RIDERS FROM USER -->
        <div v-show="showRenners">
          <Renner v-for="renner in selectie" :key="renner.cyclist_id" />
        </div>
      </div>
      <slot name="button" class="button"></slot>
    </div>
  </div>
</template>

<script>
import Renner from "@/components/Renner";
export default {
  props: {
    stage: Object,
    showRenners: Boolean,
    selectie: { type: Array, required: false },
  },
  components: {
    Renner,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";
.EtappeInfoContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  background: $white-color;
  margin: 2rem 0;

  &--image {
    max-width: 95%;
    margin: auto;
  }

  &--info {
    .btn {
      margin-top: 2rem;
    }
    h2 {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .EtappeInfoContainer {
    padding: 2rem 3rem;
    border-radius: 15px;

    &--image {
      border-radius: 15px;
    }
    &--info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
