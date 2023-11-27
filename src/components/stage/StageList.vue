<script setup>
import { DateTime } from "luxon";

defineProps({
  stages: Array,
});

function getTime(timestamp) {
  return DateTime.fromISO(timestamp).setLocale("nl").toFormat("d MMM y");
}
</script>

<template>
  <ul>
    <li v-for="stage in stages">
      {{ stage.stage_nr }}. {{ stage.start_city }} - {{ stage.finish_city }}
      <span>{{ getTime(stage.date) }}</span>
    </li>
  </ul>
</template>
