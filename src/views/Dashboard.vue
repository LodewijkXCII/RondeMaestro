<template>
  <section class="container">
    <h2>Welkom {{ getProfile.name }}</h2>
    <h1>Dashboard</h1>
    <p>
      Deze pagina is nog in aanbouw. In de volgende versie zal hier een overzicht komen
      met de punten en de volgende etappes.
    </p>
    <!-- <div class="dashboardComponent">
      <CommingStage v-show="getStage" :race="getStage" />
      <current-selection :stage_id="commingStage.id" :user_id="getProfile.id" />
    </div> -->
    <!-- <DashboardComp v-if="getProfile.id" :user_id="getProfile.id" /> -->
  </section>
</template>

<script>
import DashboardComp from "@/components/DashboardComp";
import CommingStage from "@/components/Dashboard/CommingStage";
import CurrentSelection from "@/components/Dashboard/CurrentSelection";

import routes from "@/api/routes";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Dashboard",
  components: {
    DashboardComp,
    CommingStage,
    CurrentSelection,
  },

  data() {
    return {
      commingStage: {},
    };
  },
  computed: {
    ...mapGetters(["getProfile", "getRaceID", "getStage"]),
  },
  methods: {
    ...mapMutations(["setEtappes"]),
  },
  async mounted() {
    const { data: commingStage } = await routes.find(
      `stages?race_id=${this.getRaceID}&single=1`
    );

    this.commingStage = commingStage;
    this.setEtappes(commingStage);
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
