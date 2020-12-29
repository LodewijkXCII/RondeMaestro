<template>
  <section>
    <h2>Update Renner</h2>
    <!-- <p>pagina {{ offset }}</p> -->
    <button
      class="btn btn-primary"
      v-on:click="updateSelection(1)"
      v-if="offset < 0"
      style="margin-top: 1rem"
    >
      start
    </button>
    <FilterOptions :teams="teams" @search-rider="updateName" />
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

export default {
  components: {
    RennerCard,
    FilterOptions,
  },
  data() {
    return {
      renners: [],
      offset: -25,
      limit: 25,
      teams: [],
      counter: 0,
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
      this.getRenners();
    },
    updateName(name) {
      this.name = name;
      this.searchRiders();
    },

    editRenner(renner) {
      console.log(renner, renner.first_name, renner.last_name);
    },
    // RENNER ZOEKEN
    async searchRiders() {
      this.team = 0;
      const searchrider = await axios.get(
        `${config.DEV_URL}cyclists?name=${this.name}`
      );
      this.renners = searchrider.data;
    },
    async getRenners() {
      const response = await axios.get(
        `${config.DEV_URL}cyclists?limit=${this.limit}&offset=${this.offset}`
      );
      this.renners = response.data;
    },
  },
};
</script>

<style></style>
