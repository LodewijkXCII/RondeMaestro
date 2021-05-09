<template>
  <section>
    <div v-if="returnMsg">{{ returnMsg }}</div>
    <h2>Renner toevoegen</h2>
    <form>
      <label for="first_name">Voornaam:</label>
      <input
        type="text"
        name="first_name"
        id="first_name"
        v-model="renner.first_name"
        autocomplete="off"
        required
      />
      <label for="last_name">Achternaam:</label>
      <input
        type="text"
        name="last_name"
        id="last_name"
        v-model="renner.last_name"
        autocomplete="off"
        required
      />

      <label for="team">Team:</label>
      <select name="team" id="team" v-model="renner.team" required>
        <option :value="team.id" v-for="team in teams" :key="team.index">
          {{ team.year }} - {{ team.name }}
        </option>
      </select>
      <label for="country">Land:</label>
      <select name="country" id="country" v-model="renner.country" required>
        <option
          :value="country.id"
          v-for="country in countries"
          :key="country.index"
        >
          {{ country.name }}
        </option>
      </select>
      <label for="speciality">Specialiteit:</label>
      <select
        name="speciality"
        id="speciality"
        v-model="renner.speciality"
        required
      >
        <option
          :value="speciality.id"
          v-for="speciality in specialities"
          :key="speciality.index"
        >
          {{ speciality.name }}
        </option>
      </select>
      <button
        type="submit"
        class="btn btn-succes"
        @click.prevent="submitRenner"
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
      renner: {
        first_name: '',
        last_name: '',
        team: 0,
        country: 0,
        speciality: 1,
      },
      returnMsg: '',
      teams: [],
      countries: [],
      specialities: [],
    };
  },

  methods: {
    async submitRenner() {
      try {
        await axios.post(`${config.DEV_URL}cyclists`, {
          first_name: this.renner.first_name,
          last_name: this.renner.last_name,
          country_id: this.renner.country,
          team_id: this.renner.team,
          speciality_id: this.renner.speciality,
          image_url: `${this.renner.first_name.toLowerCase()}-${this.renner.last_name.toLowerCase()}-${
            config.currentYear
          }.jpeg`,
        });

        this.renner = {};
        this.returnMsg = 'Succesvol toegevoegd';
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    const response = await Promise.all([
      axios.get(`${config.DEV_URL}teams`),
      axios.get(`${config.DEV_URL}countries`),
      axios.get(`${config.DEV_URL}speciality`),
    ]);

    this.teams = response[0].data;
    this.countries = response[1].data;
    this.specialities = response[2].data;
  },
};
</script>

<style></style>
