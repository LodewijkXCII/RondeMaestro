<template>
  <div class="container">
    <h1>Etappe Overzicht</h1>
    <h2>{{ ronde }}</h2>

    <div class="rmTable">
      <div class="rmTable__header tableEtappe">
        <div class="rmTable__header--number">#</div>
        <div class="rmTable__header--date">Datum</div>
        <div class="rmTable__header--city">Start en Finish</div>
        <div class="rmTable__header--type">Profiel</div>
        <div class="rmTable__header--distance">Afstand</div>
        <div class="rmTable__header--button"></div>
      </div>
      <div class="rmTable__wrapper" v-for="etappe in etappes" :key="etappe.id">
        <router-link
          :to="
            etappe.done
              ? { name: 'klassement-single', params: { etappeID: etappe.id } }
              : { name: 'selectie', params: { etappeID: etappe.id } }
          "
        >
          <div
            class="rmTable__body tableEtappe"
            :class="etappe.done === true ? 'done' : 'not-done'"
          >
            <div class="rmTable__body--number">{{ etappe.stage_nr }}.</div>
            <div class="rmTable__body--date">
              {{ etappe.date | formatDate }}
            </div>
            <div class="rmTable__body--city">
              {{ etappe.start_city }} - {{ etappe.finish_city }}
            </div>
            <div class="rmTable__body--type">
              <img :src="etappe.stage_type" />
            </div>
            <div class="rmTable__body--distance">{{ etappe.distance }}KM</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import config from "@/utils/config";
import routes from "@/api/routes";

export default {
  //TODO bekijk of entrie al in ingevuld.
  name: "EtappeOverzicht",
  data() {
    return {
      etappes: {},
      ronde: null,
      link: "",
    };
  },

  async mounted() {
    const response = await routes.find(
      `stages?race_id=${config.race_id}&year=${config.currentYear}`
    );

    const fetched = response.data.sort((a, b) => (a.date > b.date ? 1 : -1));
    this.etappes = fetched.map((etappe) => ({ ...etappe, selection: [] }));
    this.ronde = response.data[0].name;
  },

  methods: {
    ...mapMutations(["setEtappes"]),
    setEtappe(etappe) {
      this.setEtappes(etappe);
    },
  },

  computed: {
    transformed() {
      return;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";

.rennerInfo {
  min-height: 40px;
  display: flex;
  align-items: center;
  margin: auto;
}

.tableEtappe {
  grid-template-columns:
    minmax(5px, 10px) minmax(40px, 1fr) 4fr minmax(15px, 45px)
    1fr;

  .rmTable__body--number {
    padding: 0;
  }
}
</style>
