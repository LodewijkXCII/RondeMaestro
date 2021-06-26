<template>
  <div class="dashboardComponent">
    <div v-show="lastFive.length > 0">
      <h2>Laatste 5 uitslagen</h2>
      <ul>
        <li v-for="result in lastFive" :key="result.id">
          Etappe:{{ result.stage_id }} - punten: {{ result.points }}
        </li>
      </ul>
    </div>
    <CommingStage :race_id="race_id" />
    <div v-show="nextSelection.length > 0">
      <h2>Selectie voor huidige etappe</h2>
      <div class="dashboard_renners">
        <RennerCard v-for="renner in selectie" :key="renner.id" :renner="renner" />
      </div>
    </div>
    <div v-show="klassement.length > 0">
      <h2>Klassement</h2>
      <ol>
        <li v-for="user in klassement" :key="user.id">
          <span :class="user.id == user_id ? 'bold' : ''">{{ user.name }} </span>-
          {{ user.points }}
        </li>
      </ol>
      <router-link to="algemeen-klassement" class="btn btn-primary"
        >Ga naar het volledige klassement</router-link
      >
    </div>
    <div v-show="uitslagLastStage.length > 0">
      <h2>Uitslag laatste etappe</h2>
      <ol>
        <li v-for="user in uitslagLastStage" :key="user.id">
          <span :class="user.id == user_id ? 'bold' : ''">{{ user.name }} </span>-
          {{ user.points }}
        </li>
      </ol>
      <router-link to="algemeen-klassement" class="btn btn-primary"
        >Ga naar het volledige klassement</router-link
      >
    </div>
  </div>
</template>

<script>
import routes from "@/api/routes";
import config from "@/utils/config";

import RennerCard from "@/components/Renner.vue";
import EtappeInfo from "@/components/EtappeInfo.vue";
import CommingStage from "./Dashboard/CommingStage.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      lastFive: [],
      firstStage: {},
      selectie: [],
      klassement: [],
      uitslagLastStage: [],
      nextSelection: [],
      race_id: null,
    };
  },
  props: {
    user_id: Number,
  },
  components: {
    RennerCard,
    EtappeInfo,
    CommingStage,
  },

  computed: {
    ...mapGetters(["getRaceID"]),
  },

  async mounted() {
    this.race_id = this.getRaceID;

    // try {
    // const { data: results } = await routes.find(
    //   `results/userscore?user_id=${this.user_id}&race_id=${config.race_id}`
    // );
    // this.lastFive = results.slice(results.length - 5, results.length);
    // const currentStage = {
    //   stage_nr: commingStage.id - 1,
    //   race_id: commingStage.race_id,
    // };
    // const { data: currentSelection } = await routes.find(
    //   `entries?stage_id=${currentStage.stage_nr}&users_id=${this.user_id}`
    // );
    // this.selectie = currentSelection;
    // const { data: nextSelection } = await routes.find(
    //   `entries?stage_id=${commingStage.id}&users_id=${this.user_id}`
    // );
    // this.nextSelection = nextSelection;
    // const { data: klassement } = await routes.find(
    //   `results/totalscore?race_id=${config.race_id}`
    // );
    // this.klassement = klassement.sort((a, b) => (a.points < b.points ? 1 : -1));
    // const { data: result } = await routes.find(
    //   `results/totalscore?stage_id=${currentStage.stage_nr}`
    // );
    // this.uitslagLastStage = result.sort((a, b) => (a.points < b.points ? 1 : -1));
    // } catch (error) {
    //   console.error(error);
    // }
  },
};
</script>

<style lang="scss">
.dashboardComponent {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
