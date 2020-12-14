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
          :class="{ active: team === activeItem.name }"
        >
          <div class="rmTable__bottom--selection">
            //TODO update team info into labels where updates can be made.
            <div>
              <ul>
                <li>{{ activeItem.name }}</li>
                <li>{{ activeItem.country }}</li>
                <li>{{ activeItem.abbreviation }}</li>
                <li>{{ activeItem.level }}</li>
              </ul>
            </div>
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
    };
  },

  methods: {
    showCyclists(team, renners) {
      console.log('Clicked', team, renners[0].team_id);
      this.test = !this.test;
    },
    async editTeam(key, team) {
      console.log('Clicked', team);
      const teamInfo = await axios.get(`${config.DEV_URL}teams/${+team}`);
      this.activeItem = teamInfo.data;
      console.log(teamInfo.data);
    },

    toggleActive(team) {
      this.activeItem = team;
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
