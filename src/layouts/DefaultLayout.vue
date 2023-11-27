<template>
  <Navbar></Navbar>
  <div class="wrapper">
    <slot />
  </div>
  <Footer></Footer>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped></style>
