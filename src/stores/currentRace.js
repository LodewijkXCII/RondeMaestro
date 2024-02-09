import { defineStore } from "pinia";
import axios from "axios";

export const useCurrentRaceStore = defineStore("currentRace", {
  state: () => ({
    currentRace: {
      race_id: Number,
      race_name: String,
    },
  }),

  getters: {
    getCurrentRace: (state) => state.currentRace,
  },
  actions: {
    async setCurrentRace() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/race/next`
        );

        if (data) {
          this.currentRace.race_id = data.id;
          this.currentRace.race_name = data.name
            .replaceAll(" ", "-")
            .replaceAll("'", "-")
            .toLowerCase();
        }
      } catch (error) {}
    },
  },
});
