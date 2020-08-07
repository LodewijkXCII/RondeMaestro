<template>
  <section>
    <section class="PrevNext">
      <router-link to="/score">
        <img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
        <span>Terug naar het score overzicht</span>
      </router-link>
    </section>

    <h1 v-if="etappe.name !== 'Klassiekers'">
      Etappe {{ etappe.stage_nr }} Uitslag
    </h1>
    <h1 else>Uitslag {{ etappe.start_city }} - {{ etappe.finish_city }}</h1>

    <h2>
      {{ etappe.start_city }} - {{ etappe.finish_city }} ({{
        etappe.distance
      }}KM)
    </h2>
    <!-- TODO h3 in css aanmaken -->
    <div v-if="result.length > 0">
      <h3>Jouw behaalde punten: {{ score }}</h3>
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
    axios
      .all([
        axios.get(
          `https://rondemaestro-test.herokuapp.com/api/v1/results/${this.$route.params.etappeID}`
        ),
        axios.get(
          `https://rondemaestro-test.herokuapp.com/api/v1/stages/${this.$route.params.etappeID}`
        ),
        axios.get(
          `https://rondemaestro-test.herokuapp.com/api/v1/results?stage_id=${this.$route.params.etappeID}`
        ),
      ])
      .then(
        axios.spread((result, etappeinfo, stageResult) => {
          this.result = result.data.sort((a, b) =>
            a.points < b.points ? 1 : -1
          );
          for (var i = 0; i < this.result.length; i++) {
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
