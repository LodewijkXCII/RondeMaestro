<template>
  <div class="login-card__left active">
    <h1>Inloggen</h1>

    <form>
      <div class="form__group field">
        <input
          type="email"
          class="form__field"
          placeholder="Email"
          v-model="loginData.email"
          required
          name="email"
        />
        <label for="email" class="form__label"> Email </label>
      </div>
      <div class="form__group field">
        <input
          type="password"
          class="form__field"
          placeholder="Wachtwoord"
          name="password"
          v-model="loginData.password"
        />
        <label for="password" class="form__label">Password</label>
      </div>

      <button class="send-btn" @click.prevent="getUserData">Verstuur</button>
      <div v-if="errorMSG">{{ errorMSG }}</div>
    </form>
    <p>
      Nog geen account bij RondeMaestro? Maak een
      <router-link to="/registeren">account</router-link> aan.
    </p>
  </div>
  <div class="login-card__right">
    <h2>Welkom bij RondeMaestro!</h2>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque sint
      aspernatur itaque possimus deleniti id sed distinctio, dignissimos tempore
      facilis dolorem saepe autem hic nemo illum debitis vel blanditiis! Eius
      similique recusandae culpa, aliquam esse facere a necessitatibus et libero
      amet ipsum, aut totam omnis, repudiandae magni alias quibusdam tenetur!
    </p>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "../stores/userAuth";
import router from "../router";

export default defineComponent({
  setup() {
    const errorMSG = ref();
    const loginData = ref({
      email: "",
      password: "",
    });
    const authStore = useAuthStore();

    async function getUserData() {
      const response = await authStore.login(loginData.value);

      if (response) {
        console.log(response);
      }

      if (authStore.getLoggedInValue == true) {
        errorMSG.value = response.message;
        return router.replace({
          name: "home",
        });
      }

      if (response.code != 200) {
        errorMSG.value = response.message;
      }
    }

    return {
      authStore,
      loginData,
      getUserData,
      errorMSG,
    };
  },
});
</script>

<style lang="scss">
.login-card {
  &__left {
    display: grid;
    border-radius: var(--_border-radius);
    background-color: var(--clr-background);
    padding: var(--_padding);
    box-shadow: 15px 0px 15px 0px rgba(0, 0, 0, 0.2);

    .send-btn {
      padding: 0.5rem 1rem;
      margin: 1rem 0;
      font-size: var(--fs-400);
      background: var(--clr-primary);
      border-radius: 5px;
      border: 1px solid var(--clr-primary);
      float: right;
    }
    p {
      font-size: var(--fs-300);
    }
  }
  &__right {
    padding: var(--_padding);

    h2 {
      margin-bottom: 1rem;
    }
  }
}
</style>
