<template>
  <div>
    <h1>Meld je aan</h1>
    <div v-if="errorMessage" role="alert">{{ errorMessage }}</div>

    <form @submit.prevent="signup()">
      <label for="name">Gebruikersnaam:</label>
      <input v-model="user.name" type="name" name="name" id="name" required />
      <label for="email">Email:</label>
      <input v-model="user.email" type="email" name="email" id="email" required />
      <div class="password">
        <div class="password__input">
          <label for="password">Wachtwoord:</label>
          <input v-model="user.password" type="password" name="password" id="password" required />
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
          <small>
            Wachtwoord moet bestaan uit
            <ul>
              <li>Minimaal 8 karakters</li>
              <li>Minimaal 1 hoofdletter</li>
              <li>Minimaal 1 speciaal teken</li>
            </ul>
          </small>
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Aanmelden</button>
    </form>
    <small>
      Heb je al een account?
      <router-link to="Signin">Login</router-link>
    </small>
  </div>
</template>

<script>
import * as yup from "yup";
import axios from "axios";
import config from "@/utils/config";

const schema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, "password must contain a special character")
    .matches(/[A-Z]/, "password must contain an uppercase letter")
    .matches(/[a-z]/, "password must contain a lowercase letter")
    .matches(/[0-9]/, "password must contain a number")
    .required(),
  confirmPassword: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, "password must contain a special character")
    .matches(/[A-Z]/, "password must contain an uppercase letter")
    .matches(/[a-z]/, "password must contain a lowercase letter")
    .matches(/[0-9]/, "password must contain a number")
    .required(),
});

export default {
  data() {
    return {
      errorMessage: "",
      sigingIn: false,
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  watch: {
    user: {
      handler() {
        this.errorMessage = "";
      },
      deep: true,
    },
  },
  methods: {
    signup() {
      this.errorMessage = "";
      if (this.validUser()) {
        console.log("gelukt!");
        const body = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        };
        this.sigingUp = true;
        // url: `${config.DEV_URL}auth/signup`,
        try {
          axios({
            method: "post",
            url: `${config.DEV_URL}auth/signup`,
            data: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
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
              localStorage.token = result.token;
              localStorage.user = result.user.name;
              localStorage.user_id = result.user.id;
              setTimeout(() => {
                this.sigingIn = false;
                this.$router.push("/dashboard");
              }, 1000);
            })
            .catch((error) => {
              console.log("Gaat helemaal mis:", error);
              setTimeout(() => {
                this.sigingIn = false;
                this.errorMessage = error;
              }, 1000);
            });
        } catch (error) {
          console.error(error);
        }
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = "Wachtwoorden zijn niet gelijk 🚴🏽‍♂️";
        return false;
      }
      const result = schema.validate(this.user, schema).catch((error) => {
        console.log("Mislukt:", error);
        if (error.message.includes("email")) {
          this.errorMessage = "Email adres verkeerd";
        } else {
          this.errorMessage = "Verkeerd wachtwoord";
        }
        return false;
      });
      return true;
    },
  },
};
</script>

<style lang="scss">
.password {
  display: grid;

  &__rules {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
}

@media only screen and (min-width: 1224px) {
  .password {
    grid-template-columns: 3fr 1fr;
  }
}
</style>
