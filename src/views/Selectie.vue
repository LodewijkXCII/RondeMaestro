<template>
  <renner-overview v-if="getProfile.id != null" />
</template>

<script>
import RennerOverview from '@/components/RennerOverview';
import { mapGetters } from 'vuex';

export default {
  components: {
    RennerOverview,
  },

  computed: {
    ...mapGetters(['getProfile']),
  },
};
</script>

<style></style>
