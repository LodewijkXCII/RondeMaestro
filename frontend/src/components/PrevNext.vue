<template> </template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    prevEtappe() {
      const prevStage = +this.$attrs.etappe - 1;
      this.$router.replace({
        name: 'selectie',
        params: { etappeID: prevStage },
      });
    },
    nextEtappe() {
      const nextStage = +this.$attrs.etappe + 1;
      this.$router.replace({
        name: 'selectie',
        params: { etappeID: nextStage },
      });
    },
  },
};
</script>

<style lang="scss"></style>
