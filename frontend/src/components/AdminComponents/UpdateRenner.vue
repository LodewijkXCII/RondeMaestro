<template>
  <section>
    <modal
      v-if="showModal"
      @close="showModal = false"
      :renner="selectedRider"
      :teams="teams"
    >
    </modal>
    <h2>Update Renner</h2>

    <FilterOptions
      :teams="teams"
      @search-rider="searchRiders"
      @search-team="searchRidersTeam"
    />

    <div v-show="loading">
      <h1 class="loading">Ffkes wachten, aan het laden...</h1>
    </div>
    <div class="">
      <RennerCard
        v-for="renner in renners"
        :key="renner.cyclist_id"
        :renner="renner"
        :icon="'edit'"
        :class="{}"
        @click.native="editRenner(renner)"
      />
    </div>
    <div class="buttons">
      <button
        class="btn btn-primary prev"
        v-on:click="updateSelection(0)"
        v-if="offset > 0"
      >
        Vorige
      </button>
      <button
        class="btn btn-primary next"
        v-on:click="updateSelection(1)"
        v-if="offset >= 0"
      >
        volgende
      </button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

import RennerCard from '@/components/Renner.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import Modal from '../Modals/Update_Renner_Modal.vue';

export default {
  components: {
    RennerCard,
    FilterOptions,
    Modal,
  },
  data() {
    return {
      loading: true,
      renners: [],
      offset: 0,
      limit: 15,
      teams: [],
      counter: 0,
      showModal: false,
      selectedRider: {},
    };
  },

  computed: {},

  methods: {
    updateSelection(change) {
      if (change == 1) {
        this.offset += 25;
      } else {
        this.offset -= 25;
      }
      this.refreshRiders();
    },
    editRenner(renner) {
      console.log(renner, renner.first_name, renner.last_name);
      this.showModal = true;
      this.selectedRider = renner;
    },
    async refreshRiders() {
      const response = await axios.get(
        `${config.DEV_URL}cyclists?limit=${this.limit}&offset=${this.offset}`
      );
      this.renners = response.data;
    },
    async searchRidersTeam(team) {
      const searchrider = await axios.get(
        `${config.DEV_URL}cyclists?&team=${team}&limit=${this.limit}&offset=${this.offset}`
      );
      this.renners = searchrider.data;
    },
    // RENNER ZOEKEN
    async searchRiders() {
      const searchrider = await axios.get(
        `${config.DEV_URL}cyclists?&name=${this.name}&limit=${this.limit}&offset=${this.offset}`
      );
      this.renners = searchrider.data;
    },
  },

  async created() {
    const response = await axios.get(
      `${config.DEV_URL}cyclists?limit=${this.limit}&offset=${this.offset}`
    );
    this.renners = response.data;

    const teams = await axios.get(`${config.DEV_URL}teams`);
    this.teams = teams.data;
    this.loading = false;
  },
};
</script>

<style>
.loading {
  text-align: center;
  margin: 2rem 0;
}
</style>
