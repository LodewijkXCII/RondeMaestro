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
      <div class="rmTable__body--user">{{ score.name }}</div>
      <div class="rmTable__body--points">
        {{ score.sum }}
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
import axios from 'axios';
import config from '@/utils/config';

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
  methods: {
    async showSelectie(id, index) {
      if (this.scores[index].selection.length === 0) {
        const entry = await axios.get(
          `${config.DEV_URL}entries/getpoints?users_id=${id}&stage_id=${+this
            .etappe}`
        );
        if (entry) {
          this.scores[index].selection = entry.data;
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
