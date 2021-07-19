<template>
  <div class="EtappeInfoContainer">
    <h2>Meest geslecteerde renners</h2>
    <div class="EtappeInfoContainer__renner">
      <renner
        v-for="renner in renners"
        :key="renner.cyclist_id"
        :renner="renner"
        @click.native="toSelectie(renner)"
      />
    </div>
  </div>
</template>

<script>
import Renner from "@/components/Renner";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    renners: { type: Array, required: false },
  },
  components: {
    Renner,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["countSelectie", "selectedRiders"]),
    ...mapMutations(["addToSelectie", "removeFromSelectie"]),
  },
  methods: {
    toSelectie(renner) {
      console.log(renner);
      console.log(this.selectedRiders);
      //   if (this.selectedRiders.some((e) => e.cyclist_id === renner.cyclist_id)) {
      //     console.log("true");
      //     const indexToRemove = this.selectedRiders
      //       .map((e) => {
      //         return e.cyclist_id;
      //       })
      //       .indexOf(renner.cyclist_id);

      //     this.removeFromSelectie(indexToRemove);

      //     renner.selected = false;
      //   } else if (this.countSelectie >= 10) {
      //     console.error("teveel!");
      //   } else if (renner.withdraw == true) {
      //     console.error(renner, "kan niet he");
      //   } else {
      //     // renner.selected = true;
      //     this.addToSelectie(renner);
      //   }
    },
  },
};
</script>

<style lang="scss">
.EtappeInfoContainer__renner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5em 1em;
}
</style>
