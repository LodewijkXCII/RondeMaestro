<template>
  <section class="container">
    <h1>Ploegenspel</h1>
    <p style="max-width: 75%">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima deleniti atque,
      debitis excepturi impedit repellat suscipit temporibus voluptates natus, odio,
      tempora dolorum! Magni, error aut. Deleniti perspiciatis officia tenetur ratione?
    </p>

    <div class="container ploegenspel grid-1-2">
      <ploegenNav class="grid-1-2__left" :poules="poules" @setComp="setComp" />
      <component :is="currentTab" />
    </div>
  </section>
</template>

<script>
import ploegenNav from "@/components/PloegComponents/Nav.vue";
import routes from "@/api/routes";

import InsertPoule from "@/components/PloegComponents/InsertPoule.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      poules: [],
      currentTab: "",
    };
  },

  components: {
    ploegenNav,
    InsertPoule,
  },
  computed: {
    ...mapGetters(["getProfile"]),
  },
  methods: {
    setComp(e) {
      console.log(e);
      this.currentTab = e;
    },
  },
  async created() {
    const { data } = await routes.find(`user_poules/${this.getProfile.id}`);
    this.poules = data;
  },
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";
.ploegenspel {
  background: #f4f4f4;
  padding: 0.5em 0;

  /* List Styles */
  ul {
    list-style: none;
    margin: 1rem 0 2rem;
    padding: 0;

    li {
      margin: 0.5rem 0;
      padding-left: 0.75rem;

      &:hover {
        border-left: 3px solid $primary-color;
        color: darken($color: $primary-color, $amount: 7);
        font-weight: 700;
        cursor: pointer;
      }

      &.active {
        border-left: 3px solid $primary-color;
        color: darken($color: $primary-color, $amount: 7);
        font-weight: 700;
      }
    }
  }
}

@media only screen and (min-width: 1224px) {
  .ploegenspel {
    padding: 5em 0;
  }
}
</style>
