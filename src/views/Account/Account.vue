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
        <h1>Hoi {{ getProfile.name }}</h1>
        <h2>Wat wil je graag doen?</h2>

        <ul>
          <li
            v-for="link in userLinks"
            :key="link.index"
            v-on:click="currentTab = link.component"
          >
            {{ link.name }}
          </li>

          <li @click="logout">Uitloggen</li>
        </ul>
        <div v-if="isAdmin">
          <h3>Admin dingen</h3>
          <ul>
            <li
              v-for="link in adminLinks"
              :key="link.index"
              v-on:click="currentTab = link.component"
            >
              {{ link.name }}
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
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "@/store/actions/auth";

import InsertRenner from "@/components/AdminComponents/InsertRenner.vue";
import UpdateRenner from "@/components/AdminComponents/UpdateRenner.vue";
import InsertTeam from "@/components/AdminComponents/InsertTeam.vue";
import UpdateTeam from "@/components/AdminComponents/UpdateTeam.vue";
import InsertStartlist from "@/components/AdminComponents/InsertStartlist.vue";
import UpdateStartlist from "@/components/AdminComponents/UpdateStartlist.vue";
import InsertResult from "@/components/AdminComponents/InsertResult.vue";
import InsertStage from "@/components/AdminComponents/InsertStage.vue";
import UpdateStage from "@/components/AdminComponents/UpdateStage.vue";
import UpdateUser from "@/components/AdminComponents/UpdateUser.vue";

import UpdateGebruiker from "@/components/UserComponents/UpdateGebruiker.vue";
import EmailSettings from "@/components/UserComponents/EmailSettings.vue";
import PoulesSettings from "@/components/UserComponents/PoulesSettings.vue";

export default {
  components: {
    UpdateGebruiker,
    InsertRenner,
    UpdateRenner,
    InsertTeam,
    UpdateTeam,
    InsertStartlist,
    UpdateStartlist,
    InsertResult,
    InsertStage,
    UpdateStage,
    UpdateUser,
    EmailSettings,
    PoulesSettings,
  },

  data() {
    return {
      username: "",
      isAdmin: false,
      userLinks: [
        {
          component: "UpdateGebruiker",
          name: "Gegevens aanpassen",
        },
        {
          component: "EmailSettings",
          name: "Email voorkeuren",
        },
        {
          component: "PoulesSettings",
          name: "Ploegenspel overzicht",
        },
      ],
      adminLinks: [
        {
          component: "UpdateRenner",
          name: "Renner aanpassen",
        },
        {
          component: "InsertRenner",
          name: "Renner toevoegen",
        },
        {
          component: "UpdateTeam",
          name: "Team aanpassen",
        },
        {
          component: "InsertTeam",
          name: "Team toevoegen",
        },
        {
          component: "InsertStartlist",
          name: "Startlijst toevoegen",
        },
        {
          component: "UpdateStartlist",
          name: "Startlijst aanpassen",
        },
        {
          component: "InsertResult",
          name: "Uitslag toevoegen",
        },

        {
          component: "InsertStage",
          name: "Etappe toevoegen",
        },
        {
          component: "UpdateStage",
          name: "Etappe aanpassen",
        },
        {
          component: "UpdateUser",
          name: "Gebruiker aanpassen",
        },
      ],
      currentTab: "",
    };
  },
  computed: {
    ...mapGetters(["getProfile"]),
    ...mapState(["userName"]),
    userName(userName) {
      this.username = userName;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/auth"));
    },
  },
  mounted() {
    this.username = this.userName;
    this.username = window.localStorage.user;
    if (this.getProfile.user_role_id == 3 || this.getProfile.user_role_id == 6) {
      this.isAdmin = true;
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";
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
    padding: 5em 3em;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      height: 7px;
      width: 100%;
      background: $primary-color;
      border-radius: 5px 5px 0 0;
    }
  }
}
</style>
