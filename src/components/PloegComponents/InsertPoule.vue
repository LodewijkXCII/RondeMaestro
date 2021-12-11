<template>
  <main>
    <h1>Ploeg aanmaken</h1>
    <form action="submit">
      <label :for="name">Naam:</label>
      <input
        type="text"
        name="poulename"
        id="poulename"
        v-model="poule.name"
        autocomplete="poulename"
        required
      />
      <div class="checkboxWrapper">
        <input
          type="checkbox"
          name="open"
          id="team"
          v-model="password"
          :value="password"
          class="checkboxWrapper--input"
        />
        <label :for="poule" class="checkboxWrapper--name">Groep openbaar?</label>
      </div>
      <div v-show="!password">
        <label :for="password">Wachtwoord:</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="poule.password"
          autocomplete="off"
        />
      </div>
      <button class="btn btn-succes" @click.prevent="setPoule" style="margin-top: 1rem">
        {{ message }}
      </button>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      poule: {},
      password: false,
      message: "Voeg ploeg toe",
    };
  },
  methods: {
    async setPoule() {
      /*
        trim renners naar alleen cyclist id, race_number
        Stuur de race_id mee in de headers
      */
      if (this.poule != null) {
        this.message = "Toevoegen";

        const body = {
          name: this.poule.name,
          open: this.password,
        };

        if (body.open) {
          body.password = this.poule.password;
        }

        await routes.create(`poules`, body);
        this.message = "Succesvol toegevoegd";
        this.poule = {};
      } else {
        console.error("Er is iets mis gegaan");
      }
    },
  },
};
</script>

<style lang="scss">
.checkboxWrapper {
  &--input,
  &--name {
    display: inline-block;
    width: auto;
  }

  &--input {
    margin-right: 1em !important;
  }
}
</style>
