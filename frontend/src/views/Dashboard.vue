<template>
  <div>
    <h2>Welkom {{ name.name }}</h2>
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

  computed: {
    created() {
      this.name = JSON.parse(window.localStorage.getItem('user'));
    },
  },
};
</script>
