<template>
  <nav>
    <div class="container">
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
          <router-link :to="{ name: 'uitslagen' }">
            Uitslagen
          </router-link>
        </div>
        <div class="navItem">
          <router-link :to="{ name: 'Spelregels' }">
            Spelregels
          </router-link>
        </div>
      </div>
      <div class="rightNav">
        <div class="rightNav__options" v-if="toggle" @click="toggle = !toggle">
          <ul>
            <li>
              <router-link
                :to="{ name: 'account' }"
                style="text-transform: uppercase;"
              >
                Mijn account</router-link
              >
            </li>
            <li class="logout" @click="logout">Afmelden</li>
          </ul>
        </div>
        <div
          class="rightNav__options mobileMenu"
          v-if="showMenu"
          @click="showMenu = !showMenu"
        >
          <ul>
            <li>
              <router-link :to="{ name: 'Dashboard' }">
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'etappe-overzicht' }">
                Etappes</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'uitslagen' }">
                Uitslagen
              </router-link>
            </li>

            <li>
              <router-link :to="{ name: 'Spelregels' }">
                Spelregels
              </router-link>
            </li>
          </ul>
        </div>
        <div class="rightNav__fixed">
          <div class="rightNav__fixed--user" v-if="loggedIn">
            <div
              class="rightNav__fixed--user username"
              @click="toggle = !toggle"
            >
              <font-awesome-icon :icon="['far', 'user']" />
              {{ username }}
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
          <div class="rightNav__fixed--menu">
            <font-awesome-icon
              :icon="['fas', 'bars']"
              @click="showMenu = !showMenu"
            />
          </div>
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
      isAdmin: false,
      toggle: false,
      isMobile: false,
      showMenu: false,
    };
  },

  computed: {
    ...mapState(['userName', 'userType']),
  },

  watch: {
    userName(userName, newValue, oldValue) {
      this.loggedIn = true;
      console.log(`Updating from ${oldValue} to ${newValue}`);
      this.username = userName;
    },
    userType(userType) {
      this.isAdmin = true;
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
    if (this.userType) {
      this.isAdmin = true;
    }
    if (this.username) {
      this.loggedIn = true;
    }
    if (window.localStorage.user_type_id == 3) {
      this.isAdmin = true;
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

nav {
  border-bottom: 2px solid $primary-color;
  .container {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.2em;
    margin-bottom: 0.5rem;
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
      display: none;
    }

    .rightNav {
      margin-left: auto;
      display: flex;
      align-items: center;
      text-transform: uppercase;
      color: $primary-color;
      font-weight: 700;
      position: relative;

      &__options {
        position: absolute;
        right: 0;
        background: $light-color;
        padding: 0.75rem 1rem 0.5rem 1.6rem;
        top: 1.7rem;

        ul {
          list-style: none;
          padding: 0;

          li {
            margin-bottom: 0.75rem;
          }
        }
      }

      .logout {
        cursor: pointer;
        padding-top: 5px;
        margin-top: 10px;
        border-top: 1px solid $primary-color;
      }

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
            transition: 0.3s;

            &:hover {
              cursor: pointer;
              color: darken($color: $primary-color, $amount: 7);
            }

            svg {
              margin: 0 7px;
            }
          }
        }

        &--sign {
          &.nav-link {
            margin: 0 0.5rem;
          }
        }
      }
      &__fixed--menu {
        display: inherit;
      }
    }

    .navItem {
      margin: 0 1.2em;

      a {
        transition: 0.3s;
        text-transform: uppercase;

        &:hover {
          color: darken($color: $primary-color, $amount: 7);
        }
      }
    }
  }
}

@media only screen and (min-width: 1224px) {
  nav .container {
    max-width: 1200px;
    margin: auto;
    .leftNav {
      display: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1.5rem;
    }

    .rightNav__fixed--menu {
      display: none;
    }
  }
}
</style>
