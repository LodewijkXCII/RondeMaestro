<template>
  <section>
    <SelectedRiders />
    <section class="PrevNext">
      <router-link to="/etappe-overzicht">
        <img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
        <span>Terug naar het etappe overzicht</span>
      </router-link>
    </section>
    <h1 v-if="etappe.name !== 'Klassiekers'">
      Kies je renners voor etappe {{ etappe.stage_nr }}
    </h1>
    <h1 v-else>
      Kies je renners voor {{ etappe.start_city }} - {{ etappe.finish_city }}
    </h1>

    <div class="etappeInfo">
      <div class="etappeInfo__left">
        <div>{{ etappe.start_city }} - {{ etappe.finish_city }}</div>
        <div>{{ etappe.name }}</div>
        <div>Type: {{ etappe.stage_type }}</div>
        <div>Afstand: {{ etappe.distance }} km</div>
      </div>
      <div class="etappeInfo__right">
        <router-link :to="`/etappe-overzicht/${this.$route.params.etappeID}`">
          <div>Etappe info</div>
        </router-link>
      </div>
    </div>

    <section class="filter">
      <label for="name">Zoek op renner:</label>
      <input
        type="text"
        name="name"
        id="name"
        v-model="name"
        v-on:input="searchRiders()"
        autocomplete="off"
      />
      <div class="half">
        <div class="half--block">
          <label for="team">Zoek op team:</label>

          <select
            name="team"
            id="team"
            v-model="team"
            @change="searchRidersTeam($event)"
          >
            <option value="0" disabled>-</option>
            <option
              :value="team.team_id"
              v-for="team in teams"
              :key="team.index"
              >{{ team.team_name }}</option
            >
          </select>
        </div>

        <!-- <div class="half--block">
          <label for="spec">Zoek op specialisme:</label>
          <select name="spec" id="spec" v-model="spec">
            <option value></option>
          </select>
        </div>-->
      </div>
    </section>
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
            <img :src="renner.team_img" :alt="renner.team_name" />
          </div>
          <!-- <div class="renner__extra--speciality">
            <span v-if="renner.speciality_name">{{
              renner.speciality_name
            }}</span>
            <span v-if="renner.speciality_id_2"
              >/ {{ renner.speciality_id_2 }}</span
            >
          </div>-->
          <!-- <div class="renner__extra--points">
            <h2>100pt</h2>
          </div>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SelectedRiders from '@/components/SelectedRiders.vue';
import axios from 'axios';
import config from '@/utils/config';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'RennerOverview',
  components: {
    SelectedRiders,
    // FilterOptions,
  },
  data() {
    return {
      renners: [],
      teams: [],
      etappe: '',
      name: '',
      team: '',
      spec: '',
      error: false,
      isSelected: false,
    };
  },
  computed: {
    ...mapState(['selectie', 'stage']),
    ...mapGetters(['countSelectie']),

    currentSelectie(state) {
      this.selectie = state.selectie;
    },
  },
  methods: {
    ...mapMutations(['addToSelectie', 'setEtappes']),
    ...mapActions(['removeSelectie']),
    ...mapActions(['removeAll']),

    toEtappe(etappe) {
      this.setEtappes(etappe);
    },
    toSelectie(renner, index) {
      if (this.selectie.includes(renner)) {
        this.removeSelectie(this.selectie.indexOf(renner));
      } else if (this.countSelectie >= 10) {
        console.error('teveel!');
      } else if (renner.withdraw == true) {
        // const selected = renner;
        // selected.style.backgroundColor = '#025764';

        console.error(renner, 'kan niet he');
      } else {
        this.addToSelectie(renner);
      }
    },
    // RENNER ZOEKEN
    async searchRiders() {
      this.team = 0;
      const searchrider = await axios.get(
        `${config.DEV_URL}cyclists?name=${this.name}`
      );
      this.renners = searchrider.data.sort((a, b) =>
        a.race_number > b.race_number ? 1 : -1
      );
    },
    async searchRidersTeam(e) {
      const searchrider = await axios.get(
        `${config.DEV_URL}cyclists?team=${e.target.value}`
      );
      this.renners = searchrider.data.sort((a, b) =>
        a.race_number > b.race_number ? 1 : -1
      );
    },
  },

  async created() {
    const activeUser = window.localStorage.user_id;
    this.removeAll();

    const cyclists = await axios.get(`${config.DEV_URL}cyclists`);
    this.renners = cyclists.data.sort((a, b) =>
      a.race_number > b.race_number ? 1 : -1
    );
    this.teams = [
      ...new Map(
        cyclists.data.map((item) => [
          item['team_name'],
          {
            team_name: item.team_name,
            team_id: item.team_id,
            team_img: item.team_img,
          },
        ])
      ).values(),
    ];

    const stage = await axios.get(
      `${config.DEV_URL}stages/${this.$route.params.etappeID}`
    );
    if (stage) {
      this.etappe = stage.data;
      this.toEtappe(stage.data);
    }

    if (activeUser) {
      const entries = await axios.get(
        `${config.DEV_URL}entries?users_id=${activeUser}&stage_id=${this.$route.params.etappeID}`
      );
      if (entries) {
        entries.data.forEach((cyclist) => {
          this.addToSelectie(cyclist);
        });
      }
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.etappeInfo {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 1em;
  background: #fff;
  border-radius: 15px;

  &__left {
    border-right: 1px solid $primary-color;
  }

  &__right {
    margin: auto;

    a {
      color: $alert-color;
    }
  }
}

.filter {
  margin-top: 0.75em;
  .half {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
}
label {
  display: block;
}

.renners {
  display: grid;
  gap: 0.5em;

  .renner {
    display: grid;
    grid-template-columns: 75px 3fr 1fr;
    align-items: center;
    background: white;
    padding: 0.5em 0.2em;

    &__img {
      margin: 0.5em auto;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #3fc1c9;
      overflow: hidden;

      img {
        max-width: 100%;
      }
    }

    &__info {
      &-top {
        display: flex;
        &--number {
          margin-right: 0.5em;
          h3 {
            margin: 0;
          }
        }
        &--flag {
          align-self: center;
        }
      }
      &--name {
        margin: 0.2em 0;
        .lastName {
          text-transform: uppercase;
          font-weight: 700;
        }
      }
      &--team {
        font-size: 0.7rem;
      }
    }

    &__extra {
      &--teamIMG {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 50px;
        }
      }
    }

    &:hover {
      cursor: pointer;
    }
    &:nth-child(8n) {
      margin-bottom: 1rem;
    }
    &:active {
      transform: scale(0.98);
      box-shadow: 2px 1px 11px 1px rgba(0, 0, 0, 0.24);
      outline: 2px solid $succes-color;
      background: lighten($color: $succes-color, $amount: 60%);
    }

    &.withdraw {
      cursor: default;
      background: #f7f7f7;
      color: lightgray;
      filter: grayscale(100%);

      &:active {
        transform: none;
        box-shadow: none;
      }

      img,
      span {
        filter: gray; /* IE6-9 */
        -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
        filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
      }

      img {
        border: lightgray;
      }

      h2 {
        color: lightgray;
      }
    }
  }
}

.lastName {
  text-transform: uppercase;
  font-weight: 700;
}

.renner__img {
  margin: 0.5em auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #3fc1c9;
  overflow: hidden;

  img {
    // width: 50px;
    // height: 50px;
    // border-radius: 50%;
    // border: 1px solid $secondary-color;
    // margin: 0 auto;
    max-width: 100%;
  }
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .renners {
    grid-template-columns: 1fr;
    column-gap: 0.8rem;
    // .renner {
    //   &:nth-child(8n) {
    //     margin-bottom: 0rem;
    //   }
    // }
  }
}
</style>
