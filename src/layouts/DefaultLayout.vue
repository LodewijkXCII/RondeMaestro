<template>
  <Navbar />
  <div class="wrapper">
    <slot />
  </div>
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped></style>
