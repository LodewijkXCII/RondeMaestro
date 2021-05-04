<template>
  <div class="container LoginLogOut">
    <!-- <SignUP /> -->
    <h1>Meld je aan</h1>
    <div v-if="errorMessage" role="alert">{{ errorMessage }}</div>

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

      <div class="password__input">
        <label for="password">Wachtwoord:</label>
        <input
          v-model="user.password"
          type="password"
          name="password"
          id="password"
          required
          v-on:keyup="checkPassword"
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
          <li :class="char ? 'true' : 'false'">Minimaal 8 karakters</li>
          <li :class="cap ? 'true' : 'false'">Minimaal 1 hoofdletter</li>
          <li :class="spec ? 'true' : 'false'">Minimaal 1 speciaal teken</li>
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
// import SignUP from '@/components/Auth/Signup';

import axios from 'axios';
import config from '@/utils/config';
import schema from '@/utils/yup';

export default {
  components: {
    // SignUP,
  },
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
      char: false,
      cap: false,
      spec: false,
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
    async signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        const body = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        };
        this.sigingIn = true;
        try {
          await axios({
            method: 'post',
            url: `${config.DEV_URL}auth/signup`,
            data: body,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((response) => {
              console.log(response.data);
              if (response.ok) {
                return response.json();
              }
              return response.json().then((error) => {
                throw new Error(error);
              });
            })
            .then((result) => {
              if (result.status == 200) {
                localStorage.token = response.data.token;
                localStorage.user = response.data.user.name;
                localStorage.user_id = response.data.user.id;
                localStorage.user_type_id = response.data.user.user_type;
                this.sigingIn = false;
                axios({
                  method: 'post',
                  url: `${config.DEV_URL}email/new-user`,
                  data: {
                    user_name: this.user,
                    email: this.email,
                  },
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                }).then((response) => {
                  console.log(response.data);
                  if (response.ok) {
                    return response.json();
                  }
                  return response.json().then((error) => {
                    throw new Error(error);
                  });
                });
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
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Wachtwoorden zijn niet gelijk 🚴🏽‍♂️';
        return false;
      }
      schema.schema.validate(this.user, schema).catch((error) => {
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
    checkPassword() {
      const upperCaseLetter = /[A-Z]/g;
      const specialChar = /[^A-Za-z0-9]/;

      if (this.user.password.length >= 8) {
        this.char = true;
      } else {
        this.char = false;
      }

      if (this.user.password.match(upperCaseLetter)) {
        this.cap = true;
      } else {
        this.cap = false;
      }
      if (this.user.password.match(specialChar)) {
        this.spec = true;
      } else {
        this.spec = false;
      }
    },
  },
};
</script>

<style lang="scss">
.LoginLogOut {
  max-width: 500px;
  margin-top: 5rem;
}
.password__rules {
  span {
  }
  ul {
    padding: 0;
    margin: 1em 0 0;
    list-style: none;
  }

  li {
    height: 20px;
    line-height: 20px;
    margin: 0 0 0.8em 0;
    padding: 0 0 0 40px;
    position: relative;
  }

  li:before {
    opacity: 1;
    text-shadow: none;
    content: '\2714';
    position: absolute;
    left: -25px;
    width: 20px;
    height: 20px;
    position: relative;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    transform: scale(1.3);
  }
  .false {
    color: red;
  }
  .true {
    color: green;
  }
}
</style>
