<template>
  <div class="stage-timer">
    <p class="strong">Etappe sluit over:</p>

    <vue-countdown
      :time="time"
      :interval="1000"
      :transform="transformSlotProps"
      class="counter"
      v-slot="{ days, hours, minutes, seconds }"
    >
      <div class="counter-days">
        <span>
          <h3>{{ days }}</h3>
        </span>
        <p v-if="days > 1 || days == 0">dagen</p>
        <p v-else>dag</p>
      </div>
      <div class="counter-hours">
        <span>
          <h3>{{ hours }}</h3>
        </span>
        <p>uur</p>
      </div>
      <div class="counter-minutes">
        <span>
          <h3>{{ minutes }}</h3>
        </span>
        <p>minuten</p>
      </div>
      <div class="counter-seconds">
        <span>
          <h3>{{ seconds }}</h3>
        </span>
        <p>seconden</p>
      </div>
    </vue-countdown>
  </div>
</template>

<script setup>
import { DateTime } from "luxon";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const date = ref();
const time = ref();
const route = useRoute();

function transformSlotProps(props) {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}

onMounted(async () => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/stages/${parseInt(
        route.params.stage_id
      )}`,
    });

    if (data) {
      date.value = data;
      const stageDate = DateTime.fromISO(data.date).ts;
      const now = new Date();
      time.value = stageDate - now;
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss">
.stage-timer {
  width: var(--rider-card-width);
  background: var(--clr-background-mute);
  padding: 0.5rem 1rem;
  border-radius: 5px;

  .counter {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;

    span {
      background: var(--clr-background);
      display: block;
      margin-top: 0.5rem;
      margin-bottom: 0.2rem;
      padding: 1rem 0.5rem;
      color: var(--clr-primary);
      border-radius: 5px;
    }
  }
}
</style>
