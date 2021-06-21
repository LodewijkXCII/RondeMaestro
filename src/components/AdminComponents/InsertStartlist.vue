<template>
  <section>
    <modal v-if="showModal" @close="showModal = false" @setTeam="setRenners" :team="team">
    </modal>
    <h1 v-show="message">{{ message }}</h1>
    <h2>Startlijst toevoegen</h2>
    <label for="race">Kies de ronde:</label>
    <select name="race" id="race" v-model="race">
      <option :value="race.id" v-for="race in races" :key="race.index">
        {{ race.year }} - {{ race.name }}
      </option>
    </select>
    <label for="race">Kies de teams:</label>

    <div class="checkBoxWrapper">
      <div v-for="team in teams" :key="team.index" class="checkBoxWrapper__team">
        <input
          type="checkbox"
          name="team"
          id="team"
          v-model="selectedTeams"
          :value="team"
          class="checkBoxWrapper__team--input"
        />
        <label :for="team" class="checkBoxWrapper__team--name">{{ team.name }}</label>
      </div>
    </div>

    <div class="selectie" v-for="selectTeam in selectedTeams" :key="selectTeam.id">
      <h2>Selecteer renners voor {{ selectTeam.name }}</h2>

      <div class="rmTable">
        <div class="rmTable__header teamUpdate">
          <div class="rmTable__header--number">#</div>

          <div class="rmTable__header--name">Naam</div>

          <div class="rmTable__header--button"></div>
        </div>

        <div
          v-for="(renner, index) in sortedRenners[selectTeam.id]"
          :key="renner.id"
          class="rmTable__body teamUpdate"
        >
          <div class="rmTable__body--number">{{ renner.cyclist_id }}</div>
          <div class="rmTable__body--user">
            {{ renner.first_name }}<span class="lastName">{{ renner.last_name }}</span>
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
            <a id="show-modal" @click="(showModal = true), (team = selectTeam)"
              >Voeg renner toe</a
            >
          </div>
          <div class="rmTable__body--button"></div>
        </div>
      </div>
    </div>
    <button class="btn btn-succes" @click.prevent="setSelectie" style="margin-top: 1rem">
      Sla startlijst op
    </button>
  </section>
</template>

<script>
import routes from "@/api/routes";

import config from "../../utils/config";
import _ from "lodash";

import Modal from "../Modals/Renner_Startlist_Modal";

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
      message: "",
      selectedTeams: [],
      showModal: false,
      team: null,
    };
  },
  computed: {
    sortedRenners() {
      return _(this.renners)
        .groupBy((renner) => renner.team_id)
        .value();
    },
  },
  methods: {
    setRenners(renners) {
      renners.forEach((renner) => {
        renner.race_number = 0;
        this.renners.push(renner);
      });
    },
    async setSelectie() {
      /* 
        trim renners naar alleen cyclist id, race_number
        Stuur de race_id mee in de headers  
      */
      if (this.race != null) {
        const trimmedRenners = this.renners.map((renner) => {
          return {
            cyclist_id: renner.cyclist_id,
            race_number: renner.race_number,
            race_id: this.race,
          };
        });

        await routes.create(`startlist`, trimmedRenners);
        this.message = "Succesvol toegevoegd";
      } else {
        window.alert("Er is geen race geselecteerd");
      }
    },
  },
  async created() {
    const races = await routes.find(`races`);
    this.races = races.data;

    const teams = await routes.find(`teams?year=${config.currentYear}`);
    this.teams = teams.data;
  },
};
</script>

<style lang="scss">
.checkBoxWrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  &__team {
    &--input,
    &--name {
      display: inline-block;
      width: auto;
    }

    &--input {
      margin-right: 1em;
    }
  }
}
</style>
