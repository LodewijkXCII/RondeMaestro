<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "../stores/userAuth";
import { RouterLink } from "vue-router";
import axios from "axios";

const userAuth = useAuthStore();
const currentUser = ref();
const nextStage = ref();

currentUser.value = userAuth.getUserName;

if (currentUser.value) {
  axios
    .get(`${import.meta.env.VITE_API_URL}/stages/upcoming`)
    .then((response) => {
      nextStage.value = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<template>
  <aside class="wrapper">
    <nav>
      <p>Ga direct naar:</p>
      <ul>
        <li>Renners selecteren</li>
        <li>Uitslagen</li>
        <li>Klassement</li>
      </ul>
    </nav>
  </aside>
  <main class="wrapper">
    <section class="wrapper flow">
      <h1>Welkom {{ currentUser ? currentUser : "Username" }}</h1>
      <p>
        De <router-link to="/">laaste etappe</router-link> gaf je XXX punten en
        daarmee behaalde je plek YYY!. Bekijk nu snel de
        <router-link to="/">uitslag</router-link>! In het
        <router-link to="/">klassement</router-link> sta je op plek UUU met XXX
        punten. Dat zijn er maar III minder dan USERNAME.
      </p>
      <p v-if="nextStage">
        De eerstvolgende etappe is #{{ nextStage.stage_nr }}
        {{ nextStage.start_city }} - {{ nextStage.finish_city }} een etappe van
        {{ nextStage.distance }}km en heeft een kenmerk van
        {{ nextStage.stage_type_name }}.
        <router-link
          :to="{
            name: 'stageCyclistOverview',
            params: {
              race_id: nextStage.race_id,
              stage_id: nextStage.id,
              city: `${nextStage.start_city
                .replaceAll(' ', '-')
                .toLowerCase()}-${nextStage.finish_city
                .replaceAll(' ', '-')
                .toLowerCase()}`,
            },
          }"
        >
          Bepaal nu snel het beste team</router-link
        >
        voor deze etappe en maak weer kans op het winnen van de daguitslag!
      </p>
    </section>
  </main>
</template>
