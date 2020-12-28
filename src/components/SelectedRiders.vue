<template>
  <!-- TODO Add annimation when selecting riders (up/down) -->

  <div class="selectedRiders" :class="{ show: ShowSelectie }">
    <div class="selectionRiders">
      <RennerCard
        v-for="(renner, index) in selectie"
        :key="index"
        :renner="renner"
        :icon="'times'"
        @click.native="removeFromSelectie(index)"
      />
    </div>
  </div>
</template>

<script>
import RennerCard from '@/components/Renner.vue';

import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import axios from 'axios';
import config from '@/utils/config';

const URL = 'entries';

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
    ...mapGetters(['countSelectie']),
    ...mapState(['selectie', 'stage']),

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
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

// .selectedRiders {
//   position: fixed;
//   padding: 0.5rem 2rem;
//   background: white;
//   bottom: -125px;
//   right: 0;
//   left: 0;
//   z-index: 90;
//   border-radius: 10px 10px 0 0;
//   box-shadow: 0 0 15px 1px $primary-color;

//   &__top {
//     h4 {
//       font-size: 0.9rem;
//       text-align: center;
//       position: relative;
//       margin: 0.5rem 0;
//       cursor: pointer;
//       &.error {
//         color: $alert-color;
//       }

//       &::before {
//         content: '';
//         position: absolute;
//         left: 50%;
//         transform: translateX(-50%);
//         top: -10px;
//         width: 100px;
//         height: 6px;
//         background: #303030;
//         border-radius: 3px;
//       }

//       span {
//         font-size: 0.7rem;
//       }
//     }
//     p {
//       text-transform: uppercase;
//       font-weight: 700;
//       text-align: center;
//       margin: 0.1rem;
//       color: $alert-color;
//     }
//   }

//   &.show {
//     transform: translateY(-195px);
//     transition: 0.5s ease-out;
//   }

//   &__bottom {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     grid-template-rows: repeat(5, 1fr);
//     gap: 0.25rem;
//     height: 125px;
//     margin-bottom: 1rem;

//     &--rider {
//       display: flex;
//       align-items: center;
//       margin: 0.125rem 0;

//       img {
//         margin: 0 0.2rem;
//         width: 15px;
//       }

//       img,
//       h5 {
//         cursor: pointer;
//       }

//       &:nth-child(even) {
//         flex-direction: row-reverse;
//       }
//     }
//   }
//   &__buttons {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 1rem;
//   }
// }

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .selectedRiders {
    right: 1em;
    .selection {
      .renner {
        margin: 0.7em 0;
      }
    }
  }
  .selectionRiders .renner {
    background: $primary-color;
    color: $light-color;
    font-weight: 100;

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
}
</style>
