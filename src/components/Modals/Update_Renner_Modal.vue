<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click="$emit('close')">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>Renner aanpassen.</h3>
          <font-awesome-icon :icon="['fas', 'times']" @click="$emit('close')" />
        </div>

        <div class="modal-body">
          <form>
            <label for="first_name">Voornaam:</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              v-model="updatedRenner.first_name"
              autocomplete="off"
              required
            />
            <label for="last_name">Achternaam:</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              v-model="updatedRenner.last_name"
              autocomplete="off"
              required
            />

            <button type="submit" class="btn btn-succes" @click.prevent="updateRenner">
              Aanpassen
            </button>
          </form>
        </div>

        <div class="modal-footer">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "@/api/routes";

export default {
  data() {
    return {
      updatedRenner: { ...this.renner },
      countries: [],
    };
  },
  props: {
    renner: Object,
    teams: Array,
  },
  methods: {
    async updateRenner() {
      const country_abr = this.updatedRenner.country_name;

      const country_id = this.countries.find(
        ({ abbreviation }) => abbreviation === country_abr
      );

      try {
        const response = await routes.update(
          `cyclists/${this.updatedRenner.cyclist_id}/`,
          {
            country_id: +country_id.id,
            id: this.updatedRenner.cyclist_id,
            first_name: this.updatedRenner.first_name,
            last_name: this.updatedRenner.last_name,
          }
        );

        if (response.status != 200) {
          console.error("Er is iets mis gegaan");
        }
        return;
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    const country = await routes.find(`countries`);
    this.countries = country.data;
  },
};
</script>

<style lang="scss"></style>
