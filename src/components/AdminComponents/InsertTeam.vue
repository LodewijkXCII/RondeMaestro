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
      <label for="image">Afbeelding:</label>
      <div class="preview-image">
        <img v-if="preview" :src="preview" />
        <input
          type="file"
          id="avatar"
          name="image"
          accept="image/png, image/jpeg"
          @change="onChange"
        />
      </div>
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
        <option :value="country.id" v-for="country in countries" :key="country.index">
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
import routes from "@/api/routes";

export default {
  data() {
    return {
      team: {
        team_name: "",
        abbreviation: "",
        level: "",
        country: 0,
        year: 2021,
        image: null,
      },
      returnMsg: "",
      preview: null,
      countries: [],
    };
  },

  methods: {
    onChange(e) {
      const file = e.target.files[0];
      this.team.image = file;
      this.preview = URL.createObjectURL(file);
    },

    async submitTeam() {
      const data = new FormData();
      for (const [key, value] of Object.entries(this.team)) {
        data.append(key, value);
      }

      try {
        await routes.create(`teams`, data);

        this.team = {};
        this.preview = null;
        this.returnMsg = "Succesvol toegevoegd";
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
