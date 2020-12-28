<template>
  <div>
    <h1>Renners aanpassen</h1>
    <h2>Mooi gecategoriseerd per team</h2>

    <div class="rmTable admin">
      <div class="rmTable__header">
        <div class="rmTable__header--name">Teamnaam</div>
        <div class="rmTable__header--button"></div>
      </div>
      <div
        class="rmTable__wrapper"
        v-for="(value, team) in sortedCyclists"
        :key="team.index"
      >
        <div class="rmTable__body adminRenner">
          <div class="rmTable__body--name">{{ team }}</div>
          <div class="rmTable__body--buttons ">
            <div class="button" @click="editTeam(team, value[0].team_id)">
              <!-- <div class="button" @click="toggleActive(team)"> -->
              <font-awesome-icon :icon="['far', 'edit']" />
            </div>
            <div class="button" @click="showCyclists(team, value)">
              <font-awesome-icon :icon="['fas', 'users']" />
            </div>
          </div>
        </div>
        <div
          class="rmTable__bottom admin "
          :class="{ active: team === activeItem }"
        >
          <div class="rmTable__bottom--adminTeam">
            <!-- TODO update team info into labels where updates can be made. -->
            <form>
              <label for="teamName">Naam</label>
              <input type="text" name="teamName" v-model="newTeam.name" id="" />
              <label for="teamCountry">Land</label>
              <select
                name="teamCountry"
                id=""
                v-model="newTeam.country"
              ></select>
              <label for="teamAbbreviation">Afkorting</label>
              <input
                type="text"
                name="teamAbbreviation"
                v-model="newTeam.abbreviation"
                id=""
              />
              <label for="teamLevel">Niveau</label>
              <select name="teamLevel" v-model="newTeam.level" id=""></select>
              <label for="teamYear">Jaar</label>
              <input
                type="number"
                name="teamYear"
                min="2000"
                v-model="newTeam.year"
                id=""
              />
              <button
                class="btn btn-succes"
                type="submit"
                v-on:submit.prevent="updateTeam()"
              >
                Aanpassen
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

export default {
  data() {
    return {
      sortedCyclists: [],
      activeItem: {},
      newTeam: {},
    };
  },

  methods: {
    showCyclists(team, renners) {
      console.log('Clicked', team, renners[0].team_id);
      this.test = !this.test;
    },
    async editTeam(key, team) {
      console.log('Clicked', team);
      const response = await axios.get(`${config.DEV_URL}teams/${team}`);

      const teamInfo = response.data;

      this.activeItem = teamInfo.name;
      // this.activeItem = teamInfo.data;
      this.newTeam = {
        name: teamInfo.name,
        year: teamInfo.year,
        level: teamInfo.level,
        country: teamInfo.country,
        abbreviation: teamInfo.abbreviation,
      };
      console.log(teamInfo);
    },

    toggleActive(team) {
      this.activeItem = team;
    },

    updateTeam() {
      console.log('clikkkie');
    },
  },

  async created() {
    const cyclists = await axios.get(`${config.DEV_URL}cyclists`);

    function groupBy(objectArray, property) {
      return objectArray.reduce(function(acc, obj) {
        let key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }

    const sortedCyclists = groupBy(cyclists.data, 'team_name');
    this.sortedCyclists = sortedCyclists;
  },
};
</script>

<style lang="scss">
.rmTable__bottom.admin {
  display: none;

  &.active {
    display: inherit;
  }
}

.rmTable__bottom--adminTeam {
  margin: 0 1rem 0.2rem;
  padding-top: 0.3rem;
  font-size: 0.6rem;

  form {
    padding-bottom: 2em;

    button {
      margin: 0 0 0 auto;
      width: inherit;
    }
  }
}

.adminRenner {
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
}

.rmTable__body--buttons {
  display: flex;

  & > * {
    margin: 0 0.5rem;
  }
}
</style>
