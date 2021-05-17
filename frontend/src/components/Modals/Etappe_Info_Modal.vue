<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click="$emit('close')">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <font-awesome-icon :icon="['fas', 'times']" @click="$emit('close')" />
        </div>

        <div class="modal-body">
          <slot name="body">
            <img
              v-if="stage.image_url"
              :src="stage.image_url"
              :alt="
                `${stage.name}-${stage.start_city}-${stage.finish_city}-${stage.stage_nr}`
              "
              class="etappeimg"
            />
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <p>Profiel voor etappe {{ stage.stage_nr }}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
