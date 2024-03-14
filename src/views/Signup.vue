<template>
  <LoginLayout>
    <div class="login-card__left active">
      <h1>Registreren</h1>

      <form>
        <div class="form__group field">
          <input
            type="text"
            class="form__field"
            placeholder="Gebruikersnaam"
            v-model="registerData.name"
            required
            name="userName"
          />
          <label for="userName" class="form__label"> Gebruikersnaam </label>
        </div>
        <div class="form__group field">
          <input
            type="email"
            class="form__field"
            placeholder="Email"
            v-model="registerData.email"
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
            v-model="registerData.password"
          />
          <label for="password" class="form__label">Password</label>
        </div>

        <button class="send-btn" @click.prevent="registerUser">Verstuur</button>
        <div v-if="errorMSG">{{ errorMSG }}</div>
      </form>
    </div>
    <div class="login-card__right">
      <h2>Welkom bij RondeMaestro!</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
        sint aspernatur itaque possimus deleniti id sed distinctio, dignissimos
        tempore facilis dolorem saepe autem hic nemo illum debitis vel
        blanditiis! Eius similique recusandae culpa, aliquam esse facere a
        necessitatibus et libero amet ipsum, aut totam omnis, repudiandae magni
        alias quibusdam tenetur!
      </p>
    </div>
  </LoginLayout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "../stores/userAuth";
import router from "../router";
import LoginLayout from "../layouts/LoginLayout.vue";

export default defineComponent({
  components: {
    LoginLayout,
  },
  setup() {
    const errorMSG = ref();
    const registerData = ref({
      name: "",
      email: "",
      password: "",
    });
    const authStore = useAuthStore();

    async function registerUser() {
      console.log(registerData.value);
      const response = await authStore.register(registerData.value);

      if (authStore.getLoggedInValue == true) {
        errorMSG.value = response.message;
        return router.push({
          name: "dashboard",
        });
      }

      if (response.code != 200) {
        errorMSG.value = response.message;
      }
    }

    return {
      authStore,
      registerData,
      registerUser,
      errorMSG,
    };
  },
});
</script>

<style lang="scss">
.login-card {
  &__left {
    border-radius: var(--_border-radius);
    background-color: var(--clr-background);
    padding: var(--_padding);

    .send-btn {
      padding: 0.5rem 1rem;
      margin: 1rem 0;
      font-size: var(--fs-400);
      background: var(--clr-primary);
      border-radius: 5px;
      border: 1px solid var(--clr-primary);
      float: right;
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
