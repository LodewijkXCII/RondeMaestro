<template>
  <div class="bottomNav">
    <div class="bottomNav__navItem">
      <router-link :to="{ name: 'etappe-overzicht' }">
        <font-awesome-icon icon="route" size="lg" />
        Etappes</router-link
      >
    </div>
    <div class="bottomNav__navItem">
      <router-link :to="{ name: 'klassement' }">
        <font-awesome-icon icon="list-ul" size="lg" />

        Klassement
      </router-link>
    </div>
    <div class="bottomNav__navItem">
      <router-link :to="{ name: 'Score' }">
        <font-awesome-icon icon="trophy" size="lg" />
        Score
      </router-link>
    </div>
    <div class="bottomNav__navItem">
      <router-link :to="{ name: 'Dashboard' }">
        <font-awesome-icon icon="th-large" size="lg" />
        Dashboard
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.bottomNav {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 2em 2em 4em;
  z-index: 100;

  background: $primary-color;
  color: $white-color;

  display: flex;
  justify-content: center;
  align-items: center;
  &__navItem {
    height: 100%;
    margin: 0 1rem;

    a {
      color: $white-color;
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;

      svg {
        margin-bottom: 0.25rem;
        height: 20px;
      }
    }
  }
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .bottomnavi {
    .bottomNav {
      width: 650px;
      margin: auto;
    }
  }
}
</style>
