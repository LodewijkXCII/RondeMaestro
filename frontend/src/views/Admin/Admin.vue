<template>
  <section>
    <div class="adminDashboard">
      <router-link :to="{ name: 'startlist' }" class="adminDashboard__item"
        >Startlijst</router-link
      >
      <router-link :to="{ name: 'etappe-uitslag' }" class="adminDashboard__item"
        >Etappe uitslag</router-link
      >
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.adminDashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  &__item {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: $white-color;
    border-radius: 15px;
    border: 1px solid darken($color: $white-color, $amount: 5);
    box-shadow: 2px 6px 10px rgba($color: $secondary-color, $alpha: 0.2);
  }
}
</style>
