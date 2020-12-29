<template>
  <div id="app">
    <NavBar />
    <router-view />

    <!-- <BottomNav v-if="!isHome" /> -->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BottomNav from '@/components/BottomNav.vue';

export default {
  components: {
    NavBar,
    BottomNav,
  },

  data() {
    return {};
  },

  computed: {
    isHome() {
      return this.$route.name === 'Home';
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

* {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  font-size: 0.8125rem;
  margin: 0;
  padding: 1.2em;
  background: #f5f5f5;
}

//CONFIG//
.container {
  padding: 2em 0.5em;
  max-width: 350px;
  margin-bottom: 8em;
  .headerImage {
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
  }
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content;
  column-gap: 0.8rem;
  row-gap: 1rem;
}

.label {
  background: $white-color;
  display: inline-block;
  width: auto;
  font-size: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
  margin: 0.75rem 0;
  a {
    color: $white-color;
    font-weight: 400;
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

.show {
  display: inherit;
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  body {
    margin: auto;
    padding: 1em 0;
  }

  .container {
    max-width: 1200px;
    margin: auto;
    margin-bottom: 8rem;
  }

  .grid-1-2 {
    display: grid;
    grid-template-columns: 1fr 3fr;
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
  color: $primary-color;
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
  color: $primary-color;
  text-transform: uppercase;
  font-weight: 700;
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
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 10px;
  font-size: 0.75rem;
  display: inline;

  &:hover {
    cursor: pointer;
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
    margin-top: 1.5rem;
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
  margin: 1.5rem 0 0;
}

input,
select {
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
  border: 0.5px solid darken($color: #f5f5f5, $amount: 15);
  padding: 0.75em 1em;
  margin: 0.75em 0 1em;
  background: lighten($color: $white-color, $amount: 5);

  &:focus {
    outline: $primary-color;
    border: none;
    background: lighten($color: $white-color, $amount: 1);
    box-shadow: 0 0 5px $primary-color;
  }
}

.PrevNext a {
  display: flex;
  // justify-content: space-between;
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
</style>