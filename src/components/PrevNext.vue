<template>
  <div class="navigationButtons">
    <router-link to="/etappe-overzicht">
      <span>Terug naar het etappe overzicht</span>
    </router-link>
    <!-- <div class="PrevNext" @click="changeStage(+1)">terug</div> -->
  </div>
</template>

<script>
export default {
  props: {
    stage_id: Number,
  },
  data() {
    return {
      stage: this.stage_id,
    };
  },
  methods: {
    // Next/previous controls

    changeStage(i) {
      console.log(i);
      console.log((this.stage += i));
      // if (n >= etappes.length) {
      // return (this.slideIndex = 1)
      // }
      this.$emit("changeStage", (this.stage += i));

      // this.$router.replace({
      //   name: "selectie",
      //   params: { etappeID: prevStage },
      // });
    },
  },
};
</script>

<style lang="scss">
.navigationButtons {
  margin: 2rem 1rem 0;
}

@media only screen and (min-width: 1224px) {
  .navigationButtons {
    padding: 0.5em 1.5em;
    margin: 2rem 0 0;
  }
}
</style>
