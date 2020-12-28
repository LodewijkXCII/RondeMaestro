<template>
  <nav>
    <router-link :to="{ name: 'Home' }" class="brand">
      <img :src="require('@/assets/logo.png')" />
    </router-link>
    <div class="leftNav">
      <div class="navItem">
        <router-link :to="{ name: 'Dashboard' }">
          Dashboard
        </router-link>
      </div>
      <div class="navItem">
        <router-link :to="{ name: 'etappe-overzicht' }"> Etappes</router-link>
      </div>
      <div class="navItem">
        <router-link :to="{ name: 'klassement' }">
          Klassement
        </router-link>
      </div>
      <div class="navItem">
        <router-link :to="{ name: 'Score' }">
          Score
        </router-link>
      </div>

      <div class="navItem">
        <router-link :to="{ name: 'Spelregels' }">
          Spelregels
        </router-link>
      </div>
    </div>
    <div class="rightNav">
      <div class="rightNav__fixed">
        <div class="rightNav__fixed--user" v-if="loggedIn">
          <div class="rightNav__fixed--user logout" @click="logout">
            Afmelden
          </div>
          <div class="rightNav__fixed--user username">
            <font-awesome-icon :icon="['far', 'user']" />
            {{ username }}

            <!-- TODO pagina naar profiel aanmaken -->
            <font-awesome-icon :icon="['fas', 'caret-down']" />
          </div>
        </div>
        <div class="rightNav__fixed--sign" v-else>
          <router-link
            :to="{ name: 'Signup' }"
            class="rightNav__fixed--sign nav-link"
            >Inschrijven</router-link
          >
          <router-link
            :to="{ name: 'Signin' }"
            class="rightNav__fixed--sign nav-link"
            >Aanmelden</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loggedIn: false,
      username: '',
    };
  },

  computed: {
    ...mapState(['userName']),
  },

  watch: {
    userName(userName, newValue, oldValue) {
      this.loggedIn = true;
      console.log(`Updating from ${oldValue} to ${newValue}`);
      this.username = userName;
    },
  },

  methods: {
    logout() {
      let currentPath = this.$route.path;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_type_id');
      if (currentPath !== '/') {
        this.$router.go('/');
      }
    },
  },
  mounted() {
    this.username = this.userName;
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
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  .brand {
    display: flex;
    justify-items: center;
    align-items: center;
  }

  img {
    width: 75px;
    height: auto;
  }
  .leftNav {
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
  }

  .rightNav {
    margin-left: auto;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: $primary-color;
    font-weight: 700;
    &__fixed {
      display: inline-flex;
      padding-left: 25px;

      &::before {
        padding-right: 10px;
        content: '';
        border-left: 1px solid $primary-color;
      }
      &--user {
        display: flex;
        &.logout,
        &.username {
          margin: 0 0.5rem;

          svg {
            margin: 0 7px;
          }
        }
        &.logout {
          cursor: pointer;
        }
      }
      &--sign {
        &.nav-link {
          margin: 0 0.5rem;
        }
      }
    }
  }

  .navItem {
    margin: 0 1.2em;

    a {
      transition: 0.3s;

      &:hover {
        color: darken($color: $primary-color, $amount: 7);
      }
    }
  }
}

@media only screen and (min-width: 1224px) {
  nav {
    .leftNav {
      display: inherit;
    }
  }
}
</style>
