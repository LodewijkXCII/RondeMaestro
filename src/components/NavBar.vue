<template>
  <nav>
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="brand">
        <img :src="require('@/assets/rondemaestro_logo.png')" />
      </router-link>
      <div class="leftNav">
        <div class="navItem">
          <router-link :to="{ name: 'Dashboard' }"> Dashboard </router-link>
        </div>
        <div class="navItem">
          <router-link :to="{ name: 'etappe-overzicht' }"> Etappes</router-link>
        </div>
        <div class="navItem">
          <router-link :to="{ name: 'uitslagen' }"> Uitslagen </router-link>
        </div>
        <div class="navItem">
          <router-link :to="{ name: 'algemeen-klassement' }"> Klassement </router-link>
        </div>
        <div class="navItem">
          <router-link :to="{ name: 'ploegenspel' }"> Ploegenspel </router-link>
        </div>
        <div class="navItem">
          <router-link :to="{ name: 'Spelregels' }"> Spelregels </router-link>
        </div>
      </div>
      <div class="rightNav">
        <div class="rightNav__options" v-if="toggle" @click="toggle = !toggle">
          <ul>
            <li>
              <router-link :to="{ name: 'account' }" style="text-transform: uppercase">
                Mijn account</router-link
              >
            </li>
            <li class="logout" v-if="isAuthenticated" @click="logout">Afmelden</li>
          </ul>
        </div>
        <div
          class="rightNav__options mobileMenu"
          v-if="showMenu"
          @click="showMenu = !showMenu"
        >
          <ul>
            <li>
              <router-link :to="{ name: 'Dashboard' }"> Dashboard </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'etappe-overzicht' }"> Etappes</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'uitslagen' }"> Uitslagen </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'algemeen-klassement' }">
                Klassement
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'ploegenspel' }"> Ploegenspel </router-link>
            </li>

            <li>
              <router-link :to="{ name: 'Spelregels' }"> Spelregels </router-link>
            </li>
          </ul>
        </div>
        <div class="rightNav__fixed">
          <div class="rightNav__fixed--user" v-if="isProfileLoaded">
            <div class="rightNav__fixed--user username" @click="toggle = !toggle">
              <font-awesome-icon :icon="['far', 'user']" />
              {{ username }}
              <font-awesome-icon :icon="['fas', 'caret-down']" />
            </div>
          </div>

          <div class="rightNav__fixed--sign" v-if="!isAuthenticated && !authLoading">
            <router-link
              :to="{ name: 'Auth', params: { authType: 'signup' } }"
              class="rightNav__fixed--sign nav-link"
              replace
            >
              Inschrijven
            </router-link>
            <router-link
              :to="{ name: 'Auth', params: { authType: 'signin' } }"
              class="rightNav__fixed--sign nav-link"
              replace
            >
              Aanmelden
            </router-link>
          </div>
          <div class="rightNav__fixed--menu">
            <font-awesome-icon :icon="['fas', 'bars']" @click="showMenu = !showMenu" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { AUTH_LOGOUT } from "@/store/actions/auth";

export default {
  data() {
    return {
      isAdmin: false,
      toggle: false,
      isMobile: false,
      showMenu: false,
    };
  },

  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: (state) => state.auth.status === "loading",
      username: (state) => state.user.profile.name,
    }),
    ...mapMutations(["setAuth"]),
  },

  methods: {
    // routeAuth(value) {
    //   console.log('testing');
    //   console.log(value);
    //   this.setAuth(value);
    // },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/auth"));
    },
  },
  // mounted() {
  //   this.username = this.userName;
  //   this.username = window.localStorage.user;
  //   if (this.userType) {
  //     this.isAdmin = true;
  //   }
  //   if (this.username) {
  //     this.loggedIn = true;
  //   }
  //   if (window.localStorage.user_type_id == 3) {
  //     this.isAdmin = true;
  //   }
  // },
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";

nav {
  border-bottom: 2px solid $primary-color;
  .container {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.2em;
    margin-bottom: 0.5rem;
    min-height: 75px;
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
      color: $black-color;
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
        border-top: 1px solid $black-color;
      }

      &__fixed {
        display: inline-flex;
        padding-left: 25px;

        &::before {
          padding-right: 10px;
          content: "";
          border-left: 1px solid $black-color;
        }
        &--user {
          display: flex;
          &.logout,
          &.username {
            margin: 0 0.5rem;
            transition: 0.3s;

            &:hover {
              cursor: pointer;
              color: $primary-color;
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
    max-width: 1385px;
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
