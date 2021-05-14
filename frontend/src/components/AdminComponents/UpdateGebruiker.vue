<template>
  <section>
    <div v-if="user.id">
      <h2>Gebruiker gegevens</h2>
      <form>
        <label for="name">Naam:</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="user.name"
          autocomplete="off"
          required
        />
        <label for="email">email:</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="user.email"
          autocomplete="off"
          maxlength="3"
          required
        />

        <button
          type="submit"
          class="btn btn-succes"
          @click.prevent="updateUser"
        >
          Updaten
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import routes from '@/api/routes';

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      user: {},
      user_roles: [],
    };
  },
  computed: {
    ...mapGetters['getProfile'],
  },
  methods: {
    async getUser(id) {
      const userRoles = await routes.find(`user_role`);
      this.user_roles = userRoles.data;

      this.user = {};
      const selectedUser = await routes.find(`users/${id}`);
      this.user = selectedUser.data;
    },

    async updateUser() {
      // UPDATE USER
      const update = await routes.update(`users/${this.user.id}`, {
        email: this.user.email,
        name: this.user.name,
        user_role_id: +this.user.user_role_id,
      });

      if (update.status == 200) {
        this.message = 'Succesvol geupdate';
        return;
      } else {
        this.message = 'Er is iets mis gegaan.';
        console.error(update);
      }
    },
  },

  async created() {
    const activeUser = this.getProfile.id;

    const response = await routes.find(`users/${activeUser}`);
    this.user = response.data;
  },
};
</script>
