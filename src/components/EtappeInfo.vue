<template>
  <div>
    <div>
      <h4>{{ stage.start_city }} - {{ stage.finish_city }}</h4>
      <span>{{ stage.distance }}</span>
    </div>
    <div>
      <img
        v-if="stage.image_url"
        :src="stage.image_url"
        :alt="`${stage.name}-${stage.start_city}-${stage.finish_city}-${stage.stage_nr}`"
        class="etappeimg"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stage: Object,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
