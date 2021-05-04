<template>
  <section>
    <modal
      v-if="showModal"
      @close="showModal = false"
      @setTeam="setRenners"
      :team="team"
    >
    </modal>
    <h2>Startlijst toevoegen</h2>
    <label for="race">Kies de ronde:</label>
    <select name="race" id="race" v-model="race">
      <option :value="race.id" v-for="race in races" :key="race.index">
        {{ race.year }} - {{ race.name }}
      </option>
    </select>
    <label for="race">Kies de teams:</label>
    <div v-for="team in teams" :key="team.index">
      <input
        type="checkbox"
        name="team"
        id="team"
        v-model="setSelectie"
        :value="team"
      />
      <label :for="team">{{ team.name }}</label>
    </div>
    <div
      class="selectie"
      v-for="selectTeam in selectedTeams"
      :key="selectTeam.id"
    >
      <h2>Selecteer renners voor {{ selectTeam.name }}</h2>

      <div class="rmTable">
        <div class="rmTable__header teamUpdate">
          <div class="rmTable__header--number">#</div>

          <div class="rmTable__header--name">Naam</div>

          <div class="rmTable__header--button"></div>
        </div>

        <!-- <div
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
        </div> -->
        <div class="rmTable__body teamUpdate">
          <div class="rmTable__body--number"></div>
          <div class="rmTable__body--user">
            <a id="show-modal" @click="(showModal = true), (team = selectTeam)"
              >Voeg renner toe</a
            >
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

import Modal from '../Modals/Renner_Startlist_Modal';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      races: [],
      race: null,
      teams: [],
      renners: [],
      selectedTeams: [],
      showModal: false,
      team: null,
    };
  },
  methods: {
    setRenners(renners) {
      console.log(renners);
      const teamIndex = this.selectedTeams.findIndex(
        (team) => team.id == renners[0].team_id
      );
      console.log('teamindex:', teamIndex);

      console.log(this.teams[teamIndex]);
      let selectie = [];
      this.selectedTeams[teamIndex] = {
        ...this.selectedTeams[teamIndex],
        selectie,
      };
    },
    setSelectie() {
      console.log('er gebeurt hier iets');
    },
  },
  async created() {
    const races = await axios.get(`${config.DEV_URL}races`);
    this.races = races.data;

    const teams = await axios.get(
      `${config.DEV_URL}teams?year=${config.currentYear}`
    );
    this.teams = teams.data;
  },
};
</script>

<style></style>
