<template>
  <section>
    <div v-if="returnMsg">{{ returnMsg }}</div>
    <h2>Etappe toevoegen</h2>
    <form>
      <label for="race_id">Koers:</label>
      <select name="race" id="race" v-model="stage.race_id">
        <option :value="race.id" v-for="race in races" :key="race.index">
          {{ race.year }} - {{ race.name }}
        </option>
      </select>
      <label for="stage_nr">Etappe Nr:</label>
      <input
        type="number"
        name="stage_nr"
        id="stage_nr"
        v-model.number="stage.stage_nr"
        value="0"
        max="21"
      />
      <label for="date">Datum:</label>
      <input
        type="datetime-local"
        name="date"
        id="date"
        v-model="stage.date"
        value="2021-01-01T12:00"
      />
      <label for="start_city">Start:</label>
      <input
        type="text"
        name="start_city"
        id="start_city"
        v-model="stage.start_city"
        autocomplete="off"
        required
      />
      <label for="finish_city">Finish:</label>
      <input
        type="text"
        name="finish_city"
        id="finish_city"
        v-model="stage.finish_city"
        autocomplete="off"
        required
      />
      <label for="distance">Afstand:</label>
      <input
        type="number"
        name="distance"
        id="distance"
        v-model.number="stage.distance"
        required
      />
      <label for="stage_type">Soort etappe:</label>
      <select
        name="stage_type"
        id="stage_type"
        v-model="stage.stage_type_id"
        required
      >
        <option
          :value="stage_type.id"
          v-for="stage_type in stage_types"
          :key="stage_type.index"
        >
          {{ stage_type.name }}
        </option>
      </select>

      <button
        type="submit"
        class="btn btn-succes"
        @click.prevent="submitEtappe"
      >
        Toevoegen
      </button>
    </form>
  </section>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

export default {
  data() {
    return {
      stage: {
        race_id: null,
        stage_nr: null,
        start_city: '',
        finish_city: '',
        distance: '',
        date: '',
        done: false,
        image_url: '/',
        stage_type_id: null,
      },
      returnMsg: '',
      races: [],
      stage_types: [],
    };
  },

  methods: {
    async submitEtappe() {
      try {
        await axios.post(`${config.DEV_URL}stages`, {
          race_id: this.stage.race_id,
          stage_nr: this.stage.stage_nr,
          start_city: this.stage.start_city,
          finish_city: this.stage.finish_city,
          distance: this.stage.distance,
          date: this.stage.date,
          done: false,
          image_url: this.stage.image_url,
          stage_type_id: this.stage.stage_type_id,
        });

        this.stage = {};
        this.returnMsg = 'Succesvol toegevoegd';
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    const response = await axios.get(`${config.DEV_URL}races`);
    this.races = response.data;

    const stage_types = await axios.get(`${config.DEV_URL}stage_type`);
    this.stage_types = stage_types.data;
  },
};
</script>

<style></style>
