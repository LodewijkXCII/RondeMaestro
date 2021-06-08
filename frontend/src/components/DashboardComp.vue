<template>
  <div>
    <div>
      <h2>Laatste 5 uitslagen</h2>
      <ul>
        <li v-for="result in lastFive" :key="result.id">
          Etappe:{{ result.stage_id }} - punten: {{ result.points }}
        </li>
      </ul>
    </div>
    <div>
      <h2>Eerst volgende Etappe</h2>
      {{ firstStage }}
      <router-link :to="`/selectie/${firstStage.id}`">Klik hiero</router-link>
    </div>
    <div>
      <h2>Selectie voor huidige etappe</h2>
      <div class="dashboard_renners">
        <RennerCard v-for="renner in selectie" :key="renner.id" :renner="renner" />
      </div>
    </div>
    <div>
      <h2>Klassement</h2>
      <ol>
        <li v-for="user in klassement" :key="user.id">
          <span :class="user.id == user_id ? 'bold' : ''">{{ user.name }} </span>-
          {{ user.points }}
        </li>
      </ol>
      <button>Ga naar het volledige klassement</button>
    </div>
    <div>
      <h2>Uitslag laatste etappe</h2>
      <ol>
        <li v-for="user in uitslagLastStage" :key="user.id">
          <span :class="user.id == user_id ? 'bold' : ''">{{ user.name }} </span>-
          {{ user.points }}
        </li>
      </ol>
      <button>Ga naar het volledige klassement</button>
    </div>
  </div>
</template>

<script>
import routes from "@/api/routes";
import config from "@/utils/config";

import RennerCard from "@/components/Renner.vue";

export default {
  data() {
    return {
      lastFive: [],
      firstStage: {},
      selectie: [],
      klassement: [],
      uitslagLastStage: [],
    };
  },
  props: {
    user_id: Number,
  },
  components: {
    RennerCard,
  },
  methods: {
    isCurrentUser() {},
  },

  async created() {
    try {
      console.log(this.user_id);
      // TODO SET RACE_ID AS DYNAMIC
      const { data: results } = await routes.find(
        `results/userscore?user_id=${this.user_id}&race_id=1`
      );
      this.lastFive = results.slice(results.length - 5, results.length);

      const { data: commingStage } = await routes.find(`stages?race_id=34&single=1`);
      this.firstStage = commingStage;

      const currentStage = {
        stage_nr: commingStage.stage_nr - 1,
        race_id: commingStage.race_id,
      };
      const { data: currentSelection } = await routes.find(
        `entries?stage_id=${currentStage.stage_nr}&users_id=${this.user_id}`
      );
      this.selectie = currentSelection;

      const { data: klassement } = await routes.find(`results/totalscore?race_id=1`);
      this.klassement = klassement.sort((a, b) => (a.points < b.points ? 1 : -1));

      const { data: result } = await routes.find(
        `results/totalscore?stage_id=${currentStage.stage_nr}`
      );
      this.uitslagLastStage = result.sort((a, b) => (a.points < b.points ? 1 : -1));
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss">
// .dashboard_renners {
//   display: flex;
//   flex-flow: wrap;
//   gap: 0.5rem;

//   .renner {
//     margin: 0.5rem 0.25rem;
//   }
// }
</style>
