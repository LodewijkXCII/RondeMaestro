<template>
  <div>
    <h2>Welkom {{ name }}</h2>
    <h1>Dashboard</h1>
  </div>
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
