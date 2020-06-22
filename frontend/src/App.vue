<template>
  <div id="app">
    <NavBar />
    <router-view class="container" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss"></style>
