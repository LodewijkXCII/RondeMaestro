<template>
  <section>
    <h2>Uitslag Etappe</h2>
    <label for="race">Kies de etappe:</label>
    <div class="formInline">
      <!-- <input type="number" min="2020" value="2020" v-model.number="year" /> -->
      <select name="stage" id="stage" v-model="stage" @change="searchResult(stage)">
        <option :value="stage.id" v-for="stage in stages" :key="stage.index">
          {{ stage.stage_nr }}. {{ stage.start_city }}-{{ stage.finish_city }}
        </option>
      </select>
    </div>

    <div v-for="input in uitslag" :key="input.position" class="etappeUitslag">
      <label :for="input.position">{{ input.position }}:</label>

      <select v-model="input.id">
        <option v-for="renner in renners" :key="renner.index" :value="renner.cyclist_id">
          #{{ renner.race_number }} - {{ renner.first_name }}
          {{ renner.last_name }}
        </option>
      </select>
    </div>

    <button class="btn btn-alert" v-on:click="etappeSubmit(stage)">
      {{ sendMessage }}
    </button>
  </section>
</template>

<script>
import routes from "@/api/routes";
import config from "@/utils/config";

export default {
  data() {
    return {
      renners: [],
      sendMessage: "Verstuur",
      stages: [],
      stage: null,
      uitslag: [
        { id: null, points: 100, position: 1 },
        { id: null, points: 80, position: 2 },
        { id: null, points: 63, position: 3 },
        { id: null, points: 50, position: 4 },
        { id: null, points: 41, position: 5 },
        { id: null, points: 34, position: 6 },
        { id: null, points: 29, position: 7 },
        { id: null, points: 24, position: 8 },
        { id: null, points: 19, position: 9 },
        { id: null, points: 15, position: 10 },
        { id: null, points: 12, position: 11 },
        { id: null, points: 9, position: 12 },
        { id: null, points: 7, position: 13 },
        { id: null, points: 6, position: 14 },
        { id: null, points: 5, position: 15 },
      ],
    };
  },
  async created() {
    const renners = await routes.find(`startlist/race?race_id=${config.race_id}`);
    this.renners = renners.data.sort((a, b) => (a.race_number > b.race_number ? 1 : -1));

    const stages = await routes.find(
      `stages?race=${config.race_id}&year=${config.currentYear}`
    );
    this.stages = stages.data;
  },
  methods: {
    async searchResult(stage) {
      const { data } = await routes.find(`results?stage_id=${stage}`);
      /* 
        Uitslag vergelijken met renners. Daarna toevoegen aan uitslag
      */
      data.forEach((result) => {
        const index = this.uitslag.findIndex(
          ({ position }) => position == result.position
        );

        this.uitslag[index] = {
          id: result.cyclist_id,
          points: this.uitslag[index].points,
          position: this.uitslag[index].position,
        };
      });
    },
    async etappeSubmit(stage) {
      const { data: prevResult } = await routes.find(`results?stage_id=${stage}`);

      prevResult.forEach(async (res) => {
        try {
          await routes.update(`results/${res.id}`, {
            position: res.position,
            points: res.points,
            stage_id: res.stage_id,
            cyclist_id: res.cyclist_id,
          });
        } catch (error) {
          console.error(error);
        }
      });

      this.sendMessage = "Versturen";
      this.uitslag.forEach(async (renner) => {
        try {
          await routes.create("results", {
            position: renner.position,
            points: renner.points,
            stage_id: this.stage,
            cyclist_id: renner.id,
          });
        } catch (error) {
          console.error(error.message);
        }
      });
      await routes.update(`stages/${this.stage}`, {
        setDone: true,
      });
      await routes.create(`email/result`, {
        stage_id: this.stage,
      });
      this.sendMessage = "Verstuurd";
    },
  },
};
</script>

<style lang="scss">
.etappeUitslag {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;

  label {
    width: 15%;
    text-align: center;
    font-size: 1rem;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    // text-indent: 5px;`
    option {
      padding: 3rem;
    }
  }
}
</style>
