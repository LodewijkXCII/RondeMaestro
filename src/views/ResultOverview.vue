<template>
  <DefaultLayout>
    <main class="wrapper flow">
      <h1>Uitslagen van de etappes</h1>
      <div class="results">
        <aside class="results__stages">
          <h3>Etappes</h3>
          <p class="strong">Selecter de etappe om de uitslag te zien.</p>
          <ol class="stage_list">
            <ResultStage
              :stage="stage"
              :class="active_stage == stage.id ? 'active' : ''"
              v-for="stage in raceInfo"
              @click="getResults(stage.id)"
            />
          </ol>
        </aside>

        <section class="results__userResult" v-if="userResult || cyclistResult">
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
            <div class="result--list">
              <ResultStageTable
                v-for="(user, index) in totalScore"
                :key="user.id"
                :user-result="user"
                :position="index + 1"
                :user_id="user_id"
              />
            </div>
          </div>
        </section>

        <section class="results_stage" v-if="userResult || cyclistResult">
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
        </section>
      </div>
    </main>
  </DefaultLayout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { useAuthStore } from "../stores/userAuth";

import ResultStage from "../components/result/Stage.vue";
import ResultStageTable from "../components/result/ResultStage.vue";
import RennerSmallCard from "../components/RennerSmallCard.vue";

import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout.vue";

export default defineComponent({
  components: {
    ResultStage,
    ResultStageTable,
    RennerSmallCard,
    DefaultLayout,
  },

  setup() {
    const route = useRoute();
    const raceInfo = ref();
    const cyclistResult = ref();
    const userResult = ref();
    const totalUserPoints = ref();
    const totalScore = ref();
    const user_id = ref(useAuthStore().getUserID);
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

      if (route.query.etappe) {
        active_stage.value = +route.query.etappe;
        getResults(+route.query.etappe);
      }
      if (route.params.etappe_id) {
        active_stage.value = +route.params.etappe_id;
        getResults(+route.params.etappe_id);
      }
    });

    async function getResults(stage_id) {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/results?stage_id=${stage_id}&user_id=${
            user_id.value
          }&stage_result=true`
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
      return DateTime.fromISO(timestamp).setLocale("nl").toFormat("dd - MM");
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
  grid-template-columns: 1fr;
  gap: 1rem;

  &__stages {
    height: 100%;
  }

  h3 {
    margin-bottom: 1rem;
  }
}

.results__userResult {
  padding-right: 1rem;

  &--cyclists {
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    grid-template-columns: var(--rider-card-width);
    column-gap: 1rem;
    grid-auto-flow: column;
    margin-top: -12px;
  }
}

@include sm {
  .results {
    grid-template-columns: 1fr;
  }

  .results__userResult {
    border: none;
    padding: 0;
    --rider-card-width: 100%;
    &--cyclists {
      grid-template-rows: repeat(8, 1fr);
      grid-template-columns: var(--rider-card-width);
    }
  }
}

@include md {
  .results {
    grid-template-columns: 40ch 1fr;

    &__stages {
      border-right: 3px solid var(--clr-primary);
    }
  }

  .results__userResult {
    border: none;
    padding: 0;
    --rider-card-width: 100%;
    &--cyclists {
      grid-template-rows: repeat(8, 1fr);
      grid-template-columns: var(--rider-card-width);
    }
  }
}

@include lg {
  .results {
    grid-template-columns: 40ch calc(2 * var(--rider-card-width) + 3rem);
    &__stages {
      border-right: 3px solid var(--clr-primary);
    }
  }
  .results__userResult {
    border: none;
    padding: 0;
    --rider-card-width: 100%;
    &--cyclists {
      grid-template-rows: repeat(4, auto);
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include xl {
  .results {
    grid-template-columns: 40ch calc(2 * var(--rider-card-width) + 3rem) minmax(
        24ch,
        40ch
      );
    &__stages {
      border-right: 3px solid var(--clr-primary);
    }
  }
  .results__userResult {
    border-right: 3px solid var(--clr-primary);

    --rider-card-width: 100%;
    &--cyclists {
      grid-template-rows: repeat(4, auto);
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.totalScore {
  width: var(--rider-card-width);
  height: calc(var(--rider-card-height) / 1.3);
  display: flex;
  justify-content: space-between;
  color: var(--clr-text-white);
  padding: 0 1rem;

  align-items: center;
  background: var(--clr-accent);
  border-radius: 5px;
  margin: 0.5rem 0 1rem 0;

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
