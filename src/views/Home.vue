<template>
  <section class="">
    <div class="landing">
      <div class="landing--text">
        <h1>Welkom bij RondeMaestro</h1>
        <h2>H&eacute;t wielerspel waarbij je dagelijks dezelfde kansen hebt!</h2>
        <p>
          RondeMaestro vindt dat de standaard Tourpoules leuker kunnen. En beter. Daarom
          mag je bij RondeMaestro elke dag een nieuwe ploeg van acht renners aanmaken! Het
          grote voordeel: mocht je er vandaag goed naast zitten, dan heb je morgen weer
          een nieuwe kans een gooi te doen naar de eeuwige roem!
        </p>
        <div class="buttons">
          <button class="btn btn-primary">
            <router-link :to="{ name: 'Auth', params: { authType: 'signup' } }">
              Inschrijven
            </router-link>
          </button>
          <button class="btn btn-primary">
            <router-link :to="{ name: 'Auth', params: { authType: 'signin' } }">
              Aanmelden
            </router-link>
          </button>
        </div>
      </div>
      <div class="landing--image">
        <img src="@/assets/img/screenshot-rocks.png" alt="" />
      </div>
    </div>
    <div class="bg-white">
      <div class="container container-fluid how-to">
        <h1>Wat maakt RondeMaestro anders?</h1>
        <p>Meld je aan en krijg dagelijk kans op het opscheprecht!</p>
      </div>

      <div class="container container-fluid steps">
        <div class="steps--text">
          <h2>Elke dag</h2>
          <p>
            Je kiest voor elke etappe een selectie van 8 renners waarvan jij denkt dat ze
            een goede uitslag gaan rijden. In het keuzescherm zie je alle renners die nog
            in koers zijn (gegroepeerd per team) en kan je zoeken langs de namen en
            rugnummers naar die renners waar jij een goed gevoel bij hebt. Of zoek op een
            naam als je al weet wie je wilt hebben. In je selectie overzicht kun je zien
            wie je al hebt geselecteerd. En kun je dus ook nog iemand uit je selectie
            halen om toch nog voor een ander klasbak te kiezen. Verstuur je (definitieve)
            selectie voor 12 uur op de dag van de etappe en geniet van de koers. Het mooie
            van het verhaal? Je kan elke dag weer 8 nieuwe helden toejuichen!
          </p>
        </div>
        <div class="steps--image">
          <img src="@/assets/icons/homepage/undraw_Booking.svg" alt="" />
        </div>

        <div class="steps--image">
          <img src="@/assets/icons/homepage/undraw_Choose.svg" alt="" />
        </div>
        <div class="steps--text">
          <h2>Top 15 punten</h2>
          <p>
            Aan het einde van de etappe worden, zo snel als mogelijk is, de punten
            toegekend aan de eerste 15 mensen in het dagklassement. Dus die ene vluchter
            die het toch net haalt tot de streep? Natuurlijk had je hem willen hebben,
            maar jouw helden kunnen nog steeds voorin de grote groep eindigen. Je krijgt
            100 punten voor de winnaar van de etappe, en de nummer 15 kan nog steeds 5
            punten bijeenrapen, die je uiteindelijk kunnen helpen om alsnog de dagwinnaar
            te worden.
          </p>
        </div>

        <div class="steps--text">
          <h2>Klassement</h2>
          <p>
            En die dagwinnaar staat natuurlijk bovenaan in het klassement. Tenminste, het
            klassement van die dag. Maar wie weet dag na dag genoeg punten te halen om
            zich uiteindelijk bovenaan te plaatsen? En wat hebben jouw keuzes opgeleverd?
            Zodra de punten zijn toegekend is het klassement bijgewerkt en kan je zien wat
            je die dag hebt gedaan ten opzichte van anderen en wat dit voor een gevolgen
            heeft in het Algemeen Klassement.
          </p>
        </div>
        <div class="steps--image">
          <img src="@/assets/icons/homepage/undraw_winners.svg" alt="" />
        </div>

        <div class="steps--image">
          <img src="@/assets/icons/homepage/undraw_Team_page.svg" alt="" />
        </div>
        <div class="steps--text">
          <h2>Eigen Poules</h2>
          <p>
            En hoe je staat ten opzichte van de rest van de wielerfans is natuurlijk goed
            om te weten. Maar wie mag er morgenochtend pochen bij het koffiezetapparaat?
            Of mag het hoogste woord hebben op het volgende familiefeest? Of wie moet het
            eerste rondje betalen in het stamcafé van de vriendengroep? Je kan je
            inschrijven voor (meerdere) eigen poules, waarin je met je familie, je
            collega's of je vriendengroep in één oogopslag kan zien wie er het meeste
            verstand heeft van de koers. Of gewoon goed kan gissen. Hoewel je na 21
            etappes toch niet meer weg kan komen met alleen maar goed geluk.
          </p>
        </div>

        <div class="steps--text">
          <h2>Daag je vrienden uit!</h2>
          <p>
            Dus. Schrijf je in en doe mee! Nodig iedereen uit die je kent en laat zien dat
            jij elke dag precies weer wat er gaat gebeuren! En lukt dat een dagje wat
            minder? Niet getreurd, Parijs is nog ver en er zijn nog genoeg mogelijkheden,
            want: elke dag zijn er nieuwe kansen voor iedereen!
          </p>
          <button class="btn btn-primary steps--text__button">
            <router-link :to="{ name: 'Auth', params: { authType: 'signin' } }"
              >Inschrijven</router-link
            >
          </button>
        </div>
        <div class="steps--image">
          <img src="@/assets/icons/homepage/undraw_community.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="container container-fluid">
      <h2>Wat anderen zeggen over RondeMaestro</h2>
    </div>
  </section>
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
  mounted() {},
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";

.headerImage {
  width: 100%;
}

.buttons {
  display: flex;
  // justify-content: space-between;
  margin-top: 2rem;

  a {
    color: $white-color !important;
  }

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

.landing {
  // position: absolute;

  padding: 2em 0.5em;
  max-width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;

  &--text {
    margin: 3rem 0;
    position: relative;
    grid-column: 1/3;
    display: flex;
    justify-content: center;
    flex-direction: column;

    h1 {
      color: $primary-color;
      font-size: 2.5rem;
      margin-bottom: 0.5em;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
  &--image {
    margin: 2rem 0;
    img {
      width: 100%;
    }
  }
}

.how-to {
  padding-top: 5rem;
}

.steps {
  display: grid;
  grid-template-rows: repeat(5, 350px);

  &--image {
    justify-self: center;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-height: 80%;
      width: 100%;
    }
  }
  &--text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: justify;

    h2 {
      text-align: center;
      color: $primary-color;
    }

    &__button {
      align-self: flex-start;
      a {
        color: $white-color !important;
      }
    }
  }
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .landing {
    height: calc(100vh - 95px);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 1385px;

    &--text {
      h1 {
        font-size: 3rem;
      }
      h2 {
        font-size: 2rem;
      }
      &::before {
        content: "RONDE MAESTRO";
        position: absolute;
        z-index: -10;
        opacity: 0.1;
        font-size: 15rem;
        font-weight: 700;
        line-height: 0.8;
        color: $secondary-color;
        top: 0.55em;
        left: -0.1ch;
      }
    }
    &--image {
      grid-column: 4/5;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $primary-color;
      img {
        position: absolute;
        width: 185%;
        border: solid 1px $primary-color;
        border-radius: 15px;
        box-shadow: 5px 10px 17px -7px $black-color;
      }
    }
  }

  .steps {
    grid-template-columns: 50% 50%;

    &--text {
      &:nth-child(odd) {
        padding-right: 2rem;
      }
      &:nth-child(even) {
        padding-left: 2rem;
      }
    }
  }
}
</style>
