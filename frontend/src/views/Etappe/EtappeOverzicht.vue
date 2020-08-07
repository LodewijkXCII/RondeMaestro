<template>
  <div>
    <h1>Etappe Overzicht</h1>
    <h2>{{ ronde }}</h2>

    <div class="rmTable">
      <div class="rmTable__header">
        <div class="rmTable__header--number">#</div>
        <div class="rmTable__header--date">Datum</div>
        <div class="rmTable__header--city">Start en Finish</div>
        <div class="rmTable__header--type">Profiel</div>
        <div class="rmTable__header--distance">Afstand</div>
        <div class="rmTable__header--button"></div>
      </div>
      <div class="rmTable__body" v-for="etappe in etappes" :key="etappe.id">
        <router-link
          :to="{ name: 'selectie', params: { etappeID: etappe.id } }"
          class="rmTable__bodya"
        >
          <div class="rmTable__body--number">{{ etappe.stage_nr }}.</div>
          <div class="rmTable__body--date">{{ etappe.date | formatDate }}</div>
          <div class="rmTable__body--city">
            {{ etappe.start_city }} - {{ etappe.finish_city }}
          </div>
          <div class="rmTable__body--type">
            {{ etappe.stage_type.charAt(0) }}
          </div>
          <div class="rmTable__body--distance">{{ etappe.distance }}KM</div>
          <div class="rmTable__body--button">
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

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
    fetch('https://rondemaestro-test.herokuapp.com/api/v1/stages?race=3')
      .then((response) => response.json())
      .then((result) => {
        this.etappes = result;
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

<style lang="scss">
@import '@/assets/styles.scss';

.rmTable {
  margin: 2rem 0;

  &__header,
  &__bodya {
    display: grid;
    gap: 0.1rem;
    grid-template-columns:
      minmax(5px, 10px) minmax(40px, 1fr) 4fr minmax(15px, 45px)
      1fr minmax(15px, 20px);
    color: $black-color;
    font-weight: normal;
  }

  &__header {
    color: $primary-color;
    font-weight: 700;
    font-size: 0.55rem;
    text-transform: uppercase;
    border-bottom: 1px solid $primary-color;
    padding-bottom: 0.2rem;
    margin-bottom: 0.1rem;
    padding: 0 0.25rem;
  }

  &__body {
    background: #fff;
    padding: 0.5rem 0.25rem;
    font-size: 0.6rem;

    &:nth-child(odd) {
      background: $white-color;
    }

    &--date,
    &--number,
    &--distance,
    &--type {
      justify-self: center;
      align-self: center;
    }

    &--city {
      font-size: 0.8rem;
      padding: 0 0.2rem;
      align-self: center;
    }
    &--button {
      justify-self: center;
      align-self: center;
      a img {
        height: 15px;
        padding-top: 3px;
      }
    }
    a {
      text-transform: none;
    }
  }
}
</style>
