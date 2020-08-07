<template>
  <section>
    <h1>Etappe uitslagen</h1>

    <div class="rmTable">
      <div class="rmTable__header">
        <div class="rmTable__header--number">#</div>
        <div class="rmTable__header--date">Datum</div>
        <div class="rmTable__header--city">Start en Finish</div>

        <div class="rmTable__header--button"></div>
      </div>

      <div v-for="etappe in etappes" :key="etappe.id" class="rmTable__body">
        <div class="rmTable__body--number">{{ etappe.stage_nr }}.</div>
        <div class="rmTable__body--date">{{ etappe.date | formatDate }}</div>
        <div class="rmTable__body--city">
          {{ etappe.start_city }} - {{ etappe.finish_city }}
        </div>

        <div class="rmTable__body--button">
          <router-link
            :to="{ name: 'score-single', params: { etappeID: etappe.id } }"
            :id="etappe.id"
          >
            <img src="@/assets/icons/chevrons-right.svg" alt="edit" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  //TODO bekijk of entry al in ingevuld.

  data() {
    return {
      etappes: [],
    };
  },
  created() {
    axios
      .get('https://rondemaestro-test.herokuapp.com/api/v1/stages?race=2')
      .then((etappes) => {
        this.etappes = etappes.data;
      });
  },
};
</script>

<style lang="scss" scoped>
.rmTable__header,
.rmTable__body {
  display: grid;
  gap: 0.1rem;
  grid-template-columns: minmax(5px, 10px) minmax(40px, 1fr) 4fr minmax(
      15px,
      20px
    );
  font-weight: normal;
}
</style>
