<template>
  <div>
    <h2>Eerst volgende Etappe</h2>
    <etappe-info :stage="firstStage" :showRenners="true" :selectie="nextSelection">
      <router-link
        slot="button"
        :to="`/selectie/${firstStage.id}`"
        class="btn btn-primary"
      >
        Selectie kiezen <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </router-link>
    </etappe-info>
  </div>
</template>

<script>
import EtappeInfo from "@/components/EtappeInfo.vue";

import routes from "@/api/routes";

export default {
  components: {
    EtappeInfo,
  },
  data() {
    return {
      firstStage: {},
    };
  },
  props: {
    race_id: Number,
  },
  computed: {
    async getData() {
      const { data: commingStage } = await routes.find(
        `stages?race_id=${this.race_id}&single=1`
      );
      this.firstStage = commingStage;
    },
  },
  created() {
    this.getData;
  },
};
</script>

<style></style>
