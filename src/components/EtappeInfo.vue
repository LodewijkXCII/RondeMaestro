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
          <div v-for="renner in selectie" :key="renner.cyclist_id">
            <Renner :renner="renner" />
          </div>
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
    stage: { type: Object, required: false },
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
</style>
