<template>
  <div class="container">
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
      <div
        class="rmTable__wrapper"
        v-for="(etappe, index) in etappes"
        :key="etappe.id"
      >
        <div
          class="rmTable__body"
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
            <img
              :src="
                `https://rondemaestro.s3.eu-central-1.amazonaws.com/icons/${etappe.stage_type}`
              "
            />
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
        </div>
        <div class="rmTable__bottom">
          <div class="rmTable__bottom--selection">
            <div
              v-for="renner in etappe.selection"
              :key="renner.id"
              class="rennerInfo"
            >
              <div class="rennerInfo--name">
                {{ renner.first_name }}
                <div class="lastName">{{ renner.last_name }}</div>
              </div>
            </div>
          </div>
          <div class="rmTable__bottom--links">
            <div class="rmTable__bottom--link">
              <router-link
                :to="{ name: 'selectie', params: { etappeID: etappe.id } }"
              >
                Renners invullen
              </router-link>
            </div>
            <div
              class="rmTable__bottom--team"
              @click="openSelection(etappe, index)"
            >
              Bekijk je team
            </div>
            <div class="rmTable__bottom--done" v-if="etappe.done === true">
              <router-link
                :to="{ name: 'score-single', params: { etappeID: etappe.id } }"
                >Bekijk de score</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import config from '@/utils/config';
import axios from 'axios';

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
    // const currentDate = new Date();

    fetch(`${config.DEV_URL}stages?race=1`)
      .then((response) => response.json())
      .then((result) => {
        const fetched = result.sort((a, b) => (a.date > b.date ? 1 : -1));
        this.etappes = fetched.map((etappe) => ({ ...etappe, selection: [] }));
        this.ronde = result[0].name;
      });
  },
  methods: {
    ...mapMutations(['setEtappes']),
    setEtappe(etappe) {
      this.setEtappes(etappe);
    },
    async openSelection(etappe, index) {
      if (this.etappes[index].selection.length === 0) {
        const activeUser = window.localStorage.user_id;

        const entry = await axios.get(
          `${config.DEV_URL}entries?users_id=${activeUser}&stage_id=${etappe.id}`
        );
        if (entry) {
          this.etappes[index].selection = entry.data;
        }
      } else {
        this.etappes[index].selection = [];
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.rmTable {
  margin: 2rem 0;
  font-size: 0.8em;

  &__header,
  &__body {
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

    text-transform: uppercase;
    border-bottom: 1px solid $primary-color;
    padding-bottom: 0.2rem;
    margin-bottom: 0.1rem;
    padding: 0 0.25rem;

    &--distance,
    &--date {
      text-align: center;
    }
  }

  &__wrapper {
    margin-bottom: 3px;
    // background: #fff;
    // padding: 0.5rem 0.25rem;
    // font-size: 0.6rem;

    &:nth-child(odd) .rmTable__body {
      background: $white-color;
    }
    &:nth-child(odd) .rmTable__bottom {
      background: darken($color: $white-color, $amount: 2);
    }
  }
  &__body {
    background: #fff;
    position: relative;
    padding: 0.75rem 1rem;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);

    &:nth-child(odd) {
      background: darken($color: #fff, $amount: 3);
    }

    &--date,
    &--number,
    &--distance,
    &--type {
      justify-self: center;
      align-self: center;
      img {
        max-width: 15px;
      }
    }

    &--city {
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
      margin: 0.2rem;
    }

    &.done::after {
      background: $succes-color;
      content: '';
      position: absolute;
      width: 5px;
      height: 100%;

      right: 0;
      top: 0;
    }
    &.not-done::after {
      background: $danger-color;
      content: '';
      position: absolute;
      width: 5px;
      height: 100%;

      right: 0;
      top: 0;
    }
  }

  &__bottom {
    margin-left: 0.75rem;
    margin-right: 5px;
    background: darken($color: #fff, $amount: 1);
    border-radius: 0px 0px 10px 10px;
    box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);

    &--links {
      display: flex;
      font-size: 0.8em;
      padding: 0.5rem 0;
      // justify-content: flex-end;
    }
    &--link,
    &--team,
    &--done,
    &--score {
      padding: 0.2rem 0.5rem;
      text-transform: uppercase;

      color: $primary-color;
      font-weight: 700;
    }
    &--team {
      cursor: pointer;
    }
    &--selection {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(4, 1fr);
      text-align: center;
    }
  }
}

@media only screen and (min-width: 1224px) {
  .rmTable {
    font-size: 1rem;

    &__header,
    &__body {
      grid-template-columns:
        minmax(15px, 30px) minmax(20px, 120px) 4fr minmax(15px, 45px)
        1fr minmax(15px, 20px);
    }
    &__bottom {
      &--link,
      &--team,
      &--done,
      &--score {
        padding: 0.2rem 2rem;
      }

      &--links {
        padding: 0.5rem 0 0.75rem;
      }
    }
  } /* Styles */
}

.rennerInfo {
  min-height: 40px;
  display: flex;
  align-items: center;
  margin: auto;
}
</style>
