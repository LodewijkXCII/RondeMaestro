<template>
  <div class="authcontainer__form--signup">
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
          @keyup="checkPassword"
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
          <li :class="passwordCrit.char ? 'pass-green' : 'pass-red'">
            Minimaal 8 karakters
          </li>
          <li :class="passwordCrit.cap ? 'pass-green' : 'pass-red'">
            Minimaal 1 hoofdletter
          </li>
          <li :class="passwordCrit.spec ? 'pass-green' : 'pass-red'">
            Minimaal 1 speciaal teken
          </li>
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
      <a @click.prevent="$emit('toggleAuth', 'Signin')">Login</a>
    </small>
  </div>
</template>

<script>
import routes from '@/api/routes';
import validUser from '@/utils/validUser';
import { AUTH_REQUEST } from '@/store/actions/auth';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      errorMessage: '',
      sigingIn: false,
      passwordCrit: {
        char: false,
        cap: false,
        spec: false,
      },
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  computed: {},

  methods: {
    ...mapMutations(['setUser']),

    checkPassword() {
      if (this.user.password.length >= 8) {
        this.passwordCrit.char = true;
      } else {
        this.passwordCrit.char = false;
      }
      if (this.user.password.match(/[A-Z]/g)) {
        this.passwordCrit.cap = true;
      } else {
        this.passwordCrit.cap = false;
      }
      if (this.user.password.match(/[\[\]`!@#$%\^&*()={}:;<>+'-]/g)) {
        this.passwordCrit.spec = true;
      } else {
        this.passwordCrit.spec = false;
      }
    },

    newUser(user, user_type_id) {
      this.setUser(user, user_type_id);
    },

    async register() {
      const user = {
        email: this.user.email,
        password: this.user.password,
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
          const route = 'auth/login';
          const email = this.user.email;
          const password = this.user.password;
          // TODO GET USER INFO TO VUEX
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
      } catch (error) {
        console.error(error);
        this.errorMessage =
          'Er is iets mis gegaan, neem contact op met rondemaestro@gmail.com om te achterhalen wat.';
      }
    },
  },
};
</script>

<style lang="scss">
.password__rules {
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
  .pass-red {
    color: red;
  }
  .pass-green {
    color: green;
  }
}
</style>
