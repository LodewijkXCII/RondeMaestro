<template>
  <div class="rmTable">
    <div class="rmTable__header klassement_id">
      <div class="rmTable__header--number">#</div>
      <div class="rmTable__header--user">Gebruikersnaam</div>
      <div class="rmTable__header--points">Punten</div>
      <div class="rmTable__header--button">Selectie</div>
    </div>

    <div
      v-for="(score, index) in scores"
      :key="score.index"
      class="rmTable__body klassement_id"
      @click="showSelectie(score.id, index)"
    >
      <div class="rmTable__body--number">{{ index + 1 }}.</div>
      <div class="rmTable__body--user">
        {{ score.name }}
        <span v-show="errorMessage" class="alertMessage" style="font-size: 0.8rem">{{
          errorMessage
        }}</span>
      </div>
      <div class="rmTable__body--points">
        {{ score.points }}
      </div>
      <div class="rmTable__body--button">
        <font-awesome-icon :icon="['fas', 'caret-down']" />
      </div>
      <div v-if="score.selection.length > 0" class="selected_riders">
        <div
          v-for="renner in score.selection"
          :key="renner.cyclist_id"
          class="selected_riders--rider"
        >
          {{ renner.first_name }} {{ renner.last_name }} ({{ renner.points }}pt)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "@/api/routes";

export default {
  props: {
    scores: {
      type: Array,
      required: true,
    },
    etappe: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    async showSelectie(id, index) {
      if (this.scores[index].selection.length === 0) {
        try {
          const entry = await routes.find(
            `entries/getpoints?users_id=${id}&stage_id=${+this.etappe}`
          );
          if (entry) {
            const sortedData = entry.data.sort((a, b) => (a.points < b.points ? 1 : -1));

            sortedData.forEach((renner) => {
              if (renner.points == null) {
                return (renner.points = 0);
              }
              return;
            });

            this.scores[index].selection = sortedData;
          }
        } catch (error) {
          this.errorMessage = error.response.data.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 1000);
          console.error(error.response);
        }
      } else {
        this.scores[index].selection = [];
      }
    },
  },
};
</script>

<style lang="scss">
.klassement_id:hover {
  cursor: pointer;
}
</style>
