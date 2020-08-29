<template>
  <section>
    <h1>
      Klassement per etappe
    </h1>
    <router-link
      :to="{ name: 'algemeen-klassement' }"
      class="btn btn-alert"
      style="margin: 2rem 0"
    >
      Ga naar het algemene klassement
    </router-link>

    <h2>Etappe Overzicht</h2>
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
            :to="{ name: 'klassement-single', params: { etappeID: etappe.id } }"
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import config from '@/utils/config';

export default {
  //TODO bekijk of entrie al in ingevuld.
  name: 'EtappeOverzicht',
  data() {
    return {
      etappes: {},
      ronde: null,
    };
  },
  created() {
    fetch(`${config.DEV_URL}stages?race=1`)
      .then((response) => response.json())
      .then((result) => {
        this.etappes = result.sort((a, b) => (a.date > b.date ? 1 : -1));
        this.ronde = result[0].name;
      });
  },
  methods: {
    ...mapMutations(['setEtappes']),
    setEtappe(etappe) {
      this.setEtappes(etappe);
    },
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
