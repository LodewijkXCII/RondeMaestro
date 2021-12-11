<template>
  <main>
    <prev-next @changeStage="changeStage" :stage_id="stage_id" />
    <renner-overview v-if="getProfile.id != null" :stage_id="stage_id" :key="stage_id" />
  </main>
</template>

<script>
import RennerOverview from "@/components/RennerOverview";
import PrevNext from "@/components/PrevNext";
import { mapGetters } from "vuex";

export default {
  components: {
    RennerOverview,
    PrevNext,
  },

  data() {
    return {
      loading: false,
      stage_id: null,
    };
  },

  created() {
    this.stage_id = parseInt(this.$route.params.etappeID);
  },

  watch: {
    $route: "fetchData",
  },

  computed: {
    ...mapGetters(["getProfile"]),
  },

  methods: {
    changeStage(value) {
      this.stage_id = value;
    },
  },
};
</script>

<style></style>
