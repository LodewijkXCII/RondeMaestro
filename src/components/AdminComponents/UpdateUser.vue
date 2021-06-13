<template>
  <section>
    <h2>Gebruiker aanpassen</h2>
    <label for="user">Kies de gebruiker:</label>
    <div class="formInline">
      <!-- <input type="number" min="2020" value="2020" v-model.number="year" /> -->
      <select name="user" id="user" v-model="user">
        <option :value="user.id" v-for="user in users" :key="user.index">
          {{ user.name }}
        </option>
      </select>
      <button v-on:click.prevent="getUser(user)" class="btn btn-primary">
        kies
      </button>
    </div>

    <div v-if="user.id" style="margin: 2rem 0">
      <h2>Gebruiker gegevens</h2>
      <form>
        <label for="id">ID:</label>
        <input
          type="number"
          name="id"
          id="id"
          v-model="user.id"
          autocomplete="off"
          disabled
        />
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

        <label for="user_role">Rol:</label>
        <select
          name="user_role"
          id="user_role"
          v-model="user.user_role_id"
          required
        >
          <option
            :value="user.user_role_id"
            v-for="uers in user_roles"
            :key="uers.id"
          >
            {{ uers.name }}
          </option>
        </select>

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

export default {
  data() {
    return {
      users: [],
      user: {},
      user_roles: [],
    };
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
    const response = await routes.find(`users`);
    this.users = response.data;
  },
};
</script>
