<template>
  <section>
    <h1>Startlijst aanpassen</h1>
    <label for="race">Kies de ronde:</label>
    <div class="formInline">
      <!-- <input type="number" min="2020" value="2020" v-model.number="year" /> -->
      <select name="race" id="race" v-model="race">
        <option :value="race.id" v-for="race in races" :key="race.index">
          {{ race.name }}
        </option>
      </select>
      <button v-on:click.prevent="getRenners()" class="btn btn-primary">
        Zoek
      </button>
    </div>
    <div class="renners">
      <div class="renner" v-for="renner in renners" :key="renner.index">
        <div class="renner__img">
          <img
            v-if="renner.image_url !== '/'"
            :src="
              `https://rondemaestro.s3.eu-central-1.amazonaws.com/renners/${renner.image_url}`
            "
            alt
          />
          <img v-else src="https://via.placeholder.com/50x50.png?" alt />
        </div>
        <div class="renner__info">
          <div class="renner__info-top">
            <div class="renner__info-top--number">
              <h3>#{{ renner.race_number }}</h3>
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
          <div class="renner__extra--teamIMG">
            <img
              :src="
                `https://rondemaestro.s3.eu-central-1.amazonaws.com/teams/${renner.team_img}`
              "
              :alt="renner.team_name"
            />
          </div>
          <div
            class="renner__extra--withdraw"
            @click="updateSelection(renner.cyclist_id)"
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// TODO ADD
import axios from 'axios';
import config from '@/utils/config';

export default {
  name: 'Startlist',
  components: {},
  data() {
    return {
      renners: [],
      races: [],
    };
  },

  methods: {
    async getRenners() {
      const response = await axios.get(
        `${config.DEV_URL}cyclists?startlist=true`
      );

      this.renners = response.data.sort((a, b) =>
        a.race_number > b.race_number ? 1 : -1
      );
    },
    async updateSelection(cyclist_id) {
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
      const startlist = await axios.put(`${config.DEV_URL}startlist`, {
        cyclist_id,
        race: 1,
        updateValue,
        //TODO race_id is nu altijd tour
      });
    },
  },
  async created() {
    const response = await axios.get(`${config.DEV_URL}races`);
    console.log(response.data);
    this.races = response.data;
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
