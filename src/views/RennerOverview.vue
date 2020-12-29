<template>
  <section class="rennerOverview">
    <!-- RIJ 1 -->
    <div class="rennerOverview-Left grid-3">
      <!-- Blok links -->
      <!-- links 1 -->
      <div class="rennerOverview-Left--left">
        <div class="PrevNext">
          <router-link to="/etappe-overzicht">
            <span>Terug naar het etappe overzicht</span>
          </router-link>
        </div>
        <div class="rennerOverview-Left--title">
          <div class="label label-alert">
            <router-link
              :to="`/etappe-overzicht/${this.$route.params.etappeID}`"
            >
              <div>Etappe info</div>
            </router-link>
          </div>
          <h1>Renners selecteren</h1>
        </div>
      </div>

      <!-- Filter -->
      <section class="rennerOverview-Left--right filter">
        <FilterOptions
          :teams="teams"
          @search-team="searchRidersTeam"
          @search-rider="updateName"
        />
      </section>

      <!-- Einde blok links -->
    </div>
    <div class="rennerOverview-Right">
      <!-- Blok rechts -->
      <!-- Text kies je selectie -->
      <!-- Select count -->
      <!-- Knoppen -->
      <!-- Einde blok rechts -->
      <div class="selectedRiders__top " @click="showSelectie()">
        <h2>Je selectie voor etappe {{ stage.stage_nr }}</h2>
        <h4 :class="{ error: error }">
          Geselecteerd:
          {{ countSelectie }}
          <span>/ 8</span>
        </h4>
        <p>{{ errorMsg }}</p>
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

    <!-- Einde RIJ 1 -->
    <!-- RIJ 2 -->
    <section class="grid-3">
      <div v-for="teams in renners" :key="teams.index" class="team">
        <RennerCard
          v-for="renner in teams"
          :key="renner.cyclist_id"
          :renner="renner"
          :icon="'plus'"
          :class="{
            withdraw: renner.withdraw,
            selected: renner.selected,
          }"
          @click.native="toSelectie(renner)"
        />
      </div>
    </section>
    <SelectedRiders />

    <!-- Einde RIJ 2 -->

    <div class="container"></div>
  </section>
</template>

<script>
import SelectedRiders from '@/components/SelectedRiders.vue';
import RennerCard from '@/components/Renner.vue';
import FilterOptions from '@/components/FilterOptions.vue';

import axios from 'axios';
import _ from 'lodash';

import config from '@/utils/config';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  props: {
    searchName: {
      type: String,
    },
  },
  name: 'RennerOverview',
  components: {
    SelectedRiders,
    RennerCard,
    FilterOptions,
  },
  data() {
    return {
      renners: [],
      teams: [],
      name: '',
      team: '',
      spec: '',
      error: false,
      isSelected: false,
      sendButton: 'verstuur',
      errorMsg: '',
    };
  },
  computed: {
    ...mapState(['selectie', 'stage', 'searchRenner', 'searchTeam']),
    ...mapGetters(['countSelectie']),
  },
  methods: {
    ...mapMutations(['addToSelectie', 'setEtappes']),
    ...mapActions(['removeSelectie']),
    ...mapActions(['removeAll']),

    toEtappe(etappe) {
      this.setEtappes(etappe);
    },

    delSelectie() {
      this.removeAll();
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

    updateName(name) {
      this.name = name;
      this.searchRiders();
    },

    // RENNER ZOEKEN
    async searchRiders() {
      this.team = 0;
      const searchrider = await axios.get(
        `${config.DEV_URL}cyclists?startlist=true&name=${this.name}`
      );

      this.renners = _(searchrider.data)
        .groupBy((renner) => renner.team_name)
        .sortBy((team_name) => searchrider.data.indexOf(team_name[0]))
        .value();

      // searchrider.data.sort((a, b) =>
      //   a.race_number > b.race_number ? 1 : -1
      // );
    },
    async searchRidersTeam(team) {
      const searchrider = await axios.get(
        `${config.DEV_URL}cyclists?startlist=true&team=${team}`
      );

      this.renners = _(searchrider.data)
        .groupBy((renner) => renner.team_name)
        .sortBy((team_name) => searchrider.data.indexOf(team_name[0]))
        .value();

      // searchrider.data.sort((a, b) => (a.race_number > b.race_number ? 1 : -1));
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

  async created() {
    const activeUser = window.localStorage.user_id;
    this.removeAll();

    const cyclists = await axios.get(
      `${config.DEV_URL}cyclists?startlist=true`
    );

    /*
    Renners groepen en sorteren op team,
    waarna er in de template over alle teams geidereerd kan worden
    */
    this.renners = _(cyclists.data)
      .groupBy((renner) => renner.team_name)
      .sortBy((team_name) => cyclists.data.indexOf(team_name[0]))
      .value();

    /* Aparte teams zoeken om in een zoekveld te kunnen brengen */
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

.selection {
  display: grid;
  gap: 0.5em;
}

.team .renner svg {
  color: $primary-color;
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .rennerOverview {
    display: grid;
    grid-template-columns: 3fr 1fr;
    row-gap: 1em;
    column-gap: 7em;
    padding: 0.5em 1.5em;
    &-Left {
      &--left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      &--right {
        grid-column: 2/4;
        align-self: end;
      }
    }
  }
  .selection {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 0.8rem;
    // .renner {
    //   &:nth-child(8n) {
    //     margin-bottom: 0rem;
    //   }
    // }
  }
}
</style>
