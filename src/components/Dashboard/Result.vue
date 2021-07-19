<template>
  <div>
    <h2>Laatste 5 uitslagen</h2>
    <ul>
      <li v-for="result in lastFive" :key="result.id">
        Etappe:{{ result.stage_nr }} - punten: {{ result.points }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { lastFive: Array },
};
</script>
