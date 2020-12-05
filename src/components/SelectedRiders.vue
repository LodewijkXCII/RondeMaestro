<template>
  <div class="selectedRiders" :class="{ show: ShowSelectie }">
    <div class="selectedRiders__top" @click="showSelectie()">
      <h4 :class="{ error: error }">
        Geselecteerd:
        {{ countSelectie }}
        <span>/ 8</span>
      </h4>
      <p>{{ errorMsg }}</p>
    </div>
    <!-- <h3>Je selectie voor etappe {{stage}}</h3> -->
    <div class="selectedRiders__bottom">
      <div
        v-for="(renSelect, index) in selectie"
        :key="index"
        class="selectedRiders__bottom--rider"
      >
        <img
          src="@/assets/icons/x-circle.svg"
          alt="delete"
          @click="removeFromSelectie(index)"
        />

        <h5>
          {{ renSelect.first_name.charAt(0) }}.
          {{ renSelect.last_name.toUpperCase() }}
        </h5>
      </div>
    </div>
    <div class="selectedRiders__buttons">
      <button @click.prevent="delSelectie()" class="btn btn-danger">
        Wis selectie
      </button>

      <button @click.prevent="submitSelectie()" class="btn btn-succes">
        {{ sendButton }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import axios from 'axios';
import config from '@/utils/config';

const URL = 'entries';

export default {
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
    ...mapActions(['removeAll', 'removeSelectie']),

    delSelectie() {
      this.removeAll();
    },
    showSelectie() {
      this.ShowSelectie = !this.ShowSelectie;
    },

    async submitSelectie() {
      const activeUser = window.localStorage.user_id;
      const submitTime = new Date();
      const stagesTime = new Date(this.stage.date);

      if (this.countSelectie !== 8) {
        this.errorMsg = 'Er zijn niet precies 8 renners ingevuld!';
        this.error = true;
        setTimeout(() => {
          (this.errorMsg = ''), (this.error = false);
        }, 5000);
      } else if (submitTime > stagesTime) {
        this.errorMsg = 'Je kan helaas niet meer invullen';
        this.error = true;
        setTimeout(() => {
          (this.errorMsg = ''), (this.error = false);
        }, 5000);
      } else {
        this.sendButton = 'Versturen...';
        await axios
          .get(
            `${config.DEV_URL}entries?users_id=${activeUser}&stage_id=${this.$route.params.etappeID}`
          )
          .then((response) => {
            response.data.forEach((selected) => {
              axios.put(
                `${config.DEV_URL}entries?users_id=${this.activeUser}&stage_id=${this.$route.params.etappeID}`,
                {
                  users_id: +activeUser,
                  stage_id: +this.$route.params.etappeID,
                  cyclist_id: selected.cyclist_id,
                }
              );
            });
          });

        await this.selectie.forEach((renner) => {
          axios
            .post(`${config.DEV_URL}entries`, {
              users_id: +activeUser,
              stage_id: +this.$route.params.etappeID,
              cyclist_id: +renner.cyclist_id,
            })
            .then((response) => {
              this.sendButton = 'verstuurd';
              setTimeout(() => (this.sendButton = 'verstuur'), 5000);
              this.removeAll();
              this.$router.push({ name: 'etappe-overzicht' }).catch(() => {});
            })
            .catch((error) => {
              this.error = error.message;
            });
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.selectedRiders {
  position: fixed;
  padding: 0.5rem 2rem;
  background: white;
  bottom: -125px;
  right: 0;
  left: 0;
  z-index: 90;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 15px 1px $primary-color;

  &__top {
    h4 {
      font-size: 0.9rem;
      text-align: center;
      position: relative;
      margin: 0.5rem 0;
      cursor: pointer;
      &.error {
        color: $alert-color;
      }

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -10px;
        width: 100px;
        height: 6px;
        background: #303030;
        border-radius: 3px;
      }

      span {
        font-size: 0.7rem;
      }
    }
    p {
      text-transform: uppercase;
      font-weight: 700;
      text-align: center;
      margin: 0.1rem;
      color: $alert-color;
    }
  }

  &.show {
    transform: translateY(-195px);
    transition: 0.5s ease-out;
  }

  &__bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    gap: 0.25rem;
    height: 125px;
    margin-bottom: 1rem;

    &--rider {
      display: flex;
      align-items: center;
      margin: 0.125rem 0;

      img {
        margin: 0 0.2rem;
        width: 15px;
      }

      img,
      h5 {
        cursor: pointer;
      }

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
  }
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .selectedRiders {
    bottom: -105px;
  }
  .selectedRiders > * {
    width: 650px;
    margin: auto;
  }
}
</style>
