<template>
  <footer>
    <div class="footer footer__Top">
      <div class="footer__Top--left">
        <router-link :to="{ name: 'Home' }" class="brand">
          <img :src="require('@/assets/rondemaestro_giro_logo.png')" />
        </router-link>
        <h2>
          Ronde Maestro, h&eacute;t wielerspel waarbij je dagelijks dezelfde
          kansen hebt!
        </h2>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of use</li>
          <li>
            <router-link :to="{ name: 'Spelregels' }">Spelregels</router-link>
          </li>
          <li><a href="mailto:rondemaestro@gmail.com">Mail ons</a></li>
        </ul>
      </div>

      <!-- <router-link :to="{ name: 'Auth' }" class="btn btn-primary"
        >Aanmelden</router-link
      > -->
    </div>
    <div class="footer footer__Bottom">
      <h4>
        &copy; 2020 - {{ new Date().getFullYear() }} Ronde Maestro door Zweers
        Design
      </h4>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

footer {
  background: white;
  text-align: left;

  .footer {
    max-width: 1200px;
    margin: auto;
    padding: 1.2rem;
    font-size: 0.6rem;

    &__Top {
      display: flex;
      flex-direction: column;
      &--left {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
        flex: 1;
        margin: 0.5rem auto 2rem;

        h2 {
          margin-bottom: 0.75rem;
          text-transform: initial;
          font-weight: 400;
        }

        a img {
          max-width: 75px;
          padding-bottom: 1.75rem;
        }

        ul {
          list-style: none;
          display: flex;
          padding: 0;
          li {
            margin-right: 1.5rem;
            color: #7a7a7a;

            a {
              color: inherit;
              font-weight: inherit;
            }
          }
        }
      }

      .btn {
        height: max-content;
      }
    }
  }
  .footer__Bottom {
    border-top: 1px solid $white-color;
    padding-top: 1rem;

    h4 {
      font-weight: 100;
      text-transform: uppercase;
      font-size: 0.7rem;
    }
  }
}

@media only screen and (min-width: 1224px) {
  footer .footer {
    &__Top {
      flex-direction: row;
      &--left {
        padding: 1rem 0;
        font-size: 0.85rem;
        a img {
          max-width: 100px;
          padding-bottom: 1.75rem;
        }
      }
    }
  }
}
</style>
