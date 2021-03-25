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
import axios from 'axios';
import config from '@/utils/config';

export default {
  data() {
    return {
      user: {},
      user_roles: [],
    };
  },
  methods: {
    async getUser(id) {
      console.log(id);

      const userRoles = await axios.get(`${config.DEV_URL}user_role`);
      this.user_roles = userRoles.data;

      this.user = {};
      const selectedUser = await axios.get(`${config.DEV_URL}users/${id}`);
      this.user = selectedUser.data;
    },

    async updateUser() {
      // UPDATE USER
      const update = await axios.put(`${config.DEV_URL}users/${this.user.id}`, {
        email: this.user.email,
        name: this.user.name,
        user_role_id: +this.user.user_role_id,
      });

      if (update.status == 200) {
        this.message = 'Succesvol geupdate';
        return;
      } else {
        this.message = 'Er is iets mis gegaan.';
        console.log(update);
      }
    },
  },

  async created() {
    const activeUser = window.localStorage.user_id;
    const response = await axios.get(`${config.DEV_URL}users/${activeUser}`);
    this.user = response.data;
  },
};
</script>
