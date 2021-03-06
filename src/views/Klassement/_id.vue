<template>
  <section class="container grid-2-1">
    <main>
      <h1>klassement van etappe {{ etappe.stage_nr }}</h1>
      <h2 style="margin-bottom: 1rem">
        {{ etappe.start_city }} - {{ etappe.finish_city }}
      </h2>
      <section>
        <router-link to="/uitslagen" class="PrevNext">
          <img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
          <span>Terug naar het overzicht</span>
        </router-link>
      </section>

      <Main :scores="scores" :key="etappe.index" :etappe="etappe_id" />
    </main>
    <Aside :uitslag="uitslag" :totalScores="totalScores" :key="etappe.index" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import routes from "@/api/routes";
import config from "@/utils/config";
import Aside from "@/components/KlassementComponents/Aside";
import Main from "@/components/KlassementComponents/Main";

export default {
  props: { stage: Object },
  data() {
    return {
      scores: [],
      totalScores: [],
      uitslag: [],
      selection: [],
      componentKey: 0,
      etappe: {},
      etappe_id: null,
    };
  },
  components: {
    Aside,
    Main,
  },

  created() {
    this.etappe_id = +this.$route.params.etappeID;
    this.getData();
  },

  methods: {
    ...mapGetters(["getProfile"]),
    async testing() {
      // TODO UPDATE TO DYNAMIC NEWSTAGE

      await this.$router.push({
        name: "uitslagen",
      });
    },
    async getData() {
      let currentEtappe;
      if (this.stage) {
        currentEtappe = this.stage.id;
        this.etappe = this.stage;
      } else {
        const { data: response } = await routes.find(`stages/${this.etappe_id}`);
        this.etappe = response;
        currentEtappe = response.id;
      }

      const { data: totalScore } = await routes.find(
        `results/totalscore?stage_id=${currentEtappe}`
      );

      const scoreData = totalScore.sort((a, b) => b.points - a.points);
      this.scores = scoreData.map((user) => ({ ...user, selection: [] }));

      const { data: totalScoreRace } = await routes.find(
        `results/totalscore?race_id=${config.race_id}`
      );
      this.totalScores = totalScoreRace.sort((a, b) => b.points - a.points);

      const { data: resultStage } = await routes.find(
        `results?stage_id=${currentEtappe}`
      );
      this.uitslag = resultStage.sort((a, b) => (b.position > a.position ? -1 : 1));
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";

.klassement_id {
  display: grid;
  gap: 0.2rem;
  grid-template-columns: minmax(8px, 25px) minmax(40px, 1fr) minmax(15px, 75px) minmax(
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
