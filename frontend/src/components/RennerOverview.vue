<template>
  <div>
    <modal v-if="showModal" @close="showModal = false" :stage="stage">
      <h3 slot="header">Etappeinfo</h3>
    </modal>
    <div v-show="loading">
      <AnimatedCyclist />
    </div>
    <section class="rennerOverview" v-show="!loading">
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
              <div @click="showModal = true">
                Etappe info
              </div>
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
          <h2 :class="{ error: error }">
            <!-- Je selectie voor etappe {{ stage.stage_nr }} -->
          </h2>
          <h4 :class="{ error: error }">
            Geselecteerd:
            {{ countSelectie }}
            <span>/ 8</span>
          </h4>
          <strong class="error">{{ errorMsg }}</strong>
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
      <SelectedRiders @up="toggleSelected(test)" />

      <!-- Einde RIJ 2 -->
    </section>
  </div>
</template>

<script>
import SelectedRiders from '@/components/SelectedRiders.vue';
import RennerCard from '@/components/Renner.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import AnimatedCyclist from '@/components/AnimatedCyclist.vue';
import Modal from '@/components/Modals/Etappe_Info_Modal';

import routes from '@/api/routes';
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
    AnimatedCyclist,
    Modal,
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
      loading: true,
      showModal: false,
      stage: {},
      activeUser: null,
    };
  },
  computed: {
    ...mapState([
      'renner',
      'stage',
      'searchRenner',
      'searchTeam',
      'getProfile',
    ]),
    ...mapGetters(['countSelectie', 'getProfile']),
  },
  methods: {
    ...mapMutations(['addToSelectie', 'setEtappes', 'removeFromSelectie']),
    ...mapActions(['removeSelectie']),
    ...mapActions(['removeAll']),

    toEtappe(etappe) {
      this.setEtappes(etappe);
    },

    delSelectie() {
      this.removeAll();
    },
    toggleSelected(test) {
      // TODO FIX HIGHLIGHT SELECTIONS
      console.log('joejoe', test);
    },
    toSelectie(renner, index) {
      if (this.renner.selectie.includes(renner)) {
        renner.selected = false;
        this.removeFromSelectie(this.renner.selectie.indexOf(renner));
      } else if (this.countSelectie >= 10) {
        console.error('teveel!');
      } else if (renner.withdraw == true) {
        // const selected = renner;
        // selected.style.backgroundColor = '#025764';

        console.error(renner, 'kan niet he');
      } else {
        renner.selected = true;
        this.addToSelectie(renner);
      }
    },

    updateName(name) {
      this.name = name;
      this.searchRiders();
    },

    // RENNER ZOEKEN
    async searchRiders() {
      //TODO renners worden nu aangepast, waardoor terug gaan niet mogelijk is.
      //Ungroup renners
      // const ungroupedRenners = [..._.flatMap(this.renners)];
      //Zoek renner in lijst
      // console.log('ungrouped', ungroupedRenners);
      // const filter = ungroupedRenners.filter((renners) =>
      //   renners.image_url.includes(this.name)
      // );

      this.team = 0;
      const searchrider = await routes.find(
        `startlist/race?race_id=${config.race_id}&name=${this.name}`
      );
      this.renners = _(searchrider.data)
        .orderBy((renner) => renner.race_number)
        .groupBy((renner) => renner.team_name)
        .value();
    },
    async searchRidersTeam(team) {
      if (team != 0) {
        const searchrider = await routes.find(
          `startlist/race?race_id=${config.race_id}&team=${team}`
        );

        this.renners = _(searchrider.data)
          .orderBy((renner) => renner.race_number)
          .groupBy((renner) => renner.team_name)
          .sortBy((team_name) => searchrider.data.indexOf(team_name[0]))
          .value();
      } else {
        this.searchRiders();
      }
    },

    async submitSelectie() {
      const activeUser = this.getProfile.id;

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
        const response = await routes.find(
          `entries?users_id=${activeUser}&stage_id=${this.$route.params.etappeID}`
        );

        response.data.forEach(async (selected) => {
          await routes.update(
            `entries?users_id=${this.activeUser}&stage_id=${this.$route.params.etappeID}`,
            {
              users_id: +activeUser,
              stage_id: +this.$route.params.etappeID,
              cyclist_id: selected.cyclist_id,
            }
          );
        });

        await this.renner.selectie.forEach(async (renner) => {
          try {
            await routes.create(`entries`, {
              users_id: +activeUser,
              stage_id: +this.$route.params.etappeID,
              cyclist_id: +renner.cyclist_id,
            });

            this.sendButton = 'verstuurd';
            setTimeout(() => (this.sendButton = 'verstuur'), 5000);
            this.removeAll();
            this.$router.push({ name: 'etappe-overzicht' }).catch(() => {});
          } catch (error) {
            console.error(error);
          }
        });
      }
    },
  },
  async created() {
    const activeUser = this.getProfile.id;
    this.removeAll();
    this.activeUser = activeUser;
  },
  async mounted() {
    this.loading = true;

    const response = await routes.find(
      `startlist/race?race_id=${config.race_id}`
    );

    /*
      Renners groepen en sorteren op team,
      waarna er in de template over alle teams geidereerd kan worden
    */
    const cyclists = response.data.map((renner) => {
      return {
        ...renner,
        selected: false,
      };
    });
    const stage = await routes.find(`stages/${this.$route.params.etappeID}`);
    this.stage = stage.data;

    if (this.activeUser) {
      const entries = await routes.find(
        `entries?users_id=${this.activeUser}&stage_id=${this.$route.params.etappeID}`
      );
      if (entries.status === 200) {
        entries.data.forEach((cyclist) => {
          const riderIndex = cyclists.findIndex(
            (r) => r.cyclist_id == cyclist.cyclist_id
          );
          cyclists[riderIndex].selected = true;

          this.addToSelectie(cyclist);
        });

        this.renners = _(cyclists)
          .orderBy((renner) => renner.race_number)
          .groupBy((renner) => renner.team_name)
          .value();

        /* Aparte teams zoeken om in een zoekveld te kunnen brengen */
        this.teams = [
          ...new Map(
            cyclists.map((item) => [
              item['team_name'],
              {
                team_name: item.team_name,
                team_id: item.team_id,
                team_img: item.team_img,
              },
            ])
          ).values(),
        ];
      }
    }

    this.loading = false;
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
.error {
  color: $alert-color;
}
.selection {
  display: grid;
  gap: 0.5em;
}

.team {
  margin-bottom: 2rem;
  .renner svg {
    color: $primary-color;
  }
}

.rennerOverview {
  display: grid;
  row-gap: 1em;
  margin: 0 1rem;
  margin-top: 2rem;
  &-Right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .team {
    margin-bottom: 0;
  }
  .rennerOverview {
    max-width: 2000px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    row-gap: 1em;
    column-gap: 7em;
    padding: 0.5em 1.5em;
    margin: 2rem auto 0;
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
