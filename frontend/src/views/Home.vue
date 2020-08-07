<template>
  <div>
    <h1>Welkom bij RondeMaestro</h1>
    <h2>Het wielerspel waarbij je dagelijks dezelfde kansen hebt!</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, placeat!
      Dolorum debitis cum natus velit, placeat autem molestiae fugiat beatae!
      Debitis, unde, quos ea recusandae illo repellendus maxime laudantium
      explicabo sint voluptates quia temporibus deserunt ab accusamus quo fugiat
      repellat autem magnam officiis dolorem necessitatibus id nesciunt ipsa
      impedit! Natus.
    </p>
    <div class="bottom-links">
      <router-link :to="{ name: 'Signup' }" role="button">
        Inschrijven
      </router-link>
      <router-link :to="{ name: 'Signin' }" role="button">
        Aanmelden
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.bottom-links {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 2em 5em;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: $primary-color;

  a {
    color: $white-color;
  }
}
</style>
