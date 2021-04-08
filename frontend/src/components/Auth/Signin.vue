<template>
  <div class="container LoginLogOut">
    <h1>Login</h1>
    <h3 v-if="errorMessage">{{ errorMessage }}</h3>
    <form @submit.prevent="signIn()">
      <label for="email">Email:</label>
      <input
        v-model="user.email"
        type="email"
        name="email"
        id="email"
        required
      />
      <label for="password">Wachtwoord:</label>
      <input
        v-model="user.password"
        type="password"
        name="password"
        id="password"
        required
      />
      <button
        class="btn"
        :class="errorMessage ? 'btn-alert' : 'btn-primary'"
        type="submit"
      >
        Login
      </button>
    </form>
    <small>
      Nog geen account?
      <router-link to="Signup">Meld je aan!</router-link>
    </small>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      errorMessage: '',
      logginIn: false,
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {},
  methods: {
    ...mapMutations(['setUser']),

    newUser(user, user_type_id) {
      this.setUser(user, user_type_id);
    },

    async signIn() {
      try {
        const data = await firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.password);

        // this.newUser(this.user.name, this.user_type);
        console.log(data);
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage =
          'Er is iets mis gegaan, neem contact op met rondemaestro@gmail.com om te achterhalen wat.';
        console.log(error);
      }
    },
  },
};
</script>
