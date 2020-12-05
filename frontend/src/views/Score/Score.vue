<template>
  <section>
    <h1>Etappe uitslagen</h1>

    <!-- <div v-for="stage in results" :key="stage.key">
      <p>{{ stage }}</p>
      <div v-for="stageResult in stage" :key="stageResult.id">
        <p>{{ stageResult }}</p>
        <div v-for="values in stageResult.value" :key="values.id">
          <p>{{ values }}</p>
        </div>
      </div>
    </div> -->

    <div class="score">
      <small class="score__text">Totaalscore:</small>
      <div class="score__points">{{ totalScore.sum }}<span>PT</span></div>
    </div>

    <div class="rmTable">
      <div class="rmTable__header">
        <div class="rmTable__header--number">#</div>
        <div class="rmTable__header--date">Datum</div>
        <div class="rmTable__header--city">Start en Finish</div>

        <div class="rmTable__header--button"></div>
      </div>

      <div v-for="etappe in etappes" :key="etappe.id" class="rmTable__wrapper">
        <div v-if="etappe.done">
          <div class="rmTable__body">
            <div class="rmTable__body--number">{{ etappe.stage_nr }}.</div>
            <div class="rmTable__body--date">
              {{ etappe.date | formatDate }}
            </div>
            <div class="rmTable__body--city">
              {{ etappe.start_city }} - {{ etappe.finish_city }}
            </div>

            <div class="rmTable__body--button">
              <router-link
                :to="{ name: 'score-single', params: { etappeID: etappe.id } }"
                :id="etappe.id"
              >
                <img src="@/assets/icons/chevrons-right.svg" alt="edit" />
              </router-link>
            </div>
          </div>
          <div class="rmTable__bottom">
            <div class="rmTable__bottom--score">
              behaalde punten:
              <span v-if="etappe.sum">{{ etappe.sum }}</span>
              <span v-else>0</span>
            </div>
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
  data() {
    return {
      etappes: [],
      totalScore: 0,
      results: [],
      newOverzicht: null,
    };
  },

  async created() {
    const activeUser = window.localStorage.user_id;

    axios
      .all([
        axios.get(`${config.DEV_URL}stages?race=1`),
        axios.get(`${config.DEV_URL}results/totalscore?user_id=${activeUser}`),
        axios.get(`${config.DEV_URL}results/userscore?user_id=${activeUser}`),
      ])
      .then(
        axios.spread((etappe, totalScore, results) => {
          this.totalScore = totalScore.data[0];

          let merged = [];
          const etappes = etappe.data;
          const result = results.data;

          for (let i = 0; i < etappes.length; i++) {
            merged.push({
              ...etappes[i],
              ...result.find((itmInner) => itmInner.stage_id === etappes[i].id),
            });
          }
          this.etappes = merged.sort((a, b) => (a.date > b.date ? 1 : -1));
        })
      )
      .catch((errors) => {
        console.log(errors);
      });

    // const newOverzicht = [...arr1, ...arr2];
    // console.log(newOverzicht);
  },
};
</script>

<style lang="scss" scoped>
.rmTable__header,
.rmTable__body {
  display: grid;
  gap: 0.1rem;
  grid-template-columns: minmax(5px, 10px) minmax(40px, 1fr) 4fr minmax(
      15px,
      20px
    );
  font-weight: normal;
}
.rmTable {
  &__bottom {
    &--score {
      padding: 0.5rem;

      span {
        font-size: 1.5em;
      }
    }
  }
}
</style>
