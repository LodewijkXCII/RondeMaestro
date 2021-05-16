<template>
  <section class="container authcontainer">
    <Signup class="authcontainer__form" />
    <Signin class="authcontainer__form" />
    <div class="authcontainer__overlay">
      <div class="overlay">
        <div class="overlay__panel overlay__panel--left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" id="signIn">Sign In</button>
        </div>
        <div class="overlay__panel overlay__panel--right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button class="ghost" id="signUp">Sign Up</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Signup from '@/components/Auth/Signup';
import Signin from '@/components/Auth/Signin';

export default {
  components: {
    Signup,
    Signin,
  },
};
</script>

<style lang="scss">
.authcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  padding: 2rem 3rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;

  &__form {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;

    &--signin {
      left: 0;
      width: 50%;
      z-index: 2;
    }
  }
}

.password__rules {
  ul {
    padding: 0;
    margin: 1em 0 0;
    list-style: none;
  }

  li {
    height: 20px;
    line-height: 20px;
    margin: 0 0 0.8em 0;
    padding: 0 0 0 40px;
    position: relative;
  }

  li:before {
    opacity: 1;
    text-shadow: none;
    content: '\2714';
    position: absolute;
    left: -25px;
    width: 20px;
    height: 20px;
    position: relative;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    transform: scale(1.3);
  }
  .false {
    color: red;
  }
  .true {
    color: green;
  }
}
</style>
