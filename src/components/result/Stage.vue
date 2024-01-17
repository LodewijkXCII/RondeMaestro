<template>
  <li class="stage_list__item">
    <div class="stage_number">{{ stage.stage_nr }}.</div>
    <div class="stage_date">{{ getTime(stage.date) }}</div>
    <div class="stage_info">
      {{ stage.start_city }} - {{ stage.finish_city }} ({{ stage.distance }}km)
    </div>
  </li>
</template>

<script>
import { defineComponent } from "vue";
import { DateTime } from "luxon";

export default defineComponent({
  props: {
    stage: Object,
  },
  setup() {
    const getTime = (timestamp) => {
      return DateTime.fromISO(timestamp).setLocale("nl").toFormat("dd - MM");
    };

    return { getTime };
  },
});
</script>
