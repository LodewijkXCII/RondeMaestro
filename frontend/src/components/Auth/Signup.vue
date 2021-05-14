<template>
  <div class="container LoginLogOut">
    <h1>Meld je aan</h1>
    <div v-if="errorMessage" role="alert">{{ errorMessage }}</div>

    <form @submit.prevent="register()">
      <label for="name">Gebruikersnaam:</label>
      <input v-model="user.name" type="name" name="name" id="name" required />
      <label for="email">Email:</label>
      <input
        v-model="user.email"
        type="email"
        name="email"
        id="email"
        required
      />

      <div class="password__input">
        <label for="password">Wachtwoord:</label>
        <input
          v-model="user.password"
          type="password"
          name="password"
          id="password"
          required
        />
        <label for="confirmPassword">Herhaal wachtwoord:</label>
        <input
          v-model="user.confirmPassword"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
        />
      </div>

      <div class="password__rules">
        <span>Wachtwoord moet bestaan uit:</span>
        <ul>
          <li>Minimaal 8 karakters</li>
          <li>Minimaal 1 hoofdletter</li>
          <li>Minimaal 1 speciaal teken</li>
        </ul>
      </div>
      <button
        class="btn "
        :class="sigingIn ? 'btn-succes' : 'btn-primary'"
        type="submit"
      >
        Aanmelden
      </button>
    </form>
    <small>
      Heb je al een account?
      <router-link to="Signin">Login</router-link>
    </small>
  </div>
</template>

<script>
import routes from '@/api/routes';
import validUser from '@/utils/validUser';

export default {
  data() {
    return {
      errorMessage: '',
      sigingIn: false,
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },

  methods: {
    async register() {
      const user = {
        email: this.email,
        password: this.password,
      };
      if (!validUser(user)) {
        console.error('Er is iets mis gegaan, geen valid user');
        this.errorMessage =
          'Er is iets mis gegaan, neem contact op met rondemaestro@gmail.com om te achterhalen wat.';
      }
      try {
        this.registerUser();
      } catch (error) {
        console.error(error);
      }
    },
    // REGISTER USER IN POSTGRES
    async registerUser() {
      const body = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        user_role_id: 4,
      };
      try {
        const postUser = await routes.create(`auth/signup`, body);
        if (postUser.status === 200) {
          // TODO GET USER INFO TO VUEX
          this.$router.push('/dashboard');
        }
      } catch (error) {
        console.error(error);
        this.errorMessage =
          'Er is iets mis gegaan, neem contact op met rondemaestro@gmail.com om te achterhalen wat.';
      }
    },
  },
};
</script>
