<template>
  <section>
    <h1>Etappe uitslag invullen</h1>

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
            :to="{ name: 'uitslag-single', params: { etappeID: etappe.id } }"
            :id="etappe.id"
          >
            <img src="@/assets/icons/edit.svg" alt="edit" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '@/utils/config';
export default {
  //TODO bekijk of entry al in ingevuld.

  data() {
    return {
      etappes: {},
    };
  },
  created() {
    fetch(`${config.PROD_URL}stages?race=2`)
      .then((response) => response.json())
      .then((result) => {
        this.etappes = result;
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
