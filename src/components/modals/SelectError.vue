<template>
  <div class="errormessage" :class="type">
    <span v-show="confirm">kruisje</span>
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ message: String, confirm: Boolean, type: String });
</script>
