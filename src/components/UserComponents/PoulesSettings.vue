<template>
  <section>
    <h2>Ploegenspel overzicht</h2>
    <div v-for="poule in poules" :key="poule.poules_id">
      <h4>{{ poule.poules_name }}</h4>
      <p>Aantal deelnemers</p>
      <h4 v-if="poule.poules_open">Openbaar</h4>
      <h4 v-else>Gesloten</h4>
      <button class="btn btn-alert">Uit poule gaan</button>
      <button class="btn btn-danger">Uitnodigen</button>
    </div>
  </section>
</template>

<script>
import routes from "@/api/routes";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      poules: [],
    };
  },

  computed: { ...mapGetters(["getProfile"]) },

  async created() {
    const activeUser = this.getProfile.id;

    const { data } = await routes.find(`user_poules/${activeUser}`);
    this.poules = data;
  },
};
</script>

<style></style>
