<template>
  <section>
    <h3>Etappe Klassement</h3>

    <div class="result-grid">
      <div
        v-for="(user, index) in score"
        class="result-value"
        :class="user.id == user_id ? 'strong' : ''"
      >
        {{ index + 1 }}. {{ user.name }} -- {{ user.points }} pnt
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  score: Array,
  user_id: Number,
});
</script>

<style lang="scss">
.result-grid {
  display: grid;
  grid-template-rows: repeat(15, 42.5px);
  align-items: center;
  margin-top: 0.5rem;
  border: 1px solid var(--clr-background-mute);

  .result-value {
    height: 100%;
    padding: 0.25rem 1rem;
  }
}
</style>
