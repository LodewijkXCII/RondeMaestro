<template>
  <main class="wrapper flow">
    <h1>Uitslagen van de etappes</h1>
    <section class="results">
      <div class="results__stages">
        <h3>Etappes</h3>
        <ol class="stage_list">
          <ResultStage
            :stage="stage"
            :class="active_stage == stage.id ? 'active' : ''"
            v-for="stage in raceInfo"
            @click="getResults(stage.id)"
          />
        </ol>
      </div>
      <div class="results__userResult">
        <h3>Jouw selectie</h3>
        <div class="results__userResult--cyclists">
          <RennerSmallCard
            v-for="cyclist in userResult"
            :renner="cyclist"
            :key="cyclist.id"
            :speciality="false"
            :points="cyclist.points"
          />
        </div>
        <div class="totalScore">
          Gescoorde punten:
          <span>
            <span class="points">{{ totalUserPoints }}</span> pnt
          </span>
        </div>
        <h3>Dagklassement</h3>
        <div class="results__userResult--users">
          <div class="user-result--list">
            <ResultStageTable
              v-for="(user, index) in totalScore"
              :key="user.id"
              :user-result="user"
              :position="index + 1"
              :user_id="user_id"
            />
          </div>
        </div>
      </div>

      <div class="results_stage">
        <h3>Daguitslag</h3>
        <div class="results_stage--list">
          <div class="list-item" v-for="(cyclist, index) in cyclistResult">
            <div class="list-item__position">{{ index + 1 }}.</div>
            <div class="list-item__avatar">
              <img
                :src="`https://ui-avatars.com/api/?name=${cyclist.first_name}+${cyclist.last_name}`"
                alt=""
              />
            </div>
            <div class="list-item__cyclist">
              <div class="list-item__cyclist--name">
                {{ cyclist.first_name }}
                <strong>{{ cyclist.last_name }}</strong>
              </div>
              <div class="list-item__cyclist--team">
                {{ cyclist.team_name }}
              </div>
            </div>
            <div class="list-item__points">
              <span>{{ cyclist.points }}</span> pnt
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import ResultStage from "../components/result/Stage.vue";
import ResultStageTable from "../components/result/ResultStage.vue";
import RennerSmallCard from "../components/RennerSmallCard.vue";

import axios from "axios";

export default defineComponent({
  components: {
    ResultStage,
    ResultStageTable,
    RennerSmallCard,
  },

  setup() {
    const route = useRoute();
    const raceInfo = ref();
    const cyclistResult = ref();
    const userResult = ref();
    const totalUserPoints = ref();
    const totalScore = ref();
    const user_id = ref(1);
    const active_stage = ref();

    const getRaceInfo = async () => {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/stages?race=${
            route.params.race_id
          }&year=${new Date().getFullYear()}`
        )
        .then((response) => {
          raceInfo.value = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    };

    onMounted(async () => {
      getRaceInfo();
      console.log("hiero", route);
      if (route.query.etappe_id) {
        active_stage.value = +route.query.etappe_id;
      }
      if (route.params.etappe_id) {
        active_stage.value = +route.params.etappe_id;
      }
      console.log(active_stage.value);
      getResults(active_stage.value);
    });

    async function getResults(stage_id) {
      console.log(stage_id);
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/results?stage_id=${stage_id}&user_id=${user_id.value}`
        );

        const { data: totalDataScore } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/results/users-score?stage_id=${stage_id}`
        );

        if (data) {
          cyclistResult.value = data.cyclistResponse;
          userResult.value = data.userResponse;
          totalUserPoints.value = data.totalUserscore;
        }
        if (totalDataScore) {
          totalScore.value = totalDataScore;
        }

        active_stage.value = stage_id;
      } catch (error) {
        console.error(error);
      }
    }

    const getTime = (timestamp) => {
      return DateTime.fromISO(timestamp).setLocale("nl").toFormat("d - MM");
    };

    return {
      raceInfo,
      getResults,
      getTime,
      active_stage,
      cyclistResult,
      userResult,
      totalUserPoints,
      totalScore,
      user_id,
    };
  },
});
</script>

<style lang="scss">
.results {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1rem;

  &__stages {
    border-right: 3px solid var(--clr-primary);
  }

  h3 {
    margin-bottom: 1rem;
  }
}

.results__userResult {
  border-right: 3px solid var(--clr-primary);
  padding-right: 1rem;

  &--cyclists {
    width: calc(2 * var(--rider-card-width) + 1rem);
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-auto-flow: column;

    margin-top: -12px;
  }
}

.totalScore {
  width: var(--rider-card-width);
  height: calc(var(--rider-card-height) / 2);
  display: flex;
  justify-content: space-between;
  color: var(--clr-text-white);
  padding: 0 1rem;

  align-items: center;
  background: var(--clr-accent);
  border-radius: 3px;
  margin-bottom: 1rem;

  span.points {
    font-weight: 700;
  }
}

// CYCLIST RESULTS
.results_stage--list {
  .list-item {
    display: grid;
    grid-template-columns: 3ch 50px auto 6ch;
    gap: 0 0.5rem;
    margin-bottom: 0.5rem;

    &__position {
      justify-self: center;
      align-self: center;
    }
    &__avatar {
      grid-row: 1/3;
      grid-column: 2/3;
      justify-self: center;
      align-self: center;
      aspect-ratio: 1/1;
      overflow: hidden;
      height: 45px;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    &__cyclist--team {
      font-weight: 300;
      font-style: italic;
    }

    &__points {
      grid-row: 1/3;
      grid-column: 4/5;
      justify-self: center;
      align-self: center;
      span {
        font-weight: 700;
      }
    }
  }
}
</style>
