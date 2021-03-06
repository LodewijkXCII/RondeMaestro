<template>
  <div id="app">
    <NavBar />
    <loading v-show="isLoading" />
    <router-view v-show="!isLoading" />
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BottomNav from "@/components/BottomNav.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/Loading.vue";
import { USER_REQUEST } from "@/store/actions/user";

import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  components: {
    NavBar,
    BottomNav,
    Loading,
    Footer,
  },

  data() {
    return {};
  },

  computed: {
    isHome() {
      return this.$route.name === "Home";
    },
    ...mapGetters({ isLoading: "getLoading" }),
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";

* {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  margin: 0;
  background: #f5f5f5;
  color: #353535;
}

//CONFIG//
.container {
  padding: 2em 0.5em;
  max-width: 350px;
  margin: auto;

  .headerImage {
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
  }
}
.labels {
  display: flex;
  flex-direction: row;
  gap: 0.75em;
}
.label {
  background: $white-color;
  display: inline-block;
  width: auto;
  font-size: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
  margin: 0.75rem 0;
  cursor: pointer;
  a {
    color: $white-color;
    font-weight: 400;
    text-transform: uppercase;
  }

  &-primary {
    background: $primary-color;
    border: 1px solid darken($color: $primary-color, $amount: 2);
    color: $white-color;
  }

  &-alert {
    background: $alert-color;
    border: 2px solid darken($color: $alert-color, $amount: 5);
    color: $white-color;
  }
  &-succes {
    background: $succes-color;
    border: 2px solid darken($color: $succes-color, $amount: 5);
    color: $white-color;
  }
  &-danger {
    background: $danger-color;
    border: 1px solid darken($color: $danger-color, $amount: 5);
    color: $black-color;
  }
}

.bg-lg {
  background: #ececec;
}

.bg-white {
  background: white;
}

.show {
  display: inherit;
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  body {
    margin: auto;
    padding: 0;
  }

  .container {
    max-width: 1385px;
    margin: auto;
    &-fluid {
      max-width: 1065px;
    }
  }

  .grid-1-2 {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  .grid-2-1 {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 0.75rem;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: min-content;
    column-gap: 0.8rem;
    row-gap: 1rem;
  }
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  /* Styles */
}

/*
    TYPOGRAPHY
*/
h1 {
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.8;
  line-height: 1;
  margin-bottom: 0.2em;
  color: $black-color;
}

h2 {
  font-size: 1rem;
  text-transform: uppercase;
  color: $text-color;
}

h3 {
  margin: 1rem 0;
  text-transform: uppercase;
}

p {
  line-height: 1.7em;
  margin-top: 1em;
  margin-bottom: 2em;
}

strong {
  font-weight: 700;
}

small {
  font-size: 0.625rem;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: lighten($color: $black-color, $amount: 2);
  text-transform: uppercase;
  font-weight: 700;
}

.alertMessage {
  color: $alert-color;
  font-weight: 900;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.succesMessage {
  color: $succes-color;
  font-weight: 900;
  font-size: 1.5rem;
  text-transform: uppercase;
}
/*
    BUTTONS
*/
button {
  &:hover {
    cursor: pointer;
  }
}
.btn {
  padding: 1em 1.3em;
  margin-right: 1em;
  width: fit-content;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 10px;
  font-size: 0.75rem;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }

  svg {
    margin-left: 0.3rem;
  }

  &-primary {
    background: $primary-color;
    border: 1px solid darken($color: $primary-color, $amount: 2);
    color: $white-color;
    transition: 0.3s;

    &:hover {
      background: lighten($color: $primary-color, $amount: 3);
    }
  }

  &-alert {
    background: $alert-color;
    border: 2px solid darken($color: $alert-color, $amount: 5);
    color: $white-color;

    &:hover {
      background: lighten($color: $alert-color, $amount: 3);
    }
  }
  &-succes {
    background: $succes-color;
    border: 2px solid darken($color: $succes-color, $amount: 5);
    color: $white-color;

    &:hover {
      background: lighten($color: $succes-color, $amount: 3);
    }
  }
  &-danger {
    background: $danger-color;
    border: 1px solid darken($color: $danger-color, $amount: 5);
    color: $black-color;
    transition: 0.3s;

    &:hover {
      background: lighten($color: $danger-color, $amount: 3);
    }
  }
}

/*
    FORM
*/
form {
  margin: 2em 0 0.5em;

  button {
    margin-top: 1rem;
  }
}
label,
input,
select {
  display: block;
  width: 100%;
}

label {
  text-transform: uppercase;
  font-weight: 700;
  margin: 1.1rem 0 0;
}

input:not(input[type="file"]),
select {
  font-family: "Roboto", sans-serif;
  border-radius: 5px;
  border: 0.5px solid darken($color: #f5f5f5, $amount: 15);
  padding: 0.75em 1em;
  margin: 0.5em 0 0.75em;
  background: lighten($color: $white-color, $amount: 5);

  &:focus {
    outline: $primary-color;
    border: none;
    background: lighten($color: $white-color, $amount: 1);
    box-shadow: 0 0 5px $primary-color;
  }
}

.preview-image {
  border-radius: 5px;
  border: 0.5px solid darken($color: #f5f5f5, $amount: 15);
  padding: 0.75em 1em;
  margin: 0.5em 0 0.75em;
  background: lighten($color: $white-color, $amount: 5);

  img {
    margin-bottom: 0.5rem;
  }
}

.PrevNext a {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5em;

  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;

  &__next,
  &__prev {
    display: flex;
    align-items: center;
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

// TABLE STYLES //
.rmTable {
  margin: 2rem 0;
  font-size: 0.8em;

  &__header,
  &__body {
    display: grid;
    gap: 0.1rem;
    color: $text-color;
    font-weight: normal;
  }

  .template {
    grid-template-columns:
      minmax(5px, 10px) minmax(40px, 1fr) 4fr minmax(15px, 45px)
      1fr minmax(15px, 20px);
  }
  &__header {
    color: $text-color;
    font-weight: 700;

    text-transform: uppercase;
    border-bottom: 1px solid $secondary-color;
    padding-bottom: 0.2rem;
    margin-bottom: 0.1rem;
    padding: 0.75rem 1rem;

    &--distance,
    &--date {
      text-align: center;
    }
  }

  &__wrapper {
    margin-bottom: 3px;
    // background: #fff;
    // padding: 0.5rem 0.25rem;
    // font-size: 0.6rem;

    &:nth-child(odd) .rmTable__body {
      background: $white-color;
    }
    &:nth-child(odd) .rmTable__bottom {
      background: darken($color: $white-color, $amount: 2);
    }
  }
  &__body {
    background: #fff;
    position: relative;
    padding: 0.75rem 1rem;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    &:nth-child(odd) {
      background: darken($color: #fff, $amount: 3);
      &:hover {
        background: $primary-color;
      }
    }
    &:hover {
      background: darken($color: $primary-color, $amount: 1);
      font-weight: bold;
    }

    &--date,
    &--distance,
    &--type {
      justify-self: center;
      align-self: center;
      font-weight: 100;
      img {
        max-width: 15px;
      }
    }

    &--city,
    &--number {
      padding: 0 0.2rem;
      align-self: center;
    }
    &--button {
      justify-self: center;
      align-self: center;
      a img,
      img {
        height: 15px;
        padding-top: 3px;
      }
      &:hover {
        cursor: pointer;
      }
    }
    a {
      text-transform: none;
      margin: 0.2rem;
    }

    &.done::after {
      background: $succes-color;
      content: "";
      position: absolute;
      width: 5px;
      height: 100%;

      left: 0;
      top: 0;
    }
    &.not-done::after {
      background: $danger-color;
      content: "";
      position: absolute;
      width: 5px;
      height: 100%;

      left: 0;
      top: 0;
    }
  }

  &__bottom {
    margin-left: 0.75rem;
    margin-right: 5px;
    background: darken($color: #fff, $amount: 1);
    border-radius: 0px 0px 10px 10px;
    box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2);

    &--links {
      display: flex;
      font-size: 0.8em;
      padding: 0.5rem 0;
      // justify-content: flex-end;
    }
    &--link,
    &--team,
    &--done,
    &--score {
      padding: 0.2rem 0.5rem;
      text-transform: uppercase;

      color: $primary-color;
      font-weight: 700;
    }
    &--team {
      cursor: pointer;
    }
    &--selection {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(4, 1fr);
      text-align: center;
    }
  }
}

.lastName {
  text-transform: uppercase;
  font-weight: 700;
  margin-left: 0.25em;
}
.bold {
  text-transform: uppercase;
  font-weight: 700;
  margin-left: 0.25em;
}

@media only screen and (min-width: 1224px) {
  .rmTable {
    font-size: 1rem;

    .template {
      grid-template-columns:
        minmax(15px, 30px) minmax(20px, 120px) 4fr minmax(15px, 45px)
        1fr minmax(15px, 20px);
    }
    &__bottom {
      &--link,
      &--team,
      &--done,
      &--score {
        padding: 0.2rem 2rem;
      }

      &--links {
        padding: 0.5rem 0 0.75rem;
      }
    }
  } /* Styles */
}

.EtappeInfoContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  background: $white-color;
  margin: 2rem 0;

  &--image {
    max-width: 95%;
    margin: auto;
  }

  &--info {
    .btn {
      margin-top: 2rem;
    }
    h2 {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .EtappeInfoContainer {
    padding: 2rem 3rem;
    border-radius: 15px;

    &--image {
      border-radius: 15px;
    }
    &--info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}

footer {
  margin-top: 3rem;
  border-top: 2px solid $secondary-color;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
}
</style>
