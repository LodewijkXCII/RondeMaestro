<template>
  <div class="renner">
    <div class="renner__img">
      <img
        v-if="renner.image_url !== '/'"
        :src="
          `https://rondemaestro.s3.eu-central-1.amazonaws.com/renners/${renner.image_url}`
        "
        alt
      />
      <img v-else src="https://via.placeholder.com/50x50.png?" alt />
    </div>
    <div class="renner__info">
      <div class="renner__info-top">
        <div class="renner__info-top--number" v-if="renner.race_number">
          <h3>#{{ renner.race_number }}</h3>
        </div>
        <div class="renner__info-top--flag">
          <flag :iso="renner.country_name" :squared="false" />
        </div>
      </div>
      <div class="renner__info--name">
        {{ renner.first_name }}
        <span class="lastName">{{ renner.last_name }}</span>
      </div>
      <div class="renner__info--team">{{ renner.team_name }}</div>
    </div>
    <div class="renner__extra">
      <div class="renner__extra--teamIMG">
        <img
          :src="
            `https://rondemaestro.s3.eu-central-1.amazonaws.com/teams/${renner.team_img}`
          "
          :alt="renner.team_name"
        />
      </div>
    </div>
    <div class="renner__button">
      <font-awesome-icon :icon="icon" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    renner: {
      type: Object,
    },
    icon: {
      type: String,
    },
  },
  computed: {
    ...mapState(['selectie']),
    currentSelectie(state) {
      this.selectie = state.selectie;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.renner {
  display: grid;
  grid-template-columns: 75px 3fr 1fr 20px;
  align-items: center;
  background: white;
  padding: 0.5em 0.2em;
  margin: 0.3em 0;

  &__img {
    margin: 0.5em auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #3fc1c9;
    overflow: hidden;

    img {
      max-width: 100%;
    }
  }

  &__info {
    &-top {
      display: flex;
      &--number {
        margin-right: 0.5em;
        h3 {
          margin: 0;
        }
      }
      &--flag {
        align-self: center;
      }
    }
    &--name {
      margin: 0.2em 0;
      .lastName {
        text-transform: uppercase;
        font-weight: 700;
      }
    }
    &--team {
      font-size: 0.7rem;
    }
  }

  &__extra {
    &--teamIMG {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 50px;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }

  &__button {
    align-self: baseline;
    margin-top: 0.7em;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 2px 1px 11px 1px rgba(0, 0, 0, 0.24);
    outline: 2px solid $succes-color;
    background: lighten($color: $succes-color, $amount: 60%);
  }

  &.withdraw {
    cursor: default;
    background: #ececec;
    color: lightgray;
    filter: grayscale(100%);

    &:active {
      transform: none;
      box-shadow: none;
    }

    img,
    span {
      filter: gray; /* IE6-9 */
      -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
      filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
    }

    img {
      border: lightgray;
    }

    h2 {
      color: lightgray;
    }
  }

  &.selected {
    background: lighten($color: $primary-color, $amount: 5);
    color: $light-color;
    border-bottom: 1px solid darken($color: $primary-color, $amount: 1);

    svg {
      color: $white-color !important;
    }
  }
}
.renner__img {
  margin: 0.5em auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #3fc1c9;
  overflow: hidden;

  img {
    max-width: 100%;
  }
}
</style>
