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

      <label for="team">Team:</label>
      <select name="team" id="team" v-model="renner.team" required>
        <option :value="team.id" v-for="team in teams" :key="team.index">
          {{ team.year }} - {{ team.name }}
        </option>
      </select>
      <label for="country">Land:</label>
      <select name="country" id="country" v-model="renner.country" required>
        <option :value="country.id" v-for="country in countries" :key="country.index">
          {{ country.name }}
        </option>
      </select>
      <label for="speciality">Specialiteit:</label>
      <select name="speciality" id="speciality" v-model="renner.speciality" required>
        <option
          :value="speciality.id"
          v-for="speciality in specialities"
          :key="speciality.index"
        >
          {{ speciality.name }}
        </option>
      </select>
      <button type="submit" class="btn btn-succes" @click.prevent="submitRenner">
        Toevoegen
      </button>
    </form>
  </section>
</template>

<script>
import routes from "@/api/routes";
import config from "@/utils/config";

export default {
  data() {
    return {
      renner: {
        first_name: "",
        last_name: "",
        team: 0,
        country: 0,
        speciality: 1,
        image: null,
      },
      preview: null,
      returnMsg: "",
      teams: [],
      countries: [],
      specialities: [],
    };
  },

  methods: {
    onChange(e) {
      const file = e.target.files[0];
      this.renner.image = file;
      this.preview = URL.createObjectURL(file);
    },
    async submitRenner() {
      const data = new FormData();
      for (const [key, value] of Object.entries(this.renner)) {
        data.append(key, value);
      }

      try {
        await routes.create(`cyclists`, data);

        this.renner = {};
        this.preview = null;
        this.returnMsg = "Succesvol toegevoegd";
      } catch (error) {
        console.error(error);
      }
    },
  },

  async created() {
    const teams = await routes.find(`teams`);
    const countries = await routes.find(`countries`);
    const speciality = await routes.find(`speciality`);

    this.teams = teams.data;
    this.countries = countries.data;
    this.specialities = speciality.data;
  },
};
</script>

<style lang="scss"></style>
