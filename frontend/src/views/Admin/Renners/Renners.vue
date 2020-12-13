<template>
  <div>
    <h1>Renners aanpassen</h1>
    <h2>Mooi gecategoriseerd per team</h2>

    <div class="rmTable">
      <div class="rmTable__header">
        <div class="rmTable__header--name">Teamnaam</div>
        <div class="rmTable__header--button"></div>
      </div>
      <div
        class="rmTable__wrapper"
        v-for="(value, team) in renners"
        :key="team.index"
      >
        <div class="rmTable__body adminRenner">
          <div class="rmTable__body--name">{{ team }}</div>
          <div class="rmTable__body--buttons">
            <div class="button">
              <font-awesome-icon :icon="['far', 'edit']" />
            </div>
            <div class="button">
              <font-awesome-icon :icon="['fas', 'users']" />
            </div>
          </div>
        </div>
        <!-- <div class="rmTable__bottom">
          <div class="rmTable__bottom--selection">
            <div
              v-for="renner in etappe.selection"
              :key="renner.id"
              class="rennerInfo"
            >
              <div class="rennerInfo--name">
                {{ renner.first_name }}
                <div class="lastName">{{ renner.last_name }}</div>
              </div>
            </div>
          </div>
          <div class="rmTable__bottom--links">
            <div
              class="rmTable__bottom--team"
              @click="openSelection(etappe, index)"
            >
              Bekijk je team
            </div>
            <div class="rmTable__bottom--done" v-if="etappe.done === true">
              <router-link
                :to="{ name: 'score-single', params: { etappeID: etappe.id } }"
                >Bekijk de score</router-link
              >
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

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

export default {
  data() {
    return {
      renners: [],
    };
  },

  async created() {
    const cyclists = await axios.get(`${config.DEV_URL}cyclists`);

    const sortedCyclists = groupBy(cyclists.data, 'team_name');
    // const sortedCyclists = cyclists.data.reduce(
    //   (entryMap, renner) =>
    //     entryMap.set(renner.team_name, [
    //       ...(entryMap.get(renner.team_name) || []),
    //       renner,
    //     ]),
    //   new Map()
    // );
    this.renners = sortedCyclists;
  },
};
</script>

<style lang="scss">
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
