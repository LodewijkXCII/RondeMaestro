<template>
  <section>
    <img
      src="@/assets/img/howard-bouchevereau-cOfR4XmEzd8-unsplash.jpg"
      alt="RondeMaestro topimage"
      class="headerImage"
    />
    <section class="container">
      <h1>Welkom bij RondeMaestro</h1>
      <h2>Het wielerspel waarbij je dagelijks dezelfde kansen hebt!</h2>
      <p>
        Tol Hansse zong het al: "Wie wint dit jaar de Tour de France?" Het is
        ongetwijfeld de belangrijkste vraag in het jaar. En al jaren probeer je
        via Tourpoules van te voren al een antwoord op te formulieren. Welke
        negen renners zet je wel in je selectie? En welke renners kosten te veel
        van je schamele budget? Wekenlang pieker je er over, tot je uiteindelijk
        bij de start van de Tour de France ineens denkt: waarom heb ik die en
        die niet geselecteerd? En hoe ga je aan het aan de koffieautomaten of in
        de kroeg uitleggen als al je renners schromelijk falen?
      </p>
      <p>
        RondeMaestro vindt dat de standaard Tourpoules leuker kunnen. En beter.
        Daarom mag je bij RondeMaestro elke dag een nieuwe ploeg van acht
        renners aanmaken! Het grote voordeel: mocht je er vandaag goed naast
        zitten, dan heb je morgen weer een nieuwe kans een gooi te doen naar de
        eeuwige roem!
      </p>
      <p>
        Het werkt heel simpel. Voor elke wedstrijd - of dat nu een klassieker of
        grote ronde is - selecteer je acht renners waarvan jij denkt dat ze hoog
        in de uitslag eindigen. En voor elke van die renners die zich in de top
        15 weet te fietsen krijg je punten. Zo simpel is dat!
      </p>
      <p>
        Laat zien dat jij met jouw koersinzicht in die ploegleiderswagen thuis
        hoort en doe mee aan RondeMaestro!
      </p>

      <h2>Beta testing</h2>
      <p>
        Op dit moment is RondeMaestro nog in volle ontwikkeling. Echter hebben
        we de feedback van de gebruikers nodig om nog aanpassingen door te
        kunnen voeren om een nog beter spel te kunnen maken.
      </p>
      <p>
        We vragen je dan ook mild te zijn met de opmerkingen wanneer iets niet
        werkt op de manier zoals je dat zelf verwacht.
      </p>
      <div class="buttons">
        <router-link
          :to="{ name: 'Signin' }"
          role="button"
          class="btn btn-primary"
          >Aanmelden</router-link
        >
        <router-link
          :to="{ name: 'Signup' }"
          role="button"
          class="btn btn-primary"
          >Inschrijven</router-link
        >
      </div>
      <router-link
        :to="{ name: 'Spelregels' }"
        role="button"
        class="btn btn-danger"
        >Spelregels</router-link
      >
      <router-link
        :to="{ name: 'Dashboard' }"
        role="button"
        v-if="loggedIn == true"
        class="btn btn-primary"
        >Ga naar het Dashboard</router-link
      >

      <footer>
        <h2>&copy; RondeMaestro - 2020</h2>
      </footer>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loggedIn: false,
    };
  },
  components: {},
  mounted() {
    const user = window.localStorage.user;
    if (user) {
      this.loggedIn = true;
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.headerImage {
  width: 100%;
}

.buttons {
  display: flex;

  a:first-of-type {
    margin-right: 0.5em;
  }
  a:last-child {
    margin-left: 0.5em;
  }
}

.bottom-links {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 2em 5em;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: $primary-color;

  a {
    color: $white-color;
  }
}

footer {
  margin-top: 3rem;
  border-top: 2px solid $primary-color;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
}
</style>
