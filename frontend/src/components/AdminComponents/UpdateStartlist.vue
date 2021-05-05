<template>
  <section>
    <h2>Startlijst aanpassen</h2>
    <label for="race">Kies de ronde:</label>
    <div class="formInline">
      <!-- <input type="number" min="2020" value="2020" v-model.number="year" /> -->
      <select name="race" id="race" v-model="race">
        <option :value="race.id" v-for="race in races" :key="race.index">
          {{ race.year }} - {{ race.name }}
        </option>
      </select>
      <button v-on:click.prevent="getRenners(race)" class="btn btn-primary">
        Zoek
      </button>
    </div>
    <div class="renners">
      <div class="renner" v-for="renner in renners" :key="renner.index">
        <div class="renner__img">
          <img
            v-if="renner.cyclist_image !== '/'"
            :src="
              `https://rondemaestro.s3.eu-central-1.amazonaws.com/renners/${renner.cyclist_image}`
            "
            alt
          />
          <img v-else src="https://via.placeholder.com/50x50.png?" alt />
        </div>
        <div class="renner__info">
          <div class="renner__info-top">
            <div class="renner__info-top--number startlist_number">
              #
              <input
                type="number"
                name="race_number"
                id="race=number"
                number
                v-model.number="renner.race_number"
              />
              <font-awesome-icon
                icon="check"
                size="sm"
                @click="updateRaceNumber(renner)"
              />
            </div>
            <div class="renner__info-top--flag">
              <flag :iso="renner.country_name" :squared="false" />
            </div>
          </div>
          <div class="renner__info--name">
            {{ renner.first_name }}
            <span class="lastName">{{ renner.last_name }}</span>
          </div>
          <div class="renner__info--team">{{ renner.team_name }}</div>
        </div>
        <div class="renner__extra">
          <div
            class="renner__extra--withdraw"
            @click="updateSelection(renner.cyclist_id, race)"
          >
            <font-awesome-icon
              icon="check"
              size="lg"
              v-if="renner.withdraw == false"
            />
            <font-awesome-icon
              icon="times"
              size="lg"
              v-if="renner.withdraw == true"
            />
          </div>
          <div
            class="renner__extra"
            @click="removeRenner(renner.cyclist_id, race)"
          >
            <font-awesome-icon icon="trash" size="lg" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';

export default {
  name: 'Startlist',
  components: {},
  data() {
    return {
      renners: [],
      races: [],
      race: {},
    };
  },

  methods: {
    async getRenners(race) {
      this.renners = [];
      const response = await axios.get(
        `${config.DEV_URL}startlist?race_id=${race}`
      );

      this.renners = response.data.sort((a, b) =>
        a.race_number > b.race_number ? 1 : -1
      );
    },
    async updateSelection(cyclist_id, race) {
      console.log('race', race);
      const updatedCyclist = this.renners.find(
        (ren) => ren.cyclist_id == cyclist_id
      );

      let updateValue;
      if (updatedCyclist.withdraw === true) {
        updateValue = false;
        updatedCyclist.withdraw = false;
      } else {
        updateValue = true;
        updatedCyclist.withdraw = true;
      }
      await axios.put(`${config.DEV_URL}startlist/withdraw?race_id=${race}`, {
        cyclist_id,
        race_id: race,
        updateValue,
      });
    },
    async updateRaceNumber(renner) {
      console.log(renner);
      const response = await axios.put(
        `${config.DEV_URL}startlist/update?race_id=${this.race}`,
        renner
      );
      console.log(response);
    },
    async removeRenner(id, race) {
      const response = await axios.delete(`${config.DEV_URL}startlist`, {
        data: {
          cyclist_id: id,
          race_id: race,
        },
      });
      console.log(response);
    },
  },
  async created() {
    const { data } = await axios.get(`${config.DEV_URL}races`);
    this.races = data;
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
      .fa-trash {
        color: $alert-color;
      }
    }
    &:active {
      transform: none;
      box-shadow: none;
    }
  }
}

.startlist_number {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  input {
    padding: 0.2rem 0.5rem;
    max-width: 10ch;
  }
  svg {
    color: $primary-color;
  }
}
</style>
