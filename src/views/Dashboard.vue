<template>
  <section class="container">
    <h2>Welkom {{ name }}</h2>
    <h1>Dashboard</h1>
    <p>
      Deze pagina is nog in aanbouw. In de volgende versie zal hier een
      overzicht komen met de punten en de volgende etappes.
    </p>
  </section>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      name: '',
    };
  },

  mounted() {
    this.name = window.localStorage.user;
  },
  computed: {},
};
</script>
