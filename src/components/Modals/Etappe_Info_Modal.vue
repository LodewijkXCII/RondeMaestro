<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click="$emit('close')">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <font-awesome-icon :icon="['fas', 'times']" @click="$emit('close')" />
        </div>

        <etappe-info :stage="stage" />
      </div>
    </div>
  </div>
</template>

<script>
import EtappeInfo from "../EtappeInfo.vue";
export default {
  components: { EtappeInfo },
  props: {
    stage: Object,
  },
};
</script>

<style lang="scss">
.etappeimg {
  width: 100%;
  height: auto;
}
</style>
