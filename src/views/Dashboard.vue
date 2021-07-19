<template>
  <section class="container">
    <h2>Welkom {{ getProfile.name }}</h2>
    <h1>Dashboard</h1>
    <p>
      Deze pagina is nog in aanbouw. In de volgende versie zal hier een overzicht komen
      met de punten en de volgende etappes.
    </p>
    <div class="dashboardComponent">
      <CommingStage v-show="commingStage" :race="commingStage" />
      <div v-show="nextSelection.length > 0">
        <h2>Selectie voor etappe {{ getStage.stage_nr }}</h2>
        <div class="dashboard_renners">
          <RennerCard v-for="renner in nextSelection" :key="renner.id" :renner="renner" />
        </div>
      </div>
      <Result :lastFive="lastFive" />
      <Klassement :klassement="klassement" />
    </div>
    <!-- <DashboardComp v-if="getProfile.id" :user_id="getProfile.id" /> -->
  </section>
</template>

<script>
import DashboardComp from "@/components/DashboardComp";
import CommingStage from "@/components/Dashboard/CommingStage";
import Result from "@/components/Dashboard/Result";
import Klassement from "@/components/Dashboard/Klassement";
import RennerCard from "@/components/Renner";

import routes from "@/api/routes";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Dashboard",
  components: {
    DashboardComp,
    CommingStage,
    Result,
    Klassement,
    RennerCard,
  },

  data() {
    return {
      commingStage: {},
      nextSelection: [],
      lastFive: [],
      klassement: [],
    };
  },
  computed: {
    ...mapGetters(["getProfile", "getRaceID", "getStage"]),
  },
  methods: {
    ...mapMutations(["setEtappes"]),
  },
  async mounted() {
    const { data: nextStage } = await routes.find(
      `stages?race_id=${this.getRaceID}&single=1`
    );

    this.commingStage = nextStage;
    this.setEtappes(nextStage);

    const { data: nextSelection } = await routes.find(
      `entries?stage_id=${this.getStage.id}&users_id=${this.getProfile.id}`
    );

    this.nextSelection = nextSelection;

    const { data: results } = await routes.find(
      `results/userscore?user_id=${this.getProfile.id}&race_id=${this.getRaceID}`
    );
    this.lastFive = results.slice(results.length - 5, results.length);

    const { data: klassement } = await routes.find(
      `results/totalscore?race_id=${this.getRaceID}`
    );
    this.klassement = klassement.sort((a, b) => (a.points < b.points ? 1 : -1));
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
