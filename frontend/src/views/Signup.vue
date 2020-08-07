<template>
  <div>
    <h1>Meld je aan</h1>
    <div v-if="errorMessage" role="alert">
      {{ errorMessage }}
    </div>
    <!-- <button class="btn btn-google">
      <a href="http://localhost:1992/api/v1/auth/google">
        Signup With Google
      </a>
    </button> -->
    <form @submit.prevent="signup()">
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
      <button class="btn btn-primary" type="submit">Aanmelden</button>
    </form>
    <small
      >Heb je al een account?
      <router-link to="Signin">Login</router-link></small
    >
  </div>
</template>

<script>
import * as yup from 'yup';

const URL = 'https://rondemaestro-test.herokuapp.com/api/v1/auth/signup';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2)
    .required(),
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
  confirmPassword: yup
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
      sigingIn: false,
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    googleSignup() {
      this.errorMessage = '';
    },

    signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        console.log('gelukt!');
        const body = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        };
        this.sigingUp = true;

        fetch(URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then((error) => {
              throw new Error(error);
            });
          })
          .then((result) => {
            localStorage.token = result.token;
            setTimeout(() => {
              this.sigingIn = false;
              this.$router.push('/dashboard');
            }, 1000);
          })
          .catch((error) => {
            setTimeout(() => {
              this.sigingIn = false;
              this.errorMessage = error;
            }, 1000);
          });
      }
    },
    validUser() {
      //TODO kijken naar validatie!
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Wachtwoorden zijn niet gelijk 🚴🏽‍♂️';
        return false;
      }
      const result = schema.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }

      return true;
    },
  },
};
</script>

<style></style>
