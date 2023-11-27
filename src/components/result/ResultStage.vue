<template>
  <div class="user-result--item">
    <div class="user-info">
      <div class="user-info__position">{{ position }}.</div>
      <div
        class="user-info__name"
        :class="userResult.id == user_id ? 'strong' : ''"
      >
        {{ userResult.name }}
      </div>
      <div class="user-info__points">
        <strong>{{ userResult.points }}</strong> pnt
      </div>
      <div class="user-info__icon" @click="getResults(userResult.id)">
        <unicon name="info-circle" />
      </div>
    </div>
    <div class="user-selection" v-if="showSelection">
      <RennerSmallCard
        v-for="cyclist in userSelection"
        :renner="cyclist"
        :key="cyclist.id"
        :speciality="false"
        :points="cyclist.points"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import RennerSmallCard from "../RennerSmallCard.vue";

import axios from "axios";

export default defineComponent({
  components: {
    RennerSmallCard,
  },
  props: {
    userResult: Object,
    position: Number,
    user_id: Number,
  },

  setup() {
    const userSelection = ref();
    const showSelection = ref(false);

    async function getResults(user_id) {
      if (showSelection.value) {
        return (showSelection.value = false);
      }
      if (userSelection.length >= 1) {
        return;
      }
      try {
        console.log("hiero");
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/results?stage_id=42&user_id=${user_id}`
        );

        if (data) {
          userSelection.value = data.userResponse;
          showSelection.value = true;
        }
      } catch (error) {
        console.error(error);
      }
    }
    return { userSelection, showSelection, getResults };
  },
});
</script>

<style lang="scss">
// .user-result--item {
//   &:nth-child(2n) {
//     background: var(--clr-background-mute);
//   }

//   &:first-child {
//     border-radius: 5px 5px 0 0;
//   }

//   &:last-child {
//     border-radius: 0 0 5px 5px;
//   }
// }

.user-info {
  display: grid;
  grid-template-columns: 2ch auto 8ch 4ch;
  grid-template-rows: auto auto;
  padding: 0.75rem 0.5rem;
  align-items: center;
  // border: 1px solid var(--clr-background-mute);

  &__icon .unicon {
    display: flex;
  }
}

.user-selection {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-auto-flow: column;
  width: calc(2 * var(--rider-card-width) + 1rem);
}
</style>
