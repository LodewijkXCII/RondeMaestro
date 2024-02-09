<template>
  <nav>
    <router-link to="/">
      <img src="../assets/logo.svg" class="brand-logo" />
    </router-link>
  </nav>
  <main class="login">
    <div class="login-card">
      <slot />
    </div>
  </main>
</template>

<script>
export default {
  name: "LoginLayout",
};
</script>

<style lang="scss" scoped>
nav {
  position: absolute;
  padding: 2rem;
}

.brand-logo {
  max-width: 100px;
}

.login {
  position: relative;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;

  &:before {
    content: "";
    position: absolute;
    background-image: url("../assets/img/matt-noble-sXBlqLvWkVk-unsplash.jpg");
    background-size: cover;
    filter: grayscale(90%) blur(2px) opacity(0.6);
    overflow: hidden;
    z-index: -10;
    height: 100vh;
    width: 100%;
  }
}
.login-card {
  --_border-radius: 15px;
  --_padding: 3rem 4rem;
  background: var(--clr-background-mute);
  width: clamp(46ch, 50%, 92ch);
  display: grid;
  grid-template-columns: 1fr 1fr;

  border-radius: var(--_border-radius);
}
</style>
