<template>
  <div>
    <h2>Eerst volgende Etappe</h2>
    <etappe-info v-show="EtappeInfo" :stage="race" :showRenners="false">
      <router-link slot="button" :to="`/selectie/${race.id}`" class="btn btn-primary">
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
    return { EtappeInfo: {} };
  },
  props: {
    race: Object,
  },

  async created() {},
};
</script>

<style></style>
