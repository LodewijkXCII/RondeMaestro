<template>
  <main class="wrapper flow">
    <section class="cyclistOverview">
      <StageComponent :stage="stage" />
      <Startlist :key="compkey" />

      <aside>
        <div class="selecterd-riders">
          <h2>Geselecteerde renners</h2>
          <StageTimer :date="stage.date" :key="compkey" />
          <SelectedRiders :key="compkey" />
        </div>
      </aside>
    </section>
  </main>
</template>

<script>
import { ref, onMounted, defineComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import RennerSmallCard from "../components/RennerSmallCard.vue";
import SelectedRiders from "../components/SelectedRiders.vue";
import StageComponent from "../components/StageComponent.vue";
import Startlist from "../components/Startlist.vue";
import StageTimer from "../components/StageTimer.vue";

import { useCyclistStore } from "../stores/selectedRiders";

import _ from "lodash";

export default defineComponent({
  components: {
    RennerSmallCard,
    SelectedRiders,
    StageComponent,
    Startlist,
    StageTimer,
  },

  setup() {
    const teams = ref();
    const stage = ref({
      stage_nr: Number,
      start_city: String,
      finish_city: String,
      distance: Number,
      name: String,
      stage_type: String,
      date: String,
    });
    const compkey = ref(0);
    const route = useRoute();
    const router = useRouter();
    let stage_id = ref(route.params.stage_id);

    router.isReady();
    const riderStore = useCyclistStore();

    onMounted(async () => {
      riderStore.riders = {
        stage: route.params.stage_id,
        renners: [],
      };
      await getStageData();
    });
    watch(route, async () => {
      teams.value = [];
      riderStore.riders = {
        stage: route.params.stage_id,
        renners: [],
      };

      compkey.value += 1;

      await getStageData();
    });

    const getStageData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_URL}/stages/${parseInt(
            route.params.stage_id
          )}`,
        });

        if (data) {
          stage.value = data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      getStageData,
      compkey,
      teams,
      stage,
      stage_id,
    };
  },
});
</script>

<style lang="scss" scoped>
.cyclistOverview {
  display: grid;
  grid-template-columns: auto auto;
  gap: 2rem;

  aside {
    grid-area: auto;
  }
  @include xs {
    grid-template-columns: var(--rider-card-width);

    aside {
      grid-area: 2;
    }
  }

  @include sm {
    grid-template-columns: var(--rider-card-width);
    aside {
      grid-area: 2;
    }
  }
  @include md {
    grid-template-columns: var(--rider-card-width) var(--rider-card-width);
    justify-content: center;
  }
  @include lg {
    grid-template-columns: calc(2 * var(--rider-card-width) + 1rem) var(
        --rider-card-width
      );
    justify-content: center;
  }
  @include xl {
    grid-template-columns: calc(3 * (var(--rider-card-width) + 1rem)) var(
        --rider-card-width
      );
  }

  .stage-section {
    grid-area: 1/3/1/1;

    @include xs {
      grid-area: 1/1;
    }
    @include sm {
      grid-area: 1/1;
    }
  }
  .selecterd-riders {
    position: sticky;
    top: 2rem;
  }
}
</style>
