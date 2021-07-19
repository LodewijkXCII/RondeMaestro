<template>
  <section class="">
    <div class="header-img">
      <img
        src="@/assets/img/parijs_roubaix.jpg"
        alt="RondeMaestro Account"
        class="headerImage"
      />
    </div>
    <div class="container rules">
      <h1>Spelregels</h1>
      <h4>
        Het idee van Ronde Maestro is simpel. Voor elke etappe of wedstrijd selecteer je 8
        renners. Deze renners kunnen punten halen door bij de eerste 15 te zijn die de
        desbetreffende etappe over de lijn komen. Aan het einde is diegene met de meeste
        punten de winnaar.
      </h4>
      <p>Hoe het precies werkt staat hieronder uitgelegd, samen met enkele huisregels.</p>
      <h2>Het Doel</h2>
      <p>
        Ronde Maestro kun je winnen door aan het einde van de Grote Ronde (of na afloop
        van het Klassieker-seizoen; maar dat is nu nog niet aan de orde) de meeste punten
        te hebben vergaard. Punten kunnen worden behaald door elke dag een selectie van 8
        verschillende renners te selecteren. Deze renners kunnen vervolgens punten halen
        door bij de beste 15 renners van de etappe te eindigen. De eerste renner krijgt de
        meeste punten en de volgende renners steeds iets minder, volgens onderstaande
        tabel:
      </p>
      <div class="rmTable" style="max-width: 500px">
        <div class="rmTable__header rulesTable">
          <div class="rmTable__header--position">Plaats renner</div>
          <div class="rmTable__header--points">Punten</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">1</div>
          <div class="rmTable__body--points">100</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">2</div>
          <div class="rmTable__body--points">80</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">3</div>
          <div class="rmTable__body--points">63</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">4</div>
          <div class="rmTable__body--points">50</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">5</div>
          <div class="rmTable__body--points">41</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">6</div>
          <div class="rmTable__body--points">34</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">7</div>
          <div class="rmTable__body--points">29</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">8</div>
          <div class="rmTable__body--points">24</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">9</div>
          <div class="rmTable__body--points">19</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">10</div>
          <div class="rmTable__body--points">15</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">11</div>
          <div class="rmTable__body--points">12</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">12</div>
          <div class="rmTable__body--points">9</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">13</div>
          <div class="rmTable__body--points">7</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">14</div>
          <div class="rmTable__body--points">6</div>
        </div>
        <div class="rmTable__body rulesTable">
          <div class="rmTable__body--position">15</div>
          <div class="rmTable__body--points">5</div>
        </div>
      </div>

      <h2>Meedoen</h2>
      <p>
        Meedoen is heel eenvoudig. Meld je aan via de
        <router-link :to="{ name: 'Auth', params: { authType: 'signin' } }">
          aanmeldknop
        </router-link>
        , maak een teamnaam aan, met je emailadres en een wachtwoord (minimaal 8
        karakters, minimaal 1 hoofd- en kleine letter en minimaal 1 leesteken of cijfer).
        En voilà, je kan meedoen.
      </p>

      <h2>Regelementen</h2>
      <p>
        Elke wedstrijddag om 12:00 sluit de mogelijkheid om je selectie samen te stellen.
        Zorg dus dat je dit op tijd doet! Je selectie kan van te voren worden aangemaakt,
        en gewijzigd worden tot het moment dat de ‘markt’ sluit.
      </p>
      <p>
        Je selectie mag uit maximaal 8 renners bestaan. Als je meer dan 8 renners wilt
        insturen zal dit niet worden geregistreerd. Als je minder dan 8 renners hebt
        ingevuld wordt dit wel geregistreerd (maar is je kans om punten te pakken wel
        kleiner natuurlijk!).
      </p>
      <p>
        Je renner selectie zal zichtbaar worden in de balk die onderaan je scherm
        verschijnt. Daarin kunnen meer dan 8 renners worden weergegeven. Het versturen
        maakt je selectie pas definitief. Dit definitief maken zal niet werken als er meer
        dan 8 renners in je selectie zitten.
      </p>
      <p>
        Je kan renners zoeken op team en op (achter)naam. Vul bij het zoeken op naam de
        eerste letter(s) van de voor- of achternaam in om te zoeken. Houdt daarbij
        rekening met de dubbele namen. Zo is Wout van Aert te vinden met de
        ‘van’-opdracht, niet met de ‘aer’-opdracht. Daniel Felipe Martinez is te vinden
        met ‘dan’, maar niet met ‘fel’, etc.
      </p>
      <p>
        In elke etappe-scherm is er (straks) informatie te vinden over de etappes,
        hoogteprofielen en mogelijk zelfs tips van het RondeMaestro team. Ook is er een
        snelle link naar de pagina om je selectie in te vullen. Op die manier kun je met
        de juiste informatie de beste beslissingen maken over welke renners je wel en niet
        in je selectie wilt hebben voor de desbetreffende wedstrijd.
      </p>

      <h2>Etappe Uitslagen</h2>
      <p>
        Zodra een officiële uitslag binnen is wordt deze zo snel mogelijk bijgewerkt in
        het spel. Dit kan enige tijd duren, houdt hiervoor de website in de gaten. Deze
        officiële uitslag wordt vervolgens als blijvend geldende uitslag ingesteld.
      </p>

      <h2>Einduitslag</h2>
      <p>
        Na de laatste etappe wordt er gekeken naar het punten aantal alle deelnemers.
        Diegene met de meeste punten heeft gewonnen. Dit levert naast eeuwige roem
        natuurlijk ook de sterkste verhalen aan het koffie apparaat en hooggespannen
        verwachtingen voor een volgende Ronde op.
      </p>
      <small
        >Eventuele uitsluitingen ná een Grote Ronde worden niet meegenomen in de
        uitslag.</small
      >
      <p>
        Bij een gelijk aantal punten wordt er gekeken naar wie het meeste 1e plaatsen had
        in zijn etappe selecties. Is dat ook gelijk, wordt er gekeken naar de 2e plaatsen,
        vervolgens de 3e plaatsen, enzovoorts. Mocht dit helemaal gelijk zijn, dan wordt
        er geloot.
      </p>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/assets/styles.scss";
.rulesTable {
  display: grid;
  gap: 0.1rem;
  grid-template-columns: 1fr 1fr;
  font-weight: normal;
  font-size: 0.6rem;
  display: grid;
}

a {
  text-transform: initial;
}

.rules {
  background: #f4f4f4;
  padding: 0.5em 0;

  p {
    max-width: 85%;
  }
}

@media only screen and (min-width: 1224px) {
  .rules {
    margin-top: -5em;
    border-radius: 5px;
    padding: 5em 3em 0;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      height: 7px;
      width: 100%;
      left: 0;
      top: 0;
      background: $primary-color;
      border-radius: 5px 5px 0 0;
    }
  }
}
</style>
