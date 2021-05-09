<template>
  <section class="container">
    <section class="PrevNext">
      <div @click="changeEtappe(etappe.id)">
        <img src="@/assets/icons/chevrons-left.svg" alt="chevron-left" />
        <span>Terug naar het etappe overzicht</span>
      </div>
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
import config from '@/utils/config';

export default {
  data() {
    return {
      etappe: '',
      etappe_id: null,
    };
  },
  mounted() {
    this.etappe_id = +this.$route.params.etappeID;
    this.getInfo();

    // this.etappe_id = +this.$route.params.etappeID;
    // fetch(`${config.DEV_URL}stages/${this.etappe_id}`)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     this.etappe = result;
    //   });
  },
  // updated() {
  //   console.log('updated');
  //   this.getInfo();
  // },
  created() {
    this.getInfo();
  },
  beforeRouteUpdate(to, from, next) {
    this.etappe_id = to.params.etappeID;
    this.getInfo();
    next();
  },
  methods: {
    changeEtappe(c) {
      console.log(c);
      // TODO UPDATE TO DYNAMIC NEWSTAGE
      const newStage = +c + 1;
      this.$router.push({
        name: 'etappe-single',
        params: { etappeID: newStage },
      });
    },
    getInfo() {
      fetch(`${config.DEV_URL}stages/${this.etappe_id}`)
        .then((response) => response.json())
        .then((result) => {
          this.etappe = result;
        });
    },
    prevEtappe() {
      const prevEtappe = +this.etappe - 1;
      this.etappe = prevEtappe;
      if (prevEtappe > 0) {
        this.$router.push({
          name: 'klassement-single',
          params: { etappeID: this.etappe },
        });
      } else {
        console.log('kan niet meer');
      }
    },
    nextEtappe() {
      const nextEtappe = +this.$route.params.etappeID + 1;
      this.$router.push({
        name: 'klassement-single',
        params: { etappeID: nextEtappe },
      });
      this.forceRerender();
      // TODO fix this shit
    },
    forceRerender() {
      this.$forceUpdate();
    },
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
