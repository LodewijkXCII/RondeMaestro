<template>
  <!-- TODO Filter specialisme toevoegen -->
  <div class="half">
    <div class="half--block">
      <label for="name">Zoek op naam:</label>
      <input
        type="text"
        name="name"
        id="name"
        v-model="name"
        @input="searchName(name)"
        autocomplete="off"
      />
    </div>
    <div class="half--block">
      <label for="team">Zoek op team:</label>
      <select name="team" id="team" v-model="team" @change="searchTeam">
        <option value="0">-</option>
        <option :value="team.team_id" v-for="team in teams" :key="team.index">
          {{ team.team_name || team.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teams: {
      type: undefined,
    },
  },
  data() {
    return {
      name: "",
      team: "",
      spec: "",
    };
  },
  computed: {},
  methods: {
    searchTeam() {
      this.$emit("search-team", this.team);
    },
    searchName(name) {
      this.$emit("search-rider", name);
    },
  },
};
</script>

<style lang="scss">
.filter {
  margin-top: 0.75em;
  .half {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;

    label {
      margin: 0;
    }

    input {
      margin-bottom: 0;
    }
  }
}
</style>
