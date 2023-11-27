<template>
  <footer class="wrapper">
    <div class="footer-wrapper">
      <router-link to="/">
        <img src="../assets/logo.svg" class="brand-logo" />
      </router-link>

      <h4>
        Ronde Maestro, h&eacute;t wielerspel waarbij je dagelijks dezelfde
        kansen hebt!
      </h4>
      <ul class="footer-links">
        <li>Privacy Policy</li>
        <li>Terms of use</li>
        <li>Spelregels</li>
        <li><a href="mailto:rondemaestro@gmail.com">Mail ons</a></li>
      </ul>
    </div>
    <div class="copyright">
      <h4>
        &copy; 2020 - {{ new Date().getFullYear() }} Ronde Maestro door Zweers
        Design
      </h4>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin-top: 1rem;

  .footer-wrapper {
    margin-top: 2rem;
    border-top: 2px solid var(--clr-primary);
  }

  .footer-links {
    display: flex;
    list-style-type: none;
    gap: 1rem;
    padding: 0;
    font-size: var(--fs-300);

    a {
      text-decoration: none;
      color: var(--clr-text);

      &:hover {
        border-bottom: 1px solid var(--clr-accent);
        margin-bottom: -1px;
      }
    }
  }
  .brand-logo {
    width: 100px;
    padding: 2rem 0 1rem;
  }
  .copyright {
    font-size: var(--fs-200);
    text-transform: uppercase;
    margin-top: 1rem;
    position: relative;
    margin-bottom: 3rem;

    &::before {
      content: "";
      width: 50px;
      height: 4px;
      background: var(--clr-primary);
      position: absolute;
      display: block;
      top: -5px;
    }
  }
}
</style>
