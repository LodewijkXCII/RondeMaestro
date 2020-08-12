<template>
  <section>
    <section class="PrevNext">
      <router-link to="/score">
        <img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
        <span>Terug naar het score overzicht</span>
      </router-link>
    </section>
    <div class="stageInfo">
      <div class="stageInfo__left">
        <h1 v-if="etappe.name !== 'Klassiekers'">
          Etappe {{ etappe.stage_nr }} Uitslag
        </h1>
        <h1 else>Uitslag {{ etappe.start_city }} - {{ etappe.finish_city }}</h1>

        <h2>
          {{ etappe.start_city }} - {{ etappe.finish_city }} ({{
            etappe.distance
          }}KM)
        </h2>
      </div>
      <div class="stageInfo__right">
        <div class="score">
          <small class="score__text">Score:</small>
          <div class="score__points">{{ score }}<span>PT</span></div>
        </div>
      </div>
    </div>

    <div v-if="result.length > 0">
      <br />

      <div class="scoreTable">
        <h4>Deze score werd behaald met de volgende renners:</h4>
        <div class="scoreTable__header">
          <div class="scoreTable__header--number">#</div>
          <div class="scoreTable__header--renner">renner</div>
          <div class="scoreTable__header--points">punten</div>
        </div>
        <div
          class="scoreTable__body"
          v-for="result in result"
          :key="result.index"
        >
          <div class="scoreTable__body--number">{{ result.position }}</div>
          <div class="scoreTable__body--renner">
            {{ result.first_name }} <span>{{ result.last_name }}</span>
          </div>
          <div class="scoreTable__body--points">{{ result.points }}</div>
        </div>
      </div>

      <div class="scoreTable">
        <h4>De uitslag van etappe {{ etappe.stage_nr }}:</h4>
        <div class="scoreTable__header">
          <div class="scoreTable__header--number">#</div>
          <div class="scoreTable__header--renner">renner</div>
          <div class="scoreTable__header--points">punten</div>
        </div>
        <div
          class="scoreTable__body"
          v-for="renner in stageResult"
          :key="renner.index"
        >
          <div class="scoreTable__body--number">{{ renner.position }}</div>
          <div class="scoreTable__body--renner">
            {{ renner.first_name }} <span>{{ renner.last_name }}</span>
          </div>
          <div class="scoreTable__body--points">{{ renner.points }}</div>
        </div>
      </div>

      <router-link
        class="btn btn-alert"
        :to="{
          name: 'klassement-single',
          params: { etappeID: etappe.id },
        }"
      >
        <span>Bekijk het klassement</span>
      </router-link>
    </div>
    <div v-else>
      <br />
      <h2>Er zijn nog geen resultaten voor deze etappe</h2>
      <br />
      <router-link :to="{ name: 'Score' }" class="btn btn-alert"
        >Terug naar het overzicht</router-link
      >
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

export default {
  data() {
    return {
      etappe: {},
      result: [],
      stageResult: [],
      score: null,
    };
  },
  created() {
    const activeUser = JSON.parse(window.localStorage.getItem('user'));
    const data = {
      user_id: activeUser.id,
    };
    axios
      .all([
        // axios.get(`${config.DEV_URL}results/${this.$route.params.etappeID}`, {
        //   params: { user_id: +activeUser.id },
        // }),
        axios.get(`${config.DEV_URL}results/score/`, {
          params: { user_id: 13 },
        }),
        axios.get(`${config.DEV_URL}stages/${this.$route.params.etappeID}`),
        axios.get(
          `${config.DEV_URL}results?stage_id=${this.$route.params.etappeID}`
        ),
      ])
      .then(
        axios.spread((result, etappeinfo, stageResult) => {
          this.result = result.data.sort((a, b) =>
            a.points < b.points ? 1 : -1
          );
          for (var i = 0; i < this.result.length; i += 1) {
            this.score += this.result[i].points;
          }

          this.etappe = etappeinfo.data;
          this.stageResult = stageResult.data.sort((a, b) =>
            a.points < b.points ? 1 : -1
          );
        })
      );
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';
.stageInfo {
  display: flex;
  justify-content: space-between;
}

.score {
  display: flex;
  color: $white-color;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  background: $black-color;
  border-radius: 0.3rem;

  &__text {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
  }
  &__points {
    color: $secondary-color;
    font-size: 2rem;

    span {
      font-size: 0.5rem;
    }
  }
}

.scoreTable {
  margin: 2rem 0;
  &__header,
  &__body {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
  }
}

.scoreTable__header {
  color: $primary-color;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid $primary-color;
  padding-bottom: 0.2rem;
  margin-bottom: 0.1rem;
  padding: 0 0.25rem;

  &--points {
    text-align: right;
    padding-right: 0.25rem;
  }
}

.scoreTable__body {
  background: #fff;
  padding: 0.5rem 0.25rem;

  &:nth-child(even) {
    background: $white-color;
  }

  &--renner {
    span {
      text-transform: uppercase;
      font-weight: 700;
    }
  }
  &--points {
    text-align: right;
    padding-right: 0.25rem;
  }
}
</style>
