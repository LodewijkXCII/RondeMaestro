<template>
  <section>
    <div v-if="returnMsg">{{ returnMsg }}</div>
    <h2>Team toevoegen</h2>
    <form>
      <label for="team_name">Naam:</label>
      <input
        type="text"
        name="team_name"
        id="team_name"
        v-model="team.team_name"
        autocomplete="off"
        required
      />
      <label for="abbreviation">Afkorting:</label>
      <input
        type="text"
        name="abbreviation"
        id="abbreviation"
        v-model="team.abbreviation"
        autocomplete="off"
        maxlength="3"
        required
      />

      <label for="country">Land:</label>
      <select name="country" id="country" v-model="team.country" required>
        <option
          :value="country.id"
          v-for="country in countries"
          :key="country.index"
        >
          {{ country.name }}
        </option>
      </select>
      <label for="level">Niveau:</label>
      <select name="level" id="level" v-model="team.level" required>
        <option value="UCI WorldTeams">UCI WorldTeams</option>
        <option value="UCI ProTeams">UCI ProTeams</option>
      </select>
      <button type="submit" class="btn btn-succes" @click.prevent="submitTeam">
        Toevoegen
      </button>
    </form>
  </section>
</template>

<script>
import routes from '@/api/routes';

export default {
  data() {
    return {
      team: {
        team_name: '',
        abbreviation: '',
        level: '',
        country: 0,
        year: 2021,
      },
      returnMsg: '',
      countries: [],
    };
  },

  methods: {
    async submitTeam() {
      try {
        await routes.create(`teams`, {
          name: this.team.team_name,
          abbreviation: this.team.abbreviation,
          country_id: this.team.country,
          year: this.team.year,
          level: this.team.level,
          image_url: `${this.team.team_name.toLowerCase()}-2021.jpeg`,
        });

        this.team = {};
        this.returnMsg = 'Succesvol toegevoegd';
      } catch (error) {
        console.error(error);
      }
    },
  },

  async created() {
    const response = await routes.find(`countries`);

    this.countries = response.data;
  },
};
</script>

<style></style>
