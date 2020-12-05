<template>
  <nav>
    <router-link :to="{ name: 'Home' }" class="brand">
      <img :src="require('@/assets/logo.png')" />
    </router-link>
    <div class="rightNav">
      <router-link :to="{ name: 'Spelregels' }">
        Spelregels
      </router-link>
      <div class="rightNav__fixed">
        <div class="rightNav__fixed--user" v-if="loggedIn">
          <div class="rightNav__fixed--user username">
            <font-awesome-icon :icon="['far', 'user']" />{{ username }}
          </div>
          <div class="rightNav__fixed--user logout" @click="logout">
            Afmelden
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
      localStorage.removeItem('user_type_id');
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
  }

  img {
    width: 75px;
    height: auto;
  }

  .rightNav {
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
            margin-right: 5px;
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
}
</style>
