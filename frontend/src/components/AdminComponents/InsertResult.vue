<template>
  <section>
    <h1>Uitslag Etappe</h1>
    <label for="race">Kies de etappe:</label>
    <div class="formInline">
      <!-- <input type="number" min="2020" value="2020" v-model.number="year" /> -->
      <select name="stage" id="stage" v-model="stage">
        <option :value="stage.id" v-for="stage in stages" :key="stage.index">
          {{ stage.stage_nr }}. {{ stage.start_city }}-{{ stage.finish_city }}
        </option>
      </select>
    </div>

    <div v-for="input in uitslag" :key="input.position" class="etappeUitslag">
      <label :for="input.position">{{ input.position }}:</label>

      <select v-model="input.id">
        <option
          v-for="renner in renners"
          :key="renner.index"
          :value="renner.cyclist_id"
          >#{{ renner.race_number }} - {{ renner.first_name }}
          {{ renner.last_name }}</option
        >
      </select>
    </div>

    <button class="btn btn-alert" v-on:click="etappeSubmit()">
      {{ sendMessage }}
    </button>
  </section>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

const URL_CYCLIST = `${config.DEV_URL}cyclists?startlist=true`;
const URL_RESULT = `${config.DEV_URL}results`;

export default {
  data() {
    return {
      renners: [],
      sendMessage: 'Verstuur',
      stages: [],
      stage: null,
      uitslag: [
        { id: null, points: 100, position: 1 },
        { id: null, points: 80, position: 2 },
        { id: null, points: 63, position: 3 },
        { id: null, points: 50, position: 4 },
        { id: null, points: 41, position: 5 },
        { id: null, points: 34, position: 6 },
        { id: null, points: 29, position: 7 },
        { id: null, points: 24, position: 8 },
        { id: null, points: 19, position: 9 },
        { id: null, points: 15, position: 10 },
        { id: null, points: 12, position: 11 },
        { id: null, points: 9, position: 12 },
        { id: null, points: 7, position: 13 },
        { id: null, points: 6, position: 14 },
        { id: null, points: 5, position: 15 },
      ],
    };
  },
  async created() {
    await axios.get(URL_CYCLIST).then((renners) => {
      this.renners = renners.data.sort((a, b) =>
        a.race_number > b.race_number ? 1 : -1
      );
    });
    const stages = await axios.get(`${config.DEV_URL}stages`);
    this.stages = stages.data;
  },
  methods: {
    etappeSubmit() {
      this.sendMessage = 'Versturen';
      this.uitslag.forEach(async (renner) => {
        try {
          const response = await axios.post(URL_RESULT, {
            position: renner.position,
            points: renner.points,
            stage_id: this.stage,
            cyclist_id: renner.id,
          });
        } catch (error) {
          console.error(error.message);
        }
      });
      this.sendMessage = 'Verstuurd';
    },
  },
};
</script>

<style lang="scss">
.etappeUitslag {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;

  label {
    width: 15%;
    text-align: center;
    font-size: 1rem;
  }
}
</style>
