<template>
  <div class="rmTable rmStageTable">
    <div class="rmTable__header">
      <div class="rmTable__header--number">#</div>
      <div class="rmTable__header--date"></div>
      <div class="rmTable__header--city">Start en Finish</div>
      <div class="rmTable__header--type"></div>
      <div class="rmTable__header--distance">Afstand</div>
      <div class="rmTable__header--action"></div>
    </div>

    <div
      class="rmTable__row"
      :class="checkStageStatus(stage)"
      v-for="stage in stageInfo"
      @click="handleRouteFunction(stage)"
    >
      <div class="rmTable__row--number">{{ stage.stage_nr }}</div>
      <div class="rmTable__row--date">
        {{ getTime(stage.date) }}
      </div>
      <div class="rmTable__row--city">
        {{ stage.start_city }} - {{ stage.finish_city }}
      </div>
      <div class="rmTable__row--type">
        <img :src="stage.stage_type" alt="" srcset="" />
      </div>
      <div class="rmTable__row--distance">{{ stage.distance }} km</div>
      <div class="rmTable__row--action">
        <div v-if="stage.closed == true && stage.done == true">
          <unicon name="trophy" />
          <p>Bekijk uitslag</p>
        </div>
        <div v-else-if="stage.closed == false && stage.done == false">
          <unicon name="users-alt" />
          <p>Team invullen</p>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { DateTime } from "luxon";

defineProps({
  stageInfo: Object,
});

const router = useRouter();

function getTime(timestamp) {
  return DateTime.fromISO(timestamp).setLocale("nl").toFormat("dd-MM");
}
function handleRouteFunction(stage) {
  if (stage.done || DateTime.now() >= DateTime.fromISO(stage.date)) {
    return goToResult(stage);
  }
  return goToStage(stage);
}

function checkStageStatus(stage) {
  if (stage.done) {
    stage.closed = true;
    return "done";
  } else if (DateTime.now() >= DateTime.fromISO(stage.date)) {
    stage.closed = true;
    return "closed";
  } else {
    stage.closed = false;
    return "active";
  }
}

function goToResult(stage) {
  router.push({
    name: "resultOverview",
    params: {
      race_id: stage.race_id,
    },
    query: {
      etappe: stage.id,
    },
  });
}
function goToStage(stage) {
  router.push({
    name: "stageCyclistOverview",
    params: {
      race_id: stage.race_id,
      stage_id: stage.id,
      city: `${stage.start_city
        .replaceAll(" ", "-")
        .toLowerCase()}-${stage.finish_city
        .replaceAll(" ", "-")
        .toLowerCase()}`,
    },
  });
}
</script>
