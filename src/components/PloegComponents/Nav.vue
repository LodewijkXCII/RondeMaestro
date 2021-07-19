<template>
  <aside>
    <div>
      <h3>Ploegen waar je aan deelneemt</h3>
      <ul>
        <li v-for="poule in poules" :key="poule.poules_id">
          {{ poule.poules_name }}
        </li>
      </ul>
    </div>
    <div>
      <h3>Instellingen</h3>
      <ul>
        <li>Overzicht</li>
        <li>Klassement</li>
        <li @click="setComponent('InsertPoule')">Ploeg aanmaken</li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    poules: Array,
  },
  methods: {
    setComponent(e) {
      console.log(e);
      this.$emit("setComp", e);
    },
  },
};
</script>

<style></style>
