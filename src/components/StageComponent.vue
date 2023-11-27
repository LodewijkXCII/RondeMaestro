<template>
  <section v-show="stage" class="stage-section">
    <div class="stage-section--race">
      {{ stage.name }}
    </div>
    <div class="stage-section--stage">
      <div class="stage-section--stage__info">
        Etappe {{ stage.stage_nr }}: {{ stage.start_city }} -
        {{ stage.finish_city }}
      </div>
      <div class="stage-section--stage__profile">
        <img :src="stage.image_url" alt="etappeprofiel" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  stage: Object,
});
</script>

<style lang="scss">
.stage-section {
  width: var(--rider-card-width);
  background: var(--clr-background-mute);
  padding: 0.5rem 1rem;
  border-radius: 5px;

  &--race {
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  &--stage {
    > * {
      margin-bottom: 0.5rem;
    }
    &__profile {
      img {
        width: 100%;
        height: auto;
        object-fit: contain;
      }
    }
  }
}
</style>
