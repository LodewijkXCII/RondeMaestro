<template>
  <section>
    <section class="PrevNext">
      <router-link to="/etappe-overzicht">
        <img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
        <span>Terug naar het etappe overzicht</span>
      </router-link>
    </section>

    <h1>Etappe {{ etappe.stage_nr }}</h1>
    <h2>
      {{ etappe.start_city }} - {{ etappe.finish_city }} ({{
        etappe.distance
      }}KM)
    </h2>
    <img :src="etappe.image_url" alt class="etappeImg" />
    <h2>Tip van het RondeMaestro team</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos culpa
      voluptate rerum? Impedit, recusandae accusantium repellat neque ratione,
      ipsa assumenda voluptatibus harum deleniti, perspiciatis beatae eligendi!
      Mollitia deserunt facere eum explicabo voluptatibus beatae, sint officiis.
      Necessitatibus, ex tenetur voluptatem enim nam, obcaecati animi maiores
      asperiores natus velit eos excepturi commodi!
    </p>
    <router-link
      :to="`/${this.$route.params.etappeID}/selectie`"
      role="button"
      class="btn btn-alert"
      >Vul je Renners in</router-link
    >

    <h2>Over de rit</h2>
  </section>
</template>

<script>
export default {
  data() {
    return {
      etappe: '',
    };
  },
  created() {
    fetch(`http://localhost:1992/api/v1/stages/${this.$route.params.etappeID}`)
      .then((response) => response.json())
      .then((result) => {
        this.etappe = result;
      });
  },
};
</script>

<style lang="scss">
.etappeImg {
  width: 100%;
  height: auto;
  margin: 1em 0;
}
</style>
