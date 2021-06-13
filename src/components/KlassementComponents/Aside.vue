<template>
  <div class="column_right">
    <div class="column_right--etappe_uitslag">
      <h2>Etappe uitslag</h2>
      <div class="rmTable">
        <div class="rmTable__header etappe_uitslag">
          <div class="rmTable__header--number">#</div>
          <div class="rmTable__header--user">Renner</div>
          <div class="rmTable__header--points">Punten</div>
        </div>
        <div
          v-for="renner in uitslag"
          :key="renner.id"
          class="rmTable__body etappe_uitslag"
        >
          <div class="rmTable__body--number">{{ renner.position }}.</div>
          <div class="rmTable__body--user">
            {{ renner.first_name }} {{ renner.last_name }}
          </div>
          <div class="rmTable__body--points">
            {{ renner.points }}
          </div>
        </div>
      </div>
    </div>

    <div class="column_right--algemeen_klassement">
      <h2>Algmeen klassement</h2>

      <div class="rmTable">
        <div class="rmTable__header alg_klassement">
          <div class="rmTable__header--number">#</div>
          <div class="rmTable__header--user">Gebruikersnaam</div>
          <div class="rmTable__header--points">Punten</div>
        </div>
        <div
          v-for="(scores, index) in totalScores"
          :key="scores.index"
          class="rmTable__body alg_klassement"
        >
          <div class="rmTable__body--number">{{ index + 1 }}.</div>
          <div class="rmTable__body--user">{{ scores.name }}</div>
          <div class="rmTable__body--points">
            {{ scores.sum }}
          </div>
        </div>
      </div>
      <router-link
        :to="{ name: 'algemeen-klassement' }"
        class="btn btn-alert"
        style="display: inline-block;"
      >
        Ga naar het algemene klassement
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortedUitslag: this.uitslag.sort((a, b) =>
        a.points < b.points ? 1 : -1
      ),
    };
  },
  props: {
    uitslag: {
      type: Array,
      required: true,
    },
    totalScores: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
