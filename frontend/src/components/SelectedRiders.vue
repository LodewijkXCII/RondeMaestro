<template>
  <!-- TODO Add annimation when selecting riders (up/down) -->

  <div class="selectedRiders" :class="{ show: ShowSelectie }">
    <div class="selectionRiders">
      <RennerCard
        v-for="(renner, index) in renner.selectie"
        :key="index"
        :renner="renner"
        :icon="'times'"
        @click.native="removeFromSelectie(index)"
        @remove="toggleSelected(renner)"
      />
    </div>
  </div>
</template>

<script>
import RennerCard from '@/components/Renner.vue';

import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    RennerCard,
  },
  data() {
    return {
      ShowSelectie: false,
      error: false,
      sendButton: 'Verstuur',
      toMuch: false,
      errorMsg: '',
    };
  },
  computed: {
    ...mapGetters(['countSelectie', 'renner']),
    ...mapState(['renner', 'stage']),

    errorSelected() {
      if (this.countSelectie > 8) {
        this.error = true;
      } else {
        this.error = false;
      }
    },
  },
  methods: {
    ...mapMutations(['deleteSelectie', 'removeFromSelectie']),
    ...mapActions(['removeSelectie']),

    showSelectie() {
      this.ShowSelectie = !this.ShowSelectie;
    },
    toggleSelected(renner) {
      const test = renner;
      console.log('test', test);
      this.$emit('up', test, renner);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.selectedRiders {
  grid-row: 3/4;
  padding-bottom: 1rem;
  border-bottom: 2px solid $primary-color;
}

.selectionRiders .renner {
  background: $primary-color;
  color: $light-color;
  font-weight: 100;
  .selection {
    .renner {
      margin: 0.7em 0;
    }
  }

  .lastName {
    font-weight: 400;
  }
  &__img {
    border-color: $white-color;
  }
  svg {
    color: $alert-color;
  }
}
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .selectedRiders {
    right: 1em;
    grid-row: inherit;
    padding: 0;
    border: none;
  }
}
</style>
