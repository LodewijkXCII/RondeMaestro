<template>
  <section>
    <h1>Startlist</h1>
    <div class="renners">
      <div class="renner" v-for="renner in renners" :key="renner.index">
        <div class="renner__img">
          <img v-if="renner.image_url !== '/'" :src="renner.image_url" alt />
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
            <img :src="renner.team_img" :alt="renner.team_name" />
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
import axios from 'axios';
import config from '@/utils/config';

export default {
  name: 'Startlist',
  components: {},
  data() {
    return {
      renners: [],
    };
  },
  // computed: {
  //   updatedCyclist(cyclist_id) {
  //     const updatedCyclist = this.renners.find(
  //       (ren) => ren.cyclist_id == cyclist_id
  //     );
  //     console.log(updatedCyclist.withdraw);
  //     updatedCyclist.withdraw = true;
  //     console.log(updatedCyclist.withdraw);
  //   },
  // },
  methods: {
    async updateSelection(cyclist_id) {
      const startlist = await axios.put(`${config.DEV_URL}startlist`, {
        cyclist_id,
        race: 1,
      });

      const updatedCyclist = this.renners.find(
        (ren) => ren.cyclist_id == cyclist_id
      );

      updatedCyclist.withdraw = true;
    },
  },
  async created() {
    const cyclists = await axios.get(`${config.DEV_URL}cyclists`);
    this.renners = cyclists.data.sort((a, b) =>
      a.race_number > b.race_number ? 1 : -1
    );
  },
};
</script>

<style lang="scss" scoped>
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
