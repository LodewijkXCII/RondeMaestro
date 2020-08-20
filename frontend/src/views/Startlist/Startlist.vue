<template>
  <section>
    <h1>Startlist</h1>
    <div class="renners">
      <div
        class="renner"
        v-for="(renner, index) in renners"
        :key="renner.index"
        @click="toSelectie(renner, index)"
        :class="{
          withdraw: renner.withdraw,
          selected: renner.selected,
        }"
      >
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
  async created() {
    const cyclists = await axios.get(`${config.DEV_URL}cyclists`);
    this.renners = cyclists.data.sort((a, b) =>
      a.race_number > b.race_number ? 1 : -1
    );
  },
};
</script>

<style></style>
