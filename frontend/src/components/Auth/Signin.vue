<template>
  <div class="authcontainer__form--signin">
    <h1>Login</h1>
    <h3 v-if="errorMessage">{{ errorMessage }}</h3>
    <form @submit.prevent="login()">
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
import { mapMutations } from 'vuex';
import validUser from '@/utils/validUser';
import { AUTH_REQUEST } from '@/store/actions/auth';

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

    async login() {
      const data = this.user;
      const email = this.user.email;
      const password = this.user.password;
      const route = 'auth/login';

      this.errorMessage = '';
      if (validUser(data)) {
        this.logginIn = true;

        try {
          this.$store
            .dispatch(AUTH_REQUEST, { email, password, route })
            .then(() => {
              this.$router.push('/dashboard');
            })
            .catch((error) => console.error(error));
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
