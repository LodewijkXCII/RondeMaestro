<template>
  <div>
    <h1>Etappe Overzicht</h1>
    <h2>%RONDE%</h2>

    <div class="table">
      <div class="table-row header-row">
        <div class="t-header">#</div>
        <div class="t-header">Datum</div>
        <div class="t-header">Start en Finish</div>
        <div class="t-header">Profiel</div>
        <div class="t-header">Afstand</div>
        <div class="t-header"></div>
      </div>

      <router-link
        :to="{ name: 'selectie', params: { etappeID: etappe.id } }"
        v-for="etappe in etappes"
        :key="etappe.id"
        class="table-row"
      >
        <div class="t-cell">{{ etappe.stage_nr }}.</div>
        <div class="t-cell">{{ etappe.date | formatDate }}</div>
        <div class="t-cell regular">
          {{ etappe.start_city }} - {{ etappe.finish_city }}
        </div>
        <div class="t-cell"></div>
        <div class="t-cell">{{ etappe.distance }}KM</div>
        <div class="t-cell">
          <router-link
            :to="{ name: 'etappe-single', params: { etappeID: etappe.id } }"
            :id="etappe.id"
          >
            <img src="@/assets/icons/info.svg" alt="info" />
          </router-link>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EtappeOverzicht',
  data() {
    return {
      etappes: {},
    };
  },
  created() {
    fetch('http://localhost:1992/api/v1/stages?race=1')
      .then((response) => response.json())
      .then((result) => {
        this.etappes = result;
      });
  },
};
</script>

<style lang="scss"></style>
