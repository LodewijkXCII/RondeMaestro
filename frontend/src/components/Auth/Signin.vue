<template>
  <div class="container LoginLogOut">
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
import config from '@/utils/config';
import axios from 'axios';

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
      const data = {
        email: this.user.email,
        password: this.user.password,
      };
      const axiosHeaders = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      this.errorMessage = '';
      if (validUser(this.user)) {
        this.logginIn = true;

        try {
          axios
            .post(`${config.DEV_URL}auth/signin`, data, axiosHeaders)
            .then((response) => {
              if (response.status == 200) {
                localStorage.token = response.data.token;

                this.newUser(response.data.user.name, response.data.user_type);

                this.logginIn = false;
                this.$router.push('/dashboard');
              } else {
                this.errorMessage =
                  'Er is iets mis gegaan, neem contact op met rondemaestro@gmail.com om te achterhalen wat.';
                console.log(response);
              }
            })
            .catch((error) => {
              this.errorMessage = error.response.data.error;
              setTimeout(() => {
                this.errorMessage = '';
              }, 5000);
              console.log(error);
            });
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
