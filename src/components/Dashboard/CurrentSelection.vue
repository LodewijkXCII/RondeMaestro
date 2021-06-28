<template>
  <div v-show="nextSelection.length > 0">
    <h2>Selectie voor huidige etappe</h2>
    <div class="dashboard_renners">
      <RennerCard v-for="renner in nextSelection" :key="renner.id" :renner="renner" />
    </div>
  </div>
</template>

<script>
import RennerCard from "@/components/Renner";
import { mapGetters } from "vuex";
import routes from "@/api/routes";

export default {
  components: {
    RennerCard,
  },
  props: { stage_id: Number, user_id: Number },
  data() {
    return {
      nextSelection: [],
    };
  },
  computed: {
    ...mapGetters(["getStage"]),
  },

  async mounted() {
    const { data: nextSelection } = await routes.find(
      `entries?stage_id=${this.stage_id}&users_id=${this.user_id}`
    );

    this.nextSelection = nextSelection;
  },
};
</script>

<style></style>
