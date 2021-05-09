<template>
  <section class="container grid-2-1">
    <main>
      <h1>klassement van etappe {{ etappe.stage_nr }}</h1>
      <h2 style="margin-bottom: 1rem">
        {{ etappe.start_city }} - {{ etappe.finish_city }}
      </h2>
      <section class="PrevNext">
        <div @click="testing()">
          <img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
          <span>Terug naar het overzicht</span>
        </div>
      </section>

      <Main :scores="scores" :key="etappe.index" :etappe="+etappe" />
    </main>
    <Aside :uitslag="uitslag" :totalScores="totalScores" :key="etappe.index" />
  </section>
</template>

<script>
import axios from 'axios';
import config from '@/utils/config';
import Aside from '@/components/KlassementComponents/Aside';
import Main from '@/components/KlassementComponents/Main';

export default {
  props: { stage: Object },
  data() {
    return {
      scores: [],
      totalScores: [],
      uitslag: [],
      selection: [],
      componentKey: 0,
      etappe: null,
      etappe_id: null,
    };
  },
  components: {
    Aside,
    Main,
  },
  async beforeRouteUpdate(to, from, next) {
    this.etappe_id = +to.params.etappeID;
    await this.getData();

    next();
  },
  mounted() {
    this.etappe_id = +this.$route.params.etappeID;

    this.getData();
  },

  methods: {
    async testing() {
      const c = +this.$route.params.etappeID;
      // TODO UPDATE TO DYNAMIC NEWSTAGE
      const newStage = +c + 1;
      await this.$router.push({
        name: 'klassement-single',
        params: { etappeID: +newStage },
      });
    },
    async getData() {
      this.etappe = {};
      let etappe;
      if (this.stage) {
        etappe = this.stage.id;
        this.etappe = this.stage;
      } else {
        const res = await axios.get(
          `${config.DEV_URL}stages/${this.etappe_id}`
        );
        this.etappe = res.data;
        etappe = res.data.id;
      }

      const user_id = window.localStorage.user_id;

      await axios
        .get(`${config.DEV_URL}entries?stage_id=${etappe}&users_id=${user_id}`)
        .then((result) => {
          this.selection = result.data;
        });
      await axios
        .get(`${config.DEV_URL}results/totalscore?stage_id=${etappe}`)
        .then((result) => {
          const response = result.data.sort((a, b) => b.sum - a.sum);
          this.scores = response.map((user) => ({ ...user, selection: [] }));
        });
      await axios.get(`${config.DEV_URL}results/totalscore`).then((result) => {
        this.totalScores = result.data.sort((a, b) => b.sum - a.sum);
      });
      await axios
        .get(`${config.DEV_URL}results?stage_id=${etappe}`)
        .then((result) => {
          this.uitslag = result.data;
        });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.klassement_id {
  display: grid;
  gap: 0.1rem;
  grid-template-columns: minmax(5px, 20px) minmax(40px, 1fr) minmax(15px, 75px) minmax(
      15px,
      75px
    );
  font-weight: normal;
}

.selected_riders {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column: 1/5;
  padding-top: 1rem;
  margin: 0.75rem 0;
  border-top: 1px solid $primary-color;

  &--rider {
    margin: 0.5rem;
  }
}

.alg_klassement,
.etappe_uitslag {
  display: grid;
  gap: 0.1rem;
  grid-template-columns: minmax(5px, 20px) minmax(40px, 1fr) minmax(15px, 50px);
  font-weight: normal;
  font-size: 0.7rem;
}

.column_right {
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid $primary-color;
  &--etappe_uitslag,
  &--algemeen_klassement {
    margin-bottom: 2rem;
  }
}

.PrevNext {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5em;

  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: $primary-color;

  &__next,
  &__prev {
    cursor: pointer;

    span {
      margin: 0 0.2em;
    }

    img {
      width: 15px;
      height: auto;
    }
  }
}

@media only screen and (min-width: 1224px) {
  .selected_riders {
    grid-template-columns: repeat(4, 1fr);
  }
  .column_right {
    margin-left: 1rem;
    padding-left: 1.5rem;
    border-left: 1px solid $primary-color;

    margin-top: none;
    padding-top: none;
    border-top: none;
  }
}
</style>
