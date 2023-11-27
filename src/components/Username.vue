<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "../stores/userAuth";

const userAuth = useAuthStore();
const currentUser = ref("");

currentUser.value = userAuth.getUserName;

watch(userAuth.isLoggedIn, () => {
  console.log("er gebeurt iets");
  currentUser.value = userAuth.getUserName;
});
</script>

<template>
  <div class="username">Hoi, {{ currentUser }}</div>
</template>

<style lang="scss">
.username {
  text-transform: uppercase;
  font-weight: 400;
  text-decoration: none;
  color: var(--clr-text);
  font-size: var(--fs-300);
  fill: var(--clr-text);
  max-width: 30ch;
}
</style>
