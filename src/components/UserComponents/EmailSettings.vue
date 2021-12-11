<template>
  <section>
    <h2>Email voorkeuren aanpassen</h2>
    <p>Ik ontvang graag emails voor de volgende onderdelen:</p>
    <form action="">
      <div class="checkBox">
        <input type="checkbox" name="result" id="result" v-model="user.result_update" />
        <label for="result">Dagelijkse uitslag</label>
        <p>
          Dagelijks wordt er een mail verstuurd voor de uitslag van de etappe. Hier in kan
          je direct je gescoorde punten zien en kan je direct richting het klassement
          gaan.
        </p>
      </div>
      <div class="checkBox">
        <input type="checkbox" name="reminder" id="reminder" v-model="user.reminder" />
        <label for="reminder"
          >Dagelijkse hennering wanneer je nog <strong>geen</strong> renners hebt
          geslecteerd</label
        >
        <p>
          Wanneer je nog geen renners voor de etappe hebt geslecteerd wordt er om 9u 's
          ochtends een hennering gestuurd om nog je renners in te vullen.
        </p>
      </div>
      <div class="checkBox">
        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          v-model="user.newsletter"
        />
        <label for="newsletter">De RondeMaestro nieuwsbrief</label>
        <p>
          Voor een grote ronde en tijdens de rustdagen worden er updates gestuurd van
          RondeMaestro. Hierin worden tips gedeeld, het klassement en updates over de
          site.
        </p>
      </div>
      <button type="submit" class="btn btn-succes" @click.prevent="updatePrefs">
        {{ button }}
      </button>
    </form>
  </section>
</template>

<script>
import routes from "@/api/routes";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      user: {},
      button: "Updaten",
    };
  },
  computed: {
    ...mapGetters(["getProfile"]),
  },
  methods: {
    async updatePrefs() {
      this.button = "Versturen";
      await routes.update(`users/update/${this.getProfile.id}`, {
        result: this.user.result_update,
        reminder: this.user.reminder,
        newsletter: this.user.newsletter,
      });
      this.button = "Gelukt!";
    },
  },
  async created() {
    const activeUser = this.getProfile.id;

    const { data } = await routes.find(`users/${activeUser}`);
    this.user = data;
  },
};
</script>

<style lang="scss">
.checkBox {
  display: grid;
  grid-template-columns: 10% 1fr;
  margin: 1rem 0;
  width: 80%;
  justify-content: center;
  align-items: center;

  &:last-child() {
    margin-bottom: 3rem;
  }

  label {
    font-weight: 600;
    text-transform: none;
    margin: 0;
  }
  input {
    margin: 0;
  }
  p {
    grid-column: 2/3;
    margin-top: 0.2rem;
  }
}
</style>
