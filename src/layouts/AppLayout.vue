<script setup>
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
import DefaultLayout from "./DefaultLayout.vue";
import { markRaw, ref, watch } from "vue";

const route = useRoute();
const layout = ref();

watch(
  () => route.meta,
  async (metaLayout) => {
    try {
      const component =
        metaLayout.layout &&
        (await import(/* @vite-ignore */ `./${metaLayout.layout}.vue`));

      layout.value = markRaw(component.default || DefaultLayout);
    } catch (error) {
      layout.value = markRaw(DefaultLayout);
    }
  }
);
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
