<template>
  <section class="authcontainer">
    <div class="authwrapper container">
      <component :is="currentAuth" class="authform" @toggleAuth="toggleAuth" />
    </div>
  </section>
</template>
<script>
import Signup from "@/components/Auth/Signup";
import Signin from "@/components/Auth/Signin";

export default {
  data() {
    return {
      currentAuth: "signin",
    };
  },
  props: ["authType"],
  components: {
    Signup,
    Signin,
  },

  methods: {
    toggleAuth(value) {
      this.currentAuth = value;
    },
  },
  created() {
    if (this.authType) {
      this.currentAuth = this.authType;
    }
  },
};
</script>

<style lang="scss">
.authcontainer {
  padding: 3rem 0;
}
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .authcontainer {
    background-image: url("~@/assets/img/simon-connellan-unsplash.jpg");
    max-width: 100%;
    margin: 0;
    padding: 6rem 3rem;
    overflow: hidden;
  }
  .authwrapper {
    max-width: 750px;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem 3rem;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    position: relative;
  }

  .authform {
    width: 75%;
    margin: 1rem;
  }
}
</style>
