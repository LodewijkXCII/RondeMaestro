<template>
  <div>
    <h1>Login</h1>
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
      <button class="btn btn-primary" type="submit">Login</button>
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

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
});

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
  methods: {
    async login() {
      const data = {
        email: this.user.email,
        password: this.user.password,
      };
      const axiosHeaders = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      };
      this.errorMessage = '';
      // if (this.validUser()) {
      //   this.logginIn = true;

      try {
        axios
          .post(`${config.PROD_URL}auth/signin`, data, axiosHeaders)

          .then((response) => {
            if (response.status == 200) {
              localStorage.token = response.data.token;
              localStorage.user = JSON.stringify(response.data.user);

              setTimeout(() => {
                this.logginIn = false;
                this.$router.push('/dashboard');
              }, 1000);
            }
          });
        return response.data.then((error) => {
          throw new Error(error.message);
        });
      } catch (error) {
        console.error(error);
      }
    },
    validUser() {
      const result = schema.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      // if (result.error.message.includes('email')) {
      //   this.errorMessage = 'Email adres verkeerd';
      // } else {
      //   this.errorMessage = 'Verkeerd wachtwoord';
      // }
      return false;
    },
  },
};
</script>

<style></style>
