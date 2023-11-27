<template>
  <div
    class="cyclistCard"
    :class="{
      withdraw: renner.withdraw,
      selected: renner.selected,
    }"
  >
    <div class="cyclistCard--avatar">
      <!-- <img
        :src="`http://localhost:1337${renner.image_url}`"
        alt=""
        v-if="renner.attributes.cyclist.data.attributes.image.data != null"
      /> -->

      <img
        :src="`https://ui-avatars.com/api/?name=${renner.first_name}+${renner.last_name}`"
        alt=""
      />
    </div>
    <div class="cyclistCard--info">
      <div class="cyclistCard--raceInfo">
        <div class="cyclistCard--raceInfo__flag">
          <flag :iso="renner.country_name" />
        </div>
        <div class="cyclistCard--raceInfo__number">
          {{ renner.race_number }}
        </div>
      </div>
      <div class="cyclistCard--cyclistInfo__name">
        {{ renner.first_name }}
        <strong>{{ renner.last_name }}</strong>
      </div>
      <div class="cyclistCard--cyclistInfo__team">
        {{ renner.team_name }}
      </div>
    </div>
    <!-- <div
      class="cyclistCard--specialities"
      v-if="renner.speciality[0].value != undefined"
    >
      <span v-for="speciality in renner.speciality">
        {{ speciality }}
      </span>
    </div> -->
    <div class="cyclistCard--points" v-show="points">
      <span>{{ points }}</span> pnt
    </div>
    <div class="cyclistCard--actions" v-if="icon">
      <unicon :name="icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    renner: Object,
    icon: String,
    points: Number,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.cyclistCard {
  --avatar-size: 45px;

  font-size: 0.9rem;

  background-color: var(--clr-background-mute);
  margin: 0.5rem 0;
  padding: 0.25rem 0.75rem;

  display: grid;
  grid-template-columns:
    calc(var(--avatar-size) + 1rem) 4fr minmax(25px, 1fr)
    auto;
  align-items: center;
  height: var(--rider-card-height);
  max-width: var(--rider-card-width);
  border-radius: 3px;

  &--avatar {
    aspect-ratio: 1/1;

    overflow: hidden;
    height: var(--avatar-size);
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  &--raceInfo {
    display: flex;
    gap: 0.5rem;

    &__number {
      font-weight: 900;
    }
  }
  &--cyclistInfo {
    &__name {
      font-size: 1.01rem;
      span {
        font-weight: 900;
        text-transform: uppercase;
      }
    }
    &__team {
      font-weight: 300;
      font-style: italic;
    }
  }
  &--specialities {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  &--points {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    line-height: 0.8;

    span {
      font-size: var(--fs-500);
      font-weight: 700;
    }
  }
  &--actions {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: end;
    height: 100%;

    * {
      fill: var(--clr-primary);
    }
  }
}

.selectie:hover {
  transition: transform ease-in-out 0.3s;
  transform: scale(1.03);
  outline: 2px solid var(--clr-primary);
  color: var(--clr-text);
  cursor: pointer;
}
.withdraw {
  background: var(--clr-background-mute);
  pointer-events: none;
  opacity: 0.5;

  * {
    filter: grayscale(100%);
  }
}

.selected {
  background-color: var(--clr-primary);
  cursor: default !important;
  * {
    fill: var(--color-text);
  }
}

.punten {
  background-color: var(--clr-primary);
  color: var(--clr-text-white);
}
</style>
