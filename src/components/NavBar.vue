<template>
  <nav>
    <router-link :to="{ name: 'Home' }">
      <img :src="require('@/assets/logo.png')" />
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

nav {
  border-bottom: 2px solid $primary-color;
  img {
    width: 75px;
    height: auto;
  }
}
</style>
