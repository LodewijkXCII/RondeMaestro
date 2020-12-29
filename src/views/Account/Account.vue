<template>
  <section class="">
    <div class="header-img">
      <img
        src="@/assets/img/cycling_onderhoud.jpg"
        alt="RondeMaestro Account"
        class="headerImage"
      />
    </div>
    <div class="container account grid-1-2">
      <div class="grid-1-2__left">
        <h1>Hoi {{ username }}</h1>
        <h2>Wat wil je graag doen?</h2>

        <ul>
          <li>Gegevens aanpassen</li>
          <li>Email voorkeuren</li>
          <li @click="logout">Uitloggen</li>
        </ul>
        <div v-if="isAdmin">
          <h3>Admin dingen</h3>
          <ul>
            <li
              v-for="link in adminLinks"
              :key="link.index"
              v-on:click="currentTab = link"
            >
              {{ link }}
            </li>
          </ul>
        </div>
      </div>
      <div class="grid-1-2__right">
        <component :is="currentTab" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import EtappeUitslag from '@/views/Admin/Uitslag/EtappeUitslag.vue';
import NewRenner from '@/components/AdminComponents/NewRenner.vue';
import UpdateRenner from '@/components/AdminComponents/UpdateRenner.vue';

export default {
  components: {
    EtappeUitslag,
    NewRenner,
    UpdateRenner,
  },

  data() {
    return {
      username: '',
      isAdmin: false,
      adminLinks: [
        'UpdateRenner',
        'NewRenner',
        'UpdateTeam',
        'AddTeam',
        'AddStartlist',
        'UpdateStartlist',
        'UpdateUser',
        'InsertResult',
      ],
      currentTab: 'NewRenner',
    };
  },
  computed: {
    ...mapState(['userName']),
    userName(userName) {
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
    if (window.localStorage.user_type_id == 3) {
      this.isAdmin = true;
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';
.account {
  background: #f4f4f4;
  padding: 0.5em 0;

  /* List Styles */
  ul {
    list-style: none;
    margin: 1rem 0 2rem;
    padding: 0;

    li {
      margin: 0.5rem 0;
      padding-left: 0.75rem;

      &:hover {
        border-left: 3px solid $primary-color;
        color: darken($color: $primary-color, $amount: 7);
        font-weight: 700;
        cursor: pointer;
      }

      &.active {
        border-left: 3px solid $primary-color;
        color: darken($color: $primary-color, $amount: 7);
        font-weight: 700;
      }
    }
  }
}

@media only screen and (min-width: 1224px) {
  .account {
    margin-top: -5em;
    border-radius: 5px;
    padding: 2.5em 2em;
    position: relative;
    &::before {
      position: absolute;
      content: '';
      height: 7px;
      width: 100%;
      background: $primary-color;
      border-radius: 5px 5px 0 0;
    }
  }
}
</style>
