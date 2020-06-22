<template>
  <div class="home">
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
    <router-link class="" :to="{ name: 'Signup' }" role="button">
      Inschrijven
    </router-link>
    <router-link class="" :to="{ name: 'Signin' }" role="button">
      Aanmelden
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
};
</script>
