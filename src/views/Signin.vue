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
import axios from 'axios';

const URL = 'http://localhost:1992/api/v1/auth/signin';

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
    login() {
      this.errorMessage = '';
      // if (this.validUser()) {
      //   this.logginIn = true;

      try {
        axios
          .post(URL, {
            email: this.user.email,
            password: this.user.password,
            headers: {
              'content-type': 'application/json',
            },
          })
          .then((response) => {
            if (response.status == 200) {
              return response.data;
            }
            // return response.data.then((error) => {
            //   throw new Error(error.message);
            // });
          })
          .then((result) => {
            localStorage.token = result.token;
            localStorage.user_id = result.user.id;

            setTimeout(() => {
              this.logginIn = false;
              this.$router.push('/dashboard');
            }, 1000);
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
