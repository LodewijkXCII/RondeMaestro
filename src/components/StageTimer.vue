<template>
  <div class="stage-timer">
    Tijd om de etappe in te vullen:

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
        dagen
      </div>
      <div class="counter-hours">
        <span>
          <h3>{{ hours }}</h3>
        </span>
        uur
      </div>
      <div class="counter-minutes">
        <span>
          <h3>{{ minutes }}</h3>
        </span>
        minuten
      </div>
      <div class="counter-seconds">
        <span>
          <h3>{{ seconds }}</h3>
        </span>
        seconden
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
.counter {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  span {
    background: var(--clr-background-mute);
    display: block;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
    padding: 1rem 0.5rem;
    color: var(--clr-primary);
    border-radius: 5px;
  }
}
</style>
