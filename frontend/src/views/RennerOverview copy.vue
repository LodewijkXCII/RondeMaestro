<template>
  <section>
    <PrevNext />
    <h1>Kies je renners voor etappe {{ etappe.stage_nr }}</h1>
    <div class="etappeInfo">
      <div class="etappeInfo__left">
        <div>{{ etappe.start_city }} - {{ etappe.finish_city }}</div>
        <div>Type: {{ etappe.stage_type_id }}</div>
        <div>Afstand: {{ etappe.distance }} km</div>
      </div>
      <div class="etappeInfo__right">
        <router-link :to="`/etappe-overzicht/${this.$route.params.etappeID}`">
          <div>Etappe info</div>
        </router-link>
      </div>
    </div>
    <FilterOptions />
    <div class="renners">
      <div class="renners__team" v-for="teams in renners" :key="teams.index">
        <div class="renners__team--top">
          <img
            src="https://via.placeholder.com/50x50.png?text=Team+shirt"
            alt=""
            class="renners__team--top--img"
          />
          <h3>%TEAM NAME%</h3>
        </div>
        <div class="renners__team--bottom">
          <div class="renner-row header-row">
            <div class="header-row__cell">#</div>
            <div class="header-row__cell">Naam</div>
            <div class="header-row__cell">Spec.</div>
            <div class="header-row__cell">Pnt.</div>
          </div>

          <div
            v-for="(renner, index) in teams"
            :key="index"
            @click="toSelectie(renner, index)"
            class="renner-row"
            v-bind:class="{
              withdraw: renner.withdraw,
            }"
          >
            <div class="renner-row__cell">
              {{ renner.race_number }}
            </div>
            <div class="renner-row__cell">
              <span class="firstName">{{ renner.first_name }} </span>
              <span class="lastName">{{ renner.last_name }}</span>
            </div>
            <div class="renner-row__cell">
              <span v-if="renner.speciality_id"
                >{{ renner.speciality_id }}
              </span>
              <span v-if="renner.speciality_id_2"
                >/ {{ renner.speciality_id_2 }}</span
              >
            </div>
            <div class="renner-row__cell">100</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PrevNext from '@/components/PrevNext.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import lodash from 'lodash';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'RennerOverview',
  components: {
    PrevNext,
    FilterOptions,
  },
  data() {
    return {
      renners: [],
      etappe: '',
      error: false,
      isSelected: false,
    };
  },
  computed: {
    ...mapState(['selectie']),
  },
  methods: {
    ...mapMutations(['addToSelectie']),
    ...mapActions(['removeSelectie']),

    toSelectie(renner, index) {
      //TODO get index from renner (remove groupby?!)
      if (this.selectie.includes(renner)) {
        console.log(this.selectie.index);
        this.removeSelectie(index);
      } else {
        this.addToSelectie(renner);
        this.isSelected = !this.isSelected;
      }
    },
  },
  created() {
    fetch('http://localhost:1992/api/v1/startlist')
      .then((response) => response.json())
      .then((result) => {
        // this.renners = result;
        this.renners = result;
      });
    fetch(`http://localhost:1992/api/v1/stages/${this.$route.params.etappeID}`)
      .then((response) => response.json())
      .then((result) => {
        this.etappe = result;
      });
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

.renners__team {
  position: relative;
  margin: 2em 0;
  background: #fff;
  border-radius: 1em;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:first-child {
    margin-top: 0.5em;
  }

  &--top {
    background: $primary-color;
    display: flex;
    align-items: center;
    padding: 0.5em 2em;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 15px 15px 0 0;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

    &--img {
      border-radius: 50%;
      border: 1px solid $black-color;
      margin-right: 2em;
    }

    h3 {
      color: $white-color;
    }
  }
  &--bottom {
    padding: 1em;

    .renner-row {
      font-size: 0.625rem;
      display: grid;
      align-items: center;
      padding: 0.45em;
      grid-template-columns: minmax(20px, auto) minmax(175px, 2fr) 1fr minmax(
          20px,
          auto
        );
      cursor: pointer;

      &:hover,
      &:focus {
        background: $white-color;
      }

      &.selected {
        background: rgba($secondary-color, 0.2);
        box-shadow: 0 0 0.1px 0.1px $secondary-color;
      }
      &.withdraw {
        opacity: 0.15;
        cursor: auto;
      }

      img {
        width: 15px;
        height: auto;
      }
      &.header-row {
        text-transform: uppercase;
        font-weight: 700;
        border-bottom: 1px solid $black-color;
        margin-bottom: 0.25em;
        cursor: default;

        &:hover,
        &:focus {
          background: none;
        }

        &__cell:last-of-type {
          text-align: right;
        }
      }
      .lastName {
        font-weight: 700;
        font-size: 0.75rem;
        text-transform: uppercase;
      }
    }
  }
}
</style>
