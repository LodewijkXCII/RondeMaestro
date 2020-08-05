<template>
  <div class="selectedRiders" :class="{ show: ShowSelectie }">
    <div class="selectedRiders__top" @click="showSelectie()">
      <h4 :class="{ error: error }">
        Geselecteerd:
        {{ countSelectie }}
        <span>/ 8</span>
      </h4>
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

      <button @click.prevent="submitSelectie()" class="btn btn-primary">
        Verstuur
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import axios from 'axios';

const URL = 'http://localhost:1992/api/v1/entries';

export default {
  data() {
    return {
      ShowSelectie: false,
      error: false,
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
      console.log('clicked');
    },

    async submitSelectie() {
      if (this.countSelectie !== 8) {
        window.alert('Er zijn er geen 8 ingevuld');
      } else {
        await axios
          .get(
            `http://localhost:1992/api/v1/entries?users_id=2&stage_id=${this.$route.params.etappeID}`
          )
          .then((response) => {
            response.data.forEach((selected) => {
              axios.put(
                `http://localhost:1992/api/v1/entries?users_id=2&stage_id=${this.$route.params.etappeID}`,
                {
                  users_id: 2,
                  stage_id: this.stage,
                  cyclist_id: selected.cyclist_id,
                }
              );
            });
          });
        // TODO USER_ID AS USER ID;

        await this.selectie.forEach((renner) => {
          axios
            .post(URL, {
              users_id: 2,
              stage_id: this.stage,
              cyclist_id: renner.cyclist_id,
              //TODO cyclist_id if renner is niet aangepast
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
        this.removeAll();
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
    &.error {
      color: $alert-color;
    }
    h4 {
      font-size: 0.9rem;
      text-align: center;
      position: relative;
      margin: 0.5rem 0;
      cursor: pointer;

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
</style>
