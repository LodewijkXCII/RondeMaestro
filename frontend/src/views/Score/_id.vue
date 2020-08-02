<template>
  <section>
    <section class="PrevNext">
      <router-link to="/score">
        <img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
        <span>Terug naar het score overzicht</span>
      </router-link>
    </section>
    <h1>Etappe {{ etappe.id }} Uitslag</h1>
    <h2>
      {{ etappe.start_city }} - {{ etappe.finish_city }} ({{
        etappe.distance
      }}KM)
    </h2>
    <!-- TODO h3 in css aanmaken -->
    <h3>Jouw behaalde punten:</h3>
    <br />

    <div class="scoreTable">
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
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      etappe: {},
      result: [],
    };
  },
  created() {
    axios
      .all([
        axios.get(
          `http://localhost:1992/api/v1/results?stage_id=${this.$route.params.etappeID}`
        ),
        axios.get(
          `http://localhost:1992/api/v1/stages/${this.$route.params.etappeID}`
        ),
      ])
      .then(
        axios.spread((result, etappeinfo) => {
          this.result = result.data.sort((a, b) =>
            a.points < b.points ? 1 : -1
          );
          this.etappe = etappeinfo.data;
        })
      );
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.scoreTable__header,
.scoreTable__body {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
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
