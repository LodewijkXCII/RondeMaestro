<template>
  <div v-show="klassement.length > 0">
    <h2>Klassement</h2>
    <ol>
      <li v-for="user in klassement" :key="user.id">
        <span :class="user.id == user_id ? 'bold' : ''">{{ user.name }} </span>-
        {{ user.points }}
      </li>
    </ol>
    <router-link to="algemeen-klassement" class="btn btn-primary"
      >Ga naar het volledige klassement</router-link
    >
  </div>
</template>

<script>
export default {
  props: { klassement: Array },
};
</script>
