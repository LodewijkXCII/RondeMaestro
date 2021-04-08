<template>
  <section>
    <h2>Etappe aanpassen</h2>
    <form action="">
      <label for="race">Kies de ronde:</label>
      <select name="race" id="race" v-model="race" @change="getEtappes()">
        <option :value="race.id" v-for="race in races" :key="race.index">
          {{ race.name }}
        </option>
      </select>
      <label for="year">Kies het jaar:</label>
      <input
        type="number"
        name="year"
        id="year"
        v-model.number="year"
        min="2020"
        @change="getEtappes()"
      />
      <label for="etappe" v-show="etappes">Kies de etappe:</label>
      <select name="etappe" id="etappe" v-model="etappe" v-show="etappes">
        <option :value="etappe" v-for="etappe in etappes" :key="etappe.index">
          {{ etappe.stage_nr }}: {{ etappe.start_city }} -
          {{ etappe.finish_city }}
        </option>
      </select>
      <!-- <button v-on:click.prevent="getEtappe()" class="btn btn-succes">
        Selecteer
      </button> -->
    </form>

    <form v-if="etappe" style="margin-top: 4rem">
      <h3>
        Etappe {{ etappe.start_city }} - {{ etappe.finish_city }} aanpassen
      </h3>
      <label for="race_id">Koers:</label>
      <select name="race" id="race" v-model="etappe.race_id">
        <option :value="race.id" v-for="race in races" :key="race.index">
          {{ race.name }}
        </option>
      </select>
      <label for="stage_nr">Etappe Nr:</label>
      <input
        type="number"
        name="stage_nr"
        id="stage_nr"
        v-model.number="etappe.stage_nr"
        value="0"
        max="21"
      />
      <label for="date">Datum:</label>
      <input
        type="datetime-local"
        name="date"
        id="date"
        v-model="etappe.date"
        value="2021-01-01T12:00"
      />
      <label for="start_city">Start:</label>
      <input
        type="text"
        name="start_city"
        id="start_city"
        v-model="etappe.start_city"
        autocomplete="off"
        required
      />
      <label for="finish_city">Finish:</label>
      <input
        type="text"
        name="finish_city"
        id="finish_city"
        v-model="etappe.finish_city"
        autocomplete="off"
        required
      />
      <label for="distance">Afstand:</label>
      <input
        type="number"
        name="distance"
        id="distance"
        v-model.number="etappe.distance"
        required
      />
      <label for="stage_type">Soort etappe:</label>
      <select
        name="stage_type"
        id="stage_type"
        v-model="etappe.stage_type_id"
        required
      >
        <option
          :value="stage_type.id"
          v-for="stage_type in stage_types"
          :key="stage_type.index"
        >
          {{ stage_type.name }}
        </option>
      </select>

      <button
        type="submit"
        class="btn btn-succes"
        @click.prevent="updateEtappe(etappe.id)"
      >
        Aanpassen
      </button>
    </form>
  </section>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

export default {
  name: 'UpdateStage',
  components: {},
  data() {
    return {
      etappes: null,
      races: [],
      year: 2021,
      race: null,
      etappe: null,
      // changeStage: {
      //   race_id: null,
      //   stage_nr: null,
      //   start_city: '',
      //   finish_city: '',
      //   distance: '',
      //   date: '',
      //   done: false,
      //   image_url: '/',
      //   stage_type_id: null,
      // },
      stage_types: [],
    };
  },

  methods: {
    async getEtappes() {
      this.etappes = [];
      const stages = await axios.get(
        `${config.DEV_URL}stages?race=${this.race}&year=${this.year}`
      );
      this.etappes = stages.data;
    },

    async updateEtappe(id) {
      // UPDATE ETAPPE
      const update = await axios.put(`${config.DEV_URL}stages/${id}`, {
        race_id: this.etappe.race_id,
        stage_nr: this.etappe.stage_nr,
        start_city: this.etappe.start_city,
        finish_city: this.etappe.finish_city,
        distance: this.etappe.distance,
        date: this.etappe.date,
        done: false,
        image_url: this.etappe.image_url,
        stage_type_id: this.etappe.stage_type_id,
      });

      if (update.status == 200) {
        this.message = 'Succesvol geupdate';
        this.etappe = null;
        return;
      } else {
        this.message = 'Er is iets mis gegaan.';
        console.log(update);
      }
    },
  },
  async created() {
    const response = await axios.get(`${config.DEV_URL}races`);
    this.races = response.data;

    const stage_types = await axios.get(`${config.DEV_URL}stage_type`);
    this.stage_types = stage_types.data;
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';
.renners {
  grid-template-columns: 1fr;
  .renner {
    &:hover {
      cursor: default;
    }

    &__extra {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      &--withdraw {
        &:hover {
          cursor: pointer;
        }

        .fa-check {
          color: $succes-color;
        }
        .fa-times {
          color: $alert-color;
        }
      }
    }
    &:active {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
