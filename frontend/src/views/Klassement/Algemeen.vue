<template>
  <section class="container">
    <h1>Algemeen klassement</h1>

    <h2></h2>

    <div class="rmTable">
      <div class="rmTable__header algemeen">
        <div class="rmTable__header--number">#</div>

        <div class="rmTable__header--user">Gebruikersnaam</div>

        <div class="rmTable__header--points">Punten</div>
      </div>

      <div
        v-for="(score, index) in scores"
        :key="score.index"
        class="rmTable__body algemeen"
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
    axios.get(`${config.DEV_URL}results/totalscore`).then((result) => {
      this.scores = result.data.sort((a, b) => b.sum - a.sum);
    });
  },
};
</script>

<style lang="scss" scoped>
.algemeen {
  display: grid;
  gap: 0.1rem;
  grid-template-columns: minmax(5px, 20px) minmax(40px, 1fr) minmax(15px, 50px);
  font-weight: normal;
}
</style>
