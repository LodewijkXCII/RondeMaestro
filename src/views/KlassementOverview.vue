<template>
  <DefaultLayout>
    <main class="wrapper wrapper-small flow">
      <h1>Klassementen</h1>
      <div class="ranking-gc">
        <h2>Algemeen klassement</h2>
        <div class="result--list">
          <div class="result--item" v-for="(gcUser, index) in gcStandings">
            <div class="info">
              <div class="info__position">{{ index + 1 }}.</div>
              <div class="info__name">
                {{ gcUser.name }}
              </div>
              <div class="info__points">
                <strong>{{ gcUser.points }}</strong> pnt
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Etappe klassement</h2>
      <div class="ranking-stage">
        <div class="ranking-stage--stages">
          <h3>Etappes</h3>
          <p class="strong">Selecter de etappe om de uitslag te zien.</p>
          <div class="stage_list">
            <div
              v-for="stage in stageInfo"
              class="stage_list__item"
              @click="loadStageResult(stage.id)"
              :class="activeStage == stage.id ? 'active' : ''"
            >
              <div class="stage_number">{{ stage.stage_nr }}.</div>
              <div class="stage_date">{{ getTime(stage.date) }}</div>
              <div class="stage_info">
                {{ stage.start_city }} - {{ stage.finish_city }} ({{
                  stage.distance
                }}km)
              </div>
            </div>
          </div>
        </div>
        <div class="ranking-stage--result">
          <h3>Uitslag</h3>
          <div class="result--list">
            <div class="result--item" v-for="(user, index) in stageResult">
              <div class="info">
                <div class="info__position">{{ index + 1 }}.</div>
                <div class="info__name">
                  {{ user.name }}
                </div>
                <div class="info__points">
                  <strong>{{ user.points }}</strong> pnt
                </div>
              </div>
            </div>
            <div class="result--message" v-if="stageResult.length <= 0">
              <p>De uitslag voor deze etappe is nog niet bekend!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";
import { DateTime } from "luxon";
import DefaultLayout from "../layouts/DefaultLayout.vue";

export default defineComponent({
  components: {
    DefaultLayout,
  },
  setup() {
    const route = useRoute();

    let stageInfo = ref();
    let raceInfo = ref();
    let gcStandings = ref();
    const activeStage = ref();
    const stageResult = ref([]);

    const getTime = (timestamp) => {
      return DateTime.fromISO(timestamp).setLocale("nl").toFormat("dd - MM");
    };

    const getRaceInfo = async () => {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/stages?race=${
            route.params.race_id
          }&year=${new Date().getFullYear()}`
        )
        .then((response) => {
          stageInfo.value = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const getStageData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/race/${parseInt(
            route.params.race_id
          )}`,
        });

        if (data) {
          raceInfo.value = data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getGCStandings = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/results/gc`,
        });

        if (data) {
          gcStandings.value = data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const loadStageResult = async (searchStageID) => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/results/users-score?stage_id=${searchStageID}`
      );

      if (data) {
        activeStage.value = searchStageID;
        stageResult.value = data;
      }
    };

    getRaceInfo();
    getStageData();
    getGCStandings();

    return {
      getTime,
      stageInfo,
      raceInfo,
      stageResult,
      gcStandings,
      activeStage,
      getStageData,
      getRaceInfo,
      loadStageResult,
    };
  },
});
</script>

<style lang="scss">
.ranking-gc .result--list {
  margin-top: 1.5rem;
}
.ranking-stage {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-right: 1rem;

  h3 {
    margin-bottom: 0.75rem;
  }
  &--result {
    border-left: 3px solid var(--clr-primary);
    padding-left: 2rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    row-gap: 1rem;

    &--result {
      border-left: none;
      padding-left: 0;
    }
  }
}
</style>
