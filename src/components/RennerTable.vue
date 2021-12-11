<template>
  <section>
    <h2>Selecteer renners voor {{ team.name }}</h2>

    <div class="rmTable">
      <div class="rmTable__header teamUpdate">
        <div class="rmTable__header--number">#</div>

        <div class="rmTable__header--name">Naam</div>

        <div class="rmTable__header--button"></div>
      </div>

      <div
        v-for="(renner, index) in teamMembers"
        :key="renner.id"
        class="rmTable__body teamUpdate"
      >
        <div class="rmTable__body--number">{{ renner.cyclist_id }}</div>
        <div class="rmTable__body--user">
          {{ renner.first_name
          }}<span class="lastName">{{ renner.last_name }}</span>
        </div>
        <div class="rmTable__body--button">
          <font-awesome-icon
            :icon="['fas', 'times']"
            @click="removeRennerFromTeam(renner, index)"
          />
        </div>
      </div>
      <div class="rmTable__body teamUpdate">
        <div class="rmTable__body--number"></div>
        <div class="rmTable__body--user">
          <a id="show-modal" @click="(showModal = true), (team = selectTeam)"
            >Voeg renner toe</a
          >
        </div>
        <div class="rmTable__body--button"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    teamMembers: Array,
    team: Object,
  },
};
</script>

<style></style>
