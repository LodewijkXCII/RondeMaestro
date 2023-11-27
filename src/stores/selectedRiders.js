import { defineStore } from "pinia";

export const useCyclistStore = defineStore("selectedRiders", {
  state: () => ({
    riders: {
      stage: Number,
      renners: [],
    },
  }),
  getters: {
    ridersCount: (state) => state.riders.renners.length,
    selectedRiders: (state) => state.riders.renners,
  },
  actions: {
    addRider(rider) {
      this.riders.renners.push(rider);
    },
    removeRider(renner) {
      const index = this.riders.renners.findIndex(
        (selRiders) => selRiders.cyclist_id == renner.cyclist_id
      );
      this.riders.renners.splice(index, 1);
    },
    clearStore() {
      this.riders.stage = null;
      this.riders.renners = [];
    },
  },
});
