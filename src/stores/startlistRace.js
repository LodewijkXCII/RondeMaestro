import { defineStore } from "pinia";

export const useStartlistStore = defineStore("startlist", {
  state: () => ({
    teams: Object,
    race_id: Number,
  }),
  actions: {
    removeSelected(cyclist) {
      const selectedRider = this.teams[cyclist.team_name].find(
        ({ cyclist_id }) => cyclist.cyclist_id == cyclist_id
      );

      selectedRider.selected = false;
    },
  },
});
