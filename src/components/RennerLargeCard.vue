<template>
  <div
    class="cyclistCard-lg"
    :class="{
      withdraw: renner.withdraw,
      selected: renner.selected,
    }"
  >
    <div class="cyclistCard-lg--top">
      <!-- <img
        :src="`http://localhost:1337${renner.image_url}`"
        alt=""
        v-if="renner.attributes.cyclist.data.attributes.image.data != null"
      /> -->

      <img
        :src="`https://ui-avatars.com/api/?name=${renner.first_name}+${renner.last_name}`"
        alt=""
        class="cyclistCard-lg--top__avatar"
      />
      <div class="cyclistCard-lg--top__raceInfo">
        <div class="flag">
          <flag :iso="renner.country_name" />
        </div>
        <img
          :src="
            'https://rondemaestro.s3.eu-central-1.amazonaws.com/teams/' +
            renner.team_img
          "
          :alt="renner.team_name"
          class="team-img"
        />
      </div>
    </div>
    <div class="cyclistCard-lg--info">
      <div class="cyclistCard-lg--cyclistInfo__name">
        {{ renner.first_name }}
        <strong>{{ renner.last_name }}</strong>
      </div>
      <div class="cyclistCard-lg--cyclistInfo__team">
        {{ renner.team_name }}
      </div>
    </div>
    <!-- <div
      class="cyclistCard-lg--specialities"
      v-if="renner.speciality[0].value != undefined"
    >
      <span v-for="speciality in renner.speciality">
        {{ speciality }}
      </span>
    </div> -->
    <div class="cyclistCard-lg--points" v-show="points">
      <span>{{ points }}</span> pnt
    </div>
    <div class="cyclistCard-lg--actions" v-if="icon">
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
.cyclistCard-lg {
  --avatar-size: 90px;
  font-size: 1.1rem;
  background-color: var(--clr-background-mute);

  padding: 0.25rem 0.75rem;
  display: grid;
  align-items: center;

  grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
  width: 21ch;
  aspect-ratio: 2/3;
  border-radius: 5px;
  text-align: center;

  &--top {
    justify-self: center;

    width: calc(var(--avatar-size) + 1rem);

    &__avatar {
      height: var(--avatar-size);
      aspect-ratio: 1/1;
      overflow: hidden;
      border-radius: 50%;
      margin: auto;

      img {
        width: 100%;
      }
    }

    &__raceInfo {
      display: flex;
      justify-content: space-between;
      top: -1rem;
      position: relative;

      > * {
        background: var(--clr-background);

        aspect-ratio: 1/1;
        width: 4ch;
        border-radius: 50%;
        display: grid;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
      }
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
      font-size: 1.4rem;

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

  &:hover {
    transition: transform ease-in-out 0.3s;
    transform: scale(1.03);
    outline: 2px solid hsl(from var(--clr-primary) h calc(s - 0.1) l / 0.9);
    color: var(--clr-text);
    cursor: pointer;
  }
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
  color: var(--clr-text-white);

  * {
    fill: var(--color-text-white);
  }

  &:nth-child(n + 9) {
    background-color: var(--clr-accent);

    &:hover {
      outline-color: hsl(from var(--clr-accent) h calc(s - 0.1) l / 0.9);
    }
  }
}

.punten {
  background-color: var(--clr-primary);
  color: var(--clr-text-white);
}
</style>
