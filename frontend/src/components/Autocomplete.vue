<template> </template>

<script>
export default {
  data() {
    return {
      open: false,
      current: 0,
    };
  },
  computed: {
    matches() {
      return this.suggestions.filter((str) => {
        return str.indexOf(this.selection) >= 0;
      });
    },
    openSuggestion() {
      return (
        this.selection !== '' && this.matches.length != 0 && this.open === true
      );
    },
  },
};
</script>

<style></style>
