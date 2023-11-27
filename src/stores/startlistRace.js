import { defineStore } from "pinia";

export const useStartlistStore = defineStore("startlist", {
  state: () => ({
    renners: [],
    race_id: Number,
  }),
  actions: {
    addToRenners(renner) {
      this.renners.push({ ...renner, selected: false });
    },
    setRaceID(id) {
      if (this.race_id !== id) {
        console.log("aangepast");
        return (this.race_id = id);
      }
      console.log("niet aangepast");
      return;
    },
  },
});
