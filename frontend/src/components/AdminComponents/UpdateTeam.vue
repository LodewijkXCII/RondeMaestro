<template>
  <section>
    <modal
      v-if="showModal"
      @close="showModal = false"
      :allTeams="allTeams"
      :team_id="selectedTeam.id"
    >
      <h3 slot="header">Zoek renner</h3>
    </modal>
    <h3>Teams aanpassen</h3>
    <label for="year">Kies het team:</label>
    <div class="formInline">
      <select name="team" id="team" v-model="selectedTeam" required>
        <option :value="team" v-for="team in allTeams" :key="team.index">
          {{ team.year }} - {{ team.name }}
        </option>
      </select>
      <button
        v-on:click.prevent="getTeam(selectedTeam.id)"
        class="btn btn-primary"
      >
        Zoek
      </button>
    </div>
    <div v-if="team.name" style="margin: 2rem 0">
      <h2>Team gegevens</h2>
      <form>
        <label for="name">Naam:</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="team.name"
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
            :value="country.abbreviation"
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
        <button
          type="submit"
          class="btn btn-succes"
          @click.prevent="updateTeam"
        >
          Updaten
        </button>
      </form>
    </div>
    <div class="selectie" v-if="team.name">
      <h2>{{ teamMembers.length }} Renners in {{ team.name }}</h2>

      <div class="rmTable">
        <div class="rmTable__header teamUpdate">
          <div class="rmTable__header--number">#</div>

          <div class="rmTable__header--name">Naam</div>

          <div class="rmTable__header--button"></div>
        </div>

        <div
          v-for="(renner, index) in teamMembers"
          :key="renner.id"
          class="rmTable__body teamUpdate"
        >
          <div class="rmTable__body--number">{{ renner.cyclist_id }}</div>
          <div class="rmTable__body--user">
            {{ renner.first_name
            }}<span class="lastName">{{ renner.last_name }}</span>
          </div>
          <div class="rmTable__body--button">
            <font-awesome-icon
              :icon="['fas', 'times']"
              @click="removeRennerFromTeam(renner, index)"
            />
          </div>
        </div>
        <div class="rmTable__body teamUpdate">
          <div class="rmTable__body--number"></div>
          <div class="rmTable__body--user">
            <a id="show-modal" @click="showModal = true">Voeg renner toe</a>
          </div>
          <div class="rmTable__body--button"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import config from '../../utils/config';
import Modal from '../Modal';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      allTeams: [],
      year: 2020,
      selectedTeam: null,
      teamMembers: [],
      team: {},
      countries: [],
      message: '',
      showModal: false,
    };
  },
  methods: {
    async getTeam(id) {
      this.team = {};
      this.team = this.selectedTeam;

      const teamMembers = await axios.get(
        `${config.DEV_URL}cyclists?team=${id}`
      );

      this.teamMembers = teamMembers.data;
    },
    async updateTeam() {
      // GET COUNTRY ID FROM TEAM.COUNTRY
      const country_abr = this.team.country;
      const country_id = this.countries.find(
        ({ abbreviation }) => abbreviation === country_abr
      );
      console.log(country_id.id);
      // UPDATE TEAM
      const update = await axios.put(`${config.DEV_URL}teams/${this.team.id}`, {
        abbreviation: this.team.abbreviation,
        country_id: +country_id.id,
        level: this.team.level,
        name: this.team.name,
        year: +this.team.year,
      });

      if (update.status == 200) {
        this.message = 'Succesvol geupdate';
        return;
      } else {
        this.message = 'Er is iets mis gegaan.';
        console.log(update);
      }
    },

    async removeRennerFromTeam(renner, index) {
      // GET COUNTRY ID FROM RENNER.COUNTRY
      const country_abr = renner.country_name;
      const country_id = this.countries.find(
        ({ abbreviation }) => abbreviation === country_abr
      );

      const removeRenner = axios
        .put(`${config.DEV_URL}cyclists/${renner.cyclist_id}`, {
          team_id: 69,
        })
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            let newTeam = this.teamMembers;
            if (index > -1) {
              newTeam = newTeam.splice(index, 1);
            }
          } else {
            console.log('er is iets mis gegaan');
          }
        })
        .catch((error) => {
          return { error };
        });
    },
  },
  async mounted() {
    const response = await axios.get(`${config.DEV_URL}teams`);
    this.allTeams = response.data;

    const country = await axios.get(`${config.DEV_URL}countries`);
    this.countries = country.data;
  },
};
</script>

<style lang="scss">
.rmTable__header.teamUpdate {
  padding: 0.75rem 1rem;
}

.teamUpdate {
  grid-template-columns: minmax(30px, 45px) 2fr minmax(15px, 30px);
  grid-gap: 0.25rem;
  text-align: left;
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

.selectie {
  margin: 3rem 0 2rem;

  .rmTable {
    margin-top: 0.2rem;
  }
}
</style>
