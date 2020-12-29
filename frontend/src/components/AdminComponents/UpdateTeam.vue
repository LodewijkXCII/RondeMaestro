<template>
  <section>
    <h2>Teams aanpassen</h2>
    <label for="year">Kies het jaar:</label>
    <div class="formInline">
      <input type="number" min="2020" value="2020" v-model.number="year" />
      <button v-on:click.prevent="getTeams()" class="btn btn-primary">
        Zoek
      </button>
    </div>

    <div class="rmTable">
      <div class="rmTable__header teamUpdate">
        <div class="rmTable__header--number">#</div>
        <div class="rmTable__header--team">Team</div>
        <div class="rmTable__header--level">Niveau</div>
        <div class="rmTable__header--button"></div>
      </div>

      <div
        v-for="team in teams"
        :key="team.index"
        class="rmTable__body teamUpdate"
      >
        <div class="rmTable__body--number">{{ team.id }}.</div>
        <div class="rmTable__body--team">{{ team.name }}</div>
        <div class="rmTable__body--level">{{ team.level }}</div>
        <div class="rmTable__body--button">
          <font-awesome-icon :icon="['fas', 'edit']" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import config from '../../utils/config';

export default {
  data() {
    return {
      teams: [],
      year: 2020,
    };
  },
  methods: {
    async getTeams() {
      this.teams = [];
      const response = await axios.get(
        `${config.DEV_URL}teams?year=${this.year}`
      );
      this.teams = response.data;
    },
  },
};
</script>

<style lang="scss">
.rmTable__header.teamUpdate {
  padding: 0.75rem 1rem;
}

.teamUpdate {
  grid-template-columns: minmax(15px, 30px) 2fr 1fr minmax(15px, 30px);
}

.formInline {
  display: flex;
  margin: 0.75em 0;

  input,
  select {
    margin: 0;
    padding: 0.75em 1em;
    border-radius: 5px 0 0 5px;
  }
  button {
    margin: 0;
    padding: 0.75em 1em;
    border-radius: 0 5px 5px 0;
  }
}
</style>
