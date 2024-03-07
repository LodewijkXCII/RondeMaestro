import { defineStore } from "pinia";

export const useCyclistStore = defineStore("selectedRiders", {
  state: () => ({
    riders: {
      stage: Number,
      renners: [],
    },
    changesMade: false,
    confirmNeeded: false,
    userConfirm: false,
  }),
  getters: {
    ridersCount: (state) => state.riders.renners.length,
    selectedRiders: (state) => state.riders.renners,
    selectionChanges: (state) => state.changesMade,
    getErrorMessage: (state) => state.errorMessage,
  },
  actions: {
    addRider(rider) {
      this.riders.renners.push(rider);
      this.madeChange();
    },
    removeRider(renner) {
      const index = this.riders.renners.findIndex(
        (selRiders) => selRiders.cyclist_id == renner.cyclist_id
      );

      this.removeRiderByIndex(index);
      this.madeChange();
    },
    removeRiderByIndex(index) {
      this.riders.renners.splice(index, 1);
      this.madeChange();
    },
    removeSelected() {
      this.riders.renners = [];
      this.madeChange();
    },
    madeChange() {
      this.changesMade = true;
    },
    clearStore() {
      this.riders.stage = null;
      this.riders.renners = [];
    },
    needConfirm(value) {
      this.confirmNeeded = value;
    },
  },
});
