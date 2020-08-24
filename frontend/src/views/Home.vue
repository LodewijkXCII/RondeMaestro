<template>
  <div>
    <img
      src="@/assets/img/howard-bouchevereau-cOfR4XmEzd8-unsplash.jpg"
      alt="RondeMaestro topimage"
    />
    <h1>Welkom bij RondeMaestro</h1>
    <h2>Het wielerspel waarbij je dagelijks dezelfde kansen hebt!</h2>
    <p>
      Tol Hansse zong het al: "Wie wint dit jaar de Tour de France?" Het is
      ongetwijfeld de belangrijkste vraag in het jaar. En al jaren probeer je
      via Tourpoules van te voren al een antwoord op te formulieren. Welke negen
      renners zet je wel in je selectie? En welke renners kosten te veel van je
      schamele budget? Wekenlang pieker je er over, tot je uiteindelijk bij de
      start van de Tour de France ineens denkt: waarom heb ik die en die niet
      geselecteerd? En hoe ga je aan het aan de koffieautomaten of in de kroeg
      uitleggen als al je renners schromelijk falen?
    </p>
    <p>
      RondeMaestro vindt dat de standaard Tourpoules leuker kunnen. En beter.
      Daarom mag je bij RondeMaestro elke dag een nieuwe ploeg van acht renners
      aanmaken! Het grote voordeel: mocht je er vandaag goed naast zitten, dan
      heb je morgen weer een nieuwe kans een gooi te doen naar de eeuwige roem!
    </p>
    <p>
      Het werkt heel simpel. Voor elke wedstrijd - of dat nu een klassieker of
      grote ronde is - selecteer je acht renners waarvan jij denkt dat ze hoog
      in de uitslag eindigen. En voor elke van die renners die zich in de top 15
      weet te fietsen krijg je punten. Zo simpel is dat!
    </p>
    <p>
      Laat zien dat jij met jouw koersinzicht in die ploegleiderswagen thuis
      hoort en doe mee aan RondeMaestro!
    </p>

    <h2>Beta testing</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde enim
      praesentium atque quas iusto, iste nam possimus, esse debitis libero nihil
      cum aliquid quisquam vel impedit beatae aliquam eaque ea dignissimos
      accusantium voluptas officia illo provident? Soluta harum, nulla ipsum
      quidem velit ea et reiciendis. Ipsa, officiis! Iste quasi impedit, vitae
      velit, aspernatur, amet voluptas quia aliquid corrupti provident ducimus?
    </p>

    <h2>Puntentelling</h2>
    <p>De Puntentelling is als volgt:</p>
    <ol>
      <li>100 pnt</li>
      <li>80 pnt</li>
      <li>63 pnt</li>
      <li>50 pnt</li>
      <li>41 pnt</li>
      <li>34 pnt</li>
      <li>29 pnt</li>
      <li>24 pnt</li>
      <li>19 pnt</li>
      <li>15 pnt</li>
      <li>12 pnt</li>
      <li>9 pnt</li>
      <li>7 pnt</li>
      <li>6 pnt</li>
      <li>5 pnt</li>
    </ol>
    <router-link
      :to="{ name: 'Dashboard' }"
      role="button"
      v-if="loggedIn == true"
    >
      Ga naar het Dashboard
    </router-link>
    <!-- <div class="bottom-links">
      <router-link :to="{ name: 'Signup' }" role="button">
        Inschrijven
      </router-link>
      <router-link :to="{ name: 'Signin' }" role="button">
        Aanmelden
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Home",
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
@import "@/assets/styles.scss";

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
</style>
