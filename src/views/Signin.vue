<template>
  <div>
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
import * as yup from 'yup';
import config from '@/utils/config';
import axios from 'axios';
import schema from '@/utils/yup';

import { mapState, mapMutations } from 'vuex';

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

    newUser(user) {
      this.setUser(user);
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
      if (this.validUser()) {
        this.logginIn = true;

        try {
          axios
            .post(`${config.DEV_URL}auth/signin`, {
              email: this.user.email,
              password: this.user.password,
            })
            .then((response) => {
              if (response.status == 200) {
                localStorage.token = response.data.token;
                localStorage.user = response.data.user.name;
                localStorage.user_id = response.data.user.id;
                localStorage.user_type_id = response.data.user.user_type;
                this.newUser(response.data.user.name);

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

    validUser() {
      const result = schema.schema
        .validate(this.user, schema)
        .catch((error) => {
          console.log('Mislukt:', error);
          if (error.message.includes('email')) {
            this.errorMessage = 'Email adres verkeerd';
          } else {
            this.errorMessage = 'Verkeerd wachtwoord';
          }
          return false;
        });
      return true;
    },
  },
};
</script>
