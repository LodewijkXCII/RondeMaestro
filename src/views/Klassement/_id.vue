<template>
  <section>
    <h1>Uitslag van etappe {{ $route.params.etappeID }}</h1>

    <h2></h2>

    <div class="rmTable">
      <div class="rmTable__header">
        <div class="rmTable__header--number">#</div>

        <div class="rmTable__header--user">Gebruikersnaam</div>

        <div class="rmTable__header--points">Punten</div>
      </div>

      <div
        v-for="(score, index) in scores"
        :key="score.index"
        class="rmTable__body"
      >
        <div class="rmTable__body--number">{{ index + 1 }}.</div>
        <div class="rmTable__body--user">{{ score.name }}</div>
        <div class="rmTable__body--points">
          {{ score.sum }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

export default {
  //TODO bekijk of entry al in ingevuld.

  data() {
    return {
      scores: [],
    };
  },
  created() {
    const params = this.$route.params.etappeID;
    axios
      .get(`${config.DEV_URL}results/totalscore?stage_id=${params}`)
      .then((result) => {
        this.scores = result.data.sort((a, b) => b.sum - a.sum);
      });
  },
};
</script>

<style lang="scss" scoped>
.rmTable__header,
.rmTable__body {
  display: grid;
  gap: 0.1rem;
  grid-template-columns: minmax(5px, 20px) minmax(40px, 1fr) minmax(15px, 50px);
  font-weight: normal;
}
</style>