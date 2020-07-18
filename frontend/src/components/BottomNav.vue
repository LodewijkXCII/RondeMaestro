<template>
  <section class="bottomNav">
    <div class="bottomNav__navItem">
      <router-link :to="{ name: 'etappe-overzicht' }">
        Etappes
      </router-link>
    </div>
    <div class="bottomNav__navItem">Team</div>
    <div class="bottomNav__navItem">Score</div>
    <div class="bottomNav__navItem">
      <router-link :to="{ name: 'Dashboard' }">
        Dashboard
      </router-link>
    </div>
  </section>
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

  background: $primary-color;
  color: $white-color;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__navItem {
    a {
      color: $white-color;
    }
  }
}
</style>
