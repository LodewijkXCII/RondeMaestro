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
      return DateTime.fromISO(timestamp).setLocale("nl").toFormat("d - MM");
    };

    return { getTime };
  },
});
</script>

<style lang="scss">
.stage_list {
  padding: 0;
  &__item {
    display: grid;
    grid-template-columns: 3ch 7ch auto;
    padding: 0 1rem 0 1rem;

    &.active {
      background: var(--clr-primary);
      font-weight: 600;
      color: var(--clr-text-white);
      border-radius: 5px 0 0 5px;
    }

    &:hover {
      outline: 2px solid var(--clr-primary);
      border-radius: 5px 0 0 5px;
      cursor: pointer;
      font-weight: 600;
    }
  }
}
</style>
