<template>
  <section class="container">
    <h2>Welkom {{ getProfile.name }}</h2>
    <h1>Dashboard</h1>
    <p>
      Deze pagina is nog in aanbouw. In de volgende versie zal hier een overzicht komen
      met de punten en de volgende etappes.
    </p>
    <DashboardComp :user_id="getProfile.id" />
  </section>
</template>

<script>
import DashboardComp from "@/components/DashboardComp";

import { mapGetters, mapState } from "vuex";
export default {
  name: "Dashboard",
  components: {
    DashboardComp,
  },

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getProfile"]),
    ...mapState({
      name: (state) => {
        state.user.profile.name;
      },
    }),
  },
};
</script>
