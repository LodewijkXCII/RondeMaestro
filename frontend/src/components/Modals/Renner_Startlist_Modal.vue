<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Renners toevoegen.</h3>
          <font-awesome-icon :icon="['fas', 'times']" @click="$emit('close')" />
        </div>

        <div class="modal-body"></div>

        <div class="modal-footer">
          <div class="modalRenners">
            <div
              class="modalRenners__renner"
              :class="renner.selected ? 'selected' : ''"
              v-for="(renner, index) in renners"
              :key="renner.cyclist_id"
              @click.prevent="setSelectie(renner, index)"
            >
              <div class="modalRenners__renner--name">
                {{ renner.first_name }}
                <span class="lastName">{{ renner.last_name }}</span>
              </div>
              <div class="modalRenners__renner--icons">
                <font-awesome-icon :icon="['fas', 'clipboard-check']" />
              </div>
            </div>
          </div>
          <button
            class="btn btn-succes"
            @click.prevent="setTeam"
            style="margin-top: 1rem"
          >
            Kies {{ selectie.length }} renners voor {{ team.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routes from '@/api/routes';

export default {
  props: {
    team: Object,
  },
  data() {
    return {
      renners: [],
      selectie: [],
    };
  },
  methods: {
    setTeam() {
      this.$emit('setTeam', this.selectie);
      this.$emit('close');
    },
    setSelectie(renner, index) {
      if (this.selectie.includes(renner)) {
        this.selectie.splice(index, 1);
      } else {
        this.selectie.push(renner);
      }
      this.toggleSelected(index);
    },
    toggleSelected(i) {
      this.renners[i].selected = !this.renners[i].selected;
    },
  },
  async created() {
    const { data } = await routes.find(`cyclists?team=${this.team.id}`);
    this.renners = data;
  },
};
</script>

<style></style>
