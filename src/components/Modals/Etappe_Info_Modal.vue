<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click="$emit('close')">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <font-awesome-icon :icon="['fas', 'times']" @click="$emit('close')" />
        </div>

        <etappe-info v-show="stage" :stage="stage" :selectie="renners"> </etappe-info>
        <renner-stats v-show="renners" :renners="renners"> </renner-stats>
      </div>
    </div>
  </div>
</template>

<script>
import EtappeInfo from "../EtappeInfo.vue";
import RennerStats from "../RennerStats.vue";
import Renner from "../Renner.vue";
export default {
  components: { EtappeInfo, RennerStats, Renner },
  props: {
    stage: { type: Object, required: false },
    renners: { type: Array, required: false },
  },
};
</script>

<style lang="scss">
.etappeimg {
  width: 100%;
  height: auto;
}
</style>
