<template>
  <nav>
    <router-link :to="{ name: 'Home' }" class="brand">
      <img :src="require('@/assets/logo.png')" />
      <span>
        RondeMaestro
      </span>
    </router-link>
    <div class="rightNav">
      <div class="rightNav__user" v-if="loggedIn">
        <div class="rightNav__user--username">{{ username }}</div>
        <div class="rightNav__user--logout" @click="logout">
          Logout
        </div>
      </div>
      <div class="rightNav__sign" v-else>
        <router-link :to="{ name: 'Signup' }" class="rightNav__sign--nav-link"
          >Inschrijven</router-link
        >
        <router-link :to="{ name: 'Signin' }" class="rightNav__sign--nav-link"
          >Aanmelden</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false,
      username: '',
    };
  },
  methods: {
    logout() {
      let currentPath = this.$route.path;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');
      if (currentPath !== '/') {
        this.$router.go('/');
      }
    },
  },
  mounted() {
    this.username = window.localStorage.user;
    if (this.username) {
      this.loggedIn = true;
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

nav {
  border-bottom: 2px solid $primary-color;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .brand {
    display: flex;
    justify-items: center;
    align-items: center;
    span {
      display: none;
    }
  }

  img {
    width: 75px;
    height: auto;
  }

  .rightNav {
    text-transform: uppercase;
    color: $primary-color;
    font-weight: 700;
    &__user {
      display: flex;
      &--logout,
      &--username {
        margin: 0 0.5rem;
      }
      &--logout {
        cursor: pointer;
      }
    }
    &__sign {
      &--nav-link {
        margin: 0 0.5rem;
      }
    }
  }
}
@media only screen and (min-width: 1224px) {
  nav {
    .brand {
      span {
        display: initial;
      }
    }
  }
}
</style>
