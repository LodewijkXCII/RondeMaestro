<template>
  <section>
    <Signup />
    <Signin />
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
.LoginLogOut {
  max-width: 500px;
  margin-top: 5rem;
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
