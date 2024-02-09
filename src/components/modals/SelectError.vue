<template>
  <div class="errormessage">
    Dikke tieten

    {{ message }}
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ message: String });

const showConfirm = ref()
</script>
